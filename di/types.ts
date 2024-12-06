import { ITodosUseCase } from "@/src/application/use-case/todos.usecase"
import { ITodosRepository } from "@/src/domain/repositories/todos-repository.interface"

export const DI_SYMBOLS = {
    // Repositories
    ITodosRepository: Symbol.for('ITodosRepository'),

    // UseCases
    ITodosUseCase: Symbol.for('ITodosUseCase'),

}

export interface DI_RETURN_TYPES {
    // Repositories
    ITodosRepository: ITodosRepository,

    // Services
    ITodosUseCase: ITodosUseCase
}
