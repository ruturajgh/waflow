import { useEffect, useRef, useState } from "react";
import { useFlowEditor } from "./useFlowEditor";

export function useSubscribe<T>(
  selector: (state: any) => T,
  equalityFn = Object.is,
) {
  const editor = useFlowEditor();

  /**
   * Initial selection
   */
  const [selectedState, setSelectedState] =
    useState(() =>
      selector(editor.state),
    );

  /**
   * Store latest selected value
   */
  const selectedRef =
    useRef(selectedState);

  useEffect(() => {
    const unsub = editor.subscribe(
      (state) => {
        const nextSelected =
          selector(state);

        /**
         * ONLY update if changed
         */
        if (
          !equalityFn(
            selectedRef.current,
            nextSelected,
          )
        ) {
          selectedRef.current =
            nextSelected;

          setSelectedState(
            nextSelected,
          );
        }
      },
    );

    return unsub;
  }, [editor, selector, equalityFn]);

  return selectedState;
}