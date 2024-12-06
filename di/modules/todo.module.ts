import { ContainerModule, interfaces } from 'inversify'

import { DI_SYMBOLS } from '@/di/types';
import { ITodosRepository } from '@/src/domain/repositories/todos-repository.interface';
import { TodosRepository } from '@/src/infrastructure/repositoryImpl/todos.repository';
import { ITodosUseCase, TodosUseCase } from '@/src/application/use-case/todos.usecase';

const initializeModule = (bind: interfaces.Bind) => {
   
      bind<ITodosRepository>(DI_SYMBOLS.ITodosRepository).to(
        TodosRepository
      )

      bind<ITodosUseCase>(DI_SYMBOLS.ITodosUseCase).to(
        TodosUseCase
      )
    
  }
  
  export const TodosModule = new ContainerModule(initializeModule)