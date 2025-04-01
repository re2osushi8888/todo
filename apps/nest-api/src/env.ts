import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  server: {
    PORT: z.string(),
    JWT_SECRET: z.string(),
  },
  // biome-ignore lint: noProcessEnv
  runtimeEnv: process.env,
});
