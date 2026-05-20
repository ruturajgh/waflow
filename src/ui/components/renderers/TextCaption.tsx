import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import runtimeSchema from "@/core/schema/runtimeSchema";
import { Text } from "lucide-react";
import { BooleanAtom } from "./atoms/Boolean";
import { SelectAtom } from "./atoms/Select";
import { EditableText } from "./atoms/Text";

type TextCaptionSchema = {
  text: string;
  visible: boolean;
  "font-weight": "normal" | "medium" | "semibold" | "bold";
  strikethrough: boolean;
};

type TextCaptionProps = {
  node: {
    id: string;
    props: TextCaptionSchema;
  };

  selected?: boolean;

  onSelect?: (id: string) => void;

  onUpdate?: (id: string, props: Partial<TextCaptionSchema>) => void;
};

const fontWeightMap = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

export function TextCaption({ node, onUpdate }: TextCaptionProps) {
  const fontWeightOptions =
    runtimeSchema[node.type].properties["font-weight"].enum;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className=" items-center gap-2">
          <Text /> {node.type + " " + node.props.text}
        </AccordionTrigger>
        <AccordionContent>
          {/* Preview */}
          <EditableText
            value={node.props.text}
            onChange={(v) => onUpdate?.(node.id, { text: v })}
            fontClassName={fontWeightMap[node.props["font-weight"]]}
            strikethrough={node.props.strikethrough}
          />

          {/* Controls */}
          <div className="space-y-4 border-t pt-4">
            {/* Visible */}

            <BooleanAtom
              label="Visible"
              value={node.props.visible}
              onChange={(v) => onUpdate?.(node.id, { visible: v })}
            />

            {/* Strikethrough */}
            <BooleanAtom
              label="Strikethrough"
              value={node.props.strikethrough}
              onChange={(v) => onUpdate?.(node.id, { strikethrough: v })}
            />

            {/* Font Weight */}
            <SelectAtom
              label="Font Weight"
              value={node.props["font-weight"]}
              options={fontWeightOptions}
              onChange={(v) => onUpdate?.(node.id, { "font-weight": v })}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
