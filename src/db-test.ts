import { createClient } from '@libsql/client';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { usersTable } from './db/schema';
import { env } from './env';

const client = createClient({ url: env.DATABASE_URL });
const db = drizzle({ client });

async function main() {
	const user: typeof usersTable.$inferInsert = {
		name: 'John',
		age: 30,
		email: 'john2@example.com',
	};

	await db.insert(usersTable).values(user);
	console.log('New user created!');

	const users = await db.select().from(usersTable);
	console.log('Getting all users from the database: ', users);

	await db
		.update(usersTable)
		.set({
			age: 31,
		})
		.where(eq(usersTable.email, user.email));
	console.log('User info updated!');

	await db.delete(usersTable).where(eq(usersTable.email, user.email));
	console.log('User deleted!');
}

main();
