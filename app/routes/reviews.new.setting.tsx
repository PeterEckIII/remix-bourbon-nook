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
import { Textarea } from "~/components/ui/ui/textarea";
import {
  getDataFromRedis,
  requireRedisData,
  saveToRedis,
} from "~/utils/redis.server";
import { requireUserId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Add review setting" },
    { name: "description", content: "Add details about your review." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  const redisForm = await requireRedisData(request);

  return json({
    formId: redisForm.formId,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  await requireUserId(request);
  const formData = await request.formData();
  const date = formData.get("date")?.toString();
  const setting = formData.get("setting")?.toString();
  const glassware = formData.get("glassware")?.toString();
  const restTime = formData.get("restTime")?.toString();
  const nose = formData.get("nose")?.toString();
  const palate = formData.get("palate")?.toString();
  const finish = formData.get("finish")?.toString();
  const thoughts = formData.get("thoughts")?.toString();
  const formId = formData.get("formId")?.toString() ?? "";

  if (
    !date ||
    !setting ||
    !glassware ||
    !restTime ||
    !nose ||
    !palate ||
    !finish ||
    !thoughts
  ) {
    throw new Response("Missing required fields", { status: 400 });
  }

  const redisData = await getDataFromRedis(formId);
  if (!redisData) {
    throw new Response("Form not found", { status: 404 });
  }

  redisData.formId = formId;
  redisData.date = date;
  redisData.setting = setting;
  redisData.glassware = glassware;
  redisData.restTime = restTime;
  redisData.nose = nose;
  redisData.palate = palate;
  redisData.finish = finish;
  redisData.thoughts = thoughts;

  // Save to Redis
  await saveToRedis(redisData);

  return redirect(`/reviews/new/notes?formId=${formId}`);
};

export default function NewReviewSettingRoute() {
  const { formId } = useLoaderData<typeof loader>();

  return (
    <Form method="POST">
      <input type="hidden" name="formId" value={formId} />
      <div className="flex flex-col">
        <Label htmlFor="date">Date</Label>
        <Input type="string" name="date" id="date" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="setting">Setting</Label>
        <Input type="string" name="setting" id="setting" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="glassware">Glassware</Label>
        <Input type="string" name="glassware" id="glassware" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="restTime">Rest Time</Label>
        <Input type="string" name="restTime" id="restTime" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="nose">Nose</Label>
        <Textarea name="nose" id="nose" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="palate">Palate</Label>
        <Textarea name="palate" id="palate" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="finish">Finish</Label>
        <Textarea name="finish" id="finish" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="thoughts">Thoughts</Label>
        <Textarea name="thoughts" id="thoughts" />
      </div>
      <div className="flex">
        <Button variant="default" type="submit">
          Next
        </Button>
      </div>
    </Form>
  );
}
