/// <reference types="vite/client" />
declare module "nprogress";
declare module "CustomEcharts";

interface ImportMetaEnv {
  // 环境变量
  readonly VITE_APP_BASE_URL: string;
  readonly VITE_APP_MOCK: boolean;
}
