import { Router } from "express";
import { addItem, getItems } from "../Controller";
import { validateToken } from "../Middleware";

export const itemRouter = Router();

itemRouter.get("/", validateToken, getItems);
itemRouter.post("/", addItem);
