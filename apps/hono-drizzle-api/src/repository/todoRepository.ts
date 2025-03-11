import type { SqliteDB } from '../db/createDb';
import type { todoItemsTable } from '../db/schema';

export class TodoRepository {
	private db: SqliteDB;
	constructor(db: SqliteDB) {
		this.db = db;
	}

	findById(id: number): typeof todoItemsTable.$inferSelect {
		return {
			id: id,
			title: '掃除する',
			isComplete: false,
		};
	}
}
