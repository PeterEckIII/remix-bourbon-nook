import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { CirclePlus, FileStack } from "lucide-react";
import { requireUserId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Review" },
    {
      name: "description",
      content: "Add a review for one of your bottles",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);
  return null;
};

export default function NewReviewBottleRoute() {
  return (
    <div className="w-full flex h-1/2">
      <div className="w-1/2 flex justify-center items-center border-right border-dashed border-gray-600">
        <Link
          to="/reviews/new/bottle/pick"
          className="flex flex-col justify-center items-center hover:text-gray-600"
        >
          <FileStack className="size-20" />
          <span className="text-2xl">Pick from your Collection</span>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center items-center border-left border-dashed border-gray-600">
        <Link
          to="/reviews/new/bottle/add"
          className="flex flex-col items-center justify-center hover:text-gray-600"
        >
          <CirclePlus className="size-20" />
          <span className="text-2xl">Add a new bottle</span>
        </Link>
      </div>
    </div>
  );
}
