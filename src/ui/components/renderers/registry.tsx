import { useFlowEditor } from "@/ui/hooks/useFlowEditor";
import { useSubscribe } from "@/ui/hooks/useSubscribe";
import { TextHeading } from "./TextHeading";
import { NodeFrame } from "./NodeFrame";
import { TextSubheading } from "./TextSubheading";
import { TextBody } from "./TextBody";
import { TextCaption } from "./TextCaption";
import { Footer } from "./Footer";

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  TextHeading,
  TextSubheading,
  TextBody,
  TextCaption,
  Footer,
};

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
    <NodeFrame
      selected={selectedComponent === node.id}
      onClick={() => editor.selectComponent(node.id)}
    >
      <Renderer node={node} editor={editor} onUpdate={editor.updateNodeProps} />
    </NodeFrame>
  );
}
