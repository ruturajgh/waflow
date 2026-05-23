import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { SelectAtom } from "./renderers/atoms/Select";
import { useFlowEditor } from "../hooks/useFlowEditor";

export function createPropertyTable(node: any) {
  const specProperties = node.spec.properties ?? {};

  const runtimeProps = node.props ?? {};

  return Object.entries(specProperties).map(([key, schema]: [string, any]) => {
    const runtime = runtimeProps[key];

    const exists = runtime !== undefined;

    return {
      property: key,

      enabled: exists,

      required: node.spec.required?.includes(key) ?? false,

      bindable: schema["x-binding"]?.allowed === true,

      type: schema.type,

      // editable state
      kind: runtime?.kind ?? "static",

      value: runtime?.value ?? schema.default,

      source: runtime?.source ?? "data",

      path: runtime?.path ?? "",

      schema,
    };
  });
}

export function PropertyTable({ node }) {
  const [rows, setRows] = useState(() => createPropertyTable(node));

  const createNode = useFlowEditor().createNodeFromPropertyData;

  function updateRow(property: string, patch: Partial<any>) {
    setRows((prev) =>
      prev.map((row) =>
        row.property === property
          ? {
              ...row,
              ...patch,
            }
          : row,
      ),
    );
  }

  function handleSubmit() {
    const result = Object.fromEntries(
      rows
        .filter((row) => row.enabled)
        .map((row) => [
          row.property,
          {
            kind: row.kind,
            source: row.source,
            path: row.path,
            value: row.value,
          },
        ]),
    );

    createNode(result, node.id);
  }
  return (
    <div>
      {" "}
      <Label className="text-xl">Properties</Label>
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.property} className=" flex  gap-2 items-center">
            {/* enabled */}
            <Input
              type="checkbox"
              checked={row.enabled}
              disabled={row.required}
              className="w-[16px]"
              onChange={(e) =>
                updateRow(row.property, {
                  enabled: e.target.checked,
                })
              }
            />

            {/* property */}
            <div className="min-w-[100px]">
              <h4>{row.property}</h4>

              <p className="text-xs text-muted-foreground">{row.type}</p>
            </div>

            {/* kind */}
            {row.bindable ? (
              <div className="w-[100px]">
                <SelectAtom
                  value={row.kind}
                  options={[
                    {
                      label: "Static",
                      value: "static",
                    },
                    {
                      label: "Binding",
                      value: "binding",
                    },
                  ]}
                  onChange={(value) => updateRow(row.property, { kind: value })}
                />
              </div>
            ) : (
              <span>-</span>
            )}

            {/* kind */}
            {row.kind !== "static" && row.source && (
              <div className="w-[100px]">
                <SelectAtom
                  value={row.source}
                  options={[
                    {
                      label: "Data",
                      value: "data",
                    },
                    {
                      label: "Form",
                      value: "form",
                    },
                  ]}
                  onChange={(value) =>
                    updateRow(row.property, { source: value })
                  }
                />
              </div>
            )}

            {/* path */}
            {row.kind === "binding" && (
              <Input
                className="w-[150px]"
                value={row.path}
                placeholder="binding path"
                onChange={(e) =>
                  updateRow(row.property, {
                    path: e.target.value,
                  })
                }
              />
            )}
          </div>
        ))}
        <span className="w-full flex justify-end ">
          <Button onClick={handleSubmit}>Update</Button>
        </span>
      </div>
    </div>
  );
}
