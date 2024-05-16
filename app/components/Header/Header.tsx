import { Form, Link } from "@remix-run/react";
import { CircleUser, Martini, Menu, Search } from "lucide-react";
import { Button } from "~/components/ui/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/ui/dropdown-menu";
import { Input } from "~/components/ui/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/ui/sheet";
import ModeToggle from "../ModeToggle/ModeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <Martini className="size-5" />
          <span className="sr-only">Bourbon Nook</span>
        </Link>
        <Link
          to="/bottles"
          className=" transition-colors hover:text-foreground"
        >
          Bottles
        </Link>
        <Link
          to="/bottles/new/info"
          className=" transition-colors hover:text-foreground"
        >
          Add Bottle
        </Link>
        <Link
          to="/reviews"
          className=" transition-colors hover:text-foreground"
        >
          Reviews
        </Link>
        <Link
          to="/reviews/new"
          className=" transition-colors hover:text-foreground"
        >
          Add Review
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Martini className="size-5" />
              <span className="sr-only">Bourbon Nook</span>
            </Link>
            <Link to="/dashboard" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              to="/bottles"
              className="text-muted-foreground hover:text-foreground"
            >
              Bottles
            </Link>
            <Link
              to="/reviews"
              className="text-muted-foreground hover:text-foreground"
            >
              Reviews
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form action="" className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reviews..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuLabel>Support</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              <Form action="/logout" method="post">
                <Button variant="destructive" type="submit">
                  Logout
                </Button>
              </Form>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
