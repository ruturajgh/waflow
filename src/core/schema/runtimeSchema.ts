export default {
  flow: {
    "x-kind": "flow",

    type: "object",

    required: ["version"],

    additionalProperties: false,

    properties: {
      version: {
        type: "string",

        default: "1.0",

        minLength: 1,

        "x-binding": {
          allowed: false,
        },
      },

      data_api_version: {
        type: "string",

        default: undefined,

        "x-binding": {
          allowed: false,
        },
      },

      routing_model: {
        type: "object",

        default: undefined,

        "x-binding": {
          allowed: false,
        },
      },

      data_channel_uri: {
        type: "string",

        default: undefined,

        "x-binding": {
          allowed: false,
        },
      },
    },
  },
  screen: {
    "x-kind": "screen",

    type: "object",

    required: ["title"],

    additionalProperties: false,

    properties: {
      terminal: {
        type: "boolean",

        default: false,

        "x-binding": {
          allowed: false,
        },
      },

      success: {
        type: "boolean",

        default: false,

        "x-binding": {
          allowed: false,
        },
      },

      title: {
        type: "string",

        default: "",

        minLength: 1,

        pattern: "^(?!SUCCESS$)[A-Za-z0-9_]+$",

        "x-binding": {
          allowed: false,
        },

        "x-ui": {
          control: "text",
        },
      },

      refresh_on_back: {
        type: "boolean",

        default: false,

        "x-binding": {
          allowed: false,
        },
      },

      data: {
        type: "object",

        default: {},

        "x-binding": {
          allowed: false,
        },
      },
    },
  },
  SingleColumnLayout: {
    "x-kind": "layout",

    type: "object",

    required: ["type"],

    additionalProperties: false,

    properties: {
      type: {
        type: "string",

        enum: ["SingleColumnLayout"],

        default: "SingleColumnLayout",

        "x-binding": {
          allowed: false,
        },
      },
    },
  },
  Form: {
    "x-kind": "form",

    type: "object",

    required: ["name"],

    additionalProperties: false,

    properties: {
      name: {
        type: "string",
        minLength: 1,
      },
      type: {
        type: "string",
        default: "Form",
      },
      "init-values": {
        type: "object",
        default: {},
      },
    },
  },
  TextHeading: {
    "x-kind": "component",

    "x-element-meta": {
      name: "TextHeading",
      label: "Heading",
      group: "text",
      "group-label": "Text",
    },

    type: "object",
    required: ["text"],

    properties: {
      text: {
        type: "string",
        minLength: 1,
        maxLength: 80,

        default: "This is a heading",

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      visible: {
        type: "boolean",
        default: true,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },
    },
  },
  TextSubheading: {
    "x-kind": "component",

    "x-element-meta": {
      name: "TextSubheading",
      label: "Subheading",
      group: "text",
      "group-label": "Text",
    },

    type: "object",
    required: ["text"],

    properties: {
      text: {
        type: "string",
        minLength: 1,
        maxLength: 80,

        default: "This is a heading",

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      visible: {
        type: "boolean",
        default: true,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },
    },
  },
  TextBody: {
    "x-kind": "component",
    "x-element-meta": {
      name: "TextBody",
      label: "Body Text",
      group: "text",
      "group-label": "Text",
    },

    type: "object",

    required: ["text"],

    additionalProperties: false,

    properties: {
      text: {
        type: "string",

        minLength: 1,
        maxLength: 4096,

        default: "This is body text",

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      visible: {
        type: "boolean",

        default: true,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },

      "font-weight": {
        type: "string",

        enum: ["normal", "medium", "semibold", "bold"],

        default: "normal",

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      strikethrough: {
        type: "boolean",

        default: false,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },
    },
  },
  TextCaption: {
    "x-kind": "component",

    "x-element-meta": {
      name: "TextCaption",
      label: "Caption Text",
      group: "text",
      "group-label": "Text",
    },
    type: "object",

    required: ["text"],

    additionalProperties: false,

    properties: {
      text: {
        type: "string",

        minLength: 1,
        maxLength: 409,

        default: "This is body text",

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      visible: {
        type: "boolean",

        default: true,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },

      "font-weight": {
        type: "string",

        enum: ["normal", "medium", "semibold", "bold"],

        default: "normal",

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      strikethrough: {
        type: "boolean",

        default: false,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },
    },
  },
  CheckboxGroup: {
    "x-kind": "component",

    "x-element-meta": {
      name: "CheckboxGroup",
      label: "Checkbox Group",
      group: "selection",
      "group-label": "Selection",
    },

    type: "object",

    required: ["type", "name", "data-source", "label"],

    additionalProperties: false,

    properties: {
      type: {
        type: "string",
        const: "CheckboxGroup",
      },

      name: {
        type: "string",
        minLength: 1,
      },

      "data-source": {
        type: "array",

        description: "List of selectable items",

        items: {
          type: "object",

          required: ["id", "title", "enabled"],

          properties: {
            id: { type: "string", minLength: 1, default: "item-1" },
            title: { type: "string", minLength: 1, default: "Item 1" },
            description: {
              type: "string",
              minLength: 1,
              default: "Description-1",
            },
            metadata: { type: "string", minLength: 1, default: "item-1" },
            enabled: { type: "boolean", default: true },

            // v5+
            image: { type: "string" },
            "alt-text": { type: "string" },
            color: {
              type: "string",
              pattern: "^#[0-9A-Fa-f]{6}$",
            },

            // v6+
            "on-select-action": {
              type: "object",
            },

            "on-unselect-action": {
              type: "object",
            },
          },
        },

        "x-binding": {
          allowed: true,
          acceptedTypes: ["array"],
        },
      },

      "min-selected-items": {
        type: "integer",
        minimum: 0,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["number"],
        },
      },

      "max-selected-items": {
        type: "integer",
        minimum: 1,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["number"],
        },
      },

      enabled: {
        type: "boolean",
        default: true,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },

      label: {
        type: "string",
        minLength: 1,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      required: {
        type: "boolean",
        default: false,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },

      visible: {
        type: "boolean",
        default: true,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },

      "on-select-action": {
        type: "object",
      },

      description: {
        type: "string",

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      "init-value": {
        type: "array",
        items: { type: "string" },

        "x-binding": {
          allowed: true,
          acceptedTypes: ["array"],
        },
      },

      "error-message": {
        type: "string",

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      "media-size": {
        type: "string",
        enum: ["regular", "large"],

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },
    },
  },
  Footer: {
    "x-kind": "component",

    type: "object",

    required: ["label", "on-click-action"],

    additionalProperties: false,

    properties: {
      type: {
        type: "string",
        default: "Footer",

        "x-binding": {
          allowed: false,
        },
      },

      label: {
        type: "string",

        default: "Continue",

        minLength: 1,
        maxLength: 256,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      "left-caption": {
        type: "string",

        minLength: 1,
        maxLength: 256,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      "right-caption": {
        type: "string",

        minLength: 1,
        maxLength: 256,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      "center-caption": {
        type: "string",

        minLength: 1,
        maxLength: 256,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["string"],
        },
      },

      enabled: {
        type: "boolean",

        default: true,

        "x-binding": {
          allowed: true,
          acceptedTypes: ["boolean"],
        },
      },

      "on-click-action": {
        type: "object",

        additionalProperties: true,

        required: [],

        "x-binding": {
          allowed: false,
        },
      },
    },

    allOf: [
      {
        oneOf: [
          {
            required: ["center-caption"],
            not: {
              anyOf: [
                { required: ["left-caption"] },
                { required: ["right-caption"] },
              ],
            },
          },
          {
            required: ["left-caption", "right-caption"],
            not: {
              required: ["center-caption"],
            },
          },
        ],
      },
    ],

    "x-dragable": false,
  },
};
