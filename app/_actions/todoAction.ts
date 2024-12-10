'use server';

import { getInjection } from '@/di/container';
import { TodoInsertValidation } from '@/src/application/dto/todo.validations';
import { ITodo } from '@/src/domain/models/todos';


// Fetching all todos
export async function getTodos(): Promise<ITodo[]> {
  try {
    
    const getTodosController = getInjection('IGetTodosController');
    
    return await getTodosController();
  } catch (err) {
    
    console.error('Error fetching todos:', err);
    throw new Error('Failed to fetch todos');
  }
}

// Creating a new todo
export async function createTodos(input: TodoInsertValidation): Promise<ITodo> {
  try {
    
    const createTodosController = getInjection('ICreateTodoController');
    
    return await createTodosController(input);
  } catch (err) {
    
    console.error('Error creating todo:', err);
    throw new Error('Failed to create todo');
  }
}

// Updating an existing todo
export async function updateTodo(
  id: string,
  input: Partial<TodoInsertValidation>
): Promise<ITodo> {
  try {

    const updateTodoController = getInjection('IUpdateTodoController');

    return await updateTodoController(id, input);
  } catch (err) {

    console.error('Error updating todo:', err);
    throw new Error('Failed to update todo');
  }
}

// Deleting a todo
export async function removeTodo(id: string): Promise<void> {
  try {
    
    const deleteTodoController = getInjection('IDeleteTodoController');
    
    deleteTodoController(id);
  } catch (err) {
    
    console.error('Error deleting todo:', err);
    throw new Error('Failed to delete todo');
  }
}

export async function removeMultipleTodos(ids: string[]): Promise<void> {
  try {
    
    const deleteTodoController = getInjection('IDeleteTodoController');
    
    deleteTodoController(ids);
  } catch (err) {
    
    console.error('Error deleting todo:', err);
    throw new Error('Failed to delete todo');
  }
}
