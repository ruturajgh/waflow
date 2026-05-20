import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface TextHeadingNode {
  id: string
  type: "TextHeading"
  props: {
    text: string
    visible?: boolean
  }
}

interface TextHeadingProps {
  node: TextHeadingNode
  selected?: boolean

  onSelect?: (id: string) => void

  onUpdate?: (
    id: string,
    updates: Partial<TextHeadingNode["props"]>
  ) => void
}

export function TextHeading({
  node,
  selected,
  onSelect,
  onUpdate,
}: TextHeadingProps) {
  if (node.props.visible === false) {
    return null
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
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => { 
          console.log(e, onUpdate)
          onUpdate?.(node.id, {
            text: e.currentTarget.textContent || "",
          })
        }}
        className="text-3xl font-bold outline-none"
      >
        {node.props.text}
      </div>
         {/* Settings */}
      <div className="flex items-center justify-between border-t pt-3">
        <Label htmlFor={`visible-${node.id}`}>
          Visible
        </Label>

        <Switch
          id={`visible-${node.id}`}
          checked={node.props.visible}
          onCheckedChange={(checked) => {
            onUpdate?.(node.id, {
              visible: checked,
            })
          }}
        />
      </div>
    </div>
  )
}
