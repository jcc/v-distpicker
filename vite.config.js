import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { createHtmlPlugin } from 'vite-plugin-html'

export default ({ mode }) => {
  const DEV = mode === 'development'
  const BUILD_EXAMPLE = mode === 'example'

  let config = {
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      createHtmlPlugin({
        inject: {
          data: {
            DEV: DEV,
            EXAMPLE: BUILD_EXAMPLE,
          },
        },
      }),
    ],
    resolve: {
      extensions: ['.js', '.json', '.vue'],
    },
  }
  if (DEV || BUILD_EXAMPLE) {
    config.root = resolve(__dirname, 'examples/')
    config.resolve.alias = {
      '@': resolve(__dirname, './src'),
    }
    config.server = {
      host: '0.0.0.0',
    }
  } else {
    config.build = {
      cssCodeSplit: true,
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
        fileName: () => 'v-distpicker.js',
      },
    }
  }
  if (BUILD_EXAMPLE) {
    config.publicDir = 'static'
    config.build = {
      outDir: '../dist-examples',
      emptyOutDir: true,
    }
    config.base = './'
  }
  return defineConfig(config)
}
