import { eq } from 'drizzle-orm';
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
	async findById(id: number) {
		const user = await this.db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, id));
		return user[0];
	}
}
