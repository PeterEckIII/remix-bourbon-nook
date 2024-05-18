import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/ui/card";

export default function RecentBottles() {
  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>Recent Bottles</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/" alt="avatar" />
            <AvatarFallback>PE</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Peter Eck</p>
            <p className="text-sm text-muted-foreground">peck@remix.run</p>
          </div>
          <div className="ml-auto font-medium">$1,999.00</div>
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/" alt="avatar" />
            <AvatarFallback>KE</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Katie Eck</p>
            <p className="text-sm text-muted-foreground">keck@remix.run</p>
          </div>
          <div className="ml-auto font-medium">$999.99</div>
        </div>
      </CardContent>
    </Card>
  );
}
