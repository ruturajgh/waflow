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
    screen.childrenIds.forEach(layout => nodes.delete(layout))
    nodes.delete(screen.id);

    nodes.set(updatedParent.id, updatedParent);

    return {
      ...state,
      nodes,
    };
  }

  invert(state: EditorState): Transaction {
    return new TxAddScreen(
      this.deletedScreen.parentId,
      this.deletedScreen.props,
    );
  }
}
