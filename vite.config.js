import { defineConfig } from 'vite'
import pugStatic from '@macropygia/vite-plugin-pug-static'

export default defineConfig({
  plugins: [
    pugStatic({
      buildOptions: {
        basedir: './src',
      },
      buildLocals: {
        // любые локальные переменные для Pug
      },
    }),
  ],
})