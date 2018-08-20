(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.KeyedCollections = {})));
}(this, (function (exports) { 'use strict';

  function shouldUseNative() {
    return !!Map;
  }

  function MapPolyfill() {
    var i, k, v;
    var clear = function () { k = []; v = []; };
    var has = function (obj) { return -1 < (i = k.indexOf(obj)); };
    return clear(), {
      get size() { return k.length; },
      has: has,
      clear: clear,
      get: function (obj) { return v[k.indexOf(obj)]; },
      keys: function () { return k.slice(); },
      values: function () { return v.slice(); },
      entries: function () { return k.map(function (key, i) { return [key, v[i]]; }); },
      delete: function (obj) { return has(obj) && k.splice(i, 1) && !!v.splice(i, 1); },
      forEach: function forEach(fn, self) {
        var this$1 = this;

        v.forEach(function (value, i) { return fn.call(self, value, k[i], this$1); });
      },
      set: function set(obj, value) {
        return (has(obj) ?
          (v[i] = value) :
          (v[k.push(obj) - 1] = value)
        ), this;
      }
    };
  }

  var Map$1 = shouldUseNative() ? Map : MapPolyfill;

  function shouldUseNative$1() {
    return !!Set;
  }

  function SetPolyfill() {
    var m = new Map$1;
    var set = m.set;
    delete m.get;
    delete m.set;
    m.add = function (obj) { return set.call(m, obj, obj); };
    return m;
  }

  var set = shouldUseNative$1() ? Set : SetPolyfill;

  function shouldUseNative$2() {
    return !!WeakMap;
  }

  var i = 0;
  var hOP = {}.hasOwnProperty;
  function WeakMapPolyfill() {
    var id = '__' + [i++, Math.random()];
    var has = function (obj) { return hOP.call(obj, id); };
    return {
      has: has,
      get: function (obj) { return obj[id]; },
      delete: function (obj) { return has(obj) && delete obj[id]; },
      set: function set(obj, value) {
        Object.defineProperty(obj, id, {
          configurable: true,
          value: value
        });
        return this;
      }
    };
  }

  var WeakMap$1 = shouldUseNative$2() ? WeakMap : WeakMapPolyfill;

  function shouldUseNative$3() {
    return !!WeakSet;
  }

  function WeakSetPolyfill() {
    var wm = new WeakMap$1;
    return {
      has: function (obj) { return wm.get(obj) === true; },
      delete: wm.delete,
      add: function add(obj) {
        wm.set(obj, true);
        return this;
      }
    };
  }

  var weakSet = shouldUseNative$3() ? WeakSet : WeakSetPolyfill;

  exports.Map = Map$1;
  exports.Set = set;
  exports.WeakMap = WeakMap$1;
  exports.WeakSet = weakSet;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
