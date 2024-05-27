import { Outlet } from "@remix-run/react";

export default function BottlesRootRoute() {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-6 rounded pb-10 shadow-lg md:w-[60%] lg:w-[40%] xl:w-[30%]">
      <Outlet />
    </div>
  );
}
