import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Form } from "lucide-react";
import { EditableText } from "./atoms/Text";
import { BooleanAtom } from "./atoms/Boolean";
import { InputAtom } from "./atoms/Input";
import { TextareaAtom } from "./atoms/Textarea";

export function CheckboxGroup({ node, onUpdate }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger className=" items-center gap-2">
                    <Form /> {node.type}

                    <EditableText
                        value={node.props.name}
                        onChange={(v) => onUpdate?.(node.id, { name: v })}
                    />
                </AccordionTrigger>
                <AccordionContent className="overflow-visible space-y-2 !h-auto !transition-none">

                    <InputAtom
                        label="Label"
                        value={node.props.label}
                        onChange={(v) => onUpdate?.(node.id, { label: v })}
                    />

                    <CheckboxDataSourceEditor node={node} onUpdate={onUpdate} />

                    <TextareaAtom
                        label="Description"
                        value={node.props.description}
                        onChange={(v) => onUpdate?.(node.id, { description: v })}
                    />

                    <BooleanAtom
                        label="Enabled"
                        value={node.props.enabled}
                        onChange={(v) => onUpdate?.(node.id, { enabled: v })}
                    />

                    <BooleanAtom
                        label="visible"
                        value={node.props.visible}
                        onChange={(v) => onUpdate?.(node.id, { visible: v })}
                    />

                    <BooleanAtom
                        label="Required"
                        value={node.props.required}
                        onChange={(v) => onUpdate?.(node.id, { required: v })}
                    />

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type DataSourceItem = {
    id: string;
    title: string;
    description?: string;
    metadata?: string;
    enabled: boolean;
    image?: string; // base64
    "alt-text"?: string;
    color?: string; // hex
};

function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
}

export function CheckboxDataSourceEditor({ node, onUpdate }: any) { 
  
    const items: DataSourceItem[] = node.props["data-source"] || [];

    const updateItem = (index: number, patch: Partial<DataSourceItem>) => {
        const next = [...items];
        next[index] = { ...next[index], ...patch };
        onUpdate(node.id, { "data-source": next });
    };

    const addItem = () => {
        onUpdate(node.id, {
            "data-source": [
                ...items,
                {
                    id: crypto.randomUUID(),
                    title: "",
                    enabled: true,
                },
            ],
        });
    };

    const removeItem = (index: number) => {
        onUpdate(node.id, {
            "data-source": items.filter((_, i) => i !== index),
        });
    };

    return (
        <div className="space-y-3 border-t pt-3">
            <div className="flex justify-between items-center">
                <Label>Data Source</Label>

                <Button size="sm" onClick={addItem}>
                    Add
                </Button>
            </div>

            {items.map((item, index) => (
                <div key={item.id} className="border rounded-md p-3 space-y-3">

                    {/* Title */}
                    <div className="space-y-1">
                        <Label>Title</Label>
                        <Input
                            value={item.title}
                            onChange={(e) =>
                                updateItem(index, { title: e.target.value })
                            }
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <Label>Description</Label>
                        <Input
                            value={item.description || ""}
                            onChange={(e) =>
                                updateItem(index, { description: e.target.value })
                            }
                        />
                    </div>

                    {/* IMAGE (base64 upload) */}
                    <div className="space-y-1">
                        <Label>Image</Label>

                        {item.image && (
                            <img
                                src={item.image}
                                alt={item["alt-text"] || "preview"}
                                className="h-16 w-16 object-cover rounded"
                            />
                        )}

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                const base64 = await toBase64(file);

                                updateItem(index, {
                                    image: base64,
                                });
                            }}
                        />
                    </div>

                    {/* ALT TEXT */}
                    <div className="space-y-1">
                        <Label>Alt Text</Label>
                        <Input
                            value={item["alt-text"] || ""}
                            onChange={(e) =>
                                updateItem(index, {
                                    "alt-text": e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* COLOR */}
                    <div className="space-y-1">
                        <Label>Color</Label>

                        <input
                            type="color"
                            value={item.color || "#000000"}
                            onChange={(e) =>
                                updateItem(index, { color: e.target.value })
                            }
                            className="w-10 h-10"
                        />
                    </div>

                    {/* ENABLED */}
                    <div className="flex justify-between items-center">
                        <Label>Enabled</Label>
                        <Switch
                            checked={item.enabled}
                            onCheckedChange={(v) =>
                                updateItem(index, { enabled: v })
                            }
                        />
                    </div>

                    {/* REMOVE */}
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeItem(index)}
                    >
                        Remove
                    </Button>
                </div>
            ))}
        </div>
    );
}