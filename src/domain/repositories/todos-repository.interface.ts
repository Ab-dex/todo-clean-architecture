import { TodoInsertValidation } from "@/src/application/dto/todo.validations";
import { ITodo } from "../models/todos";

export interface ITodosRepository {
    // since repository is for interaction with infrastructure, then the input has to be of the domain model type. DTOs are meant for transition between outside world to controller.
    createTodo(todo: ITodo, tx?: any): Promise<ITodo>;
    // getTodo(id: number): Promise<Todo | undefined>;
    // getTodosForUser(userId: string): Promise<Todo[]>;
    getTodos(): Promise<ITodo[]>;
    updateTodo(id: string, updatedData: Partial<ITodo>, tx?: any): Promise<ITodo>;
    deleteTodo(id: string, tx?: any): Promise<void>;
}