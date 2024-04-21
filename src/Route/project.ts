import { Router } from "express";
import { addProject, getProjects } from "../Controller";
// import { validateToken } from "../Middleware";

export const projectRouter = Router();

// TODO: replace the bottom ones with the validated routes

// projectRouter.get("/", validateToken, getProjects);
// projectRouter.post("/", validateToken, addProject);

projectRouter.get("/", getProjects);
projectRouter.post("/", addProject);
