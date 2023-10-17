import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const positions = [
  {
    value: "president",
    label: "President",
  },
  {
    value: "vice president",
    label: "Vice President",
  },
  {
    value: "director for programs",
    label: "Director for Programs",
  },
  {
    value: "director for marketing",
    label: "Director for Marketing",
  },
  {
    value: "director for finance",
    label: "Director for Finance",
  },
  {
    value: "community liaison",
    label: "Community Liaison",
  },
  {
    value: "documentation secretary",
    label: "Documentation Secretary",
  },
  {
    value: "member",
    label: "Member",
  }
]

interface ComboboxPositionProps {
  selectedPosition: string;
  onPositionChange: (label: string, value: string) => void;
}

export function ComboboxPosition({ onPositionChange }: ComboboxPositionProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[full] justify-between"
        >
          {value
            ? positions.find((position) => position.value === value)?.label
            : "Select position..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] p-0">
        <Command>
          <CommandInput placeholder="Search position..." />
          <CommandEmpty>Position does not exist.</CommandEmpty>
          <CommandGroup>
            {positions.map((position) => (
              <CommandItem
                key={position.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                  onPositionChange(position.label, position.value);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === position.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {position.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default ComboboxPosition;
