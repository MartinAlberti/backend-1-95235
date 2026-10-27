import { Router } from "express";
const router = Router();
import ServiceManager from "../controllers/services.controller.js";

const serviceManager = new ServiceManager("./src/data/services.json");
router.get("/", async (req, res) => {
  const services = await serviceManager.getServices();
  res.status(200).json({ message: "TODOS LOS SERVICIOS", payload: services });
});

router.post("/", async (req, res) => {
  try {
    const result = await serviceManager.addService(req.body);
    res.status(201).json({ message: "Servicio creado", result });
  } catch (error) {
    res.status(500).json({ staus: "Error", error: error.message });
  }
});
export default router;
