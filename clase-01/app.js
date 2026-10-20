// import fs from "node:fs/promises"

// console.log('1. Inicio del script');

// setTimeout(() => {
//   console.log('2. setTimeout (0ms)');
// }, 0);

// setImmediate(() => {
//   console.log('3. setImmediate');
// });

// Promise.resolve().then(() => {
//   console.log('4. Promesa resuelta (Microtask)');
// });

// process.nextTick(() => {
//   console.log('5. process.nextTick');
// });

// fs.readFile(import.meta.filename, () => {
//   console.log('6. Lectura de archivo completada (I/O Callback)');
// });

// console.log('7. Fin del script');


import path from "node:path";
import ServiceManager from "./Controllers/services.controller.js";
 
const DATABASE_NAME = "services.json"
const databasePath = path.join(import.meta.dirname, "data", DATABASE_NAME)

const manager = new ServiceManager(databasePath)

console.log({"services": await manager.getServices()})
console.log(await manager.getServiceById(4))

const newService = {
    name: "Corte de cabello premium",
    description: "Corte con lavado ",
    duration: 40,
    price: 25000,
    category:"Peluqueria",
    available: true
}

// console.log({"New Service": await manager.addService(newService)})

console.log({"Deleted":  await manager.deleteService(1)})

