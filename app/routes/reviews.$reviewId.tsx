import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getBottle } from "~/models/bottle.server";
import { getReview } from "~/models/reviews.sever";
import { requireUserId } from "~/utils/session.server";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  const reviewId = params.reviewId!;
  const review = await getReview(reviewId);
  const bottleId = review?.bottleId ?? "";
  const bottle = await getBottle(bottleId);

  return json({
    review,
    bottle,
  });
};

export default function ReviewIdRoute() {
  const { review, bottle } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-3xl underline font-bold">{bottle?.name}</h1>
      <div className="flex">
        <div className="italic text-sm text-gray-600">{bottle?.type}</div>
        <div className="self-end">{bottle?.status}</div>
      </div>
      <div className="flex">
        <div>Value for Money: {review?.value}</div>
        <div>Overall Rating: {review?.overallRating}</div>
      </div>
    </div>
  );
}
