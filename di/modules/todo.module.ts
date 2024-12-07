import { ContainerModule, interfaces } from 'inversify'

import { DI_SYMBOLS } from '@/di/types';
import { ITodosRepository } from '@/src/domain/repositories/todos-repository.interface';
import { TodosRepository } from '@/src/infrastructure/repositoryImpl/todos.repository';
import { ITodosUseCase, TodosUseCase } from '@/src/application/use-case/todos.usecase';
import { getTodosController } from '@/src/interface-adapters/controllers/todos.controller';

const initializeModule = (bind: interfaces.Bind) => {
   
      bind<ITodosRepository>(DI_SYMBOLS.ITodosRepository).to(
        TodosRepository
      )

      bind<ITodosUseCase>(DI_SYMBOLS.ITodosUseCase).to(
        TodosUseCase
      )

      bind(DI_SYMBOLS.IGetTodosController).toDynamicValue(() => getTodosController)

    //   bind(DI_SYMBOLS.IGetTodosController).toDynamicValue(() => {
    //     const todosUseCase = getInjection<ITodosUseCase>(DI_SYMBOLS.ITodosUseCase);
    //     return getTodosController(todosUseCase); // Pass the use case to the controller
    //   });
    
  }
  
  export const TodosModule = new ContainerModule(initializeModule)