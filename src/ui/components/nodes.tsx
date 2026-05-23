import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFlowEditor } from "../hooks/useFlowEditor";
import { useSubscribe } from "../hooks/useSubscribe";
import { AddNodeDropdown } from "./AddNodeDropdown";
import { BooleanAtom } from "./renderers/atoms/Boolean";
import { EditableText } from "./renderers/atoms/Text";
import { RenderNode } from "./renderers/RenderNode";

export const Nodes = (props: any) => {
  const editor = useFlowEditor();

  return (
    <div
      className="border rounded-md"
      style={{
        display: "flex",
        flexDirection: "column",

        flex: 1,

        minHeight: 0,
        minWidth: 0,

        overflow: "hidden",
      }}
    >
      <Tabs defaultValue="Nodes">
        <span className="flex justify-between p-3">
          <TabsList>
            <TabsTrigger value="Nodes">Nodes</TabsTrigger>
            <TabsTrigger value="Properties">Properties</TabsTrigger>
          </TabsList>

          <AddNodeDropdown onAdd={editor.addNode} />
        </span>

        <NodeList />

        {/* <ScreenProperties data={screen} setData={editor.updateNodeProps} /> */}
      </Tabs>
    </div>
  );
};

function NodeList() {
  const screen = useSubscribe((e) => e.state.nodes.get(e.selectedScreen));

  const children = screen?.childrenIds || [];

  return (
    <TabsContent value="Nodes" className="">
      {children.map((id: string) => (
        <RenderNode key={id} id={id} />
      ))}
    </TabsContent>
  );
}

const ScreenProperties = ({ data, setData }) => {
  return (
    <TabsContent value="Properties" className="  flex flex-col mx-2 ">
      <EditableText
        onChange={(value) =>
          setData(data.id, {
            title: value,
          })
        }
        value={data.props.title.value}
      />

      <BooleanAtom
        label={"Terminal"}
        value={data.props.terminal.value}
        onChange={(checked) =>
          setData(data.id, {
            terminal: checked,
          })
        }
      />

      <BooleanAtom
        label={"Success"}
        value={data.props?.success?.value}
        onChange={(checked) =>
          setData(data.id, {
            success: checked,
          })
        }
      />

      <BooleanAtom
        label={"Refresh On Back"}
        value={data.props?.refresh_on_back?.value}
        onChange={(checked) =>
          setData(data.id, {
            refresh_on_back: checked,
          })
        }
      />
    </TabsContent>
  );
};
