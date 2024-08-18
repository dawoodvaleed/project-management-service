import { Router } from "express";
import {
  addMeasurement,
  deleteMeasurement,
  getMeasurements,
} from "../Controller";
import { validateToken } from "../Middleware";

export const measurementRouter = Router();

measurementRouter.get("/", validateToken, getMeasurements);
measurementRouter.post("/", validateToken, addMeasurement);
measurementRouter.delete("/:id", validateToken, deleteMeasurement);
