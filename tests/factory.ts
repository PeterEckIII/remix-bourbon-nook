import { faker } from "@faker-js/faker";
import { user } from "@prisma/client";
import { createUser } from "~/models/user.server";

export const createNormalUser = (user: Pick<user, "email" | "username">) => {
  return createUser(user.email, user.username, faker.internet.password());
};

export const createAdminUser = (user: Pick<user, "email" | "username">) => {
  return createUser(user.email, user.username, faker.internet.password());
};
