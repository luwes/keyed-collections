
function shouldUseNative() {
  return !!WeakMap;
}

let i = 0;
const hOP = {}.hasOwnProperty;
function WeakMapPolyfill() {
  const id = '__' + [i++, Math.random()];
  const has = obj => hOP.call(obj, id);
  return {
    has,
    get: obj => obj[id],
    delete: obj => has(obj) && delete obj[id],
    set(obj, value) {
      Object.defineProperty(obj, id, {
        configurable: true,
        value
      });
      return this;
    }
  };
}

export default shouldUseNative() ? WeakMap : WeakMapPolyfill;
