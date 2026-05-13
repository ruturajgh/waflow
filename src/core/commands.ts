import type { Node } from "./node";
// -----------------------------
// Command interface
// -----------------------------
interface Command {
  execute(): void;
  undo(): void;
}

// -----------------------------
// EditorCommandManager
// -----------------------------
export class EditorCommandManager {
  private nodes: Map<string, Node>;
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  constructor(nodes: Map<string, Node>) {
    this.nodes = nodes;
  }

  // Execute a command and push to undo stack
  execute(cmd: Command) {
    cmd.execute();
    this.undoStack.push(cmd);
    this.redoStack = []; // clear redo stack on new action
  }

  undo() {
    const cmd = this.undoStack.pop();
    if (!cmd) return;
    cmd.undo();
    this.redoStack.push(cmd);
  }

  redo() {
    const cmd = this.redoStack.pop();
    if (!cmd) return;
    cmd.execute();
    this.undoStack.push(cmd);
  }

  // -----------------------------
  // CRUD commands
  // -----------------------------
  addNode(node: Node, parentId?: string) {
    const cmd: Command = {
      execute: () => {
        this.nodes.set(node.id, node);
        if (parentId) {
          const parent = this.nodes.get(parentId);
          parent?.childrenIds.push(node.id);
          node.parentId = parentId;
        }
      },
      undo: () => {
        this.nodes.delete(node.id);
        if (parentId) {
          const parent = this.nodes.get(parentId);
          parent!.childrenIds = parent!.childrenIds.filter(
            (id) => id !== node.id,
          );
        }
      },
    };

    this.execute(cmd);
  }

  deleteNode(nodeId: string) {
    const node = this.nodes.get(nodeId);
    if (!node) return;

    // Save full subtree for undo
    const snapshot = this.cloneSubtree(nodeId);

    const cmd: Command = {
      execute: () => {
        this.deleteSubtree(nodeId);
      },
      undo: () => {
        this.restoreSubtree(snapshot);
      },
    };

    this.execute(cmd);
  }

  moveNode(nodeId: string, newParentId: string) {
    const node = this.nodes.get(nodeId);
    if (!node) return;
    const oldParentId = node.parentId;

    const cmd: Command = {
      execute: () => {
        if (oldParentId) {
          const oldParent = this.nodes.get(oldParentId);
          oldParent!.childrenIds = oldParent!.childrenIds.filter(
            (id) => id !== nodeId,
          );
        }
        const newParent = this.nodes.get(newParentId);
        newParent!.childrenIds.push(nodeId);
        node.parentId = newParentId;
      },
      undo: () => {
        const newParent = this.nodes.get(newParentId);
        newParent!.childrenIds = newParent!.childrenIds.filter(
          (id) => id !== nodeId,
        );

        if (oldParentId) {
          const oldParent = this.nodes.get(oldParentId);
          oldParent!.childrenIds.push(nodeId);
          node.parentId = oldParentId;
        } else {
          node.parentId = undefined;
        }
      },
    };

    this.execute(cmd);
  }

  updateProps(nodeId: string, newProps: Record<string, any>) {
    const node = this.nodes.get(nodeId);
    if (!node) return;
    const oldProps = { ...node.props };

    const cmd: Command = {
      execute: () => {
        node.props = { ...node.props, ...newProps };
      },
      undo: () => {
        node.props = oldProps;
      },
    };

    this.execute(cmd);
  }

  // -----------------------------
  // Utilities for subtree operations
  // -----------------------------
  private cloneSubtree(nodeId: string): Node[] {
    const node = this.nodes.get(nodeId);
    if (!node) return [];

    const cloned: Node[] = [];
    const traverse = (n: Node) => {
      cloned.push({
        ...n,
        childrenIds: [...n.childrenIds],
        props: { ...n.props },
      });
      n.childrenIds.forEach((id) => {
        const child = this.nodes.get(id);
        if (child) traverse(child);
      });
    };
    traverse(node);
    return cloned;
  }

  private deleteSubtree(nodeId: string) {
    const node = this.nodes.get(nodeId);
    if (!node) return;
    node.childrenIds.forEach((id) => this.deleteSubtree(id));

    // Remove from parent
    if (node.parentId) {
      const parent = this.nodes.get(node.parentId);
      parent!.childrenIds = parent!.childrenIds.filter((id) => id !== nodeId);
    }

    this.nodes.delete(nodeId);
  }

  private restoreSubtree(snapshot: Node[]) {
    for (const node of snapshot) {
      this.nodes.set(node.id, {
        ...node,
        childrenIds: [...node.childrenIds],
        props: { ...node.props },
      });
    }

    // Fix parent references
    for (const node of snapshot) {
      if (node.parentId) {
        const parent = this.nodes.get(node.parentId);
        if (parent && !parent.childrenIds.includes(node.id)) {
          parent.childrenIds.push(node.id);
        }
      }
    }
  }
}
