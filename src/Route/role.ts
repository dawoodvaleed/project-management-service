import { Router } from "express";
import { addRole, getRoles, updateRole } from "../Controller";
import { validateToken } from "../Middleware";

export const roleRouter = Router();

roleRouter.get("/", validateToken, getRoles);
roleRouter.post("/", validateToken, addRole);
roleRouter.put("/:id", validateToken, updateRole);
