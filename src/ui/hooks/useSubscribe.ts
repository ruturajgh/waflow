import { useSyncExternalStore } from "react";
import { useFlowEditor } from "./useFlowEditor";

export function useSubscribe<T>(selector: (editor: any) => T) {
  const editor = useFlowEditor();

  return useSyncExternalStore(
    editor.subscribe,

    () => selector(editor),

    () => selector(editor),
  );
}
