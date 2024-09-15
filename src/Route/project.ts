import { Router } from "express";
import {
  addProject,
  getProject,
  getProjects,
  getProjectProgressDetails,
} from "../Controller";
import { validateToken } from "../Middleware";

export const projectRouter = Router();

// TODO: replace the bottom ones with the validated routes

// projectRouter.get("/", validateToken, getProjects);
// projectRouter.post("/", validateToken, addProject);

projectRouter.get("/", getProjects);
projectRouter.post("/", addProject);
projectRouter.get("/:id", getProject);
projectRouter.get("/progress/details", validateToken, getProjectProgressDetails);
