import { cn } from "@/lib/utils";

type EditableTextProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  fontClassName?: string;
  strikethrough?: boolean;
};

export function EditableText({
  value,
  onChange,
  className,
  fontClassName,
  strikethrough,
}: EditableTextProps) {
  return (
    <p
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(e) => onChange(e.currentTarget.textContent || "")}
      className={cn(
        "text-base outline-none subtext",
        fontClassName,
        strikethrough && "line-through",
        className,
      )}
    >
      {value}
    </p>
  );
}
