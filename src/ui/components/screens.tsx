import { Button } from "@/components/ui/button";
import { PlusCircle, Redo, Undo } from "lucide-react";
import { useFlowEditor } from "../hooks/useFlowEditor";
import { useSubscribe } from "../hooks/useSubscribe";

export const Screens = (props: any) => {
  const screenIds = useSubscribe((editor) => {
    const root = editor.state.nodes.get(editor.state.rootId);
    return root.childrenIds;
  });

  const selectScreen = useFlowEditor().selectScreen;

  const onClick = (id: string) => {
    selectScreen(id);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",

        // CRITICAL
        minHeight: 0,
        minWidth: 0,

        overflow: "hidden",
      }}
      className="space-y-2"
    >
      <AddScreenButton />

      {/* scroll area */}
      <div
        className="gap-2"
        style={{
          flex: 1,

          // CRITICAL
          minHeight: 0,

          overflowY: "auto",
          overflowX: "hidden",

          display: "flex",
          flexDirection: "column",
        }}
      >
        {screenIds.map((id) => (
          <Screen key={id} id={id} onClick={onClick} />
        ))}
      </div>
    </div>
  );
};

function Screen({ id, onClick }: any) {
  const selectedScreenId = useSubscribe((editor) => editor.selectedScreen);

  const screen = useSubscribe((editor) => editor.state.nodes.get(id));

  const isSelected = selectedScreenId === id;

  return (
    <div
      className={`${isSelected ? "border-black border-2" : "none"} bg-gray-300  rounded-md`}
      onClick={() => onClick(id)}
    >
      {screen.props.title}
    </div>
  );
}

export const AddScreenButton = (props: any) => {
  const editor = useFlowEditor();

  return (
    <div className="flex flex-row justify-end gap-1 ">
      <Button size={"icon-sm"} title="undo" onClick={() => editor.undo()}>
        <Undo />
      </Button>
      <Button size={"icon-sm"} title="Redo" onClick={() => editor.redo()}>
        <Redo />{" "}
      </Button>
      <Button
        size={"icon-sm"}
        title="Add Screen"
        onClick={() => editor.addScreen()}
      >
        <PlusCircle />{" "}
      </Button>
    </div>
  );
};
