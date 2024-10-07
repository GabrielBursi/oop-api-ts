import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import { ClientRouter } from "./routes";
import { ErrorHandler } from "./helpers";

export class App {
    private readonly app: Application;
    private readonly port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || "3000");
        this.init();
    }

    private init() {
        this.initConfig();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
    }

    private initConfig() {
        // new Database();
    }

    private initMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        dotenv.config();
    }

    private initRoutes() {
        this.app.use("/api/v1/users", new ClientRouter().router);
    }

    private initErrorHandling() {
        this.app.use(ErrorHandler.notFound);
        this.app.use(ErrorHandler.serverError);
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}