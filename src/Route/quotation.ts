import { Router } from "express";
import {
  addQuotation,
  deleteQuotation,
  getQuotations,
  updateQuotation,
} from "../Controller";
import { validateToken } from "../Middleware";

export const quotationRouter = Router();

quotationRouter.get("/", validateToken, getQuotations);
quotationRouter.post("/", validateToken, addQuotation);
quotationRouter.put("/:id", validateToken, updateQuotation);
quotationRouter.delete("/:id", validateToken, deleteQuotation);
