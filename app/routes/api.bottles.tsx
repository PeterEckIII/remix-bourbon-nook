import { bottle } from "@prisma/client";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getComboboxBottles } from "~/models/bottle.server";
import { requireUserId } from "~/utils/session.server";

export type LoaderData = {
  bottles: bottle[];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request);
  const url = new URL(request.url);
  const query = url.searchParams.get("query") ?? "";

  const bottles = await getComboboxBottles(userId, query);

  return json<LoaderData>(
    { bottles },
    {
      headers: {
        "Cache-Control": "max-age=60",
      },
    }
  );
};
