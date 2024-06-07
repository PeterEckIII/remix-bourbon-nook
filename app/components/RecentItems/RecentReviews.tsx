import { Link } from "@remix-run/react";
import { Link2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/ui/card";
import { ReviewsForTable } from "~/types/reviews";

interface RecentReviewsProps {
  recentReviews: ReviewsForTable[];
}

export default function RecentReviews({ recentReviews }: RecentReviewsProps) {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Recent Reviews</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {recentReviews.map((review) => (
          <>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/" alt="avatar" />
                <AvatarFallback>PW</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                {/* <p className="text-sm font-medium leading-none">
                  {review.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {review.author.username}
                </p> */}
              </div>
              <div className="ml-auto font-medium">
                <Link to={`/reviews/${review.id}`}>
                  <Link2 className="size-5" />
                </Link>
              </div>
            </div>
          </>
        ))}
      </CardContent>
    </Card>
  );
}
