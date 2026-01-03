export interface Config {
    apiUrl: string;
    isDev: boolean;
    devMode: boolean;
  }
  
  const config: Config = {
    apiUrl: import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000",
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    isDev: import.meta.env.DEV,
    devMode: import.meta.env.VITE_DEV_MODE === 'true',
  };
  
  export default config;
  