import { Router } from "express";
import { addInvoice, fetchInvoiceableProjects, getInvoice, getInvoices, postPayment } from "../Controller";
import { validateToken } from "../Middleware";

export const invoiceRouter = Router();

invoiceRouter.get("/", validateToken, getInvoices);
invoiceRouter.get("/:id", validateToken, getInvoice);
invoiceRouter.get("/invoiceable-projects", validateToken, fetchInvoiceableProjects);
invoiceRouter.post("/", validateToken, addInvoice);
invoiceRouter.put("/post-payment/:id", validateToken, postPayment);
