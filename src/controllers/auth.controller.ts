import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate-jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const usuario = await UserModel.findOne({ email: email });
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "incorrect login information",
      });
    }

    const verifyPassword = bcrypt.compareSync(password, usuario.password);

    if (!verifyPassword) {
      return res.status(401).json({
        ok: false,
        msg: "incorrect login information",
      });
    }

    const token = await generateJWT(usuario._id, usuario.email);
    res.status(200).json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Contact Admin",
    });
  }
};

export const forgetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const usuario = await UserModel.findOne({ email: email });
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Email doesn't exist",
      });
    }
    const token = await generateJWT(
      usuario._id,
      usuario.email,
      "30m",
      process.env.JWT_SECRET_PASS
    );
    res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Contact Admin",
    });
  }
};

export const changePassword = async (req: CustomRequest, res: Response) => {
  const id = req._id;
  const { password } = req.body;
  try {
    if (!password) {
      res.status(400).json({
        ok: false,
        msg: "Por favor digite una contraseña valida",
      });
    }
    const newPassword = bcrypt.hashSync(password, 10);

    const updatePassword = await UserModel.findByIdAndUpdate(id, {
      password: newPassword,
    });
    if (!updatePassword) {
      res.status(400).json({
        ok: false,
        msg: "Error",
      });
    }

    res.status(200).json({
      ok: true,
      msg: "password updated",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error",
    });
  }
};
