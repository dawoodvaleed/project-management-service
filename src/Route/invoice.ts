import { Router } from "express";
import { addInvoice, fetchInvoiceableProjects, fetchShortBillProjects, getInvoice, getInvoices, postPayment } from "../Controller";
import { validateToken } from "../Middleware";

export const invoiceRouter = Router();

invoiceRouter.get("/", validateToken, getInvoices);
invoiceRouter.get("/invoiceable-projects", validateToken, fetchInvoiceableProjects);
invoiceRouter.get("/short-bill-projects", validateToken, fetchShortBillProjects);
invoiceRouter.get("/:id", validateToken, getInvoice);
invoiceRouter.post("/", validateToken, addInvoice);
invoiceRouter.put("/post-payment/:id", validateToken, postPayment);
