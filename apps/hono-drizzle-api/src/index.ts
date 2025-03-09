import { Hono } from 'hono';
import { createDB } from './db/createDb';
import { UserRepository } from './repository/userRepository';

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
	const db = createDB();
	const repository = new UserRepository(db);
	const users = await repository.getAll();
	return c.json({
		users,
	});
});
app.get('/user/:id', async (c) => {
	const id = c.req.param('id');

	const db = createDB();
	const repository = new UserRepository(db);
	const user = await repository.findById(Number(id));
	return c.json({
		user: user,
	});
});

export default app;
