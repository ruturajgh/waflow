import { createContext, useRef } from "react";
import { Editor } from "../core";
import { useFlowEditor } from "./hooks/useFlowEditor";

export const FlowEditorContext = createContext<any>(null);

const Root = (props: any) => {
  const editorRef = useRef<any>(null);

  if (!editorRef.current) {
    editorRef.current = new Editor({
      version: "7.3",
      screens: [
        {
          id: "DEMO_SCREEN",
          title: "Demo Screen",
          terminal: true,
          layout: {
            type: "SingleColumnLayout",
            children: [
              {
                type: "TextHeading",
                text: "This is a heading one",
                visible: true,
              },
              {
                type: "TextSubheading",
                text: "This is a subheading",
                visible: true,
              },
              {
                type: "TextBody",
                text: "This is body text",
              },
              {
                type: "TextCaption",
                text: "This is a text caption",
              },
              {
                type: "Footer",
                label: "Continue",
                "on-click-action": {
                  name: "complete",
                  payload: {},
                },
              },
            ],
          },
        },
      ],
    });
  }
  console.log(editorRef);
  return (
    <FlowEditorContext.Provider value={editorRef.current}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          flex: 1,
          minHeight: 0,

          width: "100%",

          border: "2px solid",
          borderRadius: "13px",

          overflow: "hidden",
          padding: "13px",
        }}
      >
        Root layer for whatsapp flows
        {props.children}
      </div>
    </FlowEditorContext.Provider>
  );
};

const Preview = (props: any) => {
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
        Components layer for whatsapp flows
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
      </div>
    </div>
  );
};

const Screens = (props: any) => {
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
        Components layer for whatsapp flows
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
        <AddScreen></AddScreen>
      </div>
    </div>
  );
};
const ScreenSelector = (props: any) => {
  return <div></div>;
};

const AddScreen = (props: any) => {
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

const AddComponent = (props: any) => {
  return <div></div>;
};

const Components = (props: any) => {
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
        Components layer for whatsapp flows
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
      </div>
    </div>
  );
};

type SectionProps = {
  children?: React.ReactNode;

  direction?: "row" | "column";
  gap?: number | string;

  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];

  wrap?: React.CSSProperties["flexWrap"];

  style?: React.CSSProperties;
};

const Section = ({
  children,

  direction = "column",
  gap = 12,

  align = "stretch",
  justify = "flex-start",

  wrap = "nowrap",

  style,
}: SectionProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        gap,

        alignItems: align,
        justifyContent: justify,

        flexWrap: wrap,

        // KEY
        flex: 1,

        // KEY
        minHeight: 0,
        minWidth: 0,

        width: "100%",

        boxSizing: "border-box",

        overflow: "hidden",

        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const FlowEditor = {
  Root,
  Screens,
  Components,
  Preview,
  Section,
};
