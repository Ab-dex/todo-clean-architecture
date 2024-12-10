import { TodoInsertValidation } from "@/src/application/dto/todo.validations";
import { ITodosUseCase } from "@/src/application/use-case/todos.usecase"
import { ITodo } from "@/src/domain/models/todos";
import { ITodosRepository } from "@/src/domain/repositories/todos-repository.interface"

export const DI_SYMBOLS = {
    // Repositories
    ITodosRepository: Symbol.for('ITodosRepository'),

    // UseCases
    ITodosUseCase: Symbol.for('ITodosUseCase'),

    // controllers
    IGetTodosController: Symbol.for('IGetTodosController'),
    ICreateTodoController: Symbol.for('ICreateTodoController'),
    IUpdateTodoController: Symbol.for('IUpdateTodoController'),
    IDeleteTodoController: Symbol.for('IDeleteTodoController'),
}

export interface DI_RETURN_TYPES {
    // Repositories
    ITodosRepository: ITodosRepository,

    // Services
    ITodosUseCase: ITodosUseCase

    // controllers
    IGetTodosController: () => Promise<ITodo[]>;
    ICreateTodoController: (input: TodoInsertValidation) => Promise<ITodo>;
    IUpdateTodoController: (id: string, input: Partial<TodoInsertValidation>) => Promise<ITodo>;
    IDeleteTodoController: (id: string | string[]) => void;
}
