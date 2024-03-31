import "dotenv/config";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Model";
import { AppDataSource } from "../data-source";

const userRepository = AppDataSource.getRepository(User);

const jwtSpecialString = process.env.JWT_SPECIAL_STRING as string;

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = {
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await userRepository.save(data);

    if (user) {
      const token = jwt.sign({ id: user.id }, jwtSpecialString, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).send({ ...user, token });
    } else {
      return res.status(400).send("Details are not correct");
    }
  } catch (error) {
    console.error(error);
  }
};

//login authentication

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const token = jwt.sign({ id: user.id }, jwtSpecialString, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).send({ ...user, token });
      } else {
        return res.status(400).send("Authentication failed");
      }
    } else {
      return res.status(400).send("Authentication failed");
    }
  } catch (error) {
    console.error(error);
  }
};
