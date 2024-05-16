import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Frown, Lock, Martini } from "lucide-react";
import { Button } from "~/components/ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/ui/card";
import { Input } from "~/components/ui/ui/input";
import { Label } from "~/components/ui/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/ui/select";

export const meta: MetaFunction = () => {
  return [
    { title: "Bourbon Nook" },
    { name: "description", content: "The #1 bourbon review app on the web!" },
  ];
};

// const dollarFormatter = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
//   minimumFractionDigits: 2,
// });

export default function Index() {
  return (
    <Form>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Add Bottle</CardTitle>
          <CardDescription>
            Enter the bottle information below to add a new bottle to your
            collection.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Bottle Name</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Buffalo Trace, Elijah Craig, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Spirit Type</Label>
            <Input
              id="type"
              name="type"
              type="text"
              placeholder="Bourbon, Rye, Scotch, etc."
              required
            />
          </div>
          <Label htmlFor="status">Bottle Status</Label>
          <Select>
            <SelectTrigger
              id="status"
              className="items-start [&_[data-description]:hidden group"
            >
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="SEALED">
                  <div className="flex items-start gap-3">
                    <Lock className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        <strong>Sealed</strong>{" "}
                      </p>
                      <p
                        className="text-xs group-active:hidden"
                        data-description
                      >
                        The bottle is sealed. More to come!
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="OPENED">
                  <div className="flex items-start gap-3">
                    <Martini className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        <strong>Opened</strong>{" "}
                      </p>
                      <p
                        className="text-xs group-active:hidden"
                        data-description
                      >
                        The bottle has been opened. Review it!
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="FINISHED">
                  <div className="flex items-start gap-3">
                    <Frown className="size-5" />
                    <div className="grid gap-0.5">
                      <p>
                        <strong>Finished</strong>{" "}
                      </p>
                      <p
                        className="text-xs group-active:hidden"
                        data-description
                      >
                        The bottle is empty. Time for a new one!
                      </p>
                    </div>
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="grid gap-2">
            <Label htmlFor="distillery">Distillery</Label>
            <Input
              id="distillery"
              name="distillery"
              type="text"
              placeholder="Buffalo Trace, Heaven Hill, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country of Origin</Label>
            <Input
              id="country"
              name="country"
              type="text"
              placeholder="USA, Scotland, Japan, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              name="region"
              type="text"
              placeholder="Kentucky, Islay, Hokkaido, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="text"
              placeholder="23.99"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="text"
              placeholder="12yrs"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="alcoholPercent">ABV</Label>
            <Input
              id="alcoholPercent"
              name="alcoholPercent"
              type="text"
              placeholder="57.18"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Release Year</Label>
            <Input id="year" name="year" type="text" placeholder="2021" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="barrel">Barrel Info</Label>
            <Input
              id="barrel"
              name="barrel"
              type="text"
              placeholder="Batch 17, Barrel 3736FJ4, etc."
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="finishing">Finishing Barrel(s)</Label>
            <Input
              id="finishing"
              name="finishing"
              type="text"
              placeholder="Port, Toasted, etc."
              required
            />
          </div>
          <Button variant="default" type="submit">
            Submit
          </Button>
        </CardContent>
      </Card>
    </Form>
  );
}
