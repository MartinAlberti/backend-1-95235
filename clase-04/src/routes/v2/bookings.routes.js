import { Router } from "express";
import BookingManager from "../../managers/BookingManager.js";

const bookingManager = new BookingManager( "./src/data/bookings.json",
  "./src/data/services.json",)

const router = Router()


router.get('/', async(req,res)=>{
    try {
        const bookings = await bookingManager.getBookings()
        const response = bookings.map(booking=>({
            id:booking.id,
            cliente:{
                nombre: booking.clientName,
                correo: booking.clientEmail
            },
            fecha_creacion: booking.date,
            hora: booking.time,
            estado:booking.status
        }))
    res.status(200).json({
        status:"OK",
        version: "v2",
        payload: response
})
    } catch (error) {
        console.log(error);

    res.status(500).json({
      status: "NotOk",
      message: "Error al obtener las reservas",
    });
    }
})






export default router