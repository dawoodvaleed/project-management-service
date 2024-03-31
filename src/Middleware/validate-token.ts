import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwtSpecialString = process.env.JWT_SPECIAL_STRING as string;

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    headers: { authorization },
  } = req;
  try {
    if (authorization) {
      jwt.verify(authorization as string, jwtSpecialString, (err) => {
        if (err) {
          return res.status(401).send("Invalid token");
        }
        next();
      });
    } else {
      return res.status(401).send("Unauthorized");
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};
