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
        relations: ["measurements", "measurements.item", "customer"],
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

export const getProjectProgressDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { projectId = "", customerId = "", natureOfWork = "" } = req.query;

    const projects = await projectRepository
      .createQueryBuilder("project")
      .leftJoinAndSelect("project.customer", "customer")
      .leftJoinAndSelect("project.measurements", "measurements")
      .leftJoinAndSelect("measurements.item", "item")
      .where(
        "project.id ILIKE :projectId AND customer.id ILIKE :customerId AND project.natureOfWork ILIKE :natureOfWork",
        {
          projectId: `%${projectId}%`,
          customerId: `%${customerId}%`,
          natureOfWork: `%${natureOfWork}%`,
        }
      )
      .getMany();

    const projectsWithProgress = projects.map(
      ({ measurements, ...otherProps }) => {
        const projectProgress: any = {};
        let totalMeasurements = 0;
        let totalProjectProgressPercentage = 0;

        measurements.forEach(({ item: { work }, progressPercentage }) => {
          totalMeasurements = totalMeasurements + 1;
          totalProjectProgressPercentage =
            totalProjectProgressPercentage + Number(progressPercentage);
          if (projectProgress[work]) {
            projectProgress[work] = {
              progressPercentage:
                Number(projectProgress[work].progressPercentage) +
                Number(progressPercentage),
              noOfMeasurements: projectProgress[work].noOfMeasurements + 1,
            };
          } else {
            projectProgress[work] = {
              progressPercentage: progressPercentage,
              noOfMeasurements: 1,
            };
          }
        });

        Object.keys(projectProgress).map((key) => {
          const totalPercentage =
            (100 / totalMeasurements) * projectProgress[key].noOfMeasurements;
          const completedPercentage =
            (projectProgress[key].progressPercentage /
              projectProgress[key].noOfMeasurements /
              100) *
            (totalPercentage / 100) *
            100;

          delete projectProgress[key].progressPercentage;

          projectProgress[key].totalProgressPercentage =
            totalPercentage.toFixed(2);
          projectProgress[key].completedPercentage =
            completedPercentage.toFixed(2);
        });

        projectProgress.totalAverage =
          measurements.length > 0
            ? (totalProjectProgressPercentage / totalMeasurements).toFixed(2)
            : 0;

        return {
          ...otherProps,
          projectProgress,
        };
      }
    );

    return res.status(200).send(projectsWithProgress);
  } catch (error) {
    console.error(error);
  }
};
