import { createNode, normalize } from "./normalize";
import type { Node, nodeRegistry } from "./node";
import { EditorCommandManager } from "./commands";
import { resolveVersion } from "./utils";
export type EditorState = {
  rootId: string;
  nodes: Map<string, Node>;
};
/**
 * Editor this hold the state and commands
 */
export class Editor {
  state;
  commandManager;
  validate;
  constructor(flowData: {}) {
    this.state = this.initEditor(flowData);
    this.commandManager = new EditorCommandManager(this.state.nodes as any);
    this.validate = resolveVersion(5.1);
  }

  get editorState() {
    return this.state;
  }

  initEditor(data: any) {
    return normalize(data);
  }

  addNode(type: keyof typeof nodeRegistry, data: any, parentId?: string) {
    const node = createNode(type, data, parentId);
    this.commandManager.addNode(node, parentId);
  }

  deleteNode(nodeId: string) {
    this.commandManager.deleteNode(nodeId);
  }

  moveNode(nodeId: string, newParentId: string) {
    this.commandManager.moveNode(nodeId, newParentId);
  }

  updateNodeProps(nodeId: string, props: Record<string, any>) {
    this.commandManager.updateProps(nodeId, props);
  }
}
