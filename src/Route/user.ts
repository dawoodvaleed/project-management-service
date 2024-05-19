import { Router } from "express";
import { signup, login, getUsers, deleteUser } from "../Controller";
import { checkExistingUser, validateToken } from "../Middleware";

export const userRouter = Router();

userRouter.post("/auth/signup", validateToken, checkExistingUser, signup);
userRouter.post("/auth/login", login);
userRouter.get("/user", validateToken, getUsers);
userRouter.delete("/user/:id", validateToken, deleteUser);
