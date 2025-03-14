import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		APP_ENV: z.string(),
		DATABASE_URL: z.string(),
	},
	// biome-ignore lint: noProcessEnv
	runtimeEnv: process.env,
});
