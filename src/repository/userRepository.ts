import type { SqliteDB } from '../db/createDb';
import { usersTable } from '../db/schema';

export class UserRepository {
	private db: SqliteDB;
	constructor(db: SqliteDB) {
		this.db = db;
	}
	async getAll(): Promise<(typeof usersTable.$inferSelect)[]> {
		const users = await this.db.select().from(usersTable);
		return users;
	}
}
