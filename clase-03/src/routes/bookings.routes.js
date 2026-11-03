import { Router } from "express";
import BookingManager from "../managers/BookingManager.js";
import { validateBooking } from "../middlewares/validateBooking.middleware.js";

const router = Router();

const bookingManager = new BookingManager(
  "./src/data/bookings.json",
  "./src/data/services.json",
);

router.post("/", validateBooking, async (req, res) => {
  try {
    const result = await bookingManager.createBooking(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "NotOk",
      message: "Error al crear la reserva",
    });
  }
});

router.get("/:bid", async (req, res) => {
  try {
    const booking = await bookingManager.getBookingById(req.params.bid);

    if (!booking) {
      res.status(404).json({
        status: "NotOk",
        message: "Reserva no encontrada",
      });
    }

    res.status(200).json({
      status: "Ok",
      payload: booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "NotOk",
      message: "Error al obtener la reserva",
    });
  }
});

router.post("/:bid/services/:sid", async (req, res) => {
  const { bid, sid } = req.params;

  try {
    const result = await bookingManager.addServiceToBooking(bid, sid);
    if (result.error === "NotOk") {
      return res.status(404).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "NotOk",
      message: "Error agregar el servicio a la reserva",
    });
  }
});

export default router;
