"use client"
 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

type FooterSchema = {
  label: string

  visible: boolean
  enabled: boolean

  "left-caption": string
  "center-caption": string
  "right-caption": string
}

type FooterProps = {
  node: {
    id: string
    props: FooterSchema
  }

  selected?: boolean

  onSelect?: (id: string) => void

  onUpdate?: (
    id: string,
    props: Partial<FooterSchema>
  ) => void
}

export function Footer({
  node,
  selected,
  onSelect,
  onUpdate,
}: FooterProps) {
  return (
 
      <div className="space-y-4">
        {/* Preview */}
        <div className="space-y-3">
          <Button
            className="w-full"
            disabled={!node.props.enabled}
          >
            {node.props.label}
          </Button>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{node.props["left-caption"]}</span>

            <span>{node.props["center-caption"]}</span>

            <span>{node.props["right-caption"]}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4 border-t pt-4">
          {/* Label */}
          <div className="space-y-2">
            <Label>Button Label</Label>

            <Input
              value={node.props.label}
              onChange={(e) => {
                onUpdate?.(node.id, {
                  label: e.target.value,
                })
              }}
            />
          </div>

          {/* Left Caption */}
          <div className="space-y-2">
            <Label>Left Caption</Label>

            <Input
              value={node.props["left-caption"]}
              onChange={(e) => {
                onUpdate?.(node.id, {
                  "left-caption": e.target.value,
                })
              }}
            />
          </div>

          {/* Center Caption */}
          <div className="space-y-2">
            <Label>Center Caption</Label>

            <Input
              value={node.props["center-caption"]}
              onChange={(e) => {
                onUpdate?.(node.id, {
                  "center-caption": e.target.value,
                })
              }}
            />
          </div>

          {/* Right Caption */}
          <div className="space-y-2">
            <Label>Right Caption</Label>

            <Input
              value={node.props["right-caption"]}
              onChange={(e) => {
                onUpdate?.(node.id, {
                  "right-caption": e.target.value,
                })
              }}
            />
          </div>

          {/* Visible */}
          <div className="flex items-center justify-between">
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

          {/* Enabled */}
          <div className="flex items-center justify-between">
            <Label>Enabled</Label>

            <Switch
              checked={node.props.enabled}
              onCheckedChange={(checked) => {
                onUpdate?.(node.id, {
                  enabled: checked,
                })
              }}
            />
          </div>
        </div>
      </div>
 
  )
}