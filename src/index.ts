import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import express from "express";
import { AppDataSource } from "./data-source";
import {
  projectRouter,
  userRouter,
  customerRouter,
  roleRouter,
  itemRouter,
  measurementRouter,
} from "./Route";
import { quotationRouter } from "./Route/quotation";

if (!process.env.PORT) {
  console.error(`No port value`);
}

const PORT = process.env.PORT;

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.options("*", cors());

  app.get("/", (_, res) => {
    return res.json("Established connection!");
  });

  app.use("/", userRouter);
  app.use("/customer", customerRouter);
  app.use("/project", projectRouter);
  app.use("/item", itemRouter);
  app.use("/measurement", measurementRouter);
  app.use("/role", roleRouter);
  app.use("/quotation", quotationRouter);

  return app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
