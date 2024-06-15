import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import cors from "cors";
import userRoutes from "./routes/user.route";
import loginRoutes from "./routes/auth.route";
import financeReportsRoutes from "./routes/financeReports.route";
import projectsRoutes from "./routes/projects.route";
import costumerRoutes from "./routes/costumer.route";

class Server {
  private app: Application;
  private port: string;
  private apiPath = {
    user: "/api/v1/user",
    auth: "/api/v1/login",
    financeReports: "/api/v1/financeReports",
    projects: "/api/v1/projects",
    costumers: "/api/v1/costumers",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    dbConnection();

    this.middlewares();
    this.routes();
    // Metodos Iniciales
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.firstApi();
  }

  routes(): void {
    this.app.use(this.apiPath.user, userRoutes);
    this.app.use(this.apiPath.auth, loginRoutes);
    this.app.use(this.apiPath.financeReports, financeReportsRoutes);
    this.app.use(this.apiPath.projects, projectsRoutes);
    this.app.use(this.apiPath.costumers, costumerRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor Corriendo por el puerto", this.port);
    });
  }

  firstApi() {
    this.app.get("/", (req: Request, res: Response) =>
      res.status(200).json({ msg: "Server Up" })
    );
  }
}

export default Server;
