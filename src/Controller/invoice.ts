import { Request, Response } from "express";
import { Invoice, Project } from "../Model";
import { AppDataSource } from "../data-source";

const invoiceRepository = AppDataSource.getRepository(Invoice);
const projectRepository = AppDataSource.getRepository(Project);

const paymentTypeToPercentage = {
  "Advance": "advancePercentage",
  "First Running": "firstRunningPercentage",
  "Second Running": "secondRunningPercentage",
}

export const addInvoice = async (req: Request, res: Response) => {
  try {
    const {
      projectId,
      paymentType,
    } = req.body;

    const project = await projectRepository.findOne({
      where: { id: projectId },
      relations: ["invoices", "customer"],
    });

    if (!project) {
      return res.status(404).send("Can not create Invoice because Project does not exist");
    }

    let percentage = 0;

    percentage = Number(project.customer[paymentTypeToPercentage[paymentType as keyof typeof paymentTypeToPercentage] as keyof typeof project.customer]);

    if (paymentType === "Short Bill") {
      percentage = 100;
    }

    if (!percentage) {
      return res.status(400).send("Invalid Payment Type");
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

export const getInvoice = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id) {
      const invoice = await invoiceRepository.findOne({
        where: { id: Number(id) },
        relations: ["project", "project.customer"],
      });
      if (invoice) {
        return res.status(200).send(invoice);
      } else {
        return res.status(404).send("Invoice does not exist");
      }
    } else {
      res.status(500).send("Failed to find Invoice");
    }
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

    const shouldBePresent = {
      "Advance": [],
      "First Running": ["Advance"],
      "Second Running": ["Advance", "First Running"],
    }
    const shouldBePresentPaymentTypes = shouldBePresent[paymentType as keyof typeof shouldBePresent];

    const invoiceableProjects = await projectRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.invoices", "invoices")
      .leftJoinAndSelect("project.customer", "customer")
      .where("project.customerId = :customerId", { customerId })
      .andWhere("project.year = :year", { year })
      .andWhere(qb => {
        const excludePaymentTypesSubQuery = qb
          .subQuery()
          .select("1")
          .from(Invoice, "subInvoice")
          .where("subInvoice.projectId = project.id")
          .andWhere("subInvoice.paymentType = :paymentType", { paymentType })
          .getQuery();
        return `NOT EXISTS ${excludePaymentTypesSubQuery}`;
      })
      .andWhere(qb => {
        if (shouldBePresentPaymentTypes.length > 0) {
          const checkPaidInvoicesSubQuery = qb
            .subQuery()
            .select("COUNT(DISTINCT paidInvoice.paymentType)")
            .from(Invoice, "paidInvoice")
            .where("paidInvoice.projectId = project.id")
            .andWhere("paidInvoice.paymentPost = true")
            .andWhere("paidInvoice.paymentType IN (:...shouldBePresentPaymentTypes)", { shouldBePresentPaymentTypes })
            .getQuery();
          return `(${checkPaidInvoicesSubQuery}) = :paymentTypesCount`;
        } else {
          return `1 = 1`;
        }
      })
      .setParameter("paymentTypesCount", shouldBePresentPaymentTypes.length)
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(invoiceableProjects);
  } catch (error) {
    console.error(error);
  }
};

export const fetchShortBillProjects = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10, customerId } = req.query;

    if (!customerId) {
      return res.status(400).send("Missing required parameters");
    }

    const shortBillableProjects = await projectRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.invoices", "invoices")
      .leftJoinAndSelect("project.customer", "customer")
      .where("project.customerId = :customerId", { customerId })
      .andWhere("project.type = :type", { type: "MAINTENANCE" })
      .andWhere(qb => {
        const excludeProjectsWithInvoicesSubQuery = qb
          .subQuery()
          .select("1")
          .from(Invoice, "subInvoice")
          .where("subInvoice.projectId = project.id")
          .getQuery();
        return `NOT EXISTS ${excludeProjectsWithInvoicesSubQuery}`;
      })
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(shortBillableProjects);
  } catch (error) {
    console.error(error);
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10 } = req.query;

    const invoices = await invoiceRepository
      .createQueryBuilder("invoice")
      .leftJoinAndSelect("invoice.project", "project")
      .leftJoinAndSelect("project.customer", "customer")
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(invoices);
  } catch (error) {
    console.error(error);
  }
};

export const postPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { iom, bankPaymentReference } = req.body;

    const data = { paymentPost: true, iom, bankPaymentReference };

    if (id && iom && bankPaymentReference) {
      const response = await invoiceRepository.update(id, data);
      if (response) {
        return res.status(200).send(`Payment Posted for Invoice ID: ${id}`);
      } else {
        return res.status(404).send("Invoice does not exist");
      }
    } else {
      res.status(500).send("Failed to post payment");
    }
  } catch (error) {
    console.error(error);
  }
};
