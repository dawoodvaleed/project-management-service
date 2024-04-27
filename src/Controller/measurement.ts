import { Request, Response } from "express";
import { Measurement } from "../Model";
import { AppDataSource } from "../data-source";

const measurementRepository = AppDataSource.getRepository(Measurement);

export const getMeasurements = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10 } = req.query;

    const measurements = await measurementRepository
      .createQueryBuilder("measurement")
      .leftJoinAndSelect("measurement.project", "project")
      .leftJoinAndSelect("project.customer", "customer")
      .leftJoinAndSelect("measurement.item", "item")
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(measurements);
  } catch (error) {
    console.error(error);
  }
};

export const addMeasurement = async (req: Request, res: Response) => {
  try {
    const { date, description, itemId, projectId } = req.body;
    const data = {
      date,
      description,
      project: { id: projectId },
      item: { id: itemId },
    };

    const measurement = await measurementRepository.save(data);
    return res.status(200).send(measurement);
  } catch (error) {
    console.error(error);
  }
};
