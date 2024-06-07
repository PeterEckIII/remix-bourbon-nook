import type { bottle, review } from "@prisma/client";

export type ReviewsForTable = Pick<review, "id" | "overallRating"> & {
  bottle: Pick<bottle, "name" | "distillery" | "region" | "country">;
} & { createdAt: string };

type TableBottle = {
  name: string;
  distillery: string;
  region: string;
  country: string;
};

export type TableReview = Pick<review, "id" | "overallRating"> & {
  bottle: TableBottle;
  createdAt: string;
};
