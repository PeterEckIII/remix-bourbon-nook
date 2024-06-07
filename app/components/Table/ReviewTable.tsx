// import { review } from "@prisma/client";
import { Link } from "@remix-run/react";
import { Link2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/ui/table";
import { TableReview } from "~/types/reviews";

interface ReviewTableProps {
  reviews: TableReview[];
}

export default function ReviewTable({ reviews }: ReviewTableProps) {
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Reviews</CardTitle>
          <CardDescription>The reviews you&apos;ve submitted</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Distillery</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.bottle.name}</TableCell>
                <TableCell>{review.bottle.distillery}</TableCell>
                <TableCell>
                  {review.bottle.region}, {review.bottle.country}
                </TableCell>
                <TableCell>{review.overallRating}</TableCell>
                <TableCell>
                  <Link to={`/reviews/${review.id}`}>
                    <Link2 className="size-5" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
