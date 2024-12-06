import { TodoInsertValidation } from "@/src/application/dto/todo.validations";
import { Todo } from "../models/todos";

export interface ITodosRepository {
    // since repository is for interaction with infrastructure, then the input has to be of the domain model type. DTOs are meant for transition between outside world to controller.
    // createTodo(todo: Todo, tx?: any): Promise<Todo>;
    // getTodo(id: number): Promise<Todo | undefined>;
    // getTodosForUser(userId: string): Promise<Todo[]>;
    getTodos(): Promise<Todo[]>;
    // updateTodo(id: number, input: Partial<Todo>, tx?: any): Promise<Todo>;
    // deleteTodo(id: number, tx?: any): Promise<void>;
}