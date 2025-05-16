/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: true
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@fontsource-variable/*' {}
