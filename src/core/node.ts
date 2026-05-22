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

  spec?: any,
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

type StaticProp<T = any> = {
  kind: "static";
  value: T;
};

type BindingProp = {
  kind: "binding";

  raw: string;

  source: "data" | "form";

  path: string[];

  valueType?: string | null;

  valid: boolean;

  errors: string[];
};

export type RuntimeProp<T = any> =
  | StaticProp<T>
  | BindingProp;

const DynamicBindingRegExp =
  /^\$\{([a-zA-Z0-9_]+)\.([a-zA-Z0-9_.]+)\}$/;

export const isDynamic = (value: string) =>
  DynamicBindingRegExp.test(value);

export function parseDynamicBinding(value: string) {
  const match = value.match(
    DynamicBindingRegExp,
  );

  if (!match) {
    throw new Error(
      "Invalid dynamic binding",
    );
  }

  const [, source, path] = match;

  return {
    source: source as "data" | "form",

    path: path.split("."),
  };
}


const isBindable = (
  property: Record<string, any>,
) => {
  return (
    property?.["x-binding"]?.allowed ===
    true
  );
};

function resolveBindingType(
  binding: {
    source: string;
    path: string[];
  },
  contextSchema: any,
): string | null {
  let current =
    contextSchema?.[binding.source];

  for (const segment of binding.path) {
    if (!current) return null;

    current =
      current.properties?.[segment];
  }

  return current?.type ?? null;
}

export function normalizeProp(
  value: any,
  propertySchema: any,
  contextSchema: any,
): RuntimeProp {
  const bindable =
    isBindable(propertySchema);

  // ALWAYS normalize into adapters
  if (!bindable) {
    return {
      kind: "static",
      value,
    };
  }

  // Dynamic binding
  if (
    typeof value === "string" &&
    isDynamic(value)
  ) {
    const binding =
      parseDynamicBinding(value);

    const acceptedTypes =
      propertySchema?.["x-binding"]
        ?.acceptedTypes ?? [];

    const resolvedType =
      resolveBindingType(
        binding,
        contextSchema,
      );

    const valid =
      acceptedTypes.length === 0 ||
      acceptedTypes.includes(
        resolvedType ?? "",
      );

    return {
      kind: "binding",

      raw: value,

      source: binding.source,

      path: binding.path,

      valueType: resolvedType,

      valid,

      errors: valid
        ? []
        : [
          `Expected ${acceptedTypes.join(", ")} but got ${resolvedType}`,
        ],
    };
  }

  // Static bindable prop
  return {
    kind: "static",
    value,
  };
}

export function createRuntimeProps(
  schema: any,
  input: Record<string, any>,
  contextSchema: any,
) {
  const properties =
    schema.properties ?? {};

  const props: Record<string, RuntimeProp> =
    {};

  for (const key of Object.keys(properties)) {
    const propertySchema =
      properties[key];

    const value =
      input[key] !== undefined
        ? input[key]
        : propertySchema.default;

    props[key] = normalizeProp(
      value,
      propertySchema,
      contextSchema,
    );
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

  const props = createRuntimeProps(
    schema,
    input,
    contextSchema,
  );

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