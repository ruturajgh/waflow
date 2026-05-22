import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FormNodeRenderer } from "./Form";
import { TextHeading } from "./TextHeading";

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  Form: FormNodeRenderer,
  TextHeading,
  // TextSubheading,
  // TextBody,
  // TextCaption,
  // CheckboxGroup,
  // Footer,
};

type NodeFrameProps = {
  selected?: boolean;
  label: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};

export function NodeFrame({
  label,
  selected,
  children,
  onClick,
}: NodeFrameProps) {
  return (
    <Accordion
      onClick={onClick}
      className={cn(
        "relative rounded-md border border-transparent  transition",
        "hover:bg-muted/50",
        selected && "ring-1  ring-primary",
      )}
      type="single"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className=" items-center gap-2 ">
          {label}
        </AccordionTrigger>
        <AccordionContent className="mx-3 h-full">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
