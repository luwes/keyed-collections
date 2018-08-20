
function shouldUseNative() {
  return !!Map;
}

export function MapPolyfill() {
  let i, k, v;
  const clear = () => { k = []; v = []; };
  const has = obj => -1 < (i = k.indexOf(obj));
  return clear(), {
    get size() { return k.length; },
    has,
    clear,
    get: obj => v[k.indexOf(obj)],
    keys: () => k.slice(),
    values: () => v.slice(),
    entries: () => k.map((key, i) => [key, v[i]]),
    delete: obj => has(obj) && k.splice(i, 1) && !!v.splice(i, 1),
    forEach(fn, self) {
      v.forEach((value, i) => fn.call(self, value, k[i], this));
    },
    set(obj, value) {
      return (has(obj) ?
        (v[i] = value) :
        (v[k.push(obj) - 1] = value)
      ), this;
    }
  };
}

export default shouldUseNative() ? Map : MapPolyfill;
