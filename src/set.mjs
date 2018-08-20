import Map from './map.mjs';

function shouldUseNative() {
  return !!Set;
}

function SetPolyfill() {
  const m = new Map;
  const set = m.set;
  delete m.get;
  delete m.set;
  m.add = obj => set.call(m, obj, obj);
  return m;
}

export default shouldUseNative() ? Set : SetPolyfill;
