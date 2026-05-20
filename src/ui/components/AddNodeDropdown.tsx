import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import runtimeSchema from "@/core/schema/runtimeSchema";
import { useMemo } from "react";

export type UIItem = {
  id: string;
  label: string;
  type?: string;
  children?: UIItem[];
};

type Props = {
  items: any[];
  onSelect: (type: string) => void;
  renderItem: (item: any, depth: number) => React.ReactNode;
  depth?: number;
};

export function buildComponentTree(schema: any) {
  const groups: Record<string, any> = {};

  for (const [key, value] of Object.entries(schema)) {
    const meta = (value as any)["x-element-meta"];

    if (!meta) continue;

    const groupKey = meta.group || "misc";
    const groupLabel = meta["group-label"] || groupKey;

    if (!groups[groupKey]) {
      groups[groupKey] = {
        id: groupKey,
        label: groupLabel,
        children: [],
      };
    }

    groups[groupKey].children.push({
      id: key,
      label: meta.label,
      type: meta.name,
    });
  }

  return Object.values(groups); // 👈 IMPORTANT FIX
}

export function NodeMenu({ items, onSelect, renderItem, depth = 0 }: Props) {
  return <>{items.map((item) => renderItem(item, depth))}</>;
}

export function ShadcnNodeMenu({ items, onSelect }: any) {
  return (
    <NodeMenu
      items={items}
      onSelect={onSelect}
      renderItem={(item) => {
        const hasChildren = item.children?.length;

        if (hasChildren) {
          return (
            <DropdownMenuSub key={item.id}>
              <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>

              <DropdownMenuSubContent>
                <ShadcnNodeMenu items={item.children} onSelect={onSelect} />
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          );
        }

        return (
          <DropdownMenuItem key={item.id} onClick={() => onSelect(item.type)}>
            {item.label}
          </DropdownMenuItem>
        );
      }}
    />
  );
}
export function AddNodeDropdown({ onAdd }: any) {
  const items = useMemo(() => buildComponentTree(runtimeSchema), []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          + Add
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-32" align="end">
        <ShadcnNodeMenu items={items} onSelect={onAdd} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
