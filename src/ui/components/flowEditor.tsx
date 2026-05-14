import { createContext, useRef } from "react";

export const FlowEditorContext = createContext<any>(null);

export const Root = (props: any) => {
  const editorRef = useRef<any>(null);

  if (!editorRef.current) {
    editorRef.current = props.flowData;
  }

  return (
    <FlowEditorContext.Provider value={editorRef.current}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",

          flex: 1,
          minHeight: 0,

          width: "100%",
 
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
