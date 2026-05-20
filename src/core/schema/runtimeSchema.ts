export default {
    flow: {
        type: "object",
        required: ["version"],
        properties: {
            version: {
                type: "string",
                minLength: 1,
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
        required: ["title",],
        properties: {

            terminal: {
                type: "boolean",
            },

            success: {
                type: "boolean",
            },

            title: {
                type: "string",
                pattern: "^(?!SUCCESS$)[A-Za-z0-9_]+$",
            },

            refresh_on_back: {
                type: "boolean",
            },

            data: {
                type: "object",
            },
        },
    },
    TextHeading: {
        type: "object",
        required: ["text"],
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
        required: ["text"],
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
        required: ["text"],
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
        required: ["text"],
        properties: {
            text: {
                type: "string",
                default: "This is a caption",
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
            "on-click-action": {},
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
}