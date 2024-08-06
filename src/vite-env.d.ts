/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // Añade otras variables de entorno aquí según sea necesario
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
