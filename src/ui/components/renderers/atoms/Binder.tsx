import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFlowEditor } from "@/ui/hooks/useFlowEditor";
import { useMemo } from "react";
import { SelectAtom } from "./Select";

export function Binder({ property, onUpdate }) {
  const isDynamic = property.kind === "binding";
  const editor = useFlowEditor();

  const pathOptions = useMemo(
    () => (property.source ? editor.resolveAllFormBindings() : []),
    [property.source],
  );
  const sourceOptions = useMemo(() => ([
    { value: "data", label: "Data" },
    { value: "form", label: "form" },
  ]), [])

  return (
    <div className="space-y-2">
      <label className="flex w-max items-center gap-2">
        <Input
          type="checkbox"
          checked={isDynamic}
          onChange={(e) =>
            onUpdate?.({
              ...property,
              kind: e.target.checked ? "binding" : "static",
            })
          }
        />
        <Label>Dynamic</Label>
      </label>

      {isDynamic && (
        <div className="space-y-1">
          <Label>Source</Label>{" "}
          <SelectAtom
            value={property.source ?? ""}
            onChange={(e) =>
              onUpdate?.({
                ...property,
                source: e,
              })
            }
            options={sourceOptions}
          />
          {property?.source === "data" ? (
            <Input
              defaultValue={property?.path || ""}
              onBlur={(e) =>
                onUpdate?.({
                  ...property,
                  path: e.target.value,
                })
              }
            />
          ) : (
            <span>
              {" "}
              <Label>Path</Label>{" "}
              <SelectAtom
                value={property.path}
                onChange={(e) => { }}
                options={pathOptions}
              />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
