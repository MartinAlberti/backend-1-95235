import { readFile, writeFile } from "node:fs/promises";

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
    const services = await this.getServices();

    return services.find((service) => service.id === Number(idService));
  }

  async addService(serviceData) {
    const services = await this.getServices();

    const id =
      services.length > 0
        ? Math.max(...services.map((service) => service.id)) + 1
        : 1;

    const newService = {
      ...serviceData,
      id,
    };

    services.push(newService);

    await this.#save(services);

    return {
      payload: newService,
      status: "Ok",
    };
  }

  async updateService(idService, updatedServiceData) {
    const services = await this.getServices();

    const index = services.findIndex(
      (service) => service.id === Number(idService),
    );

    if (index === -1) {
      return {
        payload: null,
        status: "NotOk",
      };
    }

    const { id, ...dataToUpdate } = updatedServiceData;

    services[index] = {
      ...services[index],
      ...dataToUpdate,
      id: services[index].id,
    };

    await this.#save(services);

    return {
      payload: services[index],
      status: "Ok",
    };
  }

  async deleteService(idService) {
    const services = await this.getServices();
    const id = Number(idService);

    const filteredServices = services.filter((service) => service.id !== id);

    if (services.length === filteredServices.length) {
      return {
        payload: idService,
        status: "NotOk",
        message: "notFoundService",
      };
    }

    await this.#save(filteredServices);

    return {
      payload: idService,
      status: "Ok",
    };
  }
}
