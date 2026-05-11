type NodeType = "flow" | "screen" | "layout" | "component";

export type Node = {
  id: string;
  type: NodeType;

  parentId?: string;
  childrenIds: string[];

  props: Record<string, any>;
};

const ActionProps = {
  type: "object",
  required: true,
  properties: {
    name: {
      type: "string",
      enum: [
        "navigate",
        "complete",
        "data_exchange",
        "update_data",
        "open_url",
      ],
      required: true,
    },
    payload: {
      type: "object",
      default: {},
      required: false,
    },
    // optional next screen for navigation
    next: {
      type: "object",
      required: false,
      properties: {
        type: { type: "string", default: "screen" },
        name: { type: "string" },
      },
    },
    url: {
      type: "string",
      required: false,
    },
  },
};

export const nodeRegistry = {
  flow: {
    props: {
      version: {
        default: "1.0",
        type: "string",
        required: true,
      },

      data_api_version: {
        default: undefined,
        type: "string",
      },

      routing_model: {
        default: undefined,
        type: "object",
      },

      data_channel_uri: {
        default: undefined,
        type: "string",
      },
    },
  },

  screen: {
    props: {
      id: {
        default: "",
        type: "string",
        required: true,
      },

      terminal: {
        default: false,
        type: "boolean",
      },

      success: {
        default: false,
        type: "boolean",
      },

      title: {
        default: "",
        type: "string",
      },

      refresh_on_back: {
        default: false,
        type: "boolean",
      },

      data: {
        default: undefined,
        type: "object",
      },
    },
  },

  layout: {
    props: {
      type: {
        default: "SingleColumnLayout",
        type: "string",
      },
    },
  },

  component: {
    props: {},
  },

  TextHeading: {
    props: {
      text: {
        default: "This is a heading",
        bindable: true,
        required: true,
        type: "string",
      },
      visible: {
        default: true,
        bindable: true,
        type: "boolean",
      },
    },
  },

  TextSubheading: {
    props: {
      text: {
        default: "This is a subheading",
        bindable: true,
        required: false,
        type: "string",
      },

      visible: {
        default: true,
        bindable: true,
        type: "boolean",
      },
    },
  },

  TextBody: {
    props: {
      text: {
        default: "This is body text",
        bindable: true,
        required: true,
        type: "string",
      },
      visible: {
        default: true,
        bindable: true,
        type: "boolean",
      },
      "font-weight": {
        default: "normal",
        bindable: true,
        values: {
          Bold: "bold",
          Italic: "italic",
          BoldItalic: "bold_italic",
          Normal: "normal",
        },
        type: "enum",
        required: false,
      },
      strikethrough: {
        type: "boolean",
        bindable: true,
        default: false,
        required: false,
      },
    },
  },

  TextCaption: {
    props: {
      text: {
        default: "This is body text",
        bindable: true,
        required: true,
        type: "string",
      },
      visible: {
        default: true,
        bindable: true,
        type: "boolean",
      },
      "font-weight": {
        default: "normal",
        bindable: true,
        values: {
          Bold: "bold",
          Italic: "italic",
          BoldItalic: "bold_italic",
          Normal: "normal",
        },
        type: "enum",
        required: false,
      },
      strikethrough: {
        type: "boolean",
        bindable: true,
        default: false,
        required: false,
      },
    },
  },

  Footer: {
    props: {
      label: {
        default: "Continue",
        bindable: true,
        required: false,
        type: "string",
      },
      "left-caption": { type: "string", bindable: true },
      "center-caption": { type: "string", bindable: true },
      "right-caption": { type: "string", bindable: true },
      enabled: { type: "boolean", default: true, bindable: true },
      "on-click-action": ActionProps,
    },
  },
};

export const patches = {
  "4.0": {
    form: {
      props: {
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
      props: {
        markdown: {
          default: false,
          type: "boolean",
          bindable: true,
          required: false,
        },
      },
    },
  },
};
