import { createNodeFormRuntimeNode, type Node } from "./node";
import { normalize } from "./normalize";
import runtimeSchema from "./schema/runtimeSchema";
import { TransactionManager } from "./transactionManager";
import { TxAddNode } from "./transactions/txAddNode";
import { TxAddScreen } from "./transactions/txAddScreen";
import { TxDeleteNode } from "./transactions/txDeleteNode";
import { TxDeleteScreen } from "./transactions/txDeleteScreen";
import { TxUpdateNodeProps } from "./transactions/txUpdateNodeProps";
import { resolveVersion } from "./utils";

export type EditorState = {
  rootId: string;
  nodes: Map<string, Node>;
  validate: any;
  errors: Record<string, any>;
};
/**
 * Editor this hold the state and commands
 */
export class Editor {
  txManager;
  listeners;

  selectedScreen: string | null;

  selectedComponent: string | null;

  constructor(flowData: {}) {
    this.listeners = new Set<() => void>();

    const state = this.initEditor(flowData);
    state.validate = resolveVersion(runtimeSchema, [], 5.1);
    state.errors = new Map();

    this.txManager = new TransactionManager(state);

    const flowNode = [...state.nodes.values()].find(
      (node) => node.kind === "flow",
    );

    this.selectedScreen = flowNode?.childrenIds?.[0] || null;
    this.selectedComponent = null;
  }

  get state() {
    return this.txManager.state;
  }

  initEditor(data: any) {
    return normalize(data);
  }

  addScreen = () => {
    this.txManager.dispatch(
      new TxAddScreen(this.state.rootId, { title: "new_screen" }),
    );
    this.emit();
  };

  deleteScreen(id: string) {
    this.txManager.dispatch(new TxDeleteScreen(id));
    this.unSelectScreen();
    this.emit();
  }

  addNode = (type: string) => {
    if (!this.selectedScreen) throw new Error("Select a screen");
    const layoutId = this.state.nodes.get(this.selectedScreen)?.childrenIds[0];
    if (!layoutId) throw Error("No layoutId found");

    this.txManager.dispatch(new TxAddNode(type, layoutId, {}));
    this.emit();
  };

  deleteNode(id: string) {
    this.txManager.dispatch(new TxDeleteNode(id));
    this.emit();
  }

  updateNodeProps = (nodeId: string, props: Record<string, any>) => {
    console.log({ props });
    this.txManager.dispatch(
      new TxUpdateNodeProps(nodeId, {
        prop: props.prop,
        newValue: props.value,
      }),
    );

    this.emit();
  };

  undo() {
    this.txManager.undo();
    this.emit();
  }

  redo() {
    this.txManager.redo();
    this.emit();
  }

  selectScreen = (id: string) => {
    this.selectedScreen = id;
    this.emit();
  };
  unSelectScreen = () => {
    this.selectedScreen = null;
  };

  selectComponent = (id: string) => {
    this.selectedComponent = id;
    this.emit();
  };

  unSelectComponent = () => {
    this.selectedComponent = null;
    this.emit();
  };

  resolveAllFormBindings = () => {
    const activeScreen = this.selectedScreen;
    if (!activeScreen) return [];

    const screenNode = this.state.nodes.get(activeScreen);

    const bindings = this.collectInsideForms(
      screenNode?.childrenIds || [],
      false,
    );
    return bindings.map((i) => ({ label: i, value: i }));
  };

  private collectInsideForms = (
    childrenIds: string[],
    insideForm: boolean,
  ): string[] => {
    const result: string[] = [];

    for (const childId of childrenIds) {
      const child = this.state.nodes.get(childId);

      if (!child) continue;

      const isInsideForm = insideForm || child.kind === "form";

      // collect ONLY children inside forms
      if (insideForm && "name" in (child.props || {})) {
        result.push(child.props.name);
      }

      if (child.childrenIds?.length) {
        result.push(
          ...this.collectInsideForms(child.childrenIds, isInsideForm),
        );
      }
    }

    return result;
  };

  createNodeFromPropertyData = (input, nodeId) => {
    const node = this.state.nodes.get(nodeId);
    if (!node) return null;
    const newNodeProps = createNodeFormRuntimeNode(input, node);
    node.props = newNodeProps;

    let newNode = {} as any;

    newNode = { ...node, props: newNodeProps };

    this.state.nodes.set(newNode.id, newNode);

    this.emit();
  };

  emit = () => {
    for (const listener of this.listeners) {
      listener();
    }
  };

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  };
}
