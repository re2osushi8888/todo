import { afterEach, describe, expect, test } from 'bun:test';
import { type SqliteDB, createTestDB } from '../db/createDb';
import { todoItemsTable } from '../db/schema';
import { TodoRepository } from './todoRepository';

describe('todoRepository', () => {
	const db = createTestDB();
	const createTodo = async (title: string, db: SqliteDB) => {
		const todo: typeof todoItemsTable.$inferSelect = await db
			.insert(todoItemsTable)
			.values({ title: title })
			.returning()
			.get();
		return todo;
	};
	afterEach(async () => {
		await db.delete(todoItemsTable);
	});

	describe('update', () => {
		describe('フィールドを1つ変える', () => {
			test('titleを変える', async () => {
				const todo = await createTodo('掃除', db);
				const repository = new TodoRepository(db);

				const newTitle = '皿洗い';
				const updatedTodo = await repository.update(todo.id, {
					title: newTitle,
				});

				expect(updatedTodo.title).toBe(newTitle);
			});
			test('isCompleteを変える', async () => {
				const todo = await createTodo('掃除', db);
				const repository = new TodoRepository(db);

				const newIsComplete = true;
				const updatedTodo = await repository.update(todo.id, {
					isComplete: newIsComplete,
				});

				expect(updatedTodo.isComplete).toBe(newIsComplete);
			});
		});
		describe('フィールドを2つ変える', () => {
			test('titleとisCompleteを変える', async () => {
				const todo = await createTodo('掃除', db);
				const repository = new TodoRepository(db);

				const newTitle = '皿洗い';
				const newIsComplete = true;
				const updatedTodo = await repository.update(todo.id, {
					title: newTitle,
					isComplete: newIsComplete,
				});

				expect(updatedTodo.title).toBe(newTitle);
				expect(updatedTodo.isComplete).toBe(newIsComplete);
			});
		});
	});
});
