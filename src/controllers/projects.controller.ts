import { Request, Response } from "express";
import ProjectModel from "../models/project.model";

export const createProject = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const newProject = new ProjectModel({
      ...body,
    });
    const projectCreated = await newProject.save();
    res.status(200).json({
      ok: true,
      msg: "project created",
      project: projectCreated,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error comunicated Admin",
    });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const allProjects = await ProjectModel.find({ owner: id });
    res.json({
      ok: true,
      allProjects,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Projects not found",
    });
  }
};

export const getAProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await ProjectModel.findById({ _id: id });
    res.json({
      ok: true,
      project,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Project not found",
    });
  }
};

export const getCostumerProjects = async (req: Request, res: Response) => {
  try {
    const costumer = req.params.costumer;
    const id = req.params.id;

    const costumerProjects = await ProjectModel.find({
      createdBy: id,
      costumer: costumer,
    });
    res.json({
      ok: true,
      costumerProjects,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Costumer hasn't projects",
    });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const project = await ProjectModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    res.json({
      ok: true,
      msg: "Project updated",
      project,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "project not updated",
    });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const project = await ProjectModel.findByIdAndDelete({ _id: id });
    res.json({
      ok: true,
      msg: "Project deleted: ",
      project,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Project id not found",
    });
  }
};
