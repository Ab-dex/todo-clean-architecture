import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import {
    drizzle,
    BetterSQLite3Database,
    BetterSQLiteTransaction,
  } from 'drizzle-orm/better-sqlite3';
  import Database from 'better-sqlite3';
  import { ExtractTablesWithRelations } from 'drizzle-orm';
  import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sessions, todos, users } from './schema';
  
  // Initialize the SQLite database
  const sqlite = new Database('sqlite.db');
  
  // Define the schema type
  type Schema = {
    todos: typeof todos;
    sessions: typeof sessions;
    users: typeof users;
  };
  
  // Initialize the Drizzle database connection
  export const db: BetterSQLite3Database<Schema> = drizzle(sqlite, {
    schema: { todos, sessions, users },
  });
  
  export const luciaAdapter = new DrizzleSQLiteAdapter(db, sessions, users);
  
  // Define the transaction type
  export type Transaction = BetterSQLiteTransaction<
    Schema,
    ExtractTablesWithRelations<Schema>
  >;