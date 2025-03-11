CREATE TABLE `todoItems_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT DEFAULT 1 NOT NULL,
	`title` text,
	`isComplete` integer DEFAULT false
);
