import { caseHistoriaClinica } from "./case/historiaClinica";
import { caseCondicionMedica } from "./case/condicionMedica";
import { caseTelefono } from "./case/telefono";
import { caseResponsable } from "./case/responsable";
import { casePersonales } from "./case/casePersonales";
import { caseDirecciones } from "./case/direccion";

export const UpdateModalesValidators = (content, name, value) => {
  let error;
  console.log(`Validando: Content=${content}, Name=${name}, Value=${value}`); // Añadido

  switch (content) {
    case "Datos personales":
      error = casePersonales(name,value);
      break
    case "Contactos":
      error = caseTelefono(name, value);
      break;
    case "Responsables":
      error = caseResponsable(name, value);
      break;
    case "Datos Medicos":
      error = caseCondicionMedica(name, value);
      break;
    case "Historia clinica":
      error = caseHistoriaClinica(name, value);
      break;
    case "Dirección":
      error = caseDirecciones(name, value);
      break;
    default:
      console.error(`Tipo de contenido no soportado: ${content}`); // Añadido para depuración
      error = "ERROR en validacion de registro en Front-End";
      break;
  }

  return error;
};
