/**
 * -----------------------------
 * Types
 * -----------------------------
 */

import type { EditorState } from "./editor";
import { nodeRegistry } from "./node";
import type { Node } from "./node";
import { generateId } from "./utils";

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
  const config = nodeRegistry[type];

  if (!config) {
    throw new Error(`Unknown node type: ${type}`);
  }
  const props = {};

  // 1. apply defaults + overrides only
  for (const key in config.props) {
    const schema = config.props[key];
    props[key] = data[key] !== undefined ? data[key] : schema.default;
  }

  return {
    id: data.id || generateId(type),
    type,
    parentId,
    childrenIds: [],
    props,
  };
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
