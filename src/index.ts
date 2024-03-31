import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import express from "express";
import { AppDataSource } from "./data-source";
import { projectRouter, userRouter, vendorRouter } from "./Route";

if (!process.env.PORT) {
  console.error(`No port value`);
}

const PORT = process.env.PORT;

AppDataSource.initialize().then(() => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.get("/", (req, res) => {
    return res.json("Established connection!");
  });

  app.use("/auth", userRouter);
  app.use("/vendor", vendorRouter);
  app.use("/project", projectRouter);

  return app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
