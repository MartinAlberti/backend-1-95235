import ServiceManager from '../managers/ServiceManager.js'

const serviceManager = new ServiceManager('./src/data/services.json')

export const getServices= async (req, res) => {
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
}

export const getServiceById =  async (req, res) => {
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
}

export const addService = async (req, res) => {
  try {
    const result = await serviceManager.addService(req.body);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      status: "NotOk",
      message: "Error al crear el servicio",
    });
  }
}

export const updatedService= async (req, res) => {
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
}

export const deleteService=  async (req, res) => {
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
}