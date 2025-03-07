import { Hono } from 'hono';

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

app.get('/user', (c) => {
	return c.json({
		id: 1,
		name: 'Allen',
		age: 27,
		email: 'allen@example.com',
	});
});

export default app;
