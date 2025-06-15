import path from 'node:path'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter(), react(), tsconfigPaths(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "${path.join(process.cwd(), 'src/assets/styles/_mantine').replace(/\\/g, '/')}" as mantine;`,
      },
    },
  },
})
