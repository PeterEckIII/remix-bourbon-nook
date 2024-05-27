import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { InfoIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/ui/card";
import { Checkbox } from "~/components/ui/ui/checkbox";
import { Input } from "~/components/ui/ui/input";
import { Label } from "~/components/ui/ui/label";
import { Popover } from "~/components/ui/ui/popover";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";
import { createUserSession, getUserId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Register" },
    {
      name: "description",
      content: "Register today to start your collection.",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export type RegisterActionData = {
  errors: {
    email: string | null;
    username: string | null;
    password: string | null;
    confirmPassword: string | null;
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const username = formData.get("username")?.toString();
  const password = formData.get("password")?.toString();
  const confirmPassword = formData.get("confirmPassword")?.toString();
  const remember = formData.get("remember") === "on";
  const redirectTo = safeRedirect(formData.get("redirectTo")?.toString(), "/");

  if (!validateEmail(email)) {
    return json<RegisterActionData>(
      {
        errors: {
          email: "Email is invalid",
          username: null,
          password: null,
          confirmPassword: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 8) {
    return json<RegisterActionData>(
      {
        errors: {
          email: null,
          username: null,
          password: "Password is required",
          confirmPassword: null,
        },
      },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<RegisterActionData>(
      {
        errors: {
          email: null,
          username: null,
          password: "Password must be at least 8 characters",
          confirmPassword: null,
        },
      },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return json<RegisterActionData>(
      {
        errors: {
          email: null,
          username: null,
          password: null,
          confirmPassword: "Passwords do not match",
        },
      },
      { status: 400 }
    );
  }

  if (!username || typeof username !== "string") {
    return json<RegisterActionData>(
      {
        errors: {
          email: null,
          username: "Username is a required field",
          password: null,
          confirmPassword: null,
        },
      },
      { status: 400 }
    );
  }

  if (username.length < 3) {
    return json<RegisterActionData>(
      {
        errors: {
          email: null,
          username: "Username must be at least 3 characters",
          password: null,
          confirmPassword: null,
        },
      },
      { status: 400 }
    );
  }

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return json<RegisterActionData>(
      {
        errors: {
          email: "Email is already in use",
          username: null,
          password: null,
          confirmPassword: null,
        },
      },
      { status: 400 }
    );
  }

  const existingUsername = await getUserByUsername(username);
  if (existingUsername) {
    return json<RegisterActionData>(
      {
        errors: {
          email: null,
          username: "Username is already in use",
          password: null,
          confirmPassword: null,
        },
      },
      { status: 400 }
    );
  }

  const newlyCreatedUser = await createUser(email, username, password);

  if (!newlyCreatedUser) {
    return json<RegisterActionData>(
      {
        errors: {
          email: "An error occurred while creating your account",
          username: null,
          password: null,
          confirmPassword: null,
        },
      },
      { status: 500 }
    );
  }

  return createUserSession({
    request,
    userId: newlyCreatedUser.id,
    remember,
    redirectTo,
  });
};

export default function RegisterRoute() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    } else if (actionData?.errors?.confirmPassword) {
      confirmPasswordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Register today to start your collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="POST">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="your@email.com"
                ref={emailRef}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                id="username"
                type="text"
                placeholder="username"
                ref={usernameRef}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div>
                <Label htmlFor="password">Password</Label>{" "}
                <Popover>
                  <PopoverTrigger>
                    <InfoIcon className="size-4" />
                  </PopoverTrigger>
                  <PopoverContent className="z-50 bg-gray-300 text-gray-800 p-4 m-4 rounded">
                    Passwords should be at least 8 characters.
                  </PopoverContent>
                </Popover>
              </div>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="password"
                ref={passwordRef}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="confirm password"
                ref={confirmPasswordRef}
                required
              />
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <div className="flex items-top space-x-2">
            <Checkbox id="remember" name="remember" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="remember">Remember me</Label>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
