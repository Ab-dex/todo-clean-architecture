import { eq } from 'drizzle-orm';
import { injectable } from 'inversify'

import { db, Transaction } from '@/drizzle';
import { ITodosRepository } from '@/src/domain/repositories/todos-repository.interface';
import { ITodo, Todo } from '@/src/domain/models/todos';
import { DatabaseOperationError } from '@/src/domain/errors/common';
import { todos } from '@/drizzle/schema';

@injectable()
export class TodosRepository implements ITodosRepository {
  constructor() {}
  
  async getTodos(): Promise<ITodo[]> {
    const query = db.query.todos.findMany();
  
    try {
      const todos = await query.execute();
  
      if (!todos) {
        throw new DatabaseOperationError('Cannot fetch todos');
      }
  
      return todos;
    } catch (err) {
      throw err;
    }
  }
  

  async createTodo(todo: Todo, tx?: Transaction): Promise<ITodo> {
    const invoker = tx ?? db;
  
    try {
      const query = invoker.insert(todos).values(todo).returning();
      const [created] = await query.execute();
  
      if (created) {
        return created as ITodo;
      } else {
        throw new DatabaseOperationError('Cannot create todo');
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteTodo(id: string, tx?: Transaction): Promise<void> {
    const invoker = tx ?? db;
  
    try {
      const query = invoker.delete(todos).where(eq(todos.id, id));
  
      const result = await query.execute();
  
      if (!result) {
        throw new DatabaseOperationError(`Cannot delete todo with id ${id}`);
      }
    } catch (err) {
      throw err;
    }
  }
  

  async updateTodo(
    id: string,
    updatedData: Partial<ITodo>,
    tx?: Transaction
  ): Promise<ITodo> {
    const invoker = tx ?? db;

    try {
      const query = invoker
        .update(todos)
        .set(updatedData)
        .where(eq(todos.id, id))
        .returning();

      const [updated] = await query.execute();

      if (updated) {
        return updated as ITodo;
      } else {
        throw new DatabaseOperationError(`Cannot update todo with id ${id}`);
      }
    } catch (err) {
      throw err;
    }
  }


//   async deleteTodo(id: number, tx?: Transaction): Promise<void> {
//     // const invoker = tx ?? db;

   
// }
}
