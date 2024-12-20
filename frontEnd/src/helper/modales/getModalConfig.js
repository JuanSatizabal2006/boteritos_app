//Configuración para la cantidad de columnas que se mostraran en los modales
import { defaultValues } from "./objectsModal";

export const getModalConfig = (contentType) => {
  let initialValues = {};
  let columns = 1;

  switch (contentType) {
    case "responsable":
      initialValues = defaultValues.responsable;
      columns = 2;
      break;
    case "historiaclinica":
      initialValues = defaultValues.historiaclinica;
      columns = 1;
      break;
    case "Informes":
      initialValues = {};
      columns = 1;
      break;
    default:
      initialValues = {};
      columns = 1;
  }

  return { initialValues, columns };
};
