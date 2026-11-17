import { Router } from "express";
import { validateBooking } from "../../middlewares/validateBooking.middleware.js";
import {getBookings,getBookingById, createBooking, addServiceToBooking} from '../../controllers/booking.controller.js'

const router = Router();

router.get('/', getBookings)
router.post("/", validateBooking, createBooking);

router.get("/:bid", getBookingById);

router.post("/:bid/services/:sid", addServiceToBooking);

export default router;
