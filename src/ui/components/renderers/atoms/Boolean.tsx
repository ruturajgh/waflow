import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function BooleanAtom({ value, label, onChange }) {
  return (
    <div className=" flex flex-row gap-2  w-min">
      <Input
        checked={value}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
      />
      <Label>{label}</Label>
    </div>
  );
}
