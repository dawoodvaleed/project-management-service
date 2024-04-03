import { Router } from "express";
import { signup, login, getUsers } from "../Controller";
import { checkExistingUser, validateToken } from "../Middleware";

export const userRouter = Router();

userRouter.post("/auth/signup", checkExistingUser, signup);
userRouter.post("/auth/login", login);
userRouter.get("/user", validateToken, getUsers);
