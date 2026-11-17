import { Router } from "express";
import { validateService } from "../../middlewares/validateService.middleware.js";
import {getServices,getServiceById, addService, updatedService, deleteService} from '../../controllers/services.controller.js'

const router = Router();


router.get("/", getServices );

router.get("/:sid", getServiceById);

router.post("/", validateService, addService);

router.put("/:sid", validateService,updatedService );

router.delete("/:sid",deleteService);

export default router;
