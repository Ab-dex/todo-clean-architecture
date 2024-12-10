import { getInjection } from "@/di/container";
import { insertTodoSchema, TodoInsertValidation } from "@/src/application/dto/todo.validations";
import { InputParseError } from "@/src/domain/errors/common";
import { ITodo, Todo } from "@/src/domain/models/todos";

export const getTodosController = async (): Promise<ITodo[]> => {
    const todosUseCase = getInjection('ITodosUseCase')
    try {
        // Fetch all todos using the use case
        const todos = await todosUseCase.getTodos();
        return todos;
      } catch (err) {
        console.error('Error fetching todos:', err);
        throw new Error('Failed to fetch todos');
      }
};

export const createTodosController =
  async (
    input: TodoInsertValidation
  ): Promise<ITodo> => {
    // Get the use case from the DI container
    const todosUseCase = getInjection('ITodosUseCase');

    try {
        const parsedInput = insertTodoSchema.safeParse(input);

    if (!parsedInput.success) {
      throw new InputParseError('Invalid input', { cause: parsedInput.error });
    }

    const { todo, completed, dueDate } = parsedInput.data;

    // Create a new Todo instance
    const newTodo = new Todo(todo, completed ? 1 : 0, dueDate);

    // Use the getTodo method to ensure the correct structure
    const createdTodo = await todosUseCase.createTodo(newTodo.getTodo());

    return createdTodo;
    } catch (err) {
      console.error('Error creating todos:', err);
      throw new Error('Failed to create todos');
    }
  };

  export const updateTodoController = async (
    id: string,
    input: Partial<TodoInsertValidation>
  ): Promise<ITodo> => {
    const todosUseCase = getInjection('ITodosUseCase');
  
    try {
      // Validate the input
      const parsedInput = insertTodoSchema.partial().safeParse(input);
  
      if (!parsedInput.success) {
        throw new InputParseError('Invalid input for update', { cause: parsedInput.error });
      }
  
      const updatedData = parsedInput.data;
  
      // Update the todo using the use case
      const updatedTodo = await todosUseCase.updateTodo(id, updatedData);
  
      return updatedTodo;
    } catch (err) {
      console.error('Error updating todo:', err);
      throw new Error('Failed to update todo');
    }
  };
  
  export const deleteTodoController = async (id: string | string[]): Promise<void> => {
    const todosUseCase = getInjection('ITodosUseCase');
  
    try {
      if (typeof id === 'string') {
        // Single ID: delete the todo
        await todosUseCase.deleteTodo(id);
      } else if (Array.isArray(id)) {
        // Multiple IDs: delete todos in parallel using Promise.all
        await Promise.all(id.map(todoId => todosUseCase.deleteTodo(todoId)));
      } else {
        throw new Error('Invalid id type');
      }
    } catch (err) {
      console.error('Error deleting todo:', err);
      throw new Error('Failed to delete todo');
    }
  };
  