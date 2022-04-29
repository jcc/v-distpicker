import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default ({ mode }) => {
  const __DEV__ = mode === 'development'
  // reactivityTransform require vue@^3.2.25  https://vuejs.org/guide/extras/reactivity-transform.html#typescript-integration
  return  defineConfig({
    plugins: [vue({
      reactivityTransform: true, 
    })],
    root: __DEV__?resolve(__dirname, 'examples/'):process.cwd(),
    server: {
      port: 3000,
    },
    build: {
      // https://cn.vitejs.dev/config/#build-csscodesplits
       cssCodeSplit:true,
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
      lib: {
        entry: 'src/index.js',
        name: 'VDistpicker',
        formats: ['umd'],
        fileName: () => 'v-distpicker.js'
      },
    },
    resolve: {
      extensions: ['.js','.json', '.vue'],
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  })
}

