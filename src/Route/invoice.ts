import { Router } from "express";
import { addInvoice, fetchInvoiceableProjects, } from "../Controller";
import { validateToken } from "../Middleware";

export const invoiceRouter = Router();

invoiceRouter.get("/", validateToken, fetchInvoiceableProjects);
invoiceRouter.post("/", validateToken, addInvoice);
