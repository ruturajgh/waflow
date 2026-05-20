
/**
 * Semantic version compare
 */
function versionLE(a: string, b: string) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);

  const len = Math.max(pa.length, pb.length);

  for (let i = 0; i < len; i++) {
    const na = pa[i] || 0;
    const nb = pb[i] || 0;

    if (na < nb) return true;
    if (na > nb) return false;
  }

  return true;
}

/**
 * Unified path resolver (single source of truth)
 */
function getParent(obj: any, path: string, create = false) {
  const parts = path.split(".");
  let curr = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];

    if (!(key in curr)) {
      if (!create) return undefined;
      curr[key] = {};
    }

    curr = curr[key];

    if (curr == null || typeof curr !== "object") {
      return undefined;
    }
  }

  return {
    parent: curr,
    key: parts[parts.length - 1],
  };
}

/**
 * SET (create or overwrite)
 */
function setPath(obj: any, path: string, value: any) {
  const target = getParent(obj, path, true);
  if (!target) return;

  target.parent[target.key] = value;
}

/**
 * REPLACE (must exist)
 */
function replacePath(obj: any, path: string, value: any) {
  const target = getParent(obj, path, false);
  if (!target) return;

  target.parent[target.key] = value;
}

/**
 * REMOVE
 */
function removePath(obj: any, path: string) {
  const target = getParent(obj, path, false);
  if (!target) return;

  delete target.parent[target.key];
}

/**
 * MOVE (rename / relocate)
 */
function movePath(obj: any, from: string, to: string) {
  const source = getParent(obj, from, false);
  const target = getParent(obj, to, true);

  if (!source || !target) return;

  const value = source.parent[source.key];

  target.parent[target.key] = value;
  delete source.parent[source.key];
}

/**
 * Patch executor
 */
function applyOp(schema: any, op: any) {
  switch (op.op) {
    case "add":
      setPath(schema, op.path, op.value);
      break;

    case "replace":
      replacePath(schema, op.path, op.value);
      break;

    case "remove":
      removePath(schema, op.path);
      break;

    case "move":
      movePath(schema, op.from, op.to);
      break;
  }
}

/**
 * Resolve schema version
 */
export function resolveVersion(base, patches, targetVersion: string | number) {
  const order = Object.keys(patches).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

  const result = structuredClone(base);

  for (const v of order) {
    if (versionLE(v, String(targetVersion))) {
      for (const op of patches[v]) {
        applyOp(result, op);
      }
    }
  }

  return result;
}

const counters: Record<string, number> = {};

export function generateId(type: string): string {
  if (!counters[type]) {
    counters[type] = 0;
  }

  counters[type] += 1;

  return `${type}_${counters[type]}`;
}

export function extractDefaultsFromSchema(schema: any) {
  const props = schema.properties ?? {}

  const defaults: Record<string, any> = {}

  for (const key of Object.keys(props)) {
    const prop = props[key]

    if ("default" in prop) {
      defaults[key] = prop.default
    }
  }

  return defaults
}