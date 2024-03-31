import { Request, Response } from "express";
import { Vendor } from "../Model";
import { AppDataSource } from "../data-source";

const vendorRepository = AppDataSource.getRepository(Vendor);

export const getVendors = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10 } = req.query;

    const vendors = await vendorRepository
      .createQueryBuilder()
      .offset(Number(offset))
      .limit(Number(limit))
      .getMany();

    return res.status(200).send(vendors);
  } catch (error) {
    console.error(error);
  }
};
