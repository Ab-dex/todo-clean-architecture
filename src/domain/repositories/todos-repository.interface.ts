import { ITodo } from "../models/todos";
import { Transaction } from "@/drizzle";

export interface ITodosRepository {
    // since repository is for interaction with infrastructure, then the input has to be of the domain model type. DTOs are meant for transition between outside world to controller.
    createTodo(todo: ITodo, tx?: Transaction): Promise<ITodo>;
    getTodos(): Promise<ITodo[]>;
    updateTodo(id: string, updatedData: Partial<ITodo>, tx?: Transaction): Promise<ITodo>;
    deleteTodo(id: string, tx?: Transaction): Promise<void>;
}