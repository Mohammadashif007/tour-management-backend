/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import { app } from "./app";

let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://ashifxp007:J192AXhMp4B3foFg@cluster0.b816vjf.mongodb.net/tour-management-backend?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log("connected to mongoDB");
        server = app.listen(5000, () => {
            console.log("Welcome to the fare haven");
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
