import { BottleStatus } from "@prisma/client";
import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/ui/button";
import { Input } from "~/components/ui/ui/input";
import { Label } from "~/components/ui/ui/label";
import { createBottle } from "~/models/bottle.server";
import { generateCode, saveToRedis } from "~/utils/redis.server";
import { requireUserId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Add Bottle" },
    { name: "description", content: "Add a new bottle to your collection." },
  ];
};

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
    !status ||
    !distillery ||
    !country ||
    !region ||
    !price ||
    !age ||
    !alcoholPercent ||
    !year ||
    !barrel ||
    !finishing
  ) {
    throw new Error("Missing required fields");
  }

  const bottle = await createBottle({
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

  // Save to Redis
  const formId = generateCode(6);
  await saveToRedis({
    formId,
    bottleId: bottle.id,
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
  return redirect(`/reviews/new/setting?formId=${formId}`);
};

export default function NewReviewBottleAddRoute() {
  return (
    <Form method="POST">
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
          type="type"
          placeholder="Bourbon, Rye, Single Malts, etc."
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="status">Bottle Status</Label>
        <select name="status" id="status">
          <option value="SEALED">Sealed</option>
          <option value="OPENED">Opened</option>
          <option value="FINISHED">Finished</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="distillery">Distillery</Label>
        <Input
          id="distillery"
          name="distillery"
          type="distillery"
          placeholder="Buffalo Trace, Heaven Hill, etc."
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="country">Country of Origin</Label>
        <Input
          id="country"
          name="country"
          type="country"
          placeholder="USA, Scotland, Japan, etc."
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="region">Region</Label>
        <Input
          id="region"
          name="region"
          type="region"
          placeholder="KY, Islay, Hokkaido, etc."
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="price"
          placeholder="24.99"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          name="age"
          type="age"
          placeholder="12, 18, NAS, etc."
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="alcoholPercent">ABV</Label>
        <Input
          id="alcoholPercent"
          name="alcoholPercent"
          type="alcoholPercent"
          placeholder="49.15"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="year">Release Year</Label>
        <Input id="year" name="year" type="year" placeholder="2023" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="barrel">Barrel Info</Label>
        <Input
          id="barrel"
          name="barrel"
          type="barrel"
          placeholder="Batch 22, Barrel 1264373, C920, etc."
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="finishing">Finishing Barrel(s)</Label>
        <Input
          id="finishing"
          name="finishing"
          type="finishing"
          placeholder="Cabernet, Armagnac, Sherry, etc."
          required
        />
      </div>
      <div>
        <Button type="submit" variant="default">
          Add
        </Button>
      </div>
    </Form>
  );
}
