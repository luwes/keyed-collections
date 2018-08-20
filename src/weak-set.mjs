import { WeakMapPolyfill as WeakMap } from './weak-map.mjs';

function shouldUseNative() {
  return !!WeakSet;
}

export function WeakSetPolyfill() {
  const wm = new WeakMap;
  return {
    has: obj => wm.get(obj) === true,
    delete: wm.delete,
    add(obj) {
      wm.set(obj, true);
      return this;
    }
  };
}

export default shouldUseNative() ? WeakSet : WeakSetPolyfill;
