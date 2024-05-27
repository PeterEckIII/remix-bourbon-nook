import type { password, user } from "@prisma/client";
import bcrypt from "bcryptjs";
import { prisma } from "../utils/db.server";

export async function createUser(
  email: user["email"],
  username: user["username"],
  password: password["hash"]
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      email,
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
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
