import { Frown, Lock, Martini } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/ui/select";

export default function Dropdown() {
  return (
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
                <p className="text-xs group-active:hidden" data-description>
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
                <p className="text-xs group-active:hidden" data-description>
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
                <p className="text-xs group-active:hidden" data-description>
                  The bottle is empty. Time for a new one!
                </p>
              </div>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
