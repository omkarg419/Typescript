import { error } from "node:console";
import {
	todoValidationSchema,
	type Todo,
} from "../../validation/todo.schema.js";
import type { Request, Response } from "express";

class TodoController {
	private _db: Todo[];

	constructor() {
		this._db = [];
	}

	public handleGetAllTodos(req: Request, res: Response) {
		const todos = this._db;
		return res.json({ todos });
	}

	public handleGetTodoByID(req: Request, res: Response) {
		const todos = this._db;
		const { id } = req.params;
		const selectedTodo = todos.find((e) => e.id === id);

		return res.json({ selectedTodo });
	}

	public async handleInsertTodo(req: Request, res: Response) {
		try {
			const validatedTodo = await todoValidationSchema.parseAsync(req.body);
			this._db.push(validatedTodo);
			return res.status(201).json({ todo: validatedTodo });
		} catch (e) {
			return res.status(500).json({ error: "validation failed" });
		}
	}
}

export default TodoController;
