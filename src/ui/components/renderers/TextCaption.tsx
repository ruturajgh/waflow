"use client"

import { cn } from "@/lib/utils" 

import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type TextCaptionSchema = {
  text: string
  visible: boolean
  "font-weight": "normal" | "medium" | "semibold" | "bold"
  strikethrough: boolean
}

type TextCaptionProps = {
  node: {
    id: string
    props: TextCaptionSchema
  }

  selected?: boolean

  onSelect?: (id: string) => void

  onUpdate?: (
    id: string,
    props: Partial<TextCaptionSchema>
  ) => void
}

const fontWeightMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

export function TextCaption({
  node,
  selected,
  onSelect,
  onUpdate,
}: TextCaptionProps) {
  return (
 
      <div className="space-y-4">
        {/* Preview */}
        <p
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onBlur={(e) => {
            onUpdate?.(node.id, {
              text: e.currentTarget.textContent || "",
            })
          }}
          className={cn(
            "text-sm text-muted-foreground outline-none",
            fontWeightMap[node.props["font-weight"]],
            node.props.strikethrough && "line-through"
          )}
        >
          {node.props.text}
        </p>

        {/* Controls */}
        <div className="space-y-4 border-t pt-4">
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

          {/* Strikethrough */}
          <div className="flex items-center justify-between">
            <Label>Strikethrough</Label>

            <Switch
              checked={node.props.strikethrough}
              onCheckedChange={(checked) => {
                onUpdate?.(node.id, {
                  strikethrough: checked,
                })
              }}
            />
          </div>

          {/* Font Weight */}
          <div className="space-y-2">
            <Label>Font Weight</Label>

            <Select
              value={node.props["font-weight"]}
              onValueChange={(value) => {
                onUpdate?.(node.id, {
                  "font-weight":
                    value as TextCaptionSchema["font-weight"],
                })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="normal">
                  Normal
                </SelectItem>

                <SelectItem value="medium">
                  Medium
                </SelectItem>

                <SelectItem value="semibold">
                  Semibold
                </SelectItem>

                <SelectItem value="bold">
                  Bold
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div> 
  )
}