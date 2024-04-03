import { Router } from "express";
import { addRoles, getRoles } from "../Controller";
import { validateToken } from "../Middleware";

export const roleRouter = Router();

roleRouter.get("/", validateToken, getRoles);
roleRouter.post("/", validateToken, addRoles);
