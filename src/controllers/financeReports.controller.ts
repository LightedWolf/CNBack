import { Request, Response } from "express";
import FinanceReportModel from "../models/financeReport.model";

export const createReport = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const newReport = new FinanceReportModel({
      ...body,
    });
    const reportCreated = await newReport.save();
    res.status(200).json({
      ok: true,
      msg: "Report created",
      report: reportCreated,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error, comunicated Admin",
    });
  }
};

export const getAllReports = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const allReports = await FinanceReportModel.find({ createdBy: id });
    res.json({
      ok: true,
      allReports,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Report not found",
    });
  }
};

export const getAReport = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const report = await FinanceReportModel.findById({ _id: id });
    res.json({
      ok: true,
      report,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Report not found",
    });
  }
};

export const getWeekReports = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const weekReports = await FinanceReportModel.find({
      createdBy: id,
      date: { $gte: sevenDaysAgo, $lte: today },
    });
    res.json({
      ok: true,
      weekReports,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Report not found",
    });
  }
};

export const getMonthReports = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const monthReports = await FinanceReportModel.find({
      createdBy: id,
      date: { $gte: thirtyDaysAgo, $lte: today },
    });
    res.json({
      ok: true,
      monthReports,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Report not found",
    });
  }
};

export const updateReport = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;

    const report = await FinanceReportModel.findByIdAndUpdate(
      { _id: id },
      body,
      { new: true }
    );
    res.json({
      ok: true,
      msg: "Report updated",
      report,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Report not updated",
    });
  }
};

export const deleteReport = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const report = await FinanceReportModel.findByIdAndDelete({ _id: id });
    res.json({
      ok: true,
      msg: "Report deleted",
      report,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Report Deleted",
    });
  }
};

export const getWeeklySummary = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const weekReports = await FinanceReportModel.find({
      createdBy: id,
      date: { $gte: sevenDaysAgo, $lte: today },
    });
    console.log(weekReports);

    let weeklyIncome = 0;
    let weeklyExpense = 0;
    for (let report of weekReports) {
      if (report.type === "Expense") {
        weeklyExpense += report.value;
      }
      if (report.type === "Income") {
        weeklyIncome += report.value;
      }
    }
    const weeklyBalance = weeklyIncome - weeklyExpense;
    res.json({
      ok: true,
      weeklySummary: {
        income: weeklyIncome,
        expenses: weeklyExpense,
        weeklyBalance: weeklyBalance,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Balance not found",
    });
  }
};

export const getMonthlySummary = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 31);

    const monthReports = await FinanceReportModel.find({
      createdBy: id,
      date: { $gte: thirtyDaysAgo, $lte: today },
    });

    let monthlyIncome = 0;
    let monthlyExpense = 0;
    for (let report of monthReports) {
      if (report.type === "Expense") {
        monthlyExpense += report.value;
      }
      if (report.type === "Income") {
        monthlyIncome += report.value;
      }
    }
    const monthlyBalance = monthlyIncome - monthlyExpense;
    res.json({
      ok: true,
      monthlySummary: {
        income: monthlyIncome,
        expenses: monthlyExpense,
        monthlyBalance: monthlyBalance,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Balance not found",
    });
  }
};

export const getWeekSales = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const weekSales = await FinanceReportModel.find({
      createdBy: id,
      date: { $gte: sevenDaysAgo, $lte: today },
      type: "Income",
    });
    res.json({
      ok: true,
      weekSales,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Report not found",
    });
  }
};
