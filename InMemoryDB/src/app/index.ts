import express from "express";
import type { Application } from "express";
import { env } from "../env.js";
import todoRouter from "./todo/routes.js";
import { json } from "zod";

export function createServerApplication(): Application {
  const app = express();
  app.use(express.json());

  //#region  //*=========== todo-routes ===========
  app.use("/todos", todoRouter);

  //#endregion  //*=========== todo-routes ===========

  return app;
}
