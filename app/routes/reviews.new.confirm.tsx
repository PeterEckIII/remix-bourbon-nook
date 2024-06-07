import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Edit } from "lucide-react";
import { Button } from "~/components/ui/ui/button";
import { createReview } from "~/models/reviews.sever";
import {
  deleteFormData,
  getDataFromRedis,
  requireRedisData,
} from "~/utils/redis.server";
import { requireUserId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Confirm Review" },
    { name: "description", content: "Confirm your review details." },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  const formData = await requireRedisData(request);
  return json({
    formData,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const formId = formData.get("formId")?.toString();
  if (typeof formId !== "string") {
    throw new Error("Missing formId");
  }

  const redisData = await getDataFromRedis(formId);
  if (!redisData) {
    throw new Error("Form data not found");
  }

  const review = await createReview({
    userId,
    bottleId: redisData.bottleId!,
    date: redisData.date!,
    setting: redisData.setting!,
    glassware: redisData.glassware!,
    restTime: redisData.restTime!,
    nose: redisData.nose!,
    palate: redisData.palate!,
    finish: redisData.finish!,
    thoughts: redisData.thoughts!,
    fruity: redisData.fruity!,
    nutty: redisData.nutty!,
    spicy: redisData.spicy!,
    herbal: redisData.herbal!,
    tobacco: redisData.tobacco!,
    leather: redisData.leather!,
    oak: redisData.oak!,
    grain: redisData.grain!,
    vanilla: redisData.vanilla!,
    caramel: redisData.caramel!,
    honey: redisData.honey!,
    chocolate: redisData.chocolate!,
    value: redisData.value!,
    overallRating: redisData.overallRating!,
  });

  await deleteFormData(formId);

  return redirect(`/reviews/${review.id}`);
};

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const userId = await requireUserId(request);
//   const formData = await request.formData();
//   const formId = formData.get("formId")?.toString();

//   if (!formId) {
//     throw new Error("Missing formId");
//   }

//   const redisData = await getDataFromRedis(formId);

//   if (!redisData) {
//     throw new Error("Form data not found");
//   }

//   const review = await createReview({
//     userId,
//     bottleId: redisData.bottleId!,
//     date: redisData.date!,
//     setting: redisData.setting!,
//     glassware: redisData.glassware!,
//     restTime: redisData.restTime!,
//     nose: redisData.nose!,
//     palate: redisData.palate!,
//     finish: redisData.finish!,
//     thoughts: redisData.thoughts!,
//     fruity: redisData.fruity!,
//     nutty: redisData.nutty!,
//     spicy: redisData.spicy!,
//     herbal: redisData.herbal!,
//     tobacco: redisData.tobacco!,
//     leather: redisData.leather!,
//     oak: redisData.oak!,
//     grain: redisData.grain!,
//     vanilla: redisData.vanilla!,
//     caramel: redisData.caramel!,
//     honey: redisData.honey!,
//     chocolate: redisData.chocolate!,
//     value: redisData.value!,
//     overallRating: redisData.overallRating!,
//   });

//   return redirect(`/reviews/${review.id}`);
// };

export default function NewReviewConfirmRoute() {
  const { formData } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col">
        <div>
          <h2 className="text-2xl underline font-semibold">
            Setting Information
          </h2>
          <div>
            <p>Date: {formData.date}</p>
            <p>Setting: {formData.setting}</p>
            <p>Glassware: {formData.glassware}</p>
            <p>Rest Time: {formData.restTime}</p>
          </div>
          <h2 className="text-2xl underline font-semibold">Review Notes</h2>
          <div>
            <p>Nose: {formData.nose}</p>
            <p>Palate: {formData.palate}</p>
            <p>Finish: {formData.finish}</p>
            <p>Thoughts: {formData.thoughts}</p>
          </div>
        </div>
        <Edit className="size-5" />
        <Link
          className="text-blue-700 hoer:underline"
          to={`/reviews/new/setting?formId=${formData.formId}`}
        >
          Edit
        </Link>
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl underline font-semibold">Flavor Notes</h2>
        <div>
          <p>Fruity: {formData.fruity}</p>
          <p>Nutty: {formData.nutty}</p>
          <p>Spicy: {formData.spicy}</p>
          <p>Herbal: {formData.herbal}</p>
          <p>Tobacco: {formData.tobacco}</p>
          <p>Leather: {formData.leather}</p>
          <p>Oak: {formData.oak}</p>
          <p>Grain: {formData.grain}</p>
          <p>Vanilla: {formData.vanilla}</p>
          <p>Caramel: {formData.caramel}</p>
          <p>Honey: {formData.honey}</p>
          <p>Chocolate: {formData.chocolate}</p>
        </div>
        <Edit className="size-5" />
        <Link
          className="text-blue-700 hoer:underline"
          to={`/reviews/new/notes?formId=${formData.formId}`}
        >
          Edit
        </Link>
      </div>
      <Form method="POST">
        <input type="hidden" name="formId" value={formData.formId} />
        <Button variant="default" type="submit">
          Submit Review
        </Button>
      </Form>
    </div>
  );
}
