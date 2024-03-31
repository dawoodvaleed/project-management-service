import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwtSpecialString = process.env.JWT_SPECIAL_STRING as string;

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    headers: { authentication },
  } = req;
  try {
    if (authentication) {
      jwt.verify(authentication as string, jwtSpecialString, (err) => {
        if (err) {
          return res.status(401).send("Invalid token");
        }
        next();
      });
    }
  } catch (error) {
    console.error(error);
  }
};
