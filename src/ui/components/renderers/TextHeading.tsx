import { Text } from "lucide-react";
import { Binder } from "./atoms/Binder";
import { BooleanAtom } from "./atoms/Boolean";
import { EditableText } from "./atoms/Text";
import { NodeFrame } from "./registry";

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
  const textRules = node.spec.properties.text; 
  console.log(node)
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
        className="text-3xl font-bold"
        onChange={(value) => onUpdate?.(node.id, { text: value })}
      />

      <Binder
        property={node.props.text}
        onUpdate={(value) => onUpdate?.(node.id, { text: value })}
      />

      {node.props?.visible && <>
        <BooleanAtom
          label="Visible"
          value={node.props.visible.value}
          onChange={(v) => onUpdate?.(node.id, { visible: v })}
        />

        <Binder
          property={node.props.visible}
          onUpdate={(value) => onUpdate?.(node.id, { visible: value })}
        /></>}
    </NodeFrame>
  );
}
