import { expect, test } from 'bun:test';
import app from '../src';

test('', async () => {
	const res = await app.request('/user');

	expect(res.status).toBe(200);
	expect(await res.json()).toEqual({
		id: 1,
		name: 'Allen',
		age: 27,
		email: 'allen@example.com',
	});
});
