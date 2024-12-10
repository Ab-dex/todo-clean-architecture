import { z } from 'zod';

export const selectTodoSchema = z.object({
  id: z.string(),
  todo: z.string(),
  completed: z.boolean(),
  dueDate: z.string().optional(),
});

export type TodoValidation = z.infer<typeof selectTodoSchema>;

export const insertTodoSchema = selectTodoSchema.pick({
  todo: true,
  completed: true,
  dueDate: true,
});

export type TodoInsertValidation = z.infer<typeof insertTodoSchema>;