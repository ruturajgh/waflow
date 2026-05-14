import { useContext } from "react";
import { FlowEditorContext } from "../FlowEditor";

export const useFlowEditor = () => {
  const ctx = useContext(FlowEditorContext);
  if (!ctx) {
    throw new Error("useFlowEditor must be used inside FlowEditorProvider");
  }
  return ctx;
};
