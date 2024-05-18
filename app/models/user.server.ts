import type { user } from "@prisma/client";
import { prisma } from "../utils/db.server";

export async function createUser(
  user: Omit<user, "id" | "updatedAt" | "createdAt">
) {
  return await prisma.user.create({ data: user });
}

export async function getUserById(userId: user["id"]) {
  return await prisma.user.findUnique({ where: { id: userId } });
}

export async function getUserByEmail(email: user["email"]) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function getUserByUsername(username: user["username"]) {
  return await prisma.user.findUnique({ where: { username } });
}

export async function updateUser(userId: user["id"], user: Partial<user>) {
  return await prisma.user.update({ where: { id: userId }, data: user });
}

export async function deleteUser(userId: user["id"]) {
  return await prisma.user.delete({ where: { id: userId } });
}
