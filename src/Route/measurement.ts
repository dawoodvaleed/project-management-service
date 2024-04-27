import { Router } from "express";
import { getMeasurements } from "../Controller";
import { validateToken } from "../Middleware";

export const measurementRouter = Router();

measurementRouter.get("/", validateToken, getMeasurements);
