import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BooleanAtom } from "./atoms/Boolean";
import { EditableText } from "./atoms/Text";
import { Text } from "lucide-react";

interface TextHeadingNode {
  id: string;
  type: "TextHeading";
  props: {
    text: string;
    visible?: boolean;
  };
}

interface TextHeadingProps {
  node: TextHeadingNode;
  selected?: boolean;

  onSelect?: (id: string) => void;

  onUpdate?: (id: string, updates: Partial<TextHeadingNode["props"]>) => void;
}

export function TextHeading({ node, onUpdate }: TextHeadingProps) {
  if (node.props.visible === false) {
    return null;
  }
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className=" items-center gap-2">
          <Text /> {node.type + " " + node.props.text}
        </AccordionTrigger>
        <AccordionContent>
          <EditableText
            value={node.props.text}
            onChange={(v) => onUpdate?.(node.id, { text: v })}
            className="text-3xl font-bold outline-none"
          />
          {/* Settings */}
          <BooleanAtom
            label="Visible"
            value={node.props.visible}
            onChange={(v) => onUpdate?.(node.id, { visible: v })}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
