import { useFlowEditor } from "@/ui/hooks/useFlowEditor";
import { useSubscribe } from "@/ui/hooks/useSubscribe";
import { componentRegistry } from "./renderers/registry";

interface Props {
  id: string;
}

export function NodeRenderer({ id }: Props) {
  const editor = useFlowEditor();

  const node = useSubscribe((editor) => editor.state.nodes.get(id));

  const selectedComponent = useSubscribe((editor) => editor.selectedComponent);

  if (!node) {
    return null;
  }
  const Renderer = componentRegistry[node.type];

  if (!Renderer) {
    return (
      <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
        Unsupported component: {node.type}
      </div>
    );
  }
  return (
    <Renderer
      node={node}
      selected={selectedComponent === node.id}
      onSelect={() => editor.selectComponent(node.id)}
      onUpdate={editor.updateNodeProps}
    /> 
  );
}
