import { Request, Response } from "express";
import { Customer } from "../Model";
import { AppDataSource } from "../data-source";

const customerRepository = AppDataSource.getRepository(Customer);

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10, search = "" } = req.query;

    const customers = await customerRepository
      .createQueryBuilder()
      .where("name ILIKE :search", { search: `%${search}%` })
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(customers);
  } catch (error) {
    console.error(error);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      bankAccountTitle,
      bankAccountNumber,
      contactPerson,
      landline,
      mobile,
      cnic,
      fax,
      ntn,
      strn,
      email,
      province,
      raServiceTax,
      bankHoldTax,
      incomeTax,
      address,
      city,
      shortBillGenerationLimit,
      isActive,
      advancePercentage,
      firstRunningPercentage,
      secondRunningPercentage,
    } = req.body;

    const data = {
      name,
      bankAccountTitle,
      bankAccountNumber,
      contactPerson,
      landline,
      mobile,
      cnic,
      fax,
      ntn,
      strn,
      email,
      province,
      raServiceTax,
      bankHoldTax,
      incomeTax,
      address,
      city,
      shortBillGenerationLimit,
      isActive,
      advancePercentage,
      firstRunningPercentage,
      secondRunningPercentage,
    };

    if (id) {
      const response = await customerRepository.update(id, data);
      if (response) {
        return res.status(200).send("Customer updated");
      } else {
        return res.status(404).send("Customer does not exist");
      }
    } else {
      res.status(500).send("Failed to update customer");
    }
  } catch (error) {
    console.error(error);
  }
};

export const getCustomersStats = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10 } = req.query;

    const [customers, totalCustomers] = await Promise.all([
      customerRepository
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.projects", "project")
      .leftJoinAndSelect("project.invoices", "invoice")
      .select("customer.id", "customerId")
      .addSelect("customer.name", "customerName")
      .addSelect("customer.advancePercentage", "customerAdvancePercentage")
      .addSelect("customer.firstRunningPercentage", "customerFirstRunningPercentage")
      .addSelect("customer.secondRunningPercentage", "customerSecondRunningPercentage")
      .addSelect("COUNT(DISTINCT CASE WHEN project.type = 'NEW' THEN project.id ELSE NULL END)", "newProjectsCount")
      .addSelect("COUNT(DISTINCT CASE WHEN project.type = 'NEW' THEN project.id ELSE NULL END) - COUNT(DISTINCT CASE WHEN project.type = 'NEW' AND invoice.id IS NOT NULL AND invoice.paymentType = 'Final Payment' AND invoice.paymentPost = TRUE THEN project.id ELSE NULL END)", "pendingNewProjectsCount")
      .addSelect("COUNT(DISTINCT CASE WHEN project.type = 'NEW' AND invoice.id IS NOT NULL AND invoice.paymentType = 'Final Payment' AND invoice.paymentPost = TRUE THEN project.id ELSE NULL END)", "completedNewProjectsCount")
      .addSelect("COUNT(DISTINCT CASE WHEN project.type = 'NEW' AND project.status = 'BLOCKED' THEN project.id ELSE NULL END)", "blockedNewProjectsCount")
      .addSelect("COUNT(DISTINCT CASE WHEN project.type = 'MAINTENANCE' THEN project.id ELSE NULL END)", "maintenanceProjectsCount")
      .addSelect("COUNT(DISTINCT CASE WHEN project.type = 'MAINTENANCE' AND invoice.id IS NULL THEN project.id ELSE NULL END)", "maintenanceProjectsWithoutInvoiceCount")
      .addSelect("COUNT(DISTINCT CASE WHEN project.type = 'MAINTENANCE' AND invoice.id IS NOT NULL AND invoice.paymentPost = FALSE THEN project.id ELSE NULL END)", "maintenanceProjectsWithUnpostedPaymentsCount")
      .addSelect("COUNT(DISTINCT CASE WHEN project.type = 'MAINTENANCE' AND invoice.id IS NOT NULL AND invoice.paymentPost = TRUE THEN project.id ELSE NULL END)", "maintenanceProjectsWithPostedPaymentsCount")
      .groupBy("customer.id")
      .addGroupBy("customer.name")
      .offset(Number(offset))
      .limit(Number(limit))
      .getRawMany(),
      customerRepository.count(),
    ]);

    return res.status(200).send([customers, totalCustomers]);
  } catch (error) {
    console.error(error);
  }
}
