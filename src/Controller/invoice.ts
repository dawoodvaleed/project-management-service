import { Request, Response } from "express";
import { Invoice, Project } from "../Model";
import { AppDataSource } from "../data-source";

const invoiceRepository = AppDataSource.getRepository(Invoice);
const projectRepository = AppDataSource.getRepository(Project);

export const addInvoice = async (req: Request, res: Response) => {
  try {
    const {
      projectId,
      paymentType,
      percentage,
    } = req.body;

    const project = await projectRepository.findOne({
      where: { id: projectId },
      relations: ["invoices"],
    });

    if (!project) {
      return res.status(404).send("Can not create Invoice because Project does not exist");
    }
    const requestedAmount = project.budget * (percentage / 100);
    const paidAmount = project.invoices.reduce((acc, invoice) => acc + invoice.requestedAmount, 0);

    const data = {
      project: { id: projectId },
      paymentType,
      paidAmount,
      requestedAmount,
      balance: project.budget - paidAmount - requestedAmount,
      percentage,
    };

    const invoice = await invoiceRepository.save(data);

    return res.status(200).send(invoice);
  } catch (error) {
    console.error(error);
  }
};

export const fetchInvoiceableProjects = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10, paymentType, year, customerId } = req.query;

    if (!paymentType || !year || !customerId) {
      return res.status(400).send("Missing required parameters");
    }

    const invoiceableProjects = await projectRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.invoices", "invoices")
      .where("project.customerId = :customerId", { customerId })
      .andWhere("project.year = :year", { year })
      .andWhere("(invoices.id IS NULL OR invoices.paymentType != :paymentType)", { paymentType })
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(invoiceableProjects);
  } catch (error) {
    console.error(error);
  }
};
