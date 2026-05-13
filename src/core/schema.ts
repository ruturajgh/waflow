const baseAction = {
  type: "object",
  required: ["name"],
  additionalProperties: false,

  properties: {
    name: {
      type: "string",
      enum: [
        "navigate",
        "complete",
        "update_data",
        "data_exchange",
        "open_url",
      ],
    },

    payload: {
      type: "object",
    },

    url: {
      type: "string",
      format: "uri",
    },

    next: {
      type: "object",
      additionalProperties: false,
      required: ["type", "name"],

      properties: {
        type: {
          type: "string",
          enum: ["screen"],
        },

        name: {
          type: "string",
          minLength: 1,
        },
      },
    },
  },

  allOf: [
    /**
     * navigate
     * requires:
     * - payload
     * - next
     * forbids:
     * - url
     */
    {
      if: {
        properties: {
          name: { const: "navigate" },
        },
      },
      then: {
        required: ["payload", "next"],
        not: {
          required: ["url"],
        },
      },
    },

    /**
     * complete
     * requires:
     * - payload
     * forbids:
     * - url
     * - next
     */
    {
      if: {
        properties: {
          name: { const: "complete" },
        },
      },
      then: {
        required: ["payload"],
        not: {
          anyOf: [{ required: ["url"] }, { required: ["next"] }],
        },
      },
    },

    /**
     * update_data
     * requires:
     * - payload
     * forbids:
     * - url
     * - next
     */
    {
      if: {
        properties: {
          name: { const: "update_data" },
        },
      },
      then: {
        required: ["payload"],
        not: {
          anyOf: [{ required: ["url"] }, { required: ["next"] }],
        },
      },
    },

    /**
     * data_exchange
     * requires:
     * - payload
     * forbids:
     * - url
     * - next
     */
    {
      if: {
        properties: {
          name: { const: "data_exchange" },
        },
      },
      then: {
        required: ["payload"],
        not: {
          anyOf: [{ required: ["url"] }, { required: ["next"] }],
        },
      },
    },

    /**
     * open_url
     * requires:
     * - url
     * forbids:
     * - payload
     * - next
     */
    {
      if: {
        properties: {
          name: { const: "open_url" },
        },
      },
      then: {
        required: ["url"],
        not: {
          anyOf: [{ required: ["payload"] }, { required: ["next"] }],
        },
      },
    },
  ],
};
export const base = {
  flow: {
    type: "object",
    required: ["version", "screens"],
    properties: {
      version: {
        type: "string",
        minLength: 1,
      },

      screens: {
        type: "array",
        min: 1,
        max: 8,
      },

      data_api_version: {
        type: "string",
      },

      routing_model: {
        type: "object",
      },

      data_channel_uri: {
        type: "string",
      },
    },
  },
  screen: {
    type: "object",
    required: ["id", "layout"],
    properties: {
      id: {
        type: "string",
        pattern: "^(?!SUCCESS$)[A-Za-z0-9_]+$",
      },

      terminal: {
        type: "boolean",
      },

      success: {
        type: "boolean",
      },

      title: {
        type: "string",
      },

      refresh_on_back: {
        type: "boolean",
      },

      data: {
        type: "object",
      },

      layout: {
        type: "object",
      },
    },
  },
  TextHeading: {
    type: "object",
    required: ["type", "text"],
    properties: {
      text: {
        type: "string",
        max: 80,
        min: 1,
      },
    },
  },
  TextSubheading: {
    type: "object",
    required: ["type", "text"],
    properties: {
      text: {
        type: "string",
        max: 80,
        min: 1,
      },
    },
  },
  TextBody: {
    type: "object",
    required: ["type", "text"],
    properties: {
      text: {
        type: "string",
        max: 4096,
        min: 1,
      },
    },
  },
  TextCaption: {
    type: "object",
    required: ["type", "text"],
    properties: {
      text: {
        type: "string",
        max: 409,
        min: 1,
      },
    },
  },
  Footer: {
    type: "object",
    required: ["type", "label", "on-click-action"],
    properties: {
      type: { type: "string", default: "Footer", bindable: true },
      label: {
        type: "string",
        default: "Continue",
        bindable: true,
        minLength: 1,
        maxLength: 256,
      },
      "left-caption": {
        type: "string",
        bindable: true,
        minLength: 1,
        maxLength: 256,
      },
      "right-caption": {
        type: "string",
        bindable: true,
        minLength: 1,
        maxLength: 256,
      },
      "center-caption": {
        type: "string",
        bindable: true,
        minLength: 1,
        maxLength: 256,
      },
      enabled: { type: "boolean", default: true, bindable: true },
      "on-click-action": baseAction,
    },
    oneOf: [
      {
        required: ["center-caption"],
        not: { required: ["left-caption", "right-caption"] },
      },
      {
        required: ["left-caption", "right-caption"],
        not: { required: ["center-caption"] },
      },
    ],
  },
};

export const patches = {
  "3.0": [
    {
      op: "move",
      from: "flow.properties.data_channel_uri",
      to: "flow.properties.endpoint_uri",
    },
  ],
  "5.1": [
    {
      op: "add",
      path: "screen.properties.sensitive",
      value: { type: "boolean" },
    },
  ],
};
