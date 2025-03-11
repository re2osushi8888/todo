import { afterAll, beforeAll, expect, test } from 'bun:test';
import app from '../src';
import { createTestDB } from '../src/db/createDb';
import { usersTable } from '../src/db/schema';


const db = createTestDB()
beforeAll(async () => {
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
		users: [
			{
				id: 1,
				name: 'Allen',
				age: 27,
				email: 'allen@example.com',
			},
		],
	});
});

test('GET /user/:id', async () => {
	const res = await app.request('user/1');

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
