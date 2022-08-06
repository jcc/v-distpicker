import { nodeResolve } from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass'
import { terser } from 'rollup-plugin-terser'
import vue from '@vitejs/plugin-vue'
import { name, version, author, license, main, module } from '../package.json'
const isProd = process.env.NODE_ENV === 'production'

const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2017-${new Date().getFullYear()} ${author}\n` +
  ` * Released under the ${license} License.\n` +
  ' */'

const globals = {
  vue: 'Vue',
}

export default {
  input: 'src/index.js',
  output: [
    {
      globals,
      name: 'VDistpicker',
      file: main,
      format: 'umd',
      banner,
      sourcemap: !isProd,
      plugins: [terser()],
    },
    {
      banner,
      file: module,
      format: 'esm',
      plugins: [terser()],
    },
  ],
  external: ['vue'],
  plugins: [
    vue({
      include: /\.vue$/,
      reactivityTransform: true,
    }),
    // css 打包进 js 文件
    scss({ output: false, sass: dartSass, outputStyle: 'compressed', insert: true }),
    babel({
      babelrc: true,
      babelHelpers: 'runtime',
      include: 'src/**',
      exclude: 'node_modules/**',
      extensions: ['.js', '.vue'],
    }),
    nodeResolve(),
    commonjs(),
  ],
}
