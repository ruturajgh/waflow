import { Input } from "@/components/ui/input";
import { useFlowEditor } from "../hooks/useFlowEditor";
import { useSubscribe } from "../hooks/useSubscribe";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { NodeRenderer } from "./renderers/registry";

export const Nodes = (props: any) => {
  const selectedScreenId = useSubscribe((editor) => editor.selectedScreen);
  const screen = useSubscribe((editor) =>
    editor.state.nodes.get(selectedScreenId),
  );
  const editor = useFlowEditor();

  const nodes = useSubscribe((editor) => editor.state.nodes);

  const layout = nodes.get(screen?.childrenIds?.[0]);

  const componentIds = layout?.childrenIds || [];

  console.log(nodes);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        flex: 1,

        // CRITICAL
        minHeight: 0,
        minWidth: 0,

        border: "2px solid",
        borderRadius: "13px",

        overflow: "hidden",
      }}
    >
      {/* fixed header */}
      <div
        style={{
          padding: "13px",
          borderBottom: "1px solid #ddd",
          flexShrink: 0,
        }}
      >
        Nodes layer for whatsapp flows
        <Button onClick={() => editor.addNode()}>
          Add <PlusCircle />
        </Button>
      </div>

      {/* scroll area */}
      <div
        style={{
          flex: 1,

          // CRITICAL
          minHeight: 0,

          overflowY: "auto",
          overflowX: "hidden",

          padding: "13px",

          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {props.children}
        <Tabs defaultValue="Nodes" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="Nodes">Nodes</TabsTrigger>
            <TabsTrigger value="Properties">Properties</TabsTrigger>
          </TabsList>
          <TabsContent value="Nodes">
            <div className="space-y-4">
              {componentIds.map((id: string) => (
                <NodeRenderer key={id} id={id} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="Properties">
            {" "}
            <ScreenForm
              data={screen}
              setData={editor.updateNodeProps}
            ></ScreenForm>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ScreenForm = ({ data, setData }) => {
  return (
    <div className="  flex flex-col  ">
      <Input
        type="text"
        defaultValue={data.props.title}
        onChange={(e) =>
          setData(data.id, {
            ...data.props,
            title: e.target.value,
          })
        }
        placeholder="Title"
      />

      <Label className="flex items-center gap-2">
        <Input
          type="checkbox"
          className="w-min"
          checked={data.props.terminal}
          onChange={(e) =>
            setData(data.id, {
              ...data.props,
              terminal: e.target.checked,
            })
          }
        />
        Terminal
      </Label>

      <Label className="flex items-center gap-2">
        <Input
          className="w-min"
          type="checkbox"
          checked={data.props.success}
          onChange={(e) =>
            setData(data.id, {
              ...data.props,
              success: e.target.checked,
            })
          }
        />
        Success
      </Label>

      <Label className="flex items-center gap-2">
        <Input
          type="checkbox"
          className="w-min"
          checked={data.props.refresh_on_back}
          onChange={(e) =>
            setData(data.id, {
              ...data.props,
              refresh_on_back: e.target.checked,
            })
          }
        />
        Refresh On Back
      </Label>
    </div>
  );
};
