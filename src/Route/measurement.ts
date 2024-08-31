import { Router } from "express";
import {
  addMeasurement,
  deleteMeasurement,
  getMeasurements,
  updateMeasurement,
} from "../Controller";
import { validateToken } from "../Middleware";

export const measurementRouter = Router();

measurementRouter.get("/", validateToken, getMeasurements);
measurementRouter.post("/", validateToken, addMeasurement);
measurementRouter.patch("/:id", validateToken, updateMeasurement);
measurementRouter.delete("/:id", validateToken, deleteMeasurement);
