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
    const { email, password, username, address, contactNumber, roleId } =
      req.body;
    const data = {
      email,
      password: await bcrypt.hash(password, 10),
      username,
      address,
      contactNumber,
      role: { id: roleId },
    };

    const user = await userRepository.save(data);

    if (user) {
      const token = jwt.sign({ id: user.id }, jwtSpecialString, {
        expiresIn: "5h",
      });

      return res.status(200).send({ ...user, token });
    } else {
      return res.status(400).send("Details are not correct");
    }
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .where("user.email = :email")
      .select(["user.email", "user.password", "role"])
      .setParameters({ email })
      .getOne();

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      if (isSame) {
        const token = jwt.sign({ id: user.id }, jwtSpecialString, {
          expiresIn: "5h",
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

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { offset = 0, limit = 10 } = req.query;

    const roles = await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .offset(Number(offset))
      .limit(Number(limit))
      .getManyAndCount();

    return res.status(200).send(roles);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id) {
      const response = await userRepository.delete(id as string);
      if (response.affected) {
        return res.status(200).send('User deleted');
      } else {
        return res.status(400).send("Could not delete user");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
  }
};
