/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts"/>


interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_API: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}