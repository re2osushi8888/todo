import { Database } from 'bun:sqlite';
import { afterAll, beforeAll, expect, test } from 'bun:test';
import { drizzle as drizzleBunSqlite } from 'drizzle-orm/bun-sqlite';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import app from '../src';
import { usersTable } from '../src/db/schema';

const sqlite = new Database('sqlite.db');
const db = drizzleBunSqlite(sqlite);

beforeAll(async () => {
	process.env.IS_TEST = 'True';
	migrate(db, { migrationsFolder: '/workspace/drizzle' });

	const user: typeof usersTable.$inferInsert = {
		id: 1,
		name: 'Allen',
		age: 27,
		email: 'allen@example.com',
	};
	await db.insert(usersTable).values(user);
});
afterAll(async () => {
	await db.delete(usersTable);
});
test('GET /user', async () => {
	const res = await app.request('/user');

	expect(res.status).toBe(200);
	expect(await res.json()).toEqual({
		user: {
			id: 1,
			name: 'Allen',
			age: 27,
			email: 'allen@example.com',
		},
	});
});
