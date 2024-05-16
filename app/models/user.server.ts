import type { user } from "@prisma/client";
import { prisma } from "../utils/db.server";

export async function createUser(
  user: Omit<user, "id" | "updatedAt" | "createdAt">
) {
  return await prisma.user.create({ data: user });
}
