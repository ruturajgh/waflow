import type { EditorState } from "../editor";
import type { Node } from "../node";
import { createNode } from "../normalize";
import type { Transaction } from "../transactionManager";
import { TxDeleteScreen } from "./txDeleteScreen";

export class TxAddScreen implements Transaction {
  private node: Node;
  private parentId: string;
  constructor(parentId: string, props: any) {
    this.parentId = parentId;
    this.node = createNode("screen", props, parentId);
  }

  apply(state: EditorState): EditorState {
    const parent = state.nodes.get(this.parentId);

    if (!parent) return state;

    const updatedParent = {
      ...parent,
      childrenIds: [...parent.childrenIds, this.node.id],
    };
    const nodes = new Map(state.nodes);

    nodes.set(this.node.id, this.node);
    nodes.set(updatedParent.id, updatedParent);

    return {
      ...state,
      nodes,
    };
  }

  invert(state: EditorState): Transaction {
    return new TxDeleteScreen(this.node.id);
  }
}
