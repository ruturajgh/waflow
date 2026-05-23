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
  const nodeMeta = node.spec["x-element-meta"];

  const collapsible = nodeMeta?.collapsible ?? true;

  return (
    <div className="relative">
      {collapsible ? (
        <AccordionWrap
          label={label}
          node={node}
          selected={selected}
          onClick={onClick}
        >
          {children}
        </AccordionWrap>
      ) : (
        <>
          <div
            onClick={onClick}
            className={cn(
              "rounded-md px-2 py-1.5 transition-colors",
              "hover:bg-muted/50",
              selected && "bg-muted",
            )}
          >
            {label}
          </div>

          <TreeChildren>{children}</TreeChildren>
        </>
      )}
    </div>
  );
}

function TreeChildren({ children }: { children: React.ReactNode }) {
  if (!children) {
    return null;
  }

  return (
    <div className="ml-4 border-l-2 pl-2">
      <div className="space-y-1 py-1">{children}</div>
    </div>
  );
}

function AccordionWrap({ label, selected, onClick, children, node }) {
  return (
    <Accordion
      onClick={onClick}
      className={cn(
        "relative rounded-md border border-transparent  transition",
        "hover:bg-muted/50",
        selected && "ring-1  ring-primary",
      )}
      type="multiple"
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
