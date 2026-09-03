import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/session";
import { getRequestIp, checkRateLimit, oauthLimiter } from "@/lib/rate-limit";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo";
const STATE_COOKIE = "g_oauth_state";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfo = {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
};

function getRedirectUri(request: NextRequest) {
  return process.env.GOOGLE_REDIRECT_URI ?? new URL("/api/auth/google/callback", request.url).toString();
}

function loginError(request: NextRequest, code: string) {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", code);
  const response = NextResponse.redirect(url);
  response.cookies.delete(STATE_COOKIE);
  return response;
}

export async function GET(request: NextRequest) {
  const { success: rateOk } = await checkRateLimit(oauthLimiter, getRequestIp(request));
  if (!rateOk) {
    return loginError(request, "rate_limited");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return loginError(request, "google_not_configured");
  }

  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !expectedState || state !== expectedState) {
    return loginError(request, "google_state_mismatch");
  }

  // Exchange the authorization code for an access token.
  const tokenRes = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: getRedirectUri(request),
      grant_type: "authorization_code",
    }),
  });

  const tokenData: GoogleTokenResponse = await tokenRes.json();

  if (!tokenRes.ok || !tokenData.access_token) {
    return loginError(request, "google_token_exchange_failed");
  }

  // Fetch the user's profile.
  const userRes = await fetch(USERINFO_URL, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!userRes.ok) {
    return loginError(request, "google_userinfo_failed");
  }

  const profile: GoogleUserInfo = await userRes.json();

  if (!profile.email) {
    return loginError(request, "google_no_email");
  }

  const email = profile.email.toLowerCase();

  // Link to an existing account with the same email, or create a new one.
  let user = await prisma.user.findUnique({ where: { googleId: profile.sub } });

  if (!user) {
    user = await prisma.user.findUnique({ where: { email } });
  }

  if (user) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        googleId: profile.sub,
        name: user.name ?? profile.name ?? null,
        image: user.image ?? profile.picture ?? null,
      },
    });
  } else {
    user = await prisma.user.create({
      data: {
        email,
        googleId: profile.sub,
        name: profile.name ?? null,
        image: profile.picture ?? null,
      },
    });
  }

  await createSession(user.id);

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.delete(STATE_COOKIE);
  return response;
}
