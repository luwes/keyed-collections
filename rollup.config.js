/* eslint-env node */
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';
import { uglify } from 'rollup-plugin-uglify';
import bundleSize from 'rollup-plugin-bundle-size';

const env = process.env.NODE_ENV;
const bundles = {
  esm: {
    output: {
      format: 'esm',
      file: 'esm/keyed-collections.js'
    }
  },
  development: {
    output: {
      format: 'umd',
      name: 'KeyedCollections',
      file: 'umd/keyed-collections.js'
    }
  },
  production: {
    output: {
      format: 'umd',
      name: 'KeyedCollections',
      file: 'umd/keyed-collections.min.js'
    },
    plugins: [
      uglify()
    ]
  }
}

const bundle = bundles[env];
const config = {
  input: 'src/keyed-collections.mjs',
  output: bundle.output,
  plugins: [
    nodeResolve({
      module: true
    }),
    buble()
  ]
};

config.plugins = config.plugins
  .concat(bundle.plugins, bundleSize())
  .filter(Boolean);

export default config;
