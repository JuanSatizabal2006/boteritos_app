export const caseHistoriaClinica = (name, value) => {
  let error;

  const trimmedValue = typeof value === "string" ? value.trim() : value;

  switch (name) {
    case "medicamentos":
      if (!trimmedValue) {
        error = "El campo medicamentos es obligatorio.";
      }
      break;

    case "restriccionesalimenticias":
      if (!trimmedValue) {
        error = "El campo restricciones alimenticias es obligatorio.";
      }
      break;

    // case "cantidadmedicamentos":
    //   if (!trimmedValue) {
    //     error = "El campo Cantidad medicamentos es obligatorio.";
    //   }
    //   break;

    case "archivo":
      if (!trimmedValue) {
        error = "El archivo es obligatorio.";
      }
      break;

    case "observacion":
      if (!trimmedValue) {
        error = "El campo observación es obligatorio.";
      }
      break;

    case "iddiagnostico":
      if (!trimmedValue) {
        error = "El campo diagnostico es obligatorio";
      }
      break;
    case "iddiscapacidad":
      if (!trimmedValue) {
        error = "El campo discapacidad es obligatorio";
      }
      break;
    default:
      break;
  }
  return error;
};
