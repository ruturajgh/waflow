import { BooleanAtom } from "./atoms/Boolean";
import { SelectAtom } from "./atoms/Select";
import { EditableText } from "./atoms/Text";
import { Binder } from "./atoms/Binder";

type PropertyRendererProps = {
  propertyKey: string;
  property: any;
  schema: any;
  onChange: (value: any) => void;
};

export function PropertyRenderer({
  propertyKey,
  property,
  schema,
  onChange,
}: PropertyRendererProps) {
  if (!property) return null;

  // string enum => select
  if (schema.enum) {
    return (
      <>
        <SelectAtom
          label={propertyKey}
          value={property.value}
          options={schema.enum.map((v: string) => ({
            label: v,
            value: v,
          }))}
          onChange={onChange}
        />

        <Binder property={property} onUpdate={onChange} />
      </>
    );
  }

  // boolean
  if (schema.type === "boolean") {
    return (
      <>
        <BooleanAtom
          label={propertyKey}
          value={property.value}
          onChange={onChange}
        />

        <Binder property={property} onUpdate={onChange} />
      </>
    );
  }

  // string
  if (schema.type === "string") {
    return (
      <>
        <EditableText
          value={property.value}
          minLength={schema.minLength}
          maxLength={schema.maxLength}
          onChange={onChange}
        />

        <Binder property={property} onUpdate={onChange} />
      </>
    );
  }

  return null;
}