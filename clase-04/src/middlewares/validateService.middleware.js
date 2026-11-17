const REQUIRED_FIELDS = [
  "name",
  "description",
  "duration",
  "price",
  "category",
  "available",
];

export function validateService(req, res, next) {
  //Obtenemos los datos desde el body.
  const data = req.body;
  //Obtenemos un array con los nombres de los campos enviados. Lo usamos en el metodo PUT
  const fields = Object.keys(data);

  //Post necesita todos los campos
  if (req.method === "POST") {
    //Filter recorre REQUIRED_FIELDS y crea un nuevo array con los campos que faltan(undefined o null)
    const missingFields = REQUIRED_FIELDS.filter(
      (field) => data[field] === undefined || data[field] === null,
    );
    //Si el array tiene elementos, significa que faltan campos
    if (missingFields.length > 0) {
      //Devolvemos el error y mostramos que campos faltan.
      return res.status(400).json({
        status: "NotOk",
        message: "Faltan campos obligatorios",
        missingFields,
      });
    }
  }

  // PUT  Permite campos parciales, pero no un body vacio.
  else if (req.method === "PUT" && fields.length === 0) {
    return res.status(400).json({
      status: "NotOk",
      message: "Ingresa al menos un campo para actualizar",
    });
  }
  //Si no hay errores, contuinuamos.
  next();
}
