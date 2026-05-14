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
 
  constructor(flowData: {}) { 
    this.validate = resolveVersion(5.1);
    const state = this.initEditor(flowData);
    this.txManager = new TransactionManager(state);
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
  }

  deleteScreen(id: string) {
    this.txManager.dispatch(new TxDeleteScreen(id));
  }

  updateNodeProps(nodeId: string, props: Record<string, any>) {
    this.txManager.dispatch(new TxUpdateNodeProps(nodeId, props));
  }

  undo() {
    this.txManager.undo();
  }

  redo() {
    this.txManager.redo();
  }

  subscribe(fn:Function){ 
    this.txManager.subscribe(fn)
  }

}
