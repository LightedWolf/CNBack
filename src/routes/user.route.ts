import { Router } from "express";
import {
  createUser,
  getUsers,
  getAUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";

//path /api/v1/user

const route = Router();

route.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
      .isStrongPassword(),
    validateFields,
  ],
  createUser
);
route.get("/", validateJWT, getUsers);
route.get("/:id", validateJWT, getAUser);
route.put("/:id", validateJWT, updateUser);
route.delete("/:id", validateJWT, deleteUser);

export default route;
