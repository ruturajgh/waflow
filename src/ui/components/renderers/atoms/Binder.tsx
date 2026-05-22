import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFlowEditor } from "@/ui/hooks/useFlowEditor";
import { useMemo } from "react";

export function Binder({ property, onUpdate }) {

  const isDynamic = property.kind === "dynamic";
  const editor = useFlowEditor()

  const pathOptions = useMemo(() => property.source ? editor.resolveAllFormBindings() : [], [property.source])
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2">
        <Input
          type="checkbox"
          checked={isDynamic}
          onChange={(e) =>
            onUpdate?.({
              ...property,
              kind: e.target.checked ? "dynamic" : "static",
            })
          }
        />
        <Label>Dynamic</Label>
      </label>

      {isDynamic && (
        <div className="space-y-1">
          <Label>Source</Label>{" "}
          <SourceSelect
            value={property.source ?? ''}
            onSelect={(e) => onUpdate?.({
              ...property,
              source: e
            })}
            options={[
              { value: "data", label: "Data" },
              { value: "form", label: "form" },
            ]}
          />

          {property?.source === 'data' ?
            <Input defaultValue={property?.path || ''} onBlur={(e) => onUpdate?.({
              ...property,
              path: e.target.value
            })} />
            :
            <span> <Label>Path</Label>{" "}
              <SourceSelect value={property.path} onSelect={(e) => { }} options={pathOptions
              } /></span>
          }
        </div>
      )}
    </div>
  );
}

function SourceSelect({ value, onSelect, options }) {
  return (
    <Select value={value || ""} onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Source" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options?.map((i) => (
            <SelectItem value={i.value}>{i.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
