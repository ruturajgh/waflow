import type { EditorState } from "../editor";
import type { Transaction } from "../transactionManager";
import type { Node } from "../node";

export class TxUpdateNodeProps implements Transaction {
  private nodeId: string;
  private props: any;
  constructor(nodeId: string, props: Record<string, any>) {
    this.nodeId = nodeId;
    this.props = props;
  }

  apply(state: EditorState): EditorState {
    const node = state.nodes.get(this.nodeId);

    if (!node) return state;

    const updated: Node = {
      ...node,
      props: {
        ...node.props,
        ...this.props,
      },
    };
    console.log(updated);
    return {
      ...state,
      nodes: new Map(state.nodes).set(this.nodeId, updated),
    };
  }

  invert(state: EditorState): Transaction {
    const node = state.nodes.get(this.nodeId);

    if (!node) {
      throw new Error("Node not found");
    }

    const previousProps: Record<string, any> = {};

    for (const key of Object.keys(this.props)) {
      previousProps[key] = node.props[key];
    }

    return new TxUpdateNodeProps(this.nodeId, previousProps);
  }
}
