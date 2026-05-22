import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFlowEditor } from "../hooks/useFlowEditor";
import { useSubscribe } from "../hooks/useSubscribe";
import { AddNodeDropdown } from "./AddNodeDropdown";
import { BooleanAtom } from "./renderers/atoms/Boolean";
import { EditableText } from "./renderers/atoms/Text";
import { NodeRenderer } from "./Render";

export const Nodes = (props: any) => {
  const editor = useFlowEditor();

  const screen = useSubscribe((e) => e.state.nodes.get(e.selectedScreen));

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

        <NodeList screenLayoutId={screen?.childrenIds?.[0]} />

        <ScreenProperties data={screen} setData={editor.updateNodeProps} />
      </Tabs>
    </div>
  );
};

function NodeList({ screenLayoutId }: any) {
  const layout = useSubscribe((editor) =>
    editor.state.nodes.get(screenLayoutId),
  );

  const componentIds = layout?.childrenIds || [];

  return (
    <TabsContent value="Nodes" className="">
      {componentIds.map((id: string) => (
        <NodeRenderer key={id} id={id} />
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
        value={data.props.title}
      />

      <BooleanAtom
        label={"Terminal"}
        value={data.props.terminal}
        onChange={(checked) =>
          setData(data.id, {
            terminal: checked,
          })
        }
      />

      <BooleanAtom
        label={"Success"}
        value={data.props.success}
        onChange={(checked) =>
          setData(data.id, {
            success: checked,
          })
        }
      />

      <BooleanAtom
        label={"Refresh On Back"}
        value={data.props.refresh_on_back}
        onChange={(checked) =>
          setData(data.id, {
            refresh_on_back: checked,
          })
        }
      />
    </TabsContent>
  );
};
