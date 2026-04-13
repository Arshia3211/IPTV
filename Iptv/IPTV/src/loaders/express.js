import express from "express";
import cors from "cors"; 
import helmet from "helmet"; // secures app 
import { authenticate } from "../middleware/index.js";
import { protectedRouter, unProtectedRouter } from "../routes/index.js"; // Importing routers for protected and unprotected routes

export default async function expressLoader({ app }) {

	app.use(cors());
	app.use(helmet());

	// parse from data 
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// unprotected routes
	app.use("/", unProtectedRouter);
	// protected routes	
	app.use("/", authenticate, protectedRouter);
}