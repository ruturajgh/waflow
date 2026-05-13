/**
 * -----------------------------
 * Types
 * -----------------------------
 */

import type { EditorState } from "./editor";
import type { Node } from "./node";
import { nodeRegistry } from "./node";

/**
 * -----------------------------
 * Node Factory
 * -----------------------------
 */
export function createNode(
  type: keyof typeof nodeRegistry,
  data: any,
  parentId?: string,
): Node {
  const node = nodeRegistry[type];

  if (!node) {
    throw new Error(`Unknown node type: ${type}`);
  }

  return node.create(data, parentId);
}

/**
 * -----------------------------
 * Builders
 * -----------------------------
 */
function buildComponent(
  child: any,
  parentId: string,
  nodes: Map<string, Node>,
) {
  const node = createNode(child.type || "component", child, parentId);
  nodes.set(node.id, node);
  return node;
}

function buildLayout(layout: any, parentId: string, nodes: Map<string, Node>) {
  const node = createNode("layout", layout, parentId);
  nodes.set(node.id, node);

  for (const child of layout.children || []) {
    const childNode = buildComponent(child, node.id, nodes);
    node.childrenIds.push(childNode.id);
  }

  return node;
}

function buildScreen(screen: any, parentId: string, nodes: Map<string, Node>) {
  const node = createNode("screen", screen, parentId);
  nodes.set(node.id, node);

  const layoutNode = buildLayout(screen.layout, node.id, nodes);
  node.childrenIds.push(layoutNode.id);

  return node;
}

/**
 * -----------------------------
 * ROOT FLOW BUILDER
 * -----------------------------
 */
function buildFlow(input: any, nodes: Map<string, Node>) {
  const flow = createNode("flow", input, undefined);
  nodes.set(flow.id, flow);

  for (const screen of input.screens || []) {
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

  const root = buildFlow(input, nodes);

  return {
    rootId: root.id,
    nodes,
  };
}
