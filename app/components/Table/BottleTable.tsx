import { BottlesForTable } from "~/types/bottles";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/ui/table";

interface BottleTableProps {
  bottles: BottlesForTable[];
}

export default function BottleTable({ bottles }: BottleTableProps) {
  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Bottles</CardTitle>
          <CardDescription>Recent bottles you&apos;ve added</CardDescription>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {bottles.map((bottle) => (
              <TableRow key={bottle.id}>
                <TableCell>{bottle.name}</TableCell>
                <TableCell>{bottle.type}</TableCell>
                <TableCell>{bottle.status}</TableCell>
                <TableCell>{bottle.distillery}</TableCell>
                <TableCell>
                  {bottle.region}, {bottle.country}
                </TableCell>
                <TableCell>{bottle.price}</TableCell>
                <TableCell>{bottle.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
