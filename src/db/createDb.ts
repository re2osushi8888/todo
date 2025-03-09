import { createClient } from '@libsql/client';
import { Database } from 'bun:sqlite';
import { drizzle as drizzleBunSqlite } from 'drizzle-orm/bun-sqlite';
import { drizzle as drizzleSqlite } from 'drizzle-orm/libsql';
import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';
import type * as schema from './schema';

// biome-ignore lint:suspicious/noExplicitAny:
export type SqliteDB = BaseSQLiteDatabase<any, any, typeof schema>;

export function createDB(): SqliteDB {
	let db: SqliteDB;
	if (process.env.IS_TEST === 'True') {
		const sqlite = new Database('sqlite.db');
		db = drizzleBunSqlite(sqlite);
	} else {
		const client = createClient({ url: process.env.DATABASE_URL as string });
		db = drizzleSqlite({ client });
	}
	return db;
}
