import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";

import { AddressRouter, CartRouter, ClientRouter, OrderRouter, ProductRouter } from "./routes";
import { ErrorHandler } from "./helpers";
import { Database } from "./config";

export class App {
    private readonly app: Application;
    private readonly port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT ?? "3000");
    }

    async init() {
        dotenv.config();
        await this.initConfig();
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
    }

    private async initConfig() {
        await new Database().connect();
    }

    private initMiddlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initRoutes() {
        const v1Router = express.Router();
        v1Router.use("/address", new AddressRouter().router);
        v1Router.use("/cart", new CartRouter().router);
        v1Router.use("/client", new ClientRouter().router);
        v1Router.use("/order", new OrderRouter().router);
        v1Router.use("/product", new ProductRouter().router);
        this.app.use("/api/v1", v1Router);
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

