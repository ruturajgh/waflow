import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import runtimeSchema from "@/core/schema/runtimeSchema";
import { cn } from "@/lib/utils";
import { BooleanAtom } from "./atoms/Boolean";
import { SelectAtom } from "./atoms/Select";
import { EditableText } from "./atoms/Text";

type TextBodySchema = {
  text: string;
  visible: boolean;
  "font-weight": "normal" | "medium" | "semibold" | "bold";
  strikethrough: boolean;
};

type TextBodyProps = {
  node: {
    id: string;
    props: TextBodySchema;
  };
  onUpdate?: (id: string, props: Partial<TextBodySchema>) => void;
};

const fontWeightMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function TextBody({ node, onUpdate }: TextBodyProps) {
  const fontWeightOptions =
    runtimeSchema[node.type].properties["font-weight"].enum;

  return (
    <div className="space-y-4">
      {/* Preview */}
      <EditableText
        value={node.props.text}
        onChange={(v) => onUpdate?.(node.id, { text: v })}
        fontClassName={fontWeightMap[node.props["font-weight"]]}
        strikethrough={node.props.strikethrough}
      />

      {/* Controls */}
      <div className="space-y-4 border-t pt-4">
        {/* Visible */}

        <BooleanAtom
          label="Visible"
          value={node.props.visible}
          onChange={(v) => onUpdate?.(node.id, { visible: v })}
        />

        {/* Strikethrough */}
        <BooleanAtom
          label="Strikethrough"
          value={node.props.strikethrough}
          onChange={(v) => onUpdate?.(node.id, { strikethrough: v })}
        />

        {/* Font Weight */}
        <SelectAtom
          label="Font Weight"
          value={node.props["font-weight"]}
          options={fontWeightOptions}
          onChange={(v) => onUpdate?.(node.id, { "font-weight": v })}
        />
      </div>
    </div>
  );
}
