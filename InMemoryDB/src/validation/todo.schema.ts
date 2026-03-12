import { z } from "zod";

export const todoValidationSchema = z.object({
  id: z.string().describe("id of schema"),
  title: z.string().describe("title of the todo"),
  description: z.string().optional().describe("description of todo"),
  isCompleted: z.boolean().describe('if todo is completed or note')
});

export type Todo = z.infer<typeof todoValidationSchema>;

// export interface ITodo {
//   id: string;
//   title: string;
//   description?: string;
//   isCompleted: boolean;
// }
