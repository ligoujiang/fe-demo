// src/vite-env.d.ts
/// <reference types="vite/client" />

// 扩展 ImportMeta 接口
interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 定义环境变量的具体类型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_MODE: string
  // 如果有其他 VITE_ 开头的变量，在这里补充
  readonly [key: string]: string | undefined // 允许访问未声明的变量（可选）
}
