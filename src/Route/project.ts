import { Router } from "express";
import { getProjects } from "../Controller";
import { validateToken } from "../Middleware";

export const projectRouter = Router();

projectRouter.get("/", validateToken, getProjects);
