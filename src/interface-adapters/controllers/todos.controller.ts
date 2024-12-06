import { ITodosUseCase } from "@/src/application/use-case/get-todo.usecase";
import { Todo } from "@/src/domain/models/todos";

export const getTodosController =
  (
    todosUseCase: ITodosUseCase
  ) => async (): Promise<Todo[]> => {
        const todos = await todosUseCase.getTodos()
        return todos
  };