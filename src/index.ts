import { createClient } from '@libsql/client';
import { Database } from 'bun:sqlite';
import { drizzle as drizzleBunSqlite } from 'drizzle-orm/bun-sqlite';
import { drizzle as drizzleSqlite } from 'drizzle-orm/libsql';
import type { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';
import { Hono } from 'hono';
import type * as schema from './db/schema';
import { usersTable } from './db/schema';

const app = new Hono();

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.get('/posts', (c) => {
	return c.text('Many posts');
});

app.post('/posts', (c) => {
	return c.json(
		{
			message: 'Created',
		},
		201,
		{
			'X-Custom': 'Thank you',
		},
	);
});

app.get('/user', async (c) => {
	// biome-ignore lint:suspicious/noExplicitAny:
	type SqliteDB = BaseSQLiteDatabase<any, any, typeof schema>;
	function createDB(): SqliteDB {
		let db: SqliteDB;
		if (process.env.IS_TEST === 'True') {
			const sqlite = new Database('sqlite.db');
			db = drizzleBunSqlite(sqlite);
		} else {
			const client = createClient({ url: process.env.DB_FILE_NAME as string });
			db = drizzleSqlite({ client });
		}
		return db;
	}
	const db: SqliteDB = createDB();
	// FIXME: select文かmodelを作らないといけない
	const users = await db.select().from(usersTable);
	const user = users[0];
	return c.json({
		user,
	});
});

export default app;
