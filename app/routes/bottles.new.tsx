import { BottleStatus } from "@prisma/client";
import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import Dropdown from "~/components/Dropdown/Dropdown";
import { Button } from "~/components/ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/ui/card";
import { Input } from "~/components/ui/ui/input";
import { Label } from "~/components/ui/ui/label";
import { createBottle } from "~/models/bottle.server";
import { requireUserId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Bottle" },
    { name: "description", content: "Add a new bottle to your collection." },
  ];
};

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   await requireUserId(request);
//   return null;
// };

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const type = formData.get("type")?.toString();
  const status = formData.get("status")?.toString() as BottleStatus;
  const distillery = formData.get("distillery")?.toString();
  const country = formData.get("country")?.toString();
  const region = formData.get("region")?.toString();
  const price = formData.get("price")?.toString();
  const age = formData.get("age")?.toString();
  const alcoholPercent = formData.get("alcoholPercent")?.toString();
  const year = formData.get("year")?.toString();
  const barrel = formData.get("barrel")?.toString();
  const finishing = formData.get("finishing")?.toString();

  if (
    !name ||
    !type ||
    !distillery ||
    !country ||
    !region ||
    !price ||
    !age ||
    !alcoholPercent ||
    !barrel ||
    !year ||
    !finishing
  ) {
    throw new Response("Missing required fields", { status: 400 });
  }

  await createBottle({
    userId,
    name,
    type,
    status,
    distillery,
    country,
    region,
    price,
    age,
    alcoholPercent,
    year,
    barrel,
    finishing,
    imageUrl: "",
  });

  return redirect(`/bottles`);
};

export default function NewBottleRoute() {
  return (
    <Form method="POST">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Add Bottle</CardTitle>
          <CardDescription>
            Enter the bottle information below to add a new bottle to your
            collection.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Bottle Name</Label>
            <Input
              id="name"
              name="name"
              type="name"
              placeholder="Buffalo Trace, Elijah Craig, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Spirit Type</Label>
            <Input
              id="type"
              name="type"
              type="text"
              placeholder="Bourbon, Rye, Scotch, etc."
              required
            />
          </div>
          <Label htmlFor="status">Bottle Status</Label>
          <Dropdown />
          <div className="grid gap-2">
            <Label htmlFor="distillery">Distillery</Label>
            <Input
              id="distillery"
              name="distillery"
              type="text"
              placeholder="Buffalo Trace, Heaven Hill, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country of Origin</Label>
            <Input
              id="country"
              name="country"
              type="text"
              placeholder="USA, Scotland, Japan, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              name="region"
              type="text"
              placeholder="Kentucky, Islay, Hokkaido, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="text"
              placeholder="23.99"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="text"
              placeholder="12yrs"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="alcoholPercent">ABV</Label>
            <Input
              id="alcoholPercent"
              name="alcoholPercent"
              type="text"
              placeholder="57.18"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Release Year</Label>
            <Input id="year" name="year" type="text" placeholder="2021" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="barrel">Barrel Info</Label>
            <Input
              id="barrel"
              name="barrel"
              type="text"
              placeholder="Batch 17, Barrel 3736FJ4, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="finishing">Finishing Barrel(s)</Label>
            <Input
              id="finishing"
              name="finishing"
              type="text"
              placeholder="Port, Toasted, etc."
              required
            />
          </div>
          <Button variant="default" type="submit">
            Submit
          </Button>
        </CardContent>
      </Card>
    </Form>
  );
}
