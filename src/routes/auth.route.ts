import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import {
  changePassword,
  forgetPassword,
  login,
} from "../controllers/auth.controller";
import { validateJWT, validateJWTPass } from "../middlewares/validate-jwt";

const route = Router();

route.post(
  "/",
  [
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("password", "Password is required")
      .not()
      .isEmpty()
      .isStrongPassword(),
    validateFields,
  ],
  login
);
route.post(
  "/resetpassword",
  [check("email", "email is required").not().isEmpty().isEmail()],
  forgetPassword
);

route.put(
  "/changepassword",
  validateJWTPass,
  [
    check("password", "password is required")
      .not()
      .isEmpty()
      .isStrongPassword(),
    validateFields,
  ],
  changePassword
);
export default route;
