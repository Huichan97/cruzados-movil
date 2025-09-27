import { Router } from "express";
import { MealController } from "../controllers/meal.controller";

const route = Router();

route.get("/", MealController.getAll);
route.post("/", MealController.create);

export default route;