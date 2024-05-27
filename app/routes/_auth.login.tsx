import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { Button } from "~/components/ui/ui/button";
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
import { safeRedirect } from "~/utils";
import { createUserSession, verifyLogin } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
    {
      name: "description",
      content: "Login to access your collection and reviews.",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const remember = formData.get("remember") === "on";
  const redirectTo = safeRedirect(formData.get("redirectTo")?.toString(), "/");

  if (!email || !password) {
    return new Response("Invalid email or password", {
      status: 400,
    });
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return redirect("/login");
  }

  return createUserSession({
    request,
    userId: user.id,
    remember,
    redirectTo,
  });
};

export default function LoginRoute() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login to access your collection and reviews
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form method="POST">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                id="email"
                required
                ref={emailRef}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="password"
                id="password"
                required
                ref={passwordRef}
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
          <div className="flex justify-end mt-4">
            <Button
              variant="default"
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
