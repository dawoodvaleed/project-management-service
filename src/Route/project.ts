import { Router } from "express";
import { addProject, getProjects } from "../Controller";
import { validateToken } from "../Middleware";

export const projectRouter = Router();

projectRouter.get("/", validateToken, getProjects);
projectRouter.post("/", addProject);
