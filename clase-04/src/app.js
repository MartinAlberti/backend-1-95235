import express from "express";
import RoutingDetector from "./middlewares/routingDetector.middleware.js";
import servicesRouterV1 from "./routes/v1/services.routes.js";
import bookingsRouterV1 from "./routes/v1/bookings.routes.js";
import bookingsRouterV2 from './routes/v2/bookings.routes.js'
// settings
const app = express();

// middlewares
app.use(express.json());
app.use(RoutingDetector)
// routes
app.use("/api/v1/services", servicesRouterV1);
app.use("/api/v1/bookings", bookingsRouterV1)
app.use("/api/v2/bookings", bookingsRouterV2)

export default app;
