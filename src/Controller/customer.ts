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
      .select("customer.id", "customerId")
      .addSelect("customer.name", "customerName")
      .addSelect("SUM(CASE WHEN project.type = 'NEW' THEN 1 ELSE 0 END)", "newProjectsCount")
      .addSelect("SUM(CASE WHEN project.type = 'MAINTENANCE' THEN 1 ELSE 0 END)", "maintenanceProjectsCount")
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
