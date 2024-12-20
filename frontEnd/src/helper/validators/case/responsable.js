// responsable.js
export const caseResponsable = (name, value) => {
  // Verifica si el nombre del campo está definido
  if (!name) {
    return "Nombre del campo no proporcionado";
  }

  // Verifica si el valor es una cadena, de lo contrario lo convierte en cadena
  if (typeof value !== "string") {
    value = String(value);
  }

  // Valida según el nombre del campo
  switch (name) {
    case "nombre":
      if (value.trim() === "") {
        return "El nombre no puede estar vacío";
      }
      if (value.length < 3) {
        return "El nombre debe tener al menos 3 caracteres";
      }
      break;

    case "apellido":
      if (value.trim() === "") {
        return "El apellido no puede estar vacío";
      }
      if (value.length < 3) {
        return "El apellido debe tener al menos 3 caracteres";
      }
      break;

    case "tipodocumento":
      if (value.trim() === "") {
        return "El documento no puede estar vacío";
      }
      if (!/^\d+$/.test(value)) {
        return "Debe seleccionar un tipo de documento";
      }
      break;

    case "numerodocumento":
      if (value.trim() === "") {
        return "El número de documento es obligatorio";
      }
      if (!/^\d+$/.test(value)) {
        return "El número de documento debe ser un número";
      }
      break;

    case "telefono":
      if (value.trim() === "") {
        return "El teléfono no puede estar vacío";
      }
      if (!/^\d{10}$/.test(value)) {
        return "El teléfono debe tener 10 dígitos";
      }
      break;

    case "telefonodos":
      if (value.trim() === "") {
        return "El segundo teléfono no puede estar vacío";
      }
      if (!/^\d{10}$/.test(value)) {
        return "El segundo teléfono debe tener 10 dígitos";
      }
      break;

    case "direccion":
      if (value.trim() === "") {
        return "La dirección no puede estar vacía";
      }
      if (value.length < 5) {
        return "La dirección debe tener al menos 5 caracteres";
      }
      break;

    case "correo":
      if (value.trim() === "") {
        return "El correo no puede estar vacío";
      }
      break;

    case "ocupacion":
      if (value.trim() === "") {
        return "El campo ocupacion no puede estar vacío";
      }
      break;

    case "profesion":
      if (value.trim() === "") {
        return "El campo profesion no puede estar vacío";
      }
      break;

    case "empresa":
      if (value.trim() === "") {
        return "El campo empresa no puede estar vacío";
      }
      break;

    case "idsexo":
      if (value.trim() === "") {
        return "Debes seleccionar una opción";
      }
      break;

    case "idtipoparentesco":
      if (value.trim() === "") {
        return "El parentesco no puede estar vacío";
      }
      break;

    default:
      return null;
  }

  // Si todas las validaciones pasan, retorna null (sin errores)
  return null;
};
