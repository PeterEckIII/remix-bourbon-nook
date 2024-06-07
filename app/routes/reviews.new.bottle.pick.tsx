import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { bottle } from "@prisma/client";
import { ActionFunctionArgs, MetaFunction, redirect } from "@remix-run/node";
import { Form, useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import { LoaderData } from "./api.bottles";

export const meta: MetaFunction = () => {
  return [
    { title: "Select Bottle" },
    { name: "description", content: "Select a bottle to review." },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const chosenBottle = formData.get("bottleId")?.toString();
  return redirect(`/reviews/new/setting?bottleId=${chosenBottle}`);
};

export default function NewReviewPickBottleRoute() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<bottle | null>(null);
  const searchTerm = useDebounce(query, 300);
  const { data, load } = useFetcher<LoaderData>();
  const bottles = data?.bottles ?? [];

  useEffect(() => {
    function getInitialData() {
      load(`/api/bottles`);
    }
    getInitialData();
  }, [load]);

  useEffect(() => {
    function getFilteredBottles() {
      load(`/api/bottles?query=${searchTerm}`);
    }
    getFilteredBottles();
  }, [load, searchTerm]);

  return (
    <div className="mx-auto h-screen w-96 pt-20">
      <h1 className="text-2xl">Select a bottle</h1>
      <Combobox value={selected} onChange={(value) => setSelected(value)}>
        <div className="relative">
          <ComboboxInput
            className={clsx(
              "w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
            // @ts-expect-error value is not typed correctly
            displayValue={(bottle) => bottle?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDown className="size-4 fill-white/60 group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded-xl border border-white/5 bg-white/5 p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
          >
            {bottles.map((bottle) => (
              <ComboboxOption
                key={bottle.id}
                value={bottle}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <Check className="invisible size-4 fill-white group-data-[selected]:visible" />
                <div className="text-sm/6 text-white">{bottle.name}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </Combobox>
      <Form method="POST">
        <input type="hidden" name="bottleId" value={selected?.id} />
        <button
          type="submit"
          className="block px-4 py-2 mt-4 rounded-lg bg-white/5 text-white text-sm/6 float-right"
        >
          Next
        </button>
      </Form>
    </div>
  );
}
