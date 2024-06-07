import { bottle } from "@prisma/client";

export type BottlesForTable = Pick<
  bottle,
  | "id"
  | "name"
  | "type"
  | "status"
  | "distillery"
  | "region"
  | "country"
  | "price"
  | "age"
>;
