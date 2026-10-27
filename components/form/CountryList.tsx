
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Globe2 } from "lucide-react";
import { Country } from "country-state-city";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type CountryOption = {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
};

type CountryListProps = {
  value?: string;
  onChange?: (country: CountryOption | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function CountryList({
  value,
  onChange,
  placeholder = "Select your country",
  disabled = false,
}: CountryListProps) {
  const [open, setOpen] = React.useState(false);

  const countries = React.useMemo(
    () =>
      Country.getAllCountries()
        .map((country) => ({
          name: country.name,
          isoCode: country.isoCode,
          flag: country.flag,
          phonecode: country.phonecode,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    []
  );

  const selectedCountry = countries.find(
    (country) => country.isoCode === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="h-11 w-full justify-between rounded-lg border-input bg-white px-3 font-normal shadow-sm hover:bg-accent/50"
        >
          {selectedCountry ? (
            <span className="flex min-w-0 items-center gap-3">
              <span className="text-xl">
                {selectedCountry.flag}
              </span>
              <span className="truncate">
                {selectedCountry.name}
              </span>
              <span className="text-muted-foreground">
                +{selectedCountry.phonecode}
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-2 text-muted-foreground">
              <Globe2 className="size-4" />
              {placeholder}
            </span>
          )}

          <ChevronsUpDown className="ml-2 size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] min-w-[280px] p-0"
      >
        <Command>
          <CommandInput placeholder="Search countries..." />

          <CommandList className="max-h-64 overflow-y-auto overscroll-contain">
            <CommandEmpty>
              No country found.
            </CommandEmpty>

            <CommandGroup heading="Countries">
              {countries.map((country) => (
                <CommandItem
                  key={country.isoCode}
                  value={`${country.name} ${country.isoCode} ${country.phonecode}`}
                  onSelect={() => {
                    onChange?.(country);
                    setOpen(false);
                  }}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2.5"
                >
                  <span className="text-xl">
                    {country.flag}
                  </span>

                  <span className="min-w-0 flex-1 truncate">
                    {country.name}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    +{country.phonecode}
                  </span>

                  <Check
                    className={cn(
                      "size-4 shrink-0",
                      value === country.isoCode
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
