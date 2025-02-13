declare module "musicLibrary/App" {
  const App: React.ComponentType;
  export default App;
}

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.css";
declare module "*.scss";
