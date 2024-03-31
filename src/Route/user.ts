import { Router } from "express";
import { signup, login } from "../Controller";
import { checkExistingUser } from "../Middleware";

export const userRouter = Router();

userRouter.post("/signup", checkExistingUser, signup);
userRouter.post("/login", login);
