export type Schema =
  | {
      type: "string";
      minLength?: number;
      maxLength?: number;
      enum?: string[];
      pattern?: string;
    }
  | {
      type: "number";
      min?: number;
      max?: number;
    }
  | {
      type: "boolean";
    }
  | {
      type: "object";
      properties?: Record<string, Schema>;
      required?: string[];
    }
  | {
      type: "array";
      items?: Schema;
      min?: number;
      max?: number;
    };

export const validators: Record<string, any> = {
  string: (schema: any, value: any, path: string) => {
    if (typeof value !== "string") {
      throw new Error(`${path} must be string`);
    }

    if (schema.minLength != null && value.length < schema.minLength) {
      throw new Error(`${path} must be at least ${schema.minLength} chars`);
    }

    if (schema.maxLength != null && value.length > schema.maxLength) {
      throw new Error(`${path} must be at most ${schema.maxLength} chars`);
    }

    if (schema.enum && !schema.enum.includes(value)) {
      throw new Error(`${path} must be one of ${schema.enum.join(", ")}`);
    }

    if (schema.pattern) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(value)) {
        throw new Error(`${path} must match pattern ${schema.pattern}`);
      }
    }
  },

  number: (schema: any, value: any, path: string) => {
    if (typeof value !== "number") {
      throw new Error(`${path} must be number`);
    }

    if (schema.min != null && value < schema.min) {
      throw new Error(`${path} must be >= ${schema.min}`);
    }

    if (schema.max != null && value > schema.max) {
      throw new Error(`${path} must be <= ${schema.max}`);
    }
  },

  boolean: (_: any, value: any, path: string) => {
    if (typeof value !== "boolean") {
      throw new Error(`${path} must be boolean`);
    }
  },

  object: (schema: any, value: any, path: string) => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new Error(`${path} must be object`);
    }

    const props = schema.properties || {};
    const required = schema.required || [];

    // ✅ required field check
    for (const key of required) {
      if (value[key] === undefined) {
        throw new Error(`${path}.${key} is required`);
      }
    }

    // ❌ reject unknown keys (strict mode behavior)
    for (const key of Object.keys(value)) {
      if (!(key in props)) {
        throw new Error(`${path}.${key} is not allowed`);
      }
    }

    // validate known properties
    for (const key in props) {
      validate(props[key], value[key], `${path}.${key}`);
    }
  },

  array: (schema: any, value: any, path: string) => {
    if (!Array.isArray(value)) {
      throw new Error(`${path} must be array`);
    }

    if (schema.min != null && value.length < schema.min) {
      throw new Error(`${path} must have at least ${schema.min} items`);
    }

    if (schema.max != null && value.length > schema.max) {
      throw new Error(`${path} must have at most ${schema.max} items`);
    }

    if (schema.items) {
      value.forEach((item, i) => {
        validate(schema.items, item, `${path}[${i}]`);
      });
    }
  },
};

export function validate(schema: any, value: any, path = "value") {
  const fn = validators[schema.type];

  if (!fn) {
    throw new Error(`Unknown type: ${schema.type}`);
  }

  fn(schema, value, path);
}
