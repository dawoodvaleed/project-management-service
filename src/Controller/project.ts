import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Project } from "../Model";

const projectRepository = AppDataSource.getRepository(Project);

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10, search = "" } = req.query;

    const projects = await projectRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.customer", "customer")
      .where("project.id ILIKE :search", { search: `%${search}%` })
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(projects);
  } catch (error) {
    console.error(error);
  }
};

export const getProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id) {
      const project = await projectRepository.findOne({
        where: { id },
        relations: ["measurements", "measurements.item"],
      });
      if (project) {
        return res.status(200).send(project);
      } else {
        return res.status(404).send("Project does not exist");
      }
    } else {
      res.status(500).send("Failed to find Project");
    }
  } catch (error) {
    console.error(error);
  }
};

export const addProject = async (req: Request, res: Response) => {
  try {
    const {
      id,
      branch,
      city,
      region,
      natureOfWork,
      year,
      floor,
      description,
      budget,
      department,
      internalArea,
      externalArea,
      futureArea,
      elevationArea,
      constructionArea,
      status,
      blockReaon,
      isVerified,
      orderDate,
      completionDate,
      customerId,
    } = req.body;
    const data = {
      id,
      branch,
      city,
      region,
      natureOfWork,
      year,
      floor,
      description,
      budget,
      department,
      internalArea,
      externalArea,
      futureArea,
      elevationArea,
      constructionArea,
      status,
      blockReaon,
      isVerified,
      orderDate,
      completionDate,
      customer: { id: customerId },
    };

    const project = await projectRepository.save(data);
    return res.status(200).send(project);
  } catch (error) {
    console.error(error);
  }
};
