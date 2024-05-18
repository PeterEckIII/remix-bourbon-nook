import DashboardCards from "~/components/DashboardCards/DashboardCards";
import RecentBottles from "~/components/RecentItems/RecentBottles";
import RecentReviews from "~/components/RecentItems/RecentReviews";
import BottleTable from "~/components/Table/BottleTable";
import ReviewTable from "~/components/Table/ReviewTable";

export default function ReviewRoute() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <DashboardCards />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <BottleTable />
          <RecentBottles />
          <ReviewTable />
          <RecentReviews />
        </div>
      </main>
    </div>
  );
}
