import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Project } from "../Model";

const projectRepository = AppDataSource.getRepository(Project);

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10 } = req.query;

    const vendors = await projectRepository
      .createQueryBuilder()
      .offset(Number(offset))
      .limit(Number(limit))
      .getMany();

    return res.status(200).send(vendors);
  } catch (error) {
    console.error(error);
  }
};
