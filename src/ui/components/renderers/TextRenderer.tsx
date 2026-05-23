import { Text } from "lucide-react";
import { PropertyRenderer } from "./PropertyRenderer";
import { NodeFrame } from "./registry";
 
type GenericNodeProps = {
  node: any;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onUpdate?: (id: string, props: Record<string, any>) => void;
};

export function TextNode({
  node,
  selected,
  onSelect,
  onUpdate,
}: GenericNodeProps) {
  return (
    <NodeFrame
      node={node}
      selected={selected}
      onClick={() => onSelect?.(node.id)}
      label={
        <span className="flex items-center gap-2">
          <Text />
          {node.type}: {node.props.text?.value}
        </span>
      }
    >
      {Object.entries(node.spec.properties).map(([key, schema]: any) => (
        <PropertyRenderer
          key={key}
          propertyKey={key}
          property={node.props[key]}
          schema={schema}
          onChange={(value) =>
            onUpdate?.(node.id, {
              [key]: value,
            })
          }
        />
      ))}
    </NodeFrame>
  );
}