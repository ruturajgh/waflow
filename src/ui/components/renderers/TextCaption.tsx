import { Text } from "lucide-react";
import { Binder } from "./atoms/Binder";
import { BooleanAtom } from "./atoms/Boolean";
import { SelectAtom } from "./atoms/Select";
import { EditableText } from "./atoms/Text";
import { NodeFrame } from "./registry";

type TextCaptionSchema = {
  text: string;
  visible: boolean;
  "font-weight": "normal" | "medium" | "semibold" | "bold";
  strikethrough: boolean;
};

type TextCaptionProps = {
  node: {
    id: string;
    props: TextCaptionSchema;
  };

  selected?: boolean;

  onSelect?: (id: string) => void;

  onUpdate?: (id: string, props: Partial<TextCaptionSchema>) => void;
};

export function TextCaption({
  node,
  onUpdate,
  onSelect,
  selected,
}: TextCaptionProps) {
  const fontWeightOptions = node.spec.properties["font-weight"].enum;

  const textRules = node.spec.properties.text;

  return (
    <NodeFrame
      node={node}
      label={
        <span className="flex items-center gap-2">
          <Text />
          {node.type}: {node.props.text?.value}
        </span>
      }
      selected={selected}
      onClick={() => onSelect?.(node.id)}
    >
      <EditableText
        value={node.props.text.value}
        minLength={textRules.minLength}
        maxLength={textRules.maxLength}
        className="text-xl font-bold"
        onChange={(value) => onUpdate?.(node.id, { text: value })}
      />

      <Binder
        property={node.props.text}
        onUpdate={(value) => onUpdate?.(node.id, { text: value })}
      />
      {node.props?.visible && (
        <>
          <BooleanAtom
            label="Visible"
            value={node.props.visible.value}
            onChange={(v) => onUpdate?.(node.id, { visible: v })}
          />

          <Binder
            property={node.props.visible}
            onUpdate={(value) => onUpdate?.(node.id, { visible: value })}
          />
        </>
      )}
      {node.props?.strikethrough && (
        <>
          {/* Strikethrough */}
          <BooleanAtom
            label="Strikethrough"
            value={node.props.strikethrough.value}
            onChange={(v) => onUpdate?.(node.id, { strikethrough: v })}
          />

          <Binder
            property={node.props.strikethrough}
            onUpdate={(value) => onUpdate?.(node.id, { strikethrough: value })}
          />
        </>
      )}

      {node.props?.["font-weight"] && (
        <>
          {/* Font Weight */}
          <SelectAtom
            label="Font Weight"
            value={node.props["font-weight"].value}
            options={fontWeightOptions}
            onChange={(v) => onUpdate?.(node.id, { "font-weight": v })}
          />

          <Binder
            property={node.props["font-weight"]}
            onUpdate={(value) =>
              onUpdate?.(node.id, { ["font-weight"]: value })
            }
          />
        </>
      )}
    </NodeFrame>
  );
}
