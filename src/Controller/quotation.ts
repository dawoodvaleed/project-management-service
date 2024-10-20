import { Request, Response } from "express";
import { Quotation } from "../Model";
import { AppDataSource } from "../data-source";

const quotationRepository = AppDataSource.getRepository(Quotation);

export const getQuotations = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10, projectId } = req.query;

    let quotations: any = quotationRepository
      .createQueryBuilder("quotation")
      .leftJoinAndSelect("quotation.project", "project")
      .leftJoinAndSelect("project.customer", "customer")
      .leftJoinAndSelect("quotation.item", "item");

    if (projectId) {
      quotations = quotations.where("project.id = :projectId", {
        projectId,
      });
    }

    quotations = await quotations
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(quotations);
  } catch (error) {
    console.error(error);
  }
};

export const addQuotation = async (req: Request, res: Response) => {
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

    const quotation = await quotationRepository.save(data);
    return res.status(200).send(quotation);
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuotation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id) {
      const response = await quotationRepository.delete(id as string);
      if (response.affected) {
        return res.status(200).send("Quotation deleted");
      } else {
        return res.status(404).send("Quotation does not exist");
      }
    } else {
      res.status(500).send("Failed to delete quotation");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateQuotation = async (req: Request, res: Response) => {
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
      const response = await quotationRepository.update(id, data);
      if (response) {
        return res.status(200).send("Quotation updated");
      } else {
        return res.status(404).send("Quotation does not exist");
      }
    } else {
      res.status(500).send("Failed to update quotation");
    }
  } catch (error) {
    console.error(error);
  }
};
