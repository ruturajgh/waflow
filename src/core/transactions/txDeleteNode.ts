import type { EditorState } from "../editor";
import type { Node } from "../node";
import type { Transaction } from "../transactionManager";
import { TxAddNode } from "./txAddNode";

export class TxDeleteNode implements Transaction {
    private nodeId: string;
    private deletedNode: Node | any
    constructor(nodeId: string) {
        this.nodeId = nodeId;
    }

    apply(state: EditorState): EditorState {
        const node = state.nodes.get(this.nodeId);

        if (!node) return state;

        this.deletedNode = node;

        const parent = state.nodes.get(node.parentId ?? '');

        if (!parent) return state;

        const updatedParent = {
            ...parent,
            childrenIds: parent?.childrenIds.filter((id) => id !== node.id),
        };

        const nodes = new Map(state.nodes);
        nodes.delete(node.id);
        nodes.set(updatedParent.id, updatedParent);

        return {
            ...state,
            nodes,
        };
    }

    invert(state: EditorState): Transaction {
        return new TxAddNode(this.deletedNode.type, this.deletedNode.parentId, this.deletedNode.props);
    }
}
