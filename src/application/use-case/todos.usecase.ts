import { inject } from 'inversify'
import { ITodo } from "@/src/domain/models/todos";
import { ITodosRepository } from "@/src/domain/repositories/todos-repository.interface";
import { DI_SYMBOLS } from '@/di/types';
import { InputParseError } from '@/src/domain/errors/common';
import { Transaction } from '@/drizzle';

// Define the interface for the use case
export interface ITodosUseCase {
  // Fetch all todos
  getTodos(): Promise<ITodo[]>;

  // Create a new todo
  createTodo(input: ITodo, tx?: Transaction): Promise<ITodo>;

  // Update an existing todo
  updateTodo(id: string, updatedData: Partial<ITodo>, tx?: Transaction): Promise<ITodo>;

  // Delete a todo
  deleteTodo(id: string, tx?: Transaction): Promise<void>;
}


// Implement the use case
// @injectable()
export class TodosUseCase implements ITodosUseCase {
  
    constructor(@inject(DI_SYMBOLS.ITodosRepository) private todoRepository: ITodosRepository) {}

    // Implement the async method to fetch todos from the repository
    async getTodos(): Promise<ITodo[]> {
      const todos = await this.todoRepository.getTodos();
      return todos; 
    }
  
    // Implement the async method to create a new todo
    async createTodo(
      input: ITodo,
      tx?: Transaction
    ): Promise<ITodo> {
      // Input validation: todo length check
      if (input.todo.length < 4) {
        throw new InputParseError('Todo must be at least 4 characters long');
      }
  
      // Create new todo in the repository
      const newTodo = await this.todoRepository.createTodo(input, tx);
      return newTodo;
    }
  
    // Implement the async method to update an existing todo
    async updateTodo(
      id: string, 
      updatedData: Partial<ITodo>, 
      tx?: Transaction
    ): Promise<ITodo> {
      // Perform validation if necessary (for example, check if fields like "completed" are valid)
      if (updatedData.todo && updatedData.todo.length < 4) {
        throw new InputParseError('Todo must be at least 4 characters long');
      }
  
      // Update the todo in the repository
      const updatedTodo = await this.todoRepository.updateTodo(id, updatedData, tx);
      return updatedTodo;
    }
  
    // Implement the async method to delete a todo
    async deleteTodo(
      id: string,
      tx?: Transaction
    ): Promise<void> {
      // Delete the todo from the repository
      await this.todoRepository.deleteTodo(id, tx);
    }
}