const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');

async function build(option) {
  const bundle = await rollup.rollup(option.input);
  await bundle.write(option.output);
}

function generateConfig(type, prod) {
  const inputName = './src/index.js';
  const outputName = `./${type}/index.${prod ? 'prod' : 'dev'}.js`;
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
        resolve(),
        babel({
          runtimeHelpers: true,
          exclude: 'node_modules/**'
        }),
        commonjs(),
        prod ? uglify() : undefined
      ]
    },
    output: {
      file: outputName,
      format: type,
      sourcemap: !prod,
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
    build(generateConfig('es', true));
    build(generateConfig('cjs', true));
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
})();
