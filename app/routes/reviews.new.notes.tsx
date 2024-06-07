import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/ui/button";
import { Input } from "~/components/ui/ui/input";
import { Label } from "~/components/ui/ui/label";
import { requireRedisData, saveToRedis } from "~/utils/redis.server";
import { requireUserId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Add review tasting notes" },
    {
      name: "description",
      content: "Add notes about the spirit you're reviewing.",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  const formData = await requireRedisData(request);
  return json({
    formId: formData.formId,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireUserId(request);
  const formData = await request.formData();

  const fruity = Number(formData.get("fruity")?.toString());
  const nutty = Number(formData.get("nutty")?.toString());
  const spicy = Number(formData.get("spicy")?.toString());
  const herbal = Number(formData.get("herbal")?.toString());
  const tobacco = Number(formData.get("tobacco")?.toString());
  const leather = Number(formData.get("leather")?.toString());
  const oak = Number(formData.get("oak")?.toString());
  const grain = Number(formData.get("grain")?.toString());
  const vanilla = Number(formData.get("vanilla")?.toString());
  const caramel = Number(formData.get("caramel")?.toString());
  const honey = Number(formData.get("honey")?.toString());
  const chocolate = Number(formData.get("chocolate")?.toString());
  const value = Number(formData.get("value")?.toString());
  const overallRating = Number(formData.get("overallRating")?.toString());

  if (
    !fruity ||
    !nutty ||
    !spicy ||
    !herbal ||
    !tobacco ||
    !leather ||
    !oak ||
    !grain ||
    !vanilla ||
    !caramel ||
    !honey ||
    !chocolate ||
    !value ||
    !overallRating
  ) {
    throw new Response("Missing required fields", { status: 400 });
  }

  const redisFormData = await requireRedisData(request);
  if (!redisFormData) {
    throw new Response("Form not found", { status: 404 });
  }

  redisFormData.fruity = fruity;
  redisFormData.nutty = nutty;
  redisFormData.spicy = spicy;
  redisFormData.herbal = herbal;
  redisFormData.tobacco = tobacco;
  redisFormData.leather = leather;
  redisFormData.oak = oak;
  redisFormData.grain = grain;
  redisFormData.vanilla = vanilla;
  redisFormData.caramel = caramel;
  redisFormData.honey = honey;
  redisFormData.chocolate = chocolate;
  redisFormData.value = value;
  redisFormData.overallRating = overallRating;

  await saveToRedis(redisFormData);

  return redirect(`/reviews/new/confirm?formId=${redisFormData.formId}`);
};

export default function NewReviewNotesRoute() {
  const { formId } = useLoaderData<typeof loader>();

  return (
    <Form method="POST">
      <input type="hidden" name="formId" value={formId} />
      <div className="flex flex-col">
        <Label htmlFor="fruity">Fruity</Label>
        <Input type="number" name="fruity" id="fruity" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="nutty">Nutty</Label>
        <Input type="number" name="nutty" id="nutty" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="spicy">Spicy</Label>
        <Input type="number" name="spicy" id="spicy" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="herbal">Herbal</Label>
        <Input type="number" name="herbal" id="herbal" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="tobacco">Tobacco</Label>
        <Input type="number" name="tobacco" id="tobacco" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="leather">Leather</Label>
        <Input type="number" name="leather" id="leather" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="oak">Oak</Label>
        <Input type="number" name="oak" id="oak" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="grain">Grain</Label>
        <Input type="number" name="grain" id="grain" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="vanilla">Vanilla</Label>
        <Input type="number" name="vanilla" id="vanilla" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="caramel">Caramel</Label>
        <Input type="number" name="caramel" id="caramel" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="honey">Honey</Label>
        <Input type="number" name="honey" id="honey" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="chocolate">Chocolate</Label>
        <Input type="number" name="chocolate" id="chocolate" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="value">Value</Label>
        <Input type="number" name="value" id="value" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="overallRating">Overall Rating</Label>
        <Input type="number" name="overallRating" id="overallRating" />
      </div>
      <div className="flex">
        <Button variant="default" type="submit">
          Confirm
        </Button>
      </div>
    </Form>
  );
}
