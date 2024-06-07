import { Outlet } from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/ui/card";

export default function NewReviewRoute() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Review</CardTitle>
        <CardDescription>Add a review for one of your bottles</CardDescription>
      </CardHeader>
      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  );
}
