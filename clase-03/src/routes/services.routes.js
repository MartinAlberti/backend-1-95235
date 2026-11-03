import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";
import { validateService } from "../middlewares/validateService.middleware.js";

const router = Router();

const serviceManager = new ServiceManager("./src/data/services.json");

router.get("/", async (req, res) => {
  try {
    const services = await serviceManager.getServices();

    res.json({
      payload: services,
      status: "Ok",
    });
  } catch (error) {
    res.status(500).json({
      status: "NotOk",
      message: "Error al obtener los servicios",
    });
  }
});

router.get("/:sid", async (req, res) => {
  try {
    const service = await serviceManager.getServiceById(req.params.sid);

    if (!service) {
      return res.status(404).json({
        status: "NotOk",
        message: "Servicio no encontrado",
      });
    }

    res.json({
      payload: service,
      status: "Ok",
    });
  } catch (error) {
    res.status(500).json({
      status: "NotOk",
      message: "Error al obtener el servicio",
    });
  }
});

router.post("/", validateService, async (req, res) => {
  try {
    const result = await serviceManager.addService(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      status: "NotOk",
      message: "Error al crear el servicio",
    });
  }
});

router.put("/:sid", validateService, async (req, res) => {
  try {
    const result = await serviceManager.updateService(req.params.sid, req.body);

    if (result.status === "NotOk") {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: "NotOk",
      message: "Error al actualizar el servicio",
    });
  }
});

router.delete("/:sid", async (req, res) => {
  try {
    const result = await serviceManager.deleteService(req.params.sid);

    if (result.status === "NotOk") {
      return res.status(404).json(result);
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({
      status: "NotOk",
      message: "Error al eliminar el servicio",
    });
  }
});

export default router;
