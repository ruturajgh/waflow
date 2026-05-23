import type { EditorState } from "./editor";
import { createNode, type Node } from "./node";

/**
 * -----------------------------
 * Builders
 * -----------------------------
 */

export const dynamicData = new Map<string, any>();

function buildComponent(
  child: any,
  parentId: string,
  nodes: Map<string, Node>,
) {
  const node = createNode(child.type, child, {}, parentId);
  nodes.set(node.id, node);

  for (const grandChild of child.children ?? []) {
    const childNode = buildComponent(grandChild, node.id, nodes);
    node.childrenIds.push(childNode.id);
  }

  return node;
}

function buildScreen(screen: any, parentId: string, nodes: Map<string, Node>) {
  const node = createNode("screen", screen, parentId);
  nodes.set(node.id, node);

  const layoutNode = buildComponent(screen.layout, node.id, nodes);

  node.childrenIds.push(layoutNode.id);

  return node;
}

/**
 * -----------------------------
 * ROOT FLOW BUILDER
 * -----------------------------
 */
function buildFlow(
  input: any,
  nodes: Map<string, Node>,
  data: Map<string, any>,
) {
  const flow = createNode("flow", input, undefined);
  nodes.set(flow.id, flow);

  for (const screen of input.screens || []) {
    Object.keys(screen.data).map((key) => data.set(key, screen.data[key]));
    const screenNode = buildScreen(screen, flow.id, nodes);
    flow.childrenIds.push(screenNode.id);
  }

  return flow;
}

/**
 * -----------------------------
 * NORMALIZE ENTRY POINT
 * -----------------------------
 */
export function normalize(input: any): EditorState {
  if (!input || typeof input !== "object") {
    throw new Error("Invalid input: must be object");
  }

  if (!input.version) {
    throw new Error("Flow.version is required");
  }

  const nodes = new Map<string, Node>();

  const root = buildFlow(input, nodes, dynamicData);

  return {
    rootId: root.id,
    nodes,
    validate: undefined,
    errors: {},
  };
}
