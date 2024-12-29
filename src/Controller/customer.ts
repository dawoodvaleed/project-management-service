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
