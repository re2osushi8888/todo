import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

export default defineConfig({
	out: './drizzle',
	schema: './src/db/schema.ts',
	dialect: 'sqlite',
	dbCredentials: {
		url: 'file:sample.sqlite3',
	},
});
