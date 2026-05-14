import { useEffect, useState } from "react";
import { useFlowEditor } from "./useFlowEditor";

export function useSubscribe(selector = (s) => s) {
  const editor = useFlowEditor();

  const [selectedState, setSelectedState] = useState(() =>
    selector(editor.getState()),
  );

  useEffect(() => {
    const unsub = editor.subscribe((state) => {
      setSelectedState(selector(state));
    });

    return () => {
      unsub();
    };
  }, [editor, selector]);

  return selectedState;
}
