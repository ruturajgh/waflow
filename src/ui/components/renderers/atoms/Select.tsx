import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ReactNode } from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label?: ReactNode;

  value?: string;

  onChange?: (value: string) => void;

  placeholder?: string;

  options: Option[];
};

export function SelectAtom({
  label,
  placeholder,
  value,
  onChange,
  options,
}: Props) {
  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
