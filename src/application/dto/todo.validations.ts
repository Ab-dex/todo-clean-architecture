import { Todo } from '@/src/domain/models/todos';
import { z } from 'zod';

export const selectTodoSchema = z.object({
  id: z.string(),
  todo: z.string(),
  completed: z.boolean(),
  userId: z.string(),
  dueDate: z.string().optional(),
});

export type TodoValidation = z.infer<typeof selectTodoSchema>;

export const insertTodoSchema = selectTodoSchema.pick({
  todo: true,
  userId: true,
  completed: true,
  dueDate: true,
});

export type TodoInsertValidation = z.infer<typeof insertTodoSchema>;