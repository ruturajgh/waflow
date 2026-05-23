import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Form } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InputAtom } from "./atoms/Input";
import { EditableText } from "./atoms/Text";
import { PropertyRenderer } from "./PropertyRenderer";

type DataSourceItem = any

type CheckboxDataSourceEditorProps = {
  value: DataSourceItem[];
  onChange: (items: DataSourceItem[]) => void;
};

export function CheckboxDataSourceEditor({
  value,
  onChange,
}: CheckboxDataSourceEditorProps) {
  const items = value.value
  

  const updateItem = (
    index: number,
    patch: Partial<DataSourceItem>
  ) => {
    const next = [...items];

    next[index] = {
      ...next[index],
      ...patch,
    };

    onChange(next);
  };

  const addItem = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        title: "",
        enabled: true,
      },
    ]);
  };

  const removeItem = (index: number) => {
    onChange(
      items.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-3 border-t pt-3">
      <div className="flex justify-between items-center">
        <Label>Data Source</Label>

        <Button
          size="sm"
          onClick={addItem}
        >
          Add
        </Button>
      </div>

      {items.map((item, index) => (
        <div
          key={item.id}
          className="border rounded-md p-3 space-y-3"
        >
          <InputAtom
            label="Title"
            value={item.title.value}
            onChange={(v) =>
              updateItem(index, {
                title: v,
              })
            }
          />

          {/* <TextareaAtom
            label="Description"
            value={item.description.value || ""}
            onChange={(v) =>
              updateItem(index, {
                description: v,
              })
            }
          />

          <BooleanAtom
            label="Enabled"
            value={item.enabled.value}
            onChange={(v) =>
              updateItem(index, {
                enabled: v,
              })
            }
          /> */}

          <Button
            variant="destructive"
            size="sm"
            onClick={() =>
              removeItem(index)
            }
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

export function CheckboxGroup({
  node,
  onUpdate,
}: any) {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
    >
      <AccordionItem value={node.id}>
        <AccordionTrigger className="items-center gap-2">
          <Form />

          {node.type}

          <EditableText
            value={node.props.name.value}
            onChange={(v) =>
              onUpdate?.(node.id, {
                name: v,
              })
            }
          />
        </AccordionTrigger>

        <AccordionContent className="overflow-visible space-y-2 !h-auto !transition-none">
          {Object.entries(node.spec.properties).map(
            ([propertyKey, schema]: any) => {
              // skip name because handled in header
              if (propertyKey === "name") {
                return null;
              }

              return (
                <PropertyRenderer
                  key={propertyKey}
                  propertyKey={propertyKey}
                  property={node.props[propertyKey]}
                  schema={schema}
                  node={node}
                  onUpdate={onUpdate}
                />
              );
            }
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}