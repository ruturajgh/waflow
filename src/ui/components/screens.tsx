import { useFlowEditor } from "../hooks/useFlowEditor";
import { useSubscribe } from "../hooks/useSubscribe";

export const Screens = (props: any) => {
  const screenIds = useSubscribe((editor) => {
    const root = editor.state.nodes.get(editor.state.rootId);

    return root.childrenIds;
  });

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
        screens layer for whatsapp flows
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
        {screenIds.map((id) => (
          <Screen key={id} id={id}>
            {id}
          </Screen>
        ))}
        <AddScreen></AddScreen>
      </div>
    </div>
  );
};

function Screen(props) {
  const selectedScreenId = useSubscribe((editor) => editor.selectedScreen);

  const screen = useSubscribe((editor) => editor.state.nodes.get(props.id));

  const selectScreen = useFlowEditor().selectScreen;

  return (
    <div
      style={{
        border: selectedScreenId === props.id ? "2px solid white" : "none",
      }}
      onClick={() => selectScreen(props.id)}
    >
      {screen.props.title}
    </div>
  );
}

export const AddScreen = (props: any) => {
  const editor = useFlowEditor();

  return (
    <div>
      {" "}
      <button onClick={() => editor.undo()}>undo screen butotn </button>
      <button onClick={() => editor.redo()}>redo screen butotn </button>
      <button onClick={() => editor.addScreen()}>add screen butotn </button>
    </div>
  );
};

export const ScreenSelector = (props: any) => {
  return <div></div>;
};
