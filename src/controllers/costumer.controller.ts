import { Request, Response } from "express";
import CostumerModel from "../models/costumer.model";

export const createCostumer = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newCostumer = new CostumerModel({
      ...body,
    });
    const costumerCreated = await newCostumer.save();
    res.status(200).json({
      ok: true,
      msg: "Costumer created",
      costumerCreated,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error comunicated Admin",
    });
  }
};

export const getAllCostumers = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const allCostumers = await CostumerModel.find({ createdBy: id });
    res.json({
      ok: true,
      allCostumers,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Costumers not found",
    });
  }
};

export const getACostumer = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const costumer = await CostumerModel.findOne({
      email: email,
    });
    res.json({
      ok: true,
      costumer,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Costumer not found",
    });
  }
};

export const updateCostumer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const costumer = await CostumerModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.json({
      ok: true,
      msg: "Costumer Updated",
      costumer,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Costumer not updated",
    });
  }
};

export const deleteCostumer = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const costumer = await CostumerModel.findByIdAndDelete({ _id: id });
    res.json({
      ok: true,
      msg: "Costumer deleted",
      costumer,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Costumer not found",
    });
  }
};
