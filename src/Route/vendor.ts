import { Router } from "express";
import { getVendors } from "../Controller";
import { validateToken } from "../Middleware";

export const vendorRouter = Router();

vendorRouter.get("/", validateToken, getVendors);
