import { FormIcon } from "lucide-react";
import { NodeRenderer } from "../Render";
import { EditableText } from "./atoms/Text";

export function FormNodeRenderer({ node, onUpdate }: any) {
  const childrenIds = node.childrenIds || [];

  return (
    <div>
      {/* FORM HEADER (editable name) */}
      <div className="flex items-center gap-1">
        <FormIcon />
        <EditableText
          value={node.props.name.value}
          onChange={(v) => onUpdate?.(node.id, { name: v })}
          className="font-medium text-sm"
        />
      </div>

      {/* CHILDREN */}
      {childrenIds.map((id: string) => (
        <NodeRenderer key={id} id={id} />
      ))}
    </div>
  );
}
