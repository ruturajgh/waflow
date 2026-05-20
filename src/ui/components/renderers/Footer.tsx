import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Text } from "lucide-react";
import { BooleanAtom } from "./atoms/Boolean";
import { InputAtom } from "./atoms/Input";

export function Footer({ node, onUpdate }: any) {
 
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className=" items-center gap-2">
          <Text /> {node.type + " " + node.props.label}
        </AccordionTrigger>
        <AccordionContent>
          <FooterPreview props={node.props} />

          <InputAtom
            label="Button Label"
            value={node.props.label}
            onChange={(v) => onUpdate?.(node.id, { label: v })}
          />

          <InputAtom
            label="Left Caption"
            value={node.props["left-caption"]}
            onChange={(v) => onUpdate?.(node.id, { "left-caption": v })}
          />

          <InputAtom
            label="Center Caption"
            value={node.props["center-caption"]}
            onChange={(v) => onUpdate?.(node.id, { "center-caption": v })}
          />

          <InputAtom
            label="Right Caption"
            value={node.props["right-caption"]}
            onChange={(v) => onUpdate?.(node.id, { "right-caption": v })}
          />

          <BooleanAtom
            label="Visible"
            value={node.props.visible}
            onChange={(v) => onUpdate?.(node.id, { visible: v })}
          />

          <BooleanAtom
            label="Enabled"
            value={node.props.enabled}
            onChange={(v) => onUpdate?.(node.id, { enabled: v })}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function FooterPreview({ props }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{props["left-caption"]}</span>
        <span>{props["center-caption"]}</span>
        <span>{props["right-caption"]}</span>
      </div>

      <Button disabled={!props.enabled} className="w-full">
        {props.label}
      </Button>
    </div>
  );
}
