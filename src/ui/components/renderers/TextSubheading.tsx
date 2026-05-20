import { BooleanAtom } from "./atoms/Boolean";
import { EditableText } from "./atoms/Text";

type TextSubheadingSchema = {
  text: string;
  visible: boolean;
};

export type BaseNodeProps<T> = {
  node: {
    id: string;
    props: T;
  };

  selected?: boolean;

  onSelect?: (id: string) => void;

  onUpdate?: (id: string, props: Partial<T>) => void;
};

export function TextSubheading({
  node,
  selected,
  onSelect,
  onUpdate,
}: BaseNodeProps<TextSubheadingSchema>) {
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
