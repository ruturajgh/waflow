
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TextareaProps = {
  label: string;
  value: string;
  placeholder?: string;

  onChange: (value: string) => void;

  disabled?: boolean;
};

export function TextareaAtom({
  label,
  value,
  placeholder,
  onChange,
  disabled,
}: TextareaProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Textarea
        defaultValue={value}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
