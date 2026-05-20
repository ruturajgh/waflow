import type { EditorState } from "../editor";
import { createNode, type Node } from "../node";
import type { Transaction } from "../transactionManager";
import { getValidator } from "../validation";
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
    const validateFn = getValidator(state.validate.screen);
    const result = validateFn(this.node.props);

    if (!result || !parent) {
      state.errors[this.node.id] = validateFn.errors;
      return state;
    }

    const updatedParent = {
      ...parent,
      childrenIds: [...parent.childrenIds, this.node.id],
    };
    const nodes = new Map(state.nodes);

    const layoutNode = createNode("layout", {}, this.node.id);

    this.node.childrenIds = [layoutNode.id];
    nodes.set(this.node.id, this.node);
    nodes.set(updatedParent.id, updatedParent);
    nodes.set(layoutNode.id, layoutNode);

    return {
      ...state,
      nodes,
    };
  }

  invert(state: EditorState): Transaction {
    return new TxDeleteScreen(this.node.id);
  }
}
