import dotenv from "dotenv";
import Server from "./src/server";

// Configuracion .env

dotenv.config();

const server = new Server();
server.listen();
