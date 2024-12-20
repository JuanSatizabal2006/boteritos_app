import { caseEstudiante } from "./case/estudiante";
import { caseAdmin } from "./case/admin";
import { caseProfesor } from "./case/profesor";


/*
1 => ADMINISTRADOR
2 => PROFESOR
3 => ESTUDIANTES
*/

export const validateField = (rol, name, value) => {
  let error;

  if (!rol) {
    error = "Seleccione un rol.";
    return error
  }

  switch (rol) {
    case 1:
      error = caseAdmin(name, value);
      break;

    case 2:
      error = caseProfesor(name, value);
      break;

    case 3:
      error = caseEstudiante(name, value);
      break;

    default:
      error = "ERROR en validacion de registro en Front-End";
      break;
  }

  return error;
};
