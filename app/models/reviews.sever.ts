import { Prisma, review } from "@prisma/client";
import { prisma } from "~/utils/db.server";

export async function createReview(
  review: Omit<review, "id" | "createdAt" | "updatedAt">
) {
  return await prisma.review.create({ data: review });
}

export async function getReview(reviewId: review["id"]) {
  return await prisma.review.findUnique({ where: { id: reviewId } });
}

const reviewSelect = {
  id: true,
  createdAt: true,
  overallRating: true,
  bottle: {
    select: {
      name: true,
      distillery: true,
      region: true,
      country: true,
      price: true,
      age: true,
    },
  },
} satisfies Prisma.reviewSelect;

export type ReviewsWithBottles = Prisma.reviewGetPayload<{
  select: typeof reviewSelect;
}>;

export type ReviewsWithBottlesSerialized = Omit<
  ReviewsWithBottles,
  "createdAt"
> & {
  createdAt: string;
};

export async function getReviewsForUser(
  userId: string
): Promise<ReviewsWithBottles[]> {
  return await prisma.review.findMany({
    where: { userId },
    select: {
      id: true,
      createdAt: true,
      overallRating: true,
      bottle: {
        select: {
          name: true,
          distillery: true,
          region: true,
          country: true,
          price: true,
          age: true,
        },
      },
    },
  });
}

export async function updateReview(
  reviewId: review["id"],
  review: Partial<review>
) {
  return await prisma.review.update({ where: { id: reviewId }, data: review });
}

export async function deleteReview(reviewId: review["id"]) {
  return await prisma.review.delete({ where: { id: reviewId } });
}
