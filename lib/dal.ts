import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

export type CurrentUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

/**
 * Reads the session cookie and loads the matching user from the database.
 * Memoized per-request so multiple calls don't hit the DB repeatedly.
 */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  if (!session?.userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, image: true },
  });

  return user;
});

/** Use in Server Components/Actions that require an authenticated user. */
export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * All syllabus modules for the Resource Hub, each with its past papers and
 * study materials attached. Ordered so the highest-priority tier surfaces
 * first, then by weightage within a tier.
 */
export const getModulesWithResources = cache(async () => {
  return prisma.module.findMany({
    orderBy: [{ tier: "asc" }, { priorityPercent: "desc" }],
    include: {
      pastPapers: { orderBy: { year: "desc" } },
      studyMaterials: true,
    },
  });
});

export type ModuleResource = Awaited<
  ReturnType<typeof getModulesWithResources>
>[number];
