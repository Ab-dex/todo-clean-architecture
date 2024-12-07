import { getInjection } from "@/di/container";
import { DI_SYMBOLS } from "@/di/types";
import { ITodosUseCase } from "@/src/application/use-case/todos.usecase";
import { ITodo } from "@/src/domain/models/todos";

export const getTodosController = async (): Promise<ITodo[]> => {
    const todosUseCase = getInjection('ITodosUseCase')
    const todos = await todosUseCase.getTodos()
    return todos
};