import { eq } from 'drizzle-orm';
import type { SqliteDB } from '../db/createDb';
import { todoItemsTable } from '../db/schema';

export class TodoRepository {
	private db: SqliteDB;
	constructor(db: SqliteDB) {
		this.db = db;
	}

	async findById(id: number): Promise<(typeof todoItemsTable.$inferSelect)> {
		const todo = this.db.select().from(todoItemsTable).where(eq(todoItemsTable.id, id)).get()
		return todo
	}
}
