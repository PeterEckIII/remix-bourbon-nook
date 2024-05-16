import { user } from "@prisma/client";
import { createUser } from "~/models/user.server";

export const createNormalUser = (user: Pick<user, "email" | "username">) => {
  return createUser({
    ...user,
    role: "USER",
  });
};

export const createAdminUser = (user: Pick<user, "email" | "username">) => {
  return createUser({
    email: user.email,
    username: user.username,
    role: "ADMIN",
  });
};
