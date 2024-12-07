import { inject, injectable } from 'inversify'
import { ITodo } from "@/src/domain/models/todos";
import { ITodosRepository } from "@/src/domain/repositories/todos-repository.interface";
import { DI_SYMBOLS } from '@/di/types';

// Define the interface for the use case
export interface ITodosUseCase {
    getTodos(): Promise<ITodo[]>;
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
}