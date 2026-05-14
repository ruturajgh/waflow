import type { Node } from "./node";
import { normalize } from "./normalize";
import { TransactionManager } from "./transactionManager";
import { TxAddScreen } from "./transactions/txAddScreen";
import { TxDeleteScreen } from "./transactions/txDeleteScreen";
import { TxUpdateNodeProps } from "./transactions/txUpdateNodeProps";
import { resolveVersion } from "./utils";

export type EditorState = {
  rootId: string;
  nodes: Map<string, Node>;
};
/**
 * Editor this hold the state and commands
 */
export class Editor {
  txManager;
  validate;
  listeners;

  selectedScreen: string | null;

  constructor(flowData: {}) {
    this.listeners = new Set<() => void>();
    this.validate = resolveVersion(5.1);
    const state = this.initEditor(flowData);


    this.txManager = new TransactionManager(state);

    this.selectScreen(state.nodes.values().next().value?.id)
  }

  get state() {
    return this.txManager.state;
  }

  initEditor(data: any) {
    return normalize(data);
  }

  addScreen() {
    this.txManager.dispatch(
      new TxAddScreen(this.state.rootId, { title: "new screen" }),
    );
    this.emit();
  }

  deleteScreen(id: string) {
    this.txManager.dispatch(new TxDeleteScreen(id));
    this.emit();
  }

  updateNodeProps = (nodeId: string, props: Record<string, any>) => { 
    this.txManager.dispatch(new TxUpdateNodeProps(nodeId, props)); 
    this.emit();
  }

  undo() {
    this.txManager.undo();
    this.emit();
  }

  redo() {
    this.txManager.redo();
    this.emit();
  }

  selectScreen = (id: string) => {
    this.selectedScreen = id;
    this.emit();
  };
  unSelectScreen = () => {
    this.selectedScreen = null;
  };

  emit = () => {
    for (const listener of this.listeners) {
      listener();
    }
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };
}
