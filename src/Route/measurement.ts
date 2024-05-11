import { Router } from "express";
import { addMeasurement, getMeasurements } from "../Controller";
import { validateToken } from "../Middleware";

export const measurementRouter = Router();

measurementRouter.get("/", validateToken, getMeasurements);
measurementRouter.post("/", validateToken, addMeasurement);
