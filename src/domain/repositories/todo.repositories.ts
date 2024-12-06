import { TodoInsertValidation } from "@/src/application/dto/todo.validations";
import { Todo } from "../models/todos";

export interface ITodosRepository {
    createTodo(todo: TodoInsertValidation, tx?: any): Promise<Todo>;
    getTodo(id: number): Promise<Todo | undefined>;
    getTodosForUser(userId: string): Promise<Todo[]>;
    getTodos(): Promise<Todo[]>;
    updateTodo(id: number, input: Partial<TodoInsertValidation>, tx?: any): Promise<Todo>;
    deleteTodo(id: number, tx?: any): Promise<void>;
}