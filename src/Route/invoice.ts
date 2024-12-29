import { Router } from "express";
import { addInvoice, fetchInvoiceableProjects, getInvoices } from "../Controller";
import { validateToken } from "../Middleware";

export const invoiceRouter = Router();

invoiceRouter.get("/", validateToken, getInvoices);
invoiceRouter.get("/invoiceable-projects", validateToken, fetchInvoiceableProjects);
invoiceRouter.post("/", validateToken, addInvoice);
