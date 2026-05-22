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
  const sourceOptions = useMemo(
    () => [
      { value: "data", label: "Data" },
      { value: "form", label: "form" },
    ],
    [],
  );

  return (
    <div className="space-y-2">

      {isDynamic && (
        <div className="space-y-2 ">
          <div className="flex gap-2">
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
            /></div>
          {property?.source === "data" ? (
            <div className="flex gap-2"> <Label>Path</Label>
              <Input
                defaultValue={property?.path || ""}
                onBlur={(e) =>
                  onUpdate?.({
                    ...property,
                    path: e.target.value,
                  })
                }
              /></div>
          ) : (
            <div className="flex gap-2">
              {" "}
              <Label>Path</Label>{" "}
              <SelectAtom
                value={property.path}
                onChange={(e) => { }}
                options={pathOptions}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
