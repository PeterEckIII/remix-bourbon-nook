import {
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
  Transition,
} from "@headlessui/react";
import { bottle } from "@prisma/client";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import useDebounce from "~/hooks/useDebounce";

type ComboBottle = Omit<bottle, "createdAt"> & { createdAt: string };

interface ComboboxProps {
  bottles: ComboBottle[];
}

export default function Combobox({ bottles }: ComboboxProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const searchTerm = useDebounce(query, 300);
  console.log(searchTerm);

  return (
    <HeadlessCombobox value={selected} onChange={(value) => setSelected(value)}>
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
    </HeadlessCombobox>
  );
}
