import { Request, Response } from "express";
import { Item } from "../Model";
import { AppDataSource } from "../data-source";

const itemRepository = AppDataSource.getRepository(Item);

export const getItems = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10, search = "" } = req.query;

    const items = await itemRepository
      .createQueryBuilder("item")
      .where("item.id ILIKE :search", { search: `%${search}%` })
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(items);
  } catch (error) {
    console.error(error);
  }
};
