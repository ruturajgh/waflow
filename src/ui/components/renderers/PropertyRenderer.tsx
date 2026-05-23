import { Binder } from "./atoms/Binder";
import { BooleanAtom } from "./atoms/Boolean";
import { SelectAtom } from "./atoms/Select";
import { EditableText } from "./atoms/Text";

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
  if (schema["x-ui"]?.editable === false) {
    return null;
  }

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
  // custom renderer need one for data-source rendering capabilities

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
