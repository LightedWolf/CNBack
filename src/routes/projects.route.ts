import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import {
  createProject,
  deleteProject,
  getAProject,
  getAllProjects,
  getCostumerProjects,
  updateProject,
} from "../controllers/projects.controller";

const route = Router();

route.post(
  "/",
  validateJWT,
  [
    check("name", "Name is required").not().isEmpty(),
    check("costumer", "Costumer is required").not().isEmpty(),
    check("state", "State is required").not().isEmpty(),
    check("createdBy", "id not recognized").not().isEmpty(),
    validateFields,
  ],
  createProject
);
route.get("/all/:id", validateJWT, getAllProjects);
route.get("/:id", validateJWT, getAProject);
route.get("/:costumer/:id", validateJWT, getCostumerProjects);
route.put("/:id", validateJWT, updateProject);
route.delete("/:id", validateJWT, deleteProject);

export default route;
