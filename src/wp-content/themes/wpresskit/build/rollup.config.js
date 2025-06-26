import path from "path";
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss';
import babel from 'rollup-plugin-babel';
import alias from 'rollup-plugin-alias';
import { terser } from "rollup-plugin-terser";
import browsersync from "rollup-plugin-browsersync";
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from '@rollup/plugin-json';
import inject from '@rollup/plugin-inject';

const port = 12345;

const environment = process.env.NODE_ENV;
const proxy = {
  docker: 'http://localhost:3001',
  dev: 'http://wpresskit.test'
}

const allowBrowsersync = ['dev', 'docker'].includes(environment);

const plugins = [
  json(),
  resolve(),
  commonjs(),
  inject({
    $: 'jquery', // Injeta jQuery como $
    jQuery: 'jquery', // Injeta jQuery como jQuery
    Popper: '@popperjs/core', // Injeta Popper.js como Popper
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
    // 'window.Popper': '@popperjs/core',
  }),
  terser(),
  postcss({
    extensions: ['.css', '.scss'],
    extract: path.resolve(__dirname, '../style.css'), // Cria um arquivo CSS separado
    minimize: true, // Minimize o CSS
  }),
  sass({
    output: path.resolve(__dirname, "../style.css")
  }),
  alias({
    entries: [
      { find: '@root', replacement: path.join(__dirname, './src/js') },
      { find: '@scss', replacement: path.join(__dirname, './src/scss') }
    ],
  }),
  babel({
    exclude: 'node_modules/**',
    presets: [
      [
        '@babel/preset-env', 
        {
          useBuiltIns: 'usage',
          corejs: 3,
          targets: {
              browsers: ['chrome >= 40', 'ie >= 8']
          }
        }
      ]
    ],
    babelrc: false,
    runtimeHelpers: true
  }),
  {
    name: 'afterBuild',
    generateBundle(options, bundle) {
      console.log('\n');
      console.log('\x1b[33m%s\x1b[0m', `> Live reload running: http://localhost:${port}`);
      console.log('\x1b[34m%s\x1b[0m', `> Environment: ${environment.charAt(0).toUpperCase() + environment.substring(1)}`);
      console.log('\x1b[32m%s\x1b[0m', '> Success build');
      console.log('\n');
    }
  },
];

if (allowBrowsersync) {
  plugins.push(
    browsersync({
      proxy: proxy[environment],
      port: port,
      files: ["../**/*.php", "../**/*.js"],
      notify: true,
      ignore: ['node_modules/**/*',  '../.docker/**']
    })
  );
}

export default {
  input: 'src/js/index.js',
  output: {
    file: path.resolve(__dirname, "../bundle.js"),
    format: 'iife',
    globals: {
      jquery: '$', // Define jQuery como uma variável global
      '@popperjs/core': 'Popper', // Popper.js como global
    },
  },
  plugins
};
