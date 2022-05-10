import difference from "lodash/difference";
import transform from "lodash/transform";
import isEqual from "lodash/isEqual";
import isArray from "lodash/isArray";
import isObject from "lodash/isObject";

export const deepDiffBetweenObjects = (object, base) => {
  const changes = (object, base) => {
    return transform(object, (result, value, key) => {
      if (!isEqual(value, base[key])) {
        if (isArray(value)) {
          result[key] = difference(value, base[key]);
        } else if (isObject(value) && isObject(base[key])) {
          result[key] = changes(value, base[key]);
        } else {
          result[key] = value;
        }
      }
    });
  };
  return changes(object, base);
};
