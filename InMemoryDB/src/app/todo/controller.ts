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
		
		const { id } = req.params;
		const todoExist = this._db.some((e) => e.id === id);
		if (!todoExist) {
			return res.status(404).json({
				massage: "Todo not found",
			});
		}
		const selectedTodo = this._db.find((e) => e.id === id);

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

	public async handleUpdateTodo(req: Request, res: Response) {
		const { id } = req.params;
		const todoExist = this._db.some((e) => e.id === id);
		if (!todoExist) {
			return res.status(404).json({
				massage: "Todo not found",
			});
		}

		const validateBody = await todoValidationSchema.parseAsync(req.body);
		if (!validateBody) {
			return res.status(404).json({ error: "invalid credentials" });
		}

		const { title, description, isCompleted } = req.body;

		const toUpdateTodo = this._db.find((e) => e.id === id);

		if (!toUpdateTodo) {
			return res.status(404).json({ massage: "todo not found" });
		}
		toUpdateTodo.title = title;
		toUpdateTodo.description = description;
		toUpdateTodo.isCompleted = isCompleted;

		return res.status(201).json({ UpdatedTodo: toUpdateTodo });
	}

	public handleDeleteTodo(req: Request, res: Response) {
		const { id } = req.params;

		const todoExist = this._db.some((e) => e.id === id);
		if (!todoExist) {
			return res.status(404).json({
				massage: "Todo not found",
			});
		}

		const filtteredTodo = this._db.filter((e) => e.id !== id);

		this._db = filtteredTodo;

		return res
			.status(201)
			.json({ message: "Todo deleted successfully", filtteredTodo });
	}
}

export default TodoController;
