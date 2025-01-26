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
// projectRouter.post("/", validateToken, addProject);

projectRouter.get("/", validateToken, getProjects);
projectRouter.post("/", addProject);
projectRouter.get("/:id", validateToken, getProject);
projectRouter.get("/progress/details", validateToken, getProjectProgressDetails);
