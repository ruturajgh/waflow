import runtimeSchema from "./schema/runtimeSchema";
import { extractDefaultsFromSchema, generateId } from "./utils";

export type NodeKind = "flow" | "screen" | "layout" | "component";

export type Node = {
  id: string;

  /**
   * Registry key
   * Example:
   * "TextHeading"
   * "Footer"
   * "screen"
   */
  type: string;

  /**
   * High-level category
   */
  kind: NodeKind;

  parentId?: string;

  childrenIds: string[];

  /**
   * Instantiated runtime props
   */
  props: Record<string, any>;

  /**
   * Runtime-only metadata
   * Never serialized into Flow JSON
   */
  runtime?: {
    hydrated?: boolean;
    dirty?: boolean;
    selected?: boolean;
    createdAt?: number;
  };
};

export type RuntimeDefinition = {
  /**
   * High-level node category
   */
  kind: NodeKind;

  /**
   * Default runtime props
   */
  defaults?: Record<string, any>;

  /**
   * Editor/runtime metadata
   */
  editor?: {
    bindable?: string[];

    removable?: boolean;

    movable?: boolean;

    duplicatable?: boolean;
  };

  /**
   * Runtime instantiator
   */
  create: (input: Node, parentId?: string) => Node;
};

export type RuntimeRegistry = Record<string, RuntimeDefinition>;

const createRuntimeNode = (
  type: string | any,
  input: Record<string, any>,
  parentId?: string,
): Node => {
  //@ts-ignore
  const schema = runtimeSchema[type] 

  const defaults = extractDefaultsFromSchema(schema)

  return {
    id: generateId(schema["x-kind"]),

    type,

    kind: schema["x-kind"],

    parentId: parentId || undefined,

    childrenIds: [],

    props: {
      ...defaults,
      ...input,
    },

    runtime: {
      hydrated: true,
      createdAt: Date.now(),
    },
  }
}

export const nodeRegistry: RuntimeRegistry = {
  flow: {
    kind: "flow",

    create(input, parentId) {
      return createRuntimeNode("flow", input, parentId)
    },
  },

  screen: {
    kind: "screen",

    create(input, parentId) {
      return createRuntimeNode("screen", input, parentId)
    },
  },

  layout: {
    kind: "layout",

    create(input, parentId) {
      return createRuntimeNode("layout", input, parentId)
    },
  },

  TextHeading: {
    kind: "component",

    create(input, parentId) {
      return createRuntimeNode("TextHeading", input, parentId)
    },
  },

  TextSubheading: {
    kind: "component",

    create(input, parentId) {
      return createRuntimeNode("TextSubheading", input, parentId)
    },
  },

  TextBody: {
    kind: "component",

    create(input, parentId) {
      return createRuntimeNode("TextBody", input, parentId)
    },
  },

  TextCaption: {
    kind: "component",

    create(input, parentId) {
      return createRuntimeNode("TextCaption", input, parentId)
    },
  },

  Footer: {
    kind: "component",

    create(input, parentId) {
      return createRuntimeNode("Footer", input, parentId)
    },
  },
}
