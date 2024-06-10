import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";
import {
  createCostumer,
  deleteCostumer,
  getACostumer,
  getAllCostumers,
  updateCostumer,
} from "../controllers/costumer.controller";

const route = Router();

route.post(
  "/",
  validateJWT,
  [
    check("name", "Description is required").not().isEmpty(),
    check("phone", "Phone is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("createdBy", "Type is required").not().isEmpty(),
    validateFields,
  ],
  createCostumer
);
route.get("/all/:id", validateJWT, getAllCostumers);
// route.get("/", validateJWT, getACostumer);
route.get("/:email", validateJWT, getACostumer);
route.put("/:id", validateJWT, updateCostumer);
route.delete("/:id", validateJWT, deleteCostumer);

export default route;
