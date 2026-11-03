import { readFile, writeFile } from "node:fs/promises";
import ServiceManager from "./ServiceManager.js";
import { time } from "node:console";

export default class BookingManager {
  constructor(databasePath, servicesPath) {
    this.databasePath = databasePath;
    this.serviceManager = new ServiceManager(servicesPath);
  }

  async #save(bookings) {
    await writeFile(this.databasePath, JSON.stringify(bookings, null, 2));
  }

  async getBookings() {
    const data = await readFile(this.databasePath, "utf-8");

    return JSON.parse(data);
  }

  async createBooking(bookingData) {
    const bookings = await this.getBookings();

    const id =
      bookings.length > 0
        ? Math.max(...bookings.map((booking) => booking.id)) + 1
        : 1;

    //Contruimos la nueva reserva

    const newBooking = {
      id,
      clientName: bookingData.clientName.trim(),
      clientEmail: bookingData.clientEmail.trim(),
      date: bookingData.date.trim(),
      time: bookingData.time.trim(),
      status: "pending",
      services: [],
    };

    bookings.push(newBooking);
    await this.#save(bookings);
    return {
      payload: newBooking,
      status: "Ok",
    };
  }

  async getBookingById(idBooking) {
    const bookings = await this.getBookings();
    return bookings.find((booking) => booking.id === Number(idBooking));
  }

  //Corregir el incremento de quantity
  async addServiceToBooking(idBooking, idService) {
    const bookings = await this.getBookings();

    //Buscamos la reserva
    const booking = bookings.find(
      (booking) => booking.id === Number(idBooking),
    );

    // Verificamos que la reserva exista
    if (!booking) {
      return {
        payload: null,
        status: "NotOk",
        message: "Reserva no encontrada",
      };
    }

    const service = await this.serviceManager.getServiceById(idService);
    if (!service) {
      return {
        payload: null,
        status: "NotOk",
        message: "Servicio no encontrado",
      };
    }

    //Comprobamos si el servicio ya esta en la reserva

    const existingService = bookings.find(
      (item) => item.service === Number(idService),
    );

    if (existingService) {
      //Si existe, aumentamos la cantidad
      existingService.quantity += 1;
    } else {
      booking.services.push({
        service: Number(idService),
        quantity: 1,
      });
    }

    await this.#save(bookings);
    return {
      payload: booking,
      status: "Ok",
    };
  }
}
