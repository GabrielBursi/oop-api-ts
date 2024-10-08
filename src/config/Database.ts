import mongoose from "mongoose";

export class Database {
    private readonly URI: string;

    constructor() {
        this.URI =
            process.env.MONGO_URI ?? "mongodb://localhost:27017/express-mongo";
    }

    async connect() {
        try {
            await mongoose.connect(this.URI);
            console.log("Database connected successfully");
        } catch (error) {
            console.error("Database connection failed");
        }
    }
}
