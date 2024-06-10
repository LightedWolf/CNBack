import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { validateJWT } from "../middlewares/validate-jwt";
import {
  createReport,
  deleteReport,
  getAReport,
  getAllReports,
  getMonthReports,
  getMonthlySummary,
  getWeekReports,
  getWeekSales,
  getWeeklySummary,
  updateReport,
} from "../controllers/financeReports.controller";

const route = Router();

route.post(
  "/",
  validateJWT,
  [
    check("description", "Description is required").not().isEmpty(),
    check("type", "Type is required").not().isEmpty(),
    check("value", "value is required").not().isEmpty().isNumeric(),
    check("createdBy", "id not recognized").not().isEmpty(),
    check("date", "Date invalid").not().isEmpty(),
    validateFields,
  ],
  createReport
);
route.get("/all/:id", validateJWT, getAllReports);
route.get("/:id", validateJWT, getAReport);
route.get("/week/:id", validateJWT, getWeekReports);
route.get("/month/:id", validateJWT, getMonthReports);
route.put("/:id", validateJWT, updateReport);
route.delete("/:id", validateJWT, deleteReport);

// Finance Balance
route.get("/week-balance/:id", validateJWT, getWeeklySummary);
route.get("/month-balance/:id", validateJWT, getMonthlySummary);
route.get("/week-sales/:id", validateJWT, getWeekSales);
export default route;
