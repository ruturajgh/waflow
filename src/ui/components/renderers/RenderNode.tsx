import { Text } from "lucide-react";
import { PropertyRenderer } from "./PropertyRenderer";
import { NodeFrame } from "./NodeFrame";
import { useSubscribe } from "@/ui/hooks/useSubscribe";

type GenericNodeProps = {
  id: string;
};

export function RenderNode({ id }: GenericNodeProps) {
  // const editor = useFlowEditor();

  const node = useSubscribe((editor) => editor.state.nodes.get(id));

  const selectedComponent = useSubscribe((editor) => editor.selectedComponent);

  if (!node) {
    return null;
  }

  const onSelect = () => {};
  const onUpdate = () => {};
  const children = node?.childrenIds || [];

  return (
    <NodeFrame
      node={node}
      selected={selectedComponent === id}
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
      {children.map((id: string) => (
        <RenderNode id={id} />
      ))}
    </NodeFrame>
  );
}
