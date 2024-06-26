import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export interface CustomRequest extends Request {
  _id?: string;
}

export const validateJWT = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "invalid Token",
    });
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWTSECRET);
    req._id = _id;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "invalid Token",
    });
  }
};

export const validateJWTPass = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-token-pass");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Empty Token",
    });
  }
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_PASS);
    req._id = _id;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "invalid Token",
    });
  }
};
