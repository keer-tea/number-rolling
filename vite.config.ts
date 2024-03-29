import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  console.log(command, mode,'');
  if (mode === 'example') {
    return {
      plugins: [vue()],
      build: {
        outDir: 'docs'
      },
      base: '/number-rolling/'
    }
  } else if (mode === 'lib') {
    return {
      build: {
        outDir: 'dist',
        lib: {
          entry: resolve(__dirname, 'src/lib/number-rolling.ts'),
          name: 'number-rolling',
          fileName: 'number-rolling',
        }
      },
    }
  }
})
