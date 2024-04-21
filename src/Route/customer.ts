import { Router } from "express";
import { getCustomers } from "../Controller";
import { validateToken } from "../Middleware";

export const customerRouter = Router();

customerRouter.get("/", validateToken, getCustomers);
