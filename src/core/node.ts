import { generateId } from "./utils";

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
  type: string,
  definition: RuntimeDefinition,
  input: Record<string, any>,
  parentId?: string,
): Node => {
  return {
    id: generateId(definition.kind),

    type,

    kind: definition.kind,

    parentId: parentId || undefined,

    childrenIds: [],

    props: {
      ...(definition.defaults ?? {}),
      ...input,
    },

    runtime: {
      hydrated: true,
      createdAt: Date.now(),
    },
  };
};

export const nodeRegistry: RuntimeRegistry = {
  flow: {
    kind: "flow",

    defaults: {
      version: "1.0",
      data_api_version: undefined,
      routing_model: undefined,
      data_channel_uri: undefined,
    },

    create(input, parentId) {
      return createRuntimeNode("flow", nodeRegistry.flow, input, parentId);
    },
  },

  screen: {
    kind: "screen",

    defaults: {
      terminal: false,
      success: false,
      title: "",
      refresh_on_back: false,
      data: {},
    },

    create(input, parentId) {
      return createRuntimeNode("screen", nodeRegistry.screen, input, parentId);
    },
  },

  layout: {
    kind: "layout",

    defaults: {
      type: "SingleColumnLayout",
    },

    create(input, parentId) {
      return createRuntimeNode("layout", nodeRegistry.layout, input, parentId);
    },
  },

  TextHeading: {
    kind: "component",

    defaults: {
      text: "This is a heading",
      visible: true,
    },

    editor: {
      bindable: ["text", "visible"],
    },

    create(input, parentId) {
      return createRuntimeNode(
        "TextHeading",
        nodeRegistry.TextHeading,
        input,
        parentId,
      );
    },
  },

  TextSubheading: {
    kind: "component",

    defaults: {
      text: "This is a subheading",
      visible: true,
    },

    editor: {
      bindable: ["text", "visible"],
    },

    create(input, parentId) {
      return createRuntimeNode(
        "TextSubheading",
        nodeRegistry.TextSubheading,
        input,
        parentId,
      );
    },
  },

  TextBody: {
    kind: "component",

    defaults: {
      text: "This is body text",
      visible: true,
      "font-weight": "normal",
      strikethrough: false,
    },

    editor: {
      bindable: ["text", "visible", "font-weight", "strikethrough"],
    },

    create(input, parentId) {
      return createRuntimeNode(
        "TextBody",
        nodeRegistry.TextBody,
        input,
        parentId,
      );
    },
  },

  TextCaption: {
    kind: "component",

    defaults: {
      text: "This is caption text",
      visible: true,
      "font-weight": "normal",
      strikethrough: false,
    },

    editor: {
      bindable: ["text", "visible", "font-weight", "strikethrough"],
    },

    create(input, parentId) {
      return createRuntimeNode(
        "TextCaption",
        nodeRegistry.TextCaption,
        input,
        parentId,
      );
    },
  },

  Footer: {
    kind: "component",

    defaults: {
      label: "Continue",
      "left-caption": "",
      "center-caption": "",
      "right-caption": "",
      enabled: true,
      "on-click-action": {},
    },

    editor: {
      bindable: [
        "label",
        "left-caption",
        "center-caption",
        "right-caption",
        "enabled",
      ],
    },

    create(input, parentId) {
      return createRuntimeNode("Footer", nodeRegistry.Footer, input, parentId);
    },
  },
};

export const patches = {
  "4.0": {
    form: {
      defaults: {
        type: {
          default: "Form",
          type: "string",
        },
        name: {
          default: "Form layer",
          type: "string",
        },
        init_values: {
          default: undefined,
          type: "object",
        },
      },
    },
  },
  "5.1": {
    TextBody: {
      defaults: {
        markdown: false,
      },
    },
  },
};
