import { Model, Schema, model } from "mongoose";

const FinanceReportSchema = new Schema({
  costumer: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: "COP",
  },
  value: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  project: {
    type: String,
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const FinanceReportModel: Model<any> = model(
  "financeReports",
  FinanceReportSchema
);

export default FinanceReportModel;
