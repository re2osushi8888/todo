import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
	},
	// biome-ignore lint: noProcessEnv
	runtimeEnv: process.env,
});

function main() {
	console.log(env.DATABASE_URL);
}
main();
