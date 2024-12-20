export const casePersonales = (name, value) => {
  let error;
  switch (name) {
    case "nombre":
      if (!value.trim()) {
        error = "El campo nombre es obligatorio.";
      }
      break;
    case "apellido":
      if (!value.trim()) {
        error = "El campo apellido es obligatorio.";
      }
      break;
    case "edad":
      if (!value.trim()) {
        error = "El campo edad es obligatorio.";
      } else if (isNaN(value) || value < 0) {
        error = "La edad debe ser un número positivo.";
      }
      break;
    case "correo":
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = "El campo correo es obligatorio.";
      } else if (!emailPattern.test(value)) {
        error = "El correo no es válido.";
      }
      break;
    case "tipodocumento":
      if (!value.trim()) {
        error = "El campo tipo de documento es obligatorio.";
      }
      break;
    case "documento":
      if (!value.trim()) {
        error = "El campo número de documento es obligatorio.";
      } else if (isNaN(value) || value.length < 5) {
        error = "El número de documento debe ser numérico y tener al menos 5 dígitos.";
      }
      break;
    case "sexo":
      if (!value.trim()) {
        error = "El campo sexo es obligatorio.";
      }
      break;
    case "telefono":
      if (!value.trim()) {
        error = "El campo teléfono es obligatorio.";
      } else if (value.length !== 10 || isNaN(value)) {
        error = "El número de teléfono debe tener 10 dígitos y solo contener números.";
      }
      break;
      case "titulo":
        if (!value.trim()) {
          error = "El campo título es obligatorio.";
        }
        break;
        case "area":
      if (!value.trim()) {
        error = "El campo área es obligatorio.";
      }
      break;

    default:
      break;
  }
  return error;
};