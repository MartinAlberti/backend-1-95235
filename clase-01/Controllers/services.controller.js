// const getServices  = ()=>{}
// const addServices = ()=>{}
// const updateServices = ()=>{}
// const deleteServices = ()=>{}

// export{
//     getServices,
//     updateServices,
//     addServices,
//     deleteServices
// }

import { readFile, writeFile } from "node:fs/promises";

const REQUIRED_FILS = [
  "name",
  "description",
  "duration",
  "price",
  "category",
  "available",
];

export default class ServiceManager {
  constructor(databasePath) {
    this.databasePath = databasePath;
  }

  async #save(services) {
    await writeFile(this.databasePath, JSON.stringify(services, null, 2));
  }
  async getServices() {
    const data = await readFile(this.databasePath, "utf-8");
    return JSON.parse(data);
  }

  async getServiceById(idService) {
    const data = await this.getServices();
    return data.find((service) => service.id === idService);
  }

  async addService(serviceData) {
    for (const field of REQUIRED_FILS) {
      if (serviceData[field] === undefined || serviceData[field] === null) {
        throw new Error(`El campo ${field} esta faltante`);
      }
      const data = await this.getServices();
      console.log(data)
      const id =
        data.length > 0
          ? Math.max(...data.map((service) => service.id)) + 1
          : 1;
      const newService = { ...serviceData, id };

      data.push(newService);
      await this.#save(data);
      return { payload: newService, status: "Ok"}
    }
  }
  async updateService(idService, updatedServiceData) {
    const services = await this.getServices();
    const index = services.findIndex(
      (service) => service.id === Number(idService),
    );

    if (index === -1) {
      return { payload: null, status: "NotOk" };
    }
    const { id, ...dataToUpdate } = updatedServiceData;
    services[index] = {
      ...services[index],
      ...dataToUpdate,
    };

    await this.#save(services);

    return { payload: services[index], status: "ok" };
  }

  async deleteService(idService){
    const services = await this.getServices()
    const id = Number(idService)

    const filteredServices = services.filter(service => service.id !== id)
    if(services.length === filteredServices.length){
        return{payload : idService, status: "notOk", message: "notFoundedService"}
    }
    await this.#save(filteredServices)

    return { payload : idService, status: "Ok"}


  }
}
