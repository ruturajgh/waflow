const baseAction = {
  type: "object",
  required: ["name"],
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
    payload: { type: "object", default: {} },
    url: { type: "string" },
    next: {
      type: "object",
      properties: { type: { type: "string" }, name: { type: "string" } },
    },
  },
  oneOf: [
    { required: ["payload"], not: { required: ["url"] } }, // payload actions (navigate, complete, update_data, data_exchange)
    { required: ["url"], not: { required: ["payload"] } }, // open_url
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
  },
};

export const patches = {
  "3.0": [
    {
      op: "move",
      from: "flow.properties.data_channel_uri",
      to: "flow,properties.endpoint_uri",
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
