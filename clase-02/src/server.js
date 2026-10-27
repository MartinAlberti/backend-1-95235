import express from "express";
import servicesRouter from "./routes/services.routes.js";
import RoutingDetector from "./middlewares/routingDetector.middleware.js";
// settings
const app = express();

// middlewares
app.use(express.json());
app.use(RoutingDetector)
// routes
app.use("/api/services", servicesRouter);

export default app;
