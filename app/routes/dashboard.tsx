import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DashboardCards from "~/components/DashboardCards/DashboardCards";
import RecentBottles from "~/components/RecentItems/RecentBottles";
import BottleTable from "~/components/Table/BottleTable";
import { getBottlesForUser } from "~/models/bottle.server";
import { getReviewsForUser } from "~/models/reviews.sever";
import { requireUserId } from "~/utils/session.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);

  const userBottles = await getBottlesForUser(userId);
  const userReviews = await getReviewsForUser(userId);

  return json({
    bottles: userBottles,
    reviews: userReviews,
  });
};

export default function Dashboard() {
  const { bottles } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <DashboardCards />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <BottleTable bottles={bottles} />
          <RecentBottles />
          {/*  
          <ReviewTable reviews={reviews} />
          <RecentReviews recentReviews={reviews} />
          */}
        </div>
      </main>
    </div>
  );
}
