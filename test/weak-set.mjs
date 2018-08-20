import test from 'ava';
import { WeakSetPolyfill as WeakSet } from '../src/weak-set.mjs';

test('map', t => {
  t.true(typeof WeakSet === 'function', 'is function');
  t.true(!/native/.test(WeakSet), 'testing poorlyfill');

  const ws = new WeakSet;
  t.true(ws.has(Math) === false, 'empty weak set has no keys');
  t.true(ws.add(Math) === ws, 'add returns the weak set');
  t.true(ws.has(Math) === true, 'added key is available');
  t.true(ws.delete(Math) === true, 'removed known key');
  t.true(ws.has(Math) === false, 'deleted key, not present');
  t.true(ws.delete(Math) === false, 'removed unknown key');
});
