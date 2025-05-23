import { Request, Response } from "express";
import { Measurement } from "../Model";
import { AppDataSource } from "../data-source";

const measurementRepository = AppDataSource.getRepository(Measurement);

export const getMeasurements = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10, projectId, projectType = 'NEW' } = req.query;

    let measurements: any = measurementRepository
      .createQueryBuilder("measurement")
      .leftJoinAndSelect("measurement.project", "project")
      .leftJoinAndSelect("project.customer", "customer")
      .leftJoinAndSelect("measurement.item", "item")
      .where("project.type = :projectType", { projectType });

    if (projectId) {
      measurements = measurements.andWhere("project.id = :projectId", {
        projectId,
      });
    }

    measurements = await measurements
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
    const {
      date,
      description,
      itemId,
      projectId,
      length,
      height,
      breadth,
      numberOfItems,
      location,
      rate,
      progressPercentage,
      bankComments,
    } = req.body;

    const data = {
      date,
      description,
      project: { id: projectId },
      item: { id: itemId },
      length: length || null,
      height: height || null,
      breadth: breadth || null,
      numberOfItems,
      location,
      rate,
      progressPercentage,
      bankComments,
    };

    const measurement = await measurementRepository.save(data);
    return res.status(200).send(measurement);
  } catch (error) {
    console.error(error);
  }
};

export const deleteMeasurement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id) {
      const response = await measurementRepository.delete(id as string);
      if (response.affected) {
        return res.status(200).send("Measurement deleted");
      } else {
        return res.status(404).send("Measurement does not exist");
      }
    } else {
      res.status(500).send("Failed to delete measurement");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateMeasurement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      date,
      description,
      length,
      height,
      breadth,
      numberOfItems,
      location,
      rate,
      progressPercentage,
      customerComments,
      bankComments,
    } = req.body;

    const data = {
      date,
      description,
      length,
      height,
      breadth,
      numberOfItems,
      location,
      rate,
      progressPercentage,
      customerComments,
      bankComments,
    };

    if (id) {
      const response = await measurementRepository.update(id, data);
      if (response) {
        return res.status(200).send("Measurement updated");
      } else {
        return res.status(404).send("Measurement does not exist");
      }
    } else {
      res.status(500).send("Failed to update measurement");
    }
  } catch (error) {
    console.error(error);
  }
};
