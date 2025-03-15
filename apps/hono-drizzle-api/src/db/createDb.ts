import { Database } from 'bun:sqlite';
import { createClient } from '@libsql/client';
import { drizzle as drizzleBunSqlite } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { drizzle as drizzleSqlite } from 'drizzle-orm/libsql';
import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';
import { env } from '../env';
import type * as schema from './schema';

// biome-ignore lint:suspicious/noExplicitAny:
export type SqliteDB = BaseSQLiteDatabase<any, any, typeof schema>;

export function createDB(): SqliteDB {
	let db: SqliteDB;
	if (env.APP_ENV === 'test') {
		const sqlite = new Database(env.DATABASE_URL);
		db = drizzleBunSqlite(sqlite);
	} else {
		const client = createClient({ url: env.DATABASE_URL as string });
		db = drizzleSqlite({ client });
	}
	return db;
}

export const createTestDB = (): SqliteDB => {
	const sqlite = new Database(env.DATABASE_URL);
	const db: SqliteDB = drizzleBunSqlite(sqlite);
	// TODO：相対パスにしてどこでも動くようにする
	migrate(db, { migrationsFolder: '/workspace/apps/hono-drizzle-api/drizzle' });
	return db;
};
