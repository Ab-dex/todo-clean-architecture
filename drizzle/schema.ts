import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: text('id').primaryKey(),
  todo: text('todo').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
  dueDate: text('due_date'),
});
