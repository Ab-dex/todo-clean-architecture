import { Todo } from "@/src/domain/models/todos";
import { ITodosRepository } from "@/src/domain/repositories/todo.repositories";

// Define the interface for the use case
export interface ITodosUseCase {
    getTodos(): Promise<Todo[]>;
}

// Implement the use case
export class TodoUseCase implements ITodosUseCase {
  
    constructor(private todoRepository: ITodosRepository) {}

    // Implement the async method to fetch todos from the repository
    async getTodos(): Promise<Todo[]> {
      const todos = await this.todoRepository.getTodos();
      return todos; 
    }
}