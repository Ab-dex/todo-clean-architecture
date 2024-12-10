import { ContainerModule, interfaces } from 'inversify';
import { DI_SYMBOLS } from '@/di/types';
import { ITodosRepository } from '@/src/domain/repositories/todos-repository.interface';
import { TodosRepository } from '@/src/infrastructure/repositoryImpl/todos.repository';
import { ITodosUseCase, TodosUseCase } from '@/src/application/use-case/todos.usecase';
import { createTodosController, deleteTodoController, getTodosController, updateTodoController } from '@/src/interface-adapters/controllers/todos.controller';

const initializeModule = (bind: interfaces.Bind) => {
  // Bind repository to its interface
  bind<ITodosRepository>(DI_SYMBOLS.ITodosRepository).to(TodosRepository);

  // Bind use case to its interface
  bind<ITodosUseCase>(DI_SYMBOLS.ITodosUseCase).to(TodosUseCase);

  // Bind controllers to dynamic values
  bind(DI_SYMBOLS.IGetTodosController).toDynamicValue(() => getTodosController);
  bind(DI_SYMBOLS.ICreateTodoController).toDynamicValue(() => createTodosController);
  
  // Bind update and delete controllers to dynamic values
  bind(DI_SYMBOLS.IUpdateTodoController).toDynamicValue(() => updateTodoController);
  bind(DI_SYMBOLS.IDeleteTodoController).toDynamicValue(() => deleteTodoController);
};


export const TodosModule = new ContainerModule(initializeModule);
