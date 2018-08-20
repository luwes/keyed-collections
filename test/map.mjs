import test from 'ava';
import { MapPolyfill as Map } from '../src/map.mjs';

test('map', t => {

  t.true(typeof Map === 'function', 'is function');
  t.true(!/native/.test(Map), 'testing poorlyfill');

  const m = new Map;
  t.true(m.has(Math) === false, 'empty map has no keys');
  t.true(m.get(Math) === undefined, 'no key, no value');
  t.true(m.set(Math, String) === m, 'set returns the map');
  t.true(m.has(Math) === true, 'added key is available');
  t.true(m.get(Math) === String, 'if key, then value');
  m.set(Math, Object);
  t.true(m.get(Math) === Object, 'overwrite key');
  t.true(m.size === 1, 'correct size');
  for(let key of m.keys())
    t.true(key === Math, 'correct key');
  for(let value of m.values())
    t.true(value === Object, 'correct value');
  for(let entry of m.entries())
    t.true(entry[0] === Math && entry[1] === Object, 'correct entries');
  m.forEach(
    function (value, key, collection) {
      t.true(value === Object, 'forEach value');
      t.true(key === Math, 'forEach key');
      t.true(m === collection, 'forEach collection');
      t.true(this === Array, 'forEach context');
    },
    Array
  );
  t.true(m.delete(Math) === true, 'removed known key');
  t.true(m.size === 0, 'deleted entry, reduced size');
  t.true(m.get(Math) === undefined, 'deleted key, no value');
  t.true(m.delete(Math) === false, 'removed unknown key');
  m.set(Math, String);
  m.clear();
  t.true(m.get(Math) === undefined, 'cleared keys, no values');
  t.true(m.size === 0, 'cleared keys, zero size');
});
