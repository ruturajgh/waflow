import type { EditorState } from "../editor";
import type { Transaction } from "../transactionManager";
import { TxAddScreen } from "./txAddScreen";

export class TxDeleteScreen implements Transaction {
  private nodeId: string;
  private deletedScreen: any;

  constructor(nodeId: string) {
    this.nodeId = nodeId;
  }

  apply(state: EditorState): EditorState {
    const screen = state.nodes.get(this.nodeId);
    if (!screen) return state;

    this.deletedScreen = screen;
    const parent = state.nodes.get(screen.parentId);

    if (!parent) return state;

    const updatedParent = {
      ...parent,
      childrenIds: parent?.childrenIds.filter((id) => id !== screen.id),
    };

    const nodes = new Map(state.nodes);
    nodes.delete(screen.id);
    nodes.set(updatedParent.id, updatedParent);

    return {
      ...state,
      nodes,
    };
  }

  invert(state: EditorState): Transaction {
    if (!this.deletedScreen) {
      return new EmptyTransaction();
    }
    return new TxAddScreen(this.deletedScreen.parentId, this.deletedScreen);
  }
}

class EmptyTransaction implements Transaction {
  apply(state: EditorState): EditorState {
    throw new Error("Method not implemented.");
  }
  invert(state: EditorState): Transaction {
    throw new Error("Method not implemented.");
  }
  addToHistory?: boolean | undefined;
}
