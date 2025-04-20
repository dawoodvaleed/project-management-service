import { Router } from "express";
import { getCustomers, getCustomersStats, updateCustomer } from "../Controller";
import { validateToken } from "../Middleware";

export const customerRouter = Router();

customerRouter.get("/", validateToken, getCustomers);
customerRouter.get("/stats",validateToken, getCustomersStats);
customerRouter.put("/:id", validateToken, updateCustomer);
