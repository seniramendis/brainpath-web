"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/passwords";
import { createSession, deleteSession } from "@/lib/session";
import { checkRateLimit, getClientIp, loginLimiter, loginEmailLimiter, signupLimiter } from "@/lib/rate-limit";

export type AuthFormState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | undefined;

const SignupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long."),
  email: z.string().trim().toLowerCase().email("Please enter a valid email."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Please enter a valid email."),
  password: z.string().min(1, "Enter your password."),
});

export async function signupAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const ip = await getClientIp();
  const { success } = await checkRateLimit(signupLimiter, ip);
  if (!success) {
    return { error: "Too many accounts created from this network. Please try again in an hour." };
  }

  const validated = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { fieldErrors: z.flattenError(validated.error).fieldErrors as Record<string, string[]> };
  }

  const { name, email, password } = validated.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "An account with that email already exists. Try logging in instead." };
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const ip = await getClientIp();
  const { success } = await checkRateLimit(loginLimiter, ip);
  if (!success) {
    return { error: "Too many login attempts. Please wait a minute and try again." };
  }

  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { fieldErrors: z.flattenError(validated.error).fieldErrors as Record<string, string[]> };
  }

  const { email, password } = validated.data;

  const { success: emailOk } = await checkRateLimit(loginEmailLimiter, email);
  if (!emailOk) {
    return { error: "Too many login attempts on this account. Please wait 15 minutes and try again." };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.passwordHash) {
    return {
      error: user
        ? "This account uses Google sign-in. Continue with Google below."
        : "Invalid email or password.",
    };
  }

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
