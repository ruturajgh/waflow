import { dynamicData } from "./normalize";
import runtimeSchema from "./schema/runtimeSchema";
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

  spec?: any;
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
export interface RuntimeProp {
  kind: "static" | "binding";
  value: any;

  // binding-only fields
  source?: string;
  path?: string;
  valueType?: string;
  valid: boolean;
  errors: string[];
}

const DynamicBindingRegExp = /^\$\{([a-zA-Z0-9_]+)\.([a-zA-Z0-9_.]+)\}$/;

export const isDynamic = (value: string) => DynamicBindingRegExp.test(value);

export function parseDynamicBinding(value: string) {
  const match = value.match(DynamicBindingRegExp);

  if (!match) {
    throw new Error("Invalid dynamic binding");
  }

  const [, source, path] = match;

  return {
    source: source as "data" | "form",

    path: path,
  };
}

const isBindable = (property: Record<string, any>) => {
  return property?.["x-binding"]?.allowed === true;
};

function resolveBindingType(
  binding: {
    source: string;
    path: string[];
  },
  contextSchema: any,
): string | null {
  let current = contextSchema?.[binding.source];

  for (const segment of binding.path) {
    if (!current) return null;

    current = current.properties?.[segment];
  }

  return current?.type ?? null;
}

function resolveDynamicDatatoValue(path, data) {
  return data.get(path).__example__;
}

export function normalizeProp(
  value: any,
  propertySchema: any,
  contextSchema: any,
): RuntimeProp {
  const bindable = isBindable(propertySchema);

  // Default static shape
  const base: RuntimeProp = {
    kind: "static",
    value,
    valid: true,
    errors: [],
  };

  // Non-bindable → always static object
  if (!bindable) {
    return base;
  }

  // Dynamic binding
  if (typeof value === "string" && isDynamic(value)) {
    const binding = parseDynamicBinding(value);

    const acceptedTypes = propertySchema?.["x-binding"]?.acceptedTypes ?? [];

    const resolvedType = resolveBindingType(binding, contextSchema);

    const valid =
      acceptedTypes.length === 0 || acceptedTypes.includes(resolvedType ?? "");

    return {
      kind: "binding",

      value: resolveDynamicDatatoValue(binding.path, dynamicData),

      source: binding.source,
      path: binding.path,
      valueType: resolvedType,

      valid,

      errors: valid
        ? []
        : [`Expected ${acceptedTypes.join(", ")} but got ${resolvedType}`],
    };
  }

  // Bindable but static
  return base;
}

export function createRuntimeProps(
  schema: any,
  input: Record<string, any>,
  contextSchema: any,
) {
  const properties = schema.properties ?? {};

  const required = new Set(schema.required ?? []);

  const props: Record<string, RuntimeProp> = {};

  for (const key of Object.keys(properties)) {
    const propertySchema = properties[key];

    const hasInput = input[key] !== undefined;

    const isRequired = required.has(key);

    // Skip optional + missing
    if (!hasInput && !isRequired) {
      continue;
    }

    // Input wins
    const value = hasInput ? input[key] : propertySchema.default;

    props[key] = normalizeProp(value, propertySchema, contextSchema);
  }

  return props;
}

export const createNode = (
  type: string,
  input: Record<string, any>,
  contextSchema: any,
  parentId?: string,
): Node => {
  const schema = runtimeSchema[type];

  const props = createRuntimeProps(schema, input, contextSchema);

  return {
    id: generateId(schema["x-kind"]),

    type,

    kind: schema["x-kind"],

    parentId,

    childrenIds: [],

    props,

    spec: schema,

    runtime: {
      hydrated: true,
      createdAt: Date.now(),
    },
  };
};

export const createNodeFormRuntimeNode = (
  input: Record<string, any>,
  node: Record<string, any>,
) => {
  const schema = node.spec;
  const props = {} as any;

  Object.entries(input).map(([key, value]) => {
    const bindingSchema = schema.properties[key]["x-binding"];

    const acceptedTypes = bindingSchema.allowedTypes || [];
    const resolvedType = "string";

    const valid = acceptedTypes.includes(resolvedType);

    props[key] = {
      kind: value.kind || "static",
      value: value.value,

      source: value.source || "",
      path: value.path || "",
      valueType: resolvedType,

      valid: valid,

      errors: valid
        ? []
        : [`Expected ${acceptedTypes.join(", ")} but got ${resolvedType}`],
    };
  });

  return props;
};
