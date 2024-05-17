namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_DEPLOY_ENV: 'production' | 'test' | 'development';
    NEXT_ISSUES_BASE_URL: string;
  }
}
