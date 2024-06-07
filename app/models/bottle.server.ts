import { bottle } from "@prisma/client";
import { prisma } from "~/utils/db.server";

export async function createBottle(
  bottle: Omit<bottle, "id" | "createdAt" | "updatedAt">
) {
  return await prisma.bottle.create({ data: bottle });
}

export async function getBottle(bottleId: bottle["id"]) {
  return await prisma.bottle.findUnique({ where: { id: bottleId } });
}

export async function getComboboxBottles(userId: string, query: string) {
  return await prisma.bottle.findMany({
    where: {
      userId,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { distillery: { contains: query, mode: "insensitive" } },
      ],
    },
  });
}

export async function getBottlesForUser(userId: string) {
  return await prisma.bottle.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      type: true,
      status: true,
      distillery: true,
      region: true,
      country: true,
      price: true,
      age: true,
    },
  });
}

export async function updateBottle(
  bottleId: bottle["id"],
  bottle: Partial<bottle>
) {
  return await prisma.bottle.update({ where: { id: bottleId }, data: bottle });
}

export async function deleteBottle(bottleId: bottle["id"]) {
  return await prisma.bottle.delete({ where: { id: bottleId } });
}
