import { isArray } from "is-array";

export const getter = (obj, path) => {
  if (!path) return obj;
  if (isArray(path)) {
    return path.reduce(getter, obj);
  }
  return obj[path];
};
