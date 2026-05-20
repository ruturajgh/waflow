
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

                "default": undefined,

                "x-binding": {
                    allowed: false,
                },
            },

            routing_model: {
                type: "object",

                "default": undefined,

                "x-binding": {
                    allowed: false,
                },
            },

            data_channel_uri: {
                type: "string",

                "default": undefined,

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
    layout: {

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
    TextHeading: {
        "x-kind": "component",

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
                },
            },

            visible: {
                type: "boolean",
                default: true,

                "x-binding": {
                    allowed: true,
                },
            },
        },
    },
    TextSubheading: {
        "x-kind": "component",

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
                },
            },

            visible: {
                type: "boolean",
                default: true,

                "x-binding": {
                    allowed: true,
                },
            },
        },
    },
    TextBody: {
        "x-kind": "component",

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

        'x-dragable': false
    }
}