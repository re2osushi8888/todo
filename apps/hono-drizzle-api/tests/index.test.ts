import { describe, expect, test } from 'bun:test';
import app from '../src';

describe('Example', () => {
	test('GET /posts', async () => {
		const res = await app.request('/posts');
		expect(res.status).toBe(200);
		expect(await res.text()).toBe('Many posts');
	});
	test('POST /posts', async () => {
		const res = await app.request('/posts');
		expect(res.status).toBe(200);
		expect(await res.text()).toBe('Many posts');
	});
	test('POST /posts', async () => {
		const res = await app.request('/posts', {
			method: 'POST',
			body: JSON.stringify({ message: 'hello hono' }),
			headers: new Headers({ 'Content-Type': 'application/json' }),
		});
		expect(res.status).toBe(201);
		expect(res.headers.get('X-Custom')).toBe('Thank you');
		expect(await res.json()).toEqual({
			message: 'Created',
		});
	});
	test('POST /posts', async () => {
		const formData = new FormData();
		formData.append('message', 'hello');
		const res = await app.request('/posts', {
			method: 'POST',
			body: formData,
		});
		expect(res.status).toBe(201);
		expect(res.headers.get('X-Custom')).toBe('Thank you');
		expect(await res.json()).toEqual({
			message: 'Created',
		});
	});
	test('POST /posts', async () => {
		const req = new Request('http://localhost/posts', {
			method: 'POST',
		});
		const res = await app.request(req);
		expect(res.status).toBe(201);
		expect(res.headers.get('X-Custom')).toBe('Thank you');
		expect(await res.json()).toEqual({
			message: 'Created',
		});
	});
});
