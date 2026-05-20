import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function BooleanAtom({ value, label, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <Label>{label}</Label>

      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}
