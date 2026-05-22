import { cn } from "@/lib/utils";
import { useMemo } from "react";

type EditableTextProps = {
  value: string;
  onChange?: (value: string) => void;

  className?: string;

  minLength?: number;
  maxLength?: number;

  placeholder?: string;
  showHint?: boolean;
};

export function EditableText({
  value,
  onChange,
  className,

  minLength,
  maxLength,

  placeholder = "Click to edit...",
  showHint = true,
}: EditableTextProps) {
  const error = useMemo(() => {
    const length = value.trim().length;

    if (minLength && length < minLength) {
      return `Minimum ${minLength} characters required`;
    }

    if (maxLength && length > maxLength) {
      return `Maximum ${maxLength} characters allowed`;
    }

    return null;
  }, [value, minLength, maxLength]);

  return (
    <>
      <p
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        data-placeholder={placeholder}
        onBlur={(e) => onChange?.(e.currentTarget.textContent || "")}
        className={cn(
          "outline-none border rounded-md px-2 py-1",
          "empty:before:content-[attr(data-placeholder)]",
          "empty:before:text-muted-foreground",
          error ? "border-red-500" : "border-transparent",
          className,
        )}
      >
        {value}
      </p>

      <div className="mt-1 flex justify-between text-xs">
        {error ? (
          <span className="text-red-500">{error}</span>
        ) : (
          showHint && (
            <span className="text-muted-foreground">
              Click and type to edit
            </span>
          )
        )}

        {maxLength && (
          <span>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </>
  );
}
