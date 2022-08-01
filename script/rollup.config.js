import esbuild from 'rollup-plugin-esbuild'
// import vuePlugin from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass'
import { terser } from 'rollup-plugin-terser'
import vue from '@vitejs/plugin-vue'
export default {
  input: 'src/index.js',
  output: {
    globals: {
      vue: 'Vue',
    },
    name: 'VDistpicker',
    file: 'dist/v-distpicker.js',
    format: 'umd',
    plugins: [terser()],
  },
  external: ['vue'],
  plugins: [
    vue({
      include: /\.vue$/,
      reactivityTransform: true,
    }),
    scss({ output: false, sass: dartSass, outputStyle: 'compressed', insert: true }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015',
    }),
  ],
}
