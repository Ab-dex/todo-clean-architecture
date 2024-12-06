import { eq } from 'drizzle-orm';
import { injectable } from 'inversify'

import { db, Transaction } from '@/drizzle';
import { ITodosRepository } from '@/src/domain/repositories/todos-repository.interface';
import { Todo } from '@/src/domain/models/todos';

@injectable()
export class TodosRepository implements ITodosRepository {
  constructor() {}
  
  async getTodos(): Promise<Todo[]> {
    return []
  }

  async createTodo(todo: Todo, tx?: Transaction): Promise<Todo> {
    const invoker = tx ?? db;
    return todo;
    
  }

//   async getTodo(id: number): Promise<Todo | undefined> {
//     return {} as Todo;
//   }

//   async getTodosForUser(userId: string): Promise<Todo[]> {
//     return [];
//   }

//   async updateTodo(id: number, input: Partial<Todo>): Promise<Todo> {
//     return {} as Todo;
    
//   }

//   async deleteTodo(id: number, tx?: Transaction): Promise<void> {
//     // const invoker = tx ?? db;

   
// }
}
