import { review } from "@prisma/client";
import { prisma } from "~/utils/db.server";

export async function createReview(
  review: Omit<review, "id" | "createdAt" | "updatedAt">
) {
  return await prisma.review.create({ data: review });
}

export async function getReview(reviewId: review["id"]) {
  return await prisma.review.findUnique({ where: { id: reviewId } });
}

export async function getReviewsForUser(userId: string) {
  return await prisma.review.findMany({
    where: { userId },
    select: {
      id: true,
      overallRating: true,
      createdAt: true,
      bottle: {
        select: {
          name: true,
          distillery: true,
          region: true,
          country: true,
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
