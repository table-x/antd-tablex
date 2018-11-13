const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const postcss = require('rollup-plugin-postcss');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');

async function build(option) {
  const bundle = await rollup.rollup(option.input);
  await bundle.write(option.output);
}

function generateConfig(type) {
  const inputName = `./src/index.${type}.js`;
  const outputName = `./${type}/index.js`;
  return {
    input: {
      input: inputName,
      external: [
        'react',
        'react-dom',
        'prop-types',
        'antd',
        'lodash',
        'moment',
        'localforage'
      ],
      plugins: [
        peerDepsExternal(),
        postcss(),
        resolve(),
        babel({
          runtimeHelpers: true,
          exclude: 'node_modules/**'
        }),
        commonjs()
      ]
    },
    output: {
      file: outputName,
      format: type,
      sourcemap: true,
      globals: {
        react: 'react',
        antd: 'antd',
        window: 'window',
        document: 'document'
      }
    }
  };
}

(async () => {
  try {
    build(generateConfig('es'));
    build(generateConfig('cjs'));
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
})();
