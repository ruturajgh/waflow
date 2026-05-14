import { useFlowEditor } from "../hooks/useFlowEditor";
import { useSubscribe } from "../hooks/useSubscribe";

export const Nodes = (props: any) => {
  const selectedScreenId = useSubscribe(editor => editor.selectedScreen)
  const screen = useSubscribe(editor => editor.state.nodes.get(selectedScreenId))
  const editor = useFlowEditor()
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
        <ScreenForm data={screen} setData={editor.updateNodeProps}></ScreenForm>
      </div>
    </div>
  );
};

const ScreenForm = ({ data, setData }) => {
  return (
    <div className="space-y-4 flex border-2">
      <input
        type="text"
        defaultValue={data.props.title}
        onChange={(e) =>
          setData(
            data.id,
            {
              ...data.props,
              title: e.target.value,
            })
        }
        placeholder="Title"
        className="border p-2 rounded w-full"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.props.terminal}
          onChange={(e) =>
            setData(
              data.id, {
              ...data.props,
              terminal: e.target.checked,
            })
          }
        />
        Terminal
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.props.success}
          onChange={(e) =>
            setData(
              data.id, {
              ...data.props,
              success: e.target.checked,
            })
          }
        />
        Success
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={data.props.refresh_on_back}
          onChange={(e) =>
            setData(
              data.id,
              {
                ...data.props,
                refresh_on_back: e.target.checked,
              }
            )
          }
        />
        Refresh On Back
      </label>
    </div>
  );
};

export const AddNode = (props: any) => {
  return <div></div>;
};
