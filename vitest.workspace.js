import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./apps/nest-api/vitest.config.e2e.ts",
  "./apps/nest-api/vitest.config.ts",
  "./apps/nest-api/dist/vitest.config.e2e.js",
  "./apps/nest-api/dist/vitest.config.js"
])
