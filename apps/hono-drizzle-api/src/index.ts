import { Hono } from 'hono';
import { createDB } from './db/createDb';
import type { todoItemsTable } from './db/schema';
import { TodoRepository } from './repository/todoRepository';
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

app.get('/todo', async (c) => {
	const db = createDB();
	const repository = new TodoRepository(db);
	const todos = await repository.findAll();

	return c.json({ todos });
});

app.get('/todo/:id', async (c) => {
	const id = Number(c.req.param('id'));
	const db = createDB();
	const repository = new TodoRepository(db);
	const todo = await repository.findById(id);
	return c.json({
		todo: todo,
	});
});

app.post('/todo', async (c) => {
	const body = await c.req.json<typeof todoItemsTable.$inferInsert>();
	const db = createDB();
	const repository = new TodoRepository(db);
	const newTodo = await repository.save(body);
	return c.json({ message: 'Success', todo: newTodo }, 201);
});

app.patch('/todo/:id', async (c) => {
	const id = Number(c.req.param('id'));
	const body = await c.req.json<typeof todoItemsTable.$inferInsert>();
	const db = createDB();
	const repository = new TodoRepository(db);

	const updatedTodo = await repository.update(id, body);
	return c.json(
		{
			todo: updatedTodo,
		},
		200,
	);
});

export default app;
