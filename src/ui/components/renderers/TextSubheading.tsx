import { Text } from "lucide-react";
import { Binder } from "./atoms/Binder";
import { BooleanAtom } from "./atoms/Boolean";
import { EditableText } from "./atoms/Text";
import { NodeFrame } from "./registry";

export type BaseNodeProps = {
  node: any;

  selected?: boolean;

  onSelect?: (id: string) => void;

  onUpdate?: (id: string, props: Partial<T>) => void;
};

export function TextSubheading({
  node,
  selected,
  onSelect,
  onUpdate,
}: BaseNodeProps) {
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

      <BooleanAtom
        label="Visible"
        value={node.props.visible.value}
        onChange={(v) => onUpdate?.(node.id, { visible: v })}
      />

      <Binder
        property={node.props.visible}
        onUpdate={(value) => onUpdate?.(node.id, { visible: value })}
      />
    </NodeFrame>
  );
}
