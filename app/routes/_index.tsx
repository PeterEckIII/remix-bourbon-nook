import type { MetaFunction } from "@remix-run/node";

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
    <p>
      <h1>hello world</h1>
    </p>
  );
}
