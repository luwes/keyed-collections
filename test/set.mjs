import test from 'ava';
import { SetPolyfill as Set } from '../src/set.mjs';

test('set', t => {
  t.true(typeof Set === 'function', 'is function');
  t.true(!/native/.test(Set), 'testing poorlyfill');

  const s = new Set;
  t.true(!s.get && !s.set, 'set has no get/set methods');
  t.true(s.has(Math) === false, 'empty set has no keys');
  t.true(s.add(Math) === s, 'add returns the set');
  t.true(s.has(Math) === true, 'added key is available');
  t.true(s.size === 1, 'correct size');
  for(let key of s.keys())
    t.true(key === Math, 'correct key');
  for(let value of s.values())
    t.true(value === Math, 'correct value');
  for(let entry of s.entries())
    t.true(entry[0] === Math && entry[1] === entry[0], 'correct entries');
  s.forEach(
    function (value, key, collection) {
      t.true(value === Math, 'forEach value');
      t.true(key === value, 'forEach key');
      t.true(s === collection, 'forEach collection');
      t.true(this === Array, 'forEach context');
    },
    Array
  );
  t.true(s.delete(Math) === true, 'removed known key');
  t.true(s.size === 0, 'deleted key, reduced size');
  t.true(s.has(Math) === false, 'deleted key, not present');
  t.true(s.delete(Math) === false, 'removed unknown key');
  s.add(Math);
  s.clear();
  t.true(s.has(Math) === false, 'cleared keys, no values');
  t.true(s.size === 0, 'cleared keys, zero size');
});
