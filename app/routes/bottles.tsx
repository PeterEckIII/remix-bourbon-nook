import Dropdown from "~/components/Dropdown/Dropdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/ui/card";

export default function BottlesRootRoute() {
  return (
    <div className="flex h-full w-full items-center justify-center p-6 rounded pb-10 shadow-lg md:w-[60%] lg:w-[40%] xl:w-[30%]">
      <h1 className="text-2xl underline font-semibold">Bottles</h1>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Add Bottles</CardTitle>
          <CardDescription>
            Enter the bottle information below to add it to your collection
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Dropdown />
        </CardContent>
      </Card>
    </div>
  );
}
