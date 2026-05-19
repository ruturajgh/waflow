import type { EditorState } from "../editor";
import type { Node } from "../node";
import { createNode } from "../normalize";
import type { Transaction } from "../transactionManager";
import { TxDeleteNode } from "./txDeleteNode";

export class TxAddNode implements Transaction {
    private node: Node;
    private parentId: string;

    constructor(type: string, parentId: string, props: any) {
        this.parentId = parentId;
        this.node = createNode(type, props, parentId);
    }

    apply(state: EditorState): EditorState {
        const parent = state.nodes.get(this.parentId);
        // const validateFn = getValidator(state.validate.screen)
        // const result = validateFn(this.node.props)

        // if (!result || !parent) {
        //     state.errors[this.node.id] = validateFn.errors
        //     return state;
        // }
        if (!parent) return state

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
        return new TxDeleteNode(this.node.id);
    }
}
