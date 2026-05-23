import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Option } from "lucide-react";
import { PropertyTable } from "../PropertyTable";
import { FormNodeRenderer } from "./Form";
import { TextNode } from "./TextRenderer";

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  Form: FormNodeRenderer,
  TextHeading: TextNode,
  TextSubheading: TextNode,
  TextBody: TextNode,
  TextCaption: TextNode,
  // CheckboxGroup,
  // Footer,
};

type NodeFrameProps = {
  selected?: boolean;
  node: any;
  label: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};

export function NodeFrame({
  label,
  node,
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
        <AccordionContent className="mx-3 h-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Option />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuGroup className="m-2">
                <PropertyTable node={node} />
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
