declare module "*.css";
declare module "*.scss";

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "@testing-library/react";
