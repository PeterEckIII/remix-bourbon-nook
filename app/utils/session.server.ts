import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";

import type { password, user } from "@prisma/client";
import { getUserById } from "~/models/user.server";
import { prisma } from "./db.server";

invariant(
  process.env.SESSION_SECRET,
  `SESSION_SECRET must be defined in your .env file`
);

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "bourbon_nook_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
});

const USER_SESSION_KEY = "userId";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUserId(
  request: Request
): Promise<user["id"] | undefined> {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await getUserById(userId);
  if (user) return user;
  throw await logout(request);
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request);
  if (!userId || typeof userId === "undefined") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);
  if (!userId) return null;

  const user = await getUserById(userId);
  if (user) return user;
  throw await logout(request);
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: user["id"];
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 30 // 30 days
          : undefined,
      }),
    },
  });
}

export async function verifyLogin(
  email: user["email"],
  password: password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
