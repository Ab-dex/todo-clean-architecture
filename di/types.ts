import { ITodosUseCase } from "@/src/application/use-case/todos.usecase"
import { Todo } from "@/src/domain/models/todos";
import { ITodosRepository } from "@/src/domain/repositories/todos-repository.interface"

export const DI_SYMBOLS = {
    // Repositories
    ITodosRepository: Symbol.for('ITodosRepository'),

    // UseCases
    ITodosUseCase: Symbol.for('ITodosUseCase'),

    // controllers
    IGetTodosController: Symbol.for('IGetTodosController')

}

export interface DI_RETURN_TYPES {
    // Repositories
    ITodosRepository: ITodosRepository,

    // Services
    ITodosUseCase: ITodosUseCase

    // controllers
    IGetTodosController: () => Promise<Todo[]>;
    
}
