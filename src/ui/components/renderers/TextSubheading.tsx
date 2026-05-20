import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type TextSubheadingSchema = {
  text: string
  visible: boolean
}

export type BaseNodeProps<T> = {
  node: {
    id: string
    props: T
  }

  selected?: boolean

  onSelect?: (id: string) => void

  onUpdate?: (
    id: string,
    props: Partial<T>
  ) => void
}

export function TextSubheading({
  node,
  selected,
  onSelect,
  onUpdate,
}: BaseNodeProps<TextSubheadingSchema>) {
  return (
 
      <div className="space-y-4">
        <h3
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onBlur={(e) => {
            onUpdate?.(node.id, {
              text: e.currentTarget.textContent || "",
            })
          }}
          className="text-xl font-semibold   outline-none"
        >
          {node.props.text}
        </h3>

        <div className="flex items-center justify-between border-t pt-3">
          <Label>Visible</Label>

          <Switch
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