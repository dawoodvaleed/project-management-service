import { Router } from "express";
import { getItems } from "../Controller";
import { validateToken } from "../Middleware";

export const itemRouter = Router();

itemRouter.get("/", validateToken, getItems);
