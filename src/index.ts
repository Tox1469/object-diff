export type DiffOp = "add" | "remove" | "change";

export interface DiffEntry {
  path: string;
  op: DiffOp;
  oldValue?: any;
  newValue?: any;
}

function isObject(v: any): v is Record<string, any> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function equal(a: any, b: any): boolean {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => equal(v, b[i]));
  }
  if (isObject(a) && isObject(b)) {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => equal(a[k], b[k]));
  }
  return false;
}

export function diff(a: any, b: any, basePath = ""): DiffEntry[] {
  const result: DiffEntry[] = [];
  if (equal(a, b)) return result;

  if (!isObject(a) || !isObject(b)) {
    result.push({ path: basePath || "/", op: "change", oldValue: a, newValue: b });
    return result;
  }

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    const path = basePath ? `${basePath}.${key}` : key;
    const av = a[key];
    const bv = b[key];
    if (!(key in a)) {
      result.push({ path, op: "add", newValue: bv });
    } else if (!(key in b)) {
      result.push({ path, op: "remove", oldValue: av });
    } else if (!equal(av, bv)) {
      if (isObject(av) && isObject(bv)) {
        result.push(...diff(av, bv, path));
      } else {
        result.push({ path, op: "change", oldValue: av, newValue: bv });
      }
    }
  }
  return result;
}

export function applyDiff(obj: any, entries: DiffEntry[]): any {
  const result = JSON.parse(JSON.stringify(obj));
  for (const e of entries) {
    const parts = e.path.split(".");
    let cur = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (cur[parts[i]] === undefined) cur[parts[i]] = {};
      cur = cur[parts[i]];
    }
    const last = parts[parts.length - 1];
    if (e.op === "remove") delete cur[last];
    else cur[last] = e.newValue;
  }
  return result;
}
