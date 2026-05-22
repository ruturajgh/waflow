import { useFlowEditor } from "@/ui/hooks/useFlowEditor";
import { useSubscribe } from "@/ui/hooks/useSubscribe";
import { cn } from "@/lib/utils";
import { componentRegistry } from "./renderers/registry";

interface Props {
  id: string;
}
type NodeFrameProps = {
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export function NodeFrame({ selected, children, onClick }: NodeFrameProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-md border border-transparent mx-2 p-2  transition",
        "hover:bg-muted/50",
        selected && "ring-1  ring-primary",
      )}
    >
      {children}
    </div>
  );
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
    <NodeFrame
      selected={selectedComponent === node.id}
      onClick={() => editor.selectComponent(node.id)}
    >
      <Renderer node={node} editor={editor} onUpdate={editor.updateNodeProps} />
    </NodeFrame>
  );
}
