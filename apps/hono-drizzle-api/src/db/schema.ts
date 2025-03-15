import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users_table', {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	age: int().notNull(),
	email: text().notNull().unique(),
});

export const todoItemsTable = sqliteTable('todoItems_table', {
	id: int().primaryKey({ autoIncrement: true }),
	title: text(),
	isComplete: int({ mode: 'boolean' }).default(false),
});
