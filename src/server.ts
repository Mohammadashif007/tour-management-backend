/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);
        console.log("connected to mongoDB");
        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening on ${envVars.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();

process.on("unhandledRejection", (error) => {
    console.log("❌ Unhandled rejection ", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("uncaughtException", (error) => {
    console.log(
        "❌ Uncaught exception detected... server is shutting down",
        error
    );
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on("SIGTERM", (error) => {
    console.log("❌ SIGTERM signal received... server is shutting down", error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
