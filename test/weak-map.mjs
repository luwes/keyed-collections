import test from 'ava';
import { WeakMapPolyfill as WeakMap } from '../src/weak-map.mjs';

test('weak map', t => {
  t.true(typeof WeakMap === 'function', 'is function');
  t.true(!/native/.test(WeakMap), 'testing poorlyfill');

  const wm = new WeakMap;
  t.true(wm.has(Math) === false, 'empty weak map has no keys');
  t.true(wm.get(Math) === undefined, 'no key, no value');
  t.true(wm.set(Math, String) === wm, 'set returns the weak map');
  t.true(wm.has(Math) === true, 'added key is available');
  t.true(wm.get(Math) === String, 'if key, then value');
  wm.set(Math, Object);
  t.true(wm.get(Math) === Object, 'overwrite key');
  t.true(wm.delete(Math) === true, 'removed known key');
  t.true(wm.get(Math) === undefined, 'deleted key, no value');
  t.true(wm.delete(Math) === false, 'removed unknown key');
});
