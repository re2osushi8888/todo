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
	// FIXME: select文かmodelを作らないといけない
	const user = users[0];
	return c.json({
		user,
	});
});

export default app;
