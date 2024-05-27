import { Link, Outlet } from "@remix-run/react";

export default function AuthRoute() {
  return (
    <>
      <header className="border-b-2 border-b-slate-500 h-32">
        <nav>
          <Link to="/register">Create Account</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
