import { Request, Response } from "express";
import { Role } from "../Model";
import { AppDataSource } from "../data-source";

const roleRepository = AppDataSource.getRepository(Role);

export const getRoles = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10 } = req.query;

    const roles = await roleRepository
      .createQueryBuilder()
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(roles);
  } catch (error) {
    console.error(error);
  }
};

export const addRole = async (req: Request, res: Response) => {
  try {
    const { id, name, description, status, permissions } = req.body;
    const data = { id, name, description, status, permissions };

    const role = await roleRepository.save(data);
    return res.status(200).send(role);
  } catch (error) {
    console.error(error);
  }
};
