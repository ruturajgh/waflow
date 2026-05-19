import type { EditorState } from "../editor";
import type { Transaction } from "../transactionManager";
import type { Node } from "../node";

export class TxUpdateNodeProps implements Transaction {
  private nodeId: string;
  private props: any;
  private previousProps: any

  constructor(nodeId: string, props: Record<string, any>) {
    this.nodeId = nodeId;
    this.props = props;
  }

  apply(state: EditorState): EditorState {
    const node = state.nodes.get(this.nodeId);

    if (!node) return state;

    this.previousProps = node.props

    const updated: Node = {
      ...node,
      props: {
        ...node.props,
        ...this.props,
      },
    }; 
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

    return new TxUpdateNodeProps(this.nodeId, this.previousProps);
  }
}
