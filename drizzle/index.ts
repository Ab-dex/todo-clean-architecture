import { createClient, ResultSet } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import { SQLiteTransaction } from 'drizzle-orm/sqlite-core';
import { todos } from './schema';
  
// Initialize the SQLite database
const client = createClient({
  url: 'file:sqlite.db',
});

export const db = drizzle(client, { schema: { todos } });


// Export Transaction type to be used in repositories
type Schema = {
  todos: typeof todos;
};
export type Transaction = SQLiteTransaction<
  'async',
  ResultSet,
  Schema,
  ExtractTablesWithRelations<Schema>
>;