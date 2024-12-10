CREATE TABLE `todos` (
	`id` text PRIMARY KEY NOT NULL,
	`todo` text NOT NULL,
	`completed` integer DEFAULT false NOT NULL,
	`due_date` text
);
