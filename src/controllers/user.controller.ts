import { Response, Request } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const { email, password } = body;
  try {
    const emailExist = await UserModel.findOne({ email: email });

    if (emailExist) {
      return res.status(409).json({
        ok: false,
        msg: `this email already exist ${email}`,
      });
    }

    const newUser = new UserModel({
      ...body,
    });

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);

    const userCreated = await newUser.save();

    res.status(200).json({
      ok: true,
      msg: "Created User",
      user: userCreated,
    });
  } catch (error) {
    console.error;
    res.status(400).json({
      ok: false,
      msg: "Error, comunicated Admin",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json({
      ok: true,
      users,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Users not found",
    });
  }
};

export const getAUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById({ _id: id });
    res.json({
      ok: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "User id not found",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;

    const user = await UserModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.json({
      ok: true,
      msg: "User update: ",
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "User not updated",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByIdAndDelete({ _id: id });
    res.json({
      ok: true,
      msg: "User deleted: ",
      user,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "User id not found",
    });
  }
};
