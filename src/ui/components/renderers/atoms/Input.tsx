"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputFieldProps = {
  label: string;
  value: string;
  placeholder?: string;

  onChange: (value: string) => void;

  disabled?: boolean;
};

export function InputAtom({
  label,
  value,
  placeholder,
  onChange,
  disabled,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Input
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
