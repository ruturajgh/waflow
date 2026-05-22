import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FormNodeRenderer } from "./Form";
import { TextBody } from "./TextBody";
import { TextCaption } from "./TextCaption";
import { TextHeading } from "./TextHeading";
import { TextSubheading } from "./TextSubheading";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Option } from "lucide-react";


export const componentRegistry: Record<string, React.ComponentType<any>> = {
  Form: FormNodeRenderer,
  TextHeading,
  TextSubheading,
  TextBody,
  TextCaption,
  // CheckboxGroup,
  // Footer,
};

type NodeFrameProps = {
  selected?: boolean;
  node: any,
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
              <Button variant="outline"><Option /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>

              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
