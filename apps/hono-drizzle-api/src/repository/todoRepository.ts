import { eq } from 'drizzle-orm';
import type { SqliteDB } from '../db/createDb';
import { todoItemsTable } from '../db/schema';

export class TodoRepository {
	private db: SqliteDB;
	constructor(db: SqliteDB) {
		this.db = db;
	}

	async findAll() {
		const todos = await this.db.select().from(todoItemsTable);
		return todos;
	}

	async findById(id: number): Promise<typeof todoItemsTable.$inferSelect> {
		const todo = this.db
			.select()
			.from(todoItemsTable)
			.where(eq(todoItemsTable.id, id))
			.get();
		return todo;
	}

	async save(todo: typeof todoItemsTable.$inferInsert) {
		const newTodo: typeof todoItemsTable.$inferSelect = await this.db
			.insert(todoItemsTable)
			.values(todo)
			.returning()
			.get();
		return newTodo;
	}

	async update(id: number, todo: typeof todoItemsTable.$inferInsert) {
		const todoEntries = Object.entries(todo);
		const todoFields = Object.fromEntries(todoEntries);

		const updatedTodo: typeof todoItemsTable.$inferSelect = await this.db
			.update(todoItemsTable)
			.set(todoFields)
			.where(eq(todoItemsTable.id, id))
			.returning()
			.get();
		return updatedTodo;
	}
}
