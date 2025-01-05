import { Router } from "express";
import { getCustomers, updateCustomer } from "../Controller";
import { validateToken } from "../Middleware";

export const customerRouter = Router();

customerRouter.get("/", validateToken, getCustomers);
customerRouter.put("/:id", validateToken, updateCustomer);
