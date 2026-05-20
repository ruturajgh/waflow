import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { EditableText } from "./atoms/Text";
import { BooleanAtom } from "./atoms/Boolean";

interface TextHeadingNode {
  id: string;
  type: "TextHeading";
  props: {
    text: string;
    visible?: boolean;
  };
}

interface TextHeadingProps {
  node: TextHeadingNode;
  selected?: boolean;

  onSelect?: (id: string) => void;

  onUpdate?: (id: string, updates: Partial<TextHeadingNode["props"]>) => void;
}

export function TextHeading({
  node,
  selected,
  onSelect,
  onUpdate,
}: TextHeadingProps) {
  if (node.props.visible === false) {
    return null;
  }
  return (
    <div
      onClick={() => onSelect?.(node.id)}
      className={`
        relative rounded-md p-2 transition
        ${selected ? "ring-2 ring-primary" : ""}
        hover:bg-muted/50
      `}
    >
      <EditableText
        value={node.props.text}
        onChange={(v) => onUpdate?.(node.id, { text: v })}
        className="text-3xl font-bold outline-none"
      />
      {/* Settings */}
      <div className="border-t pt-3">
        <BooleanAtom
          label="Visible"
          value={node.props.visible}
          onChange={(v) => onUpdate?.(node.id, { visible: v })}
        />
      </div>
    </div>
  );
}
