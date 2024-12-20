export const caseEstudiante = (name, value) => {
  let error = "";

  // Asegurarse de que `value` es una cadena antes de usar `trim()`
  const isString = (val) => typeof val === 'string';

  switch (name) {
    case "nombre":
      if (!isString(value) || !value.trim()) {
        error = "El nombre es obligatorio.";
      }
      break;

    case "tallacamisa":
      const validSizes = ["S", "M", "L", "X", "XL", "XXL"];
      const upperCaseValue = isString(value) ? value.trim().toUpperCase() : '';

      if (!upperCaseValue) {
        error = "La talla de camisa es obligatoria.";
      } else if (!validSizes.includes(upperCaseValue)) {
        error = "Ingrese una talla de camisa válida. Las opciones válidas son: S, M, L, X, XL, XXL.";
      }
      break;

    case "correo":
      if (!isString(value) || !value.trim()) {
        error = "El correo es obligatorio.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "El correo no es válido.";
      }
      break;

    case "apellido":
      if (!isString(value) || !value.trim()) {
        error = "El apellido es obligatorio.";
      }
      break;

    case "comuna":
      if (!isString(value) || !value.trim()) {
        error = "La comuna es obligatoria.";
      }
      break;

      case "idmatricula":
        if (!value) {
          error = "Seleccione la matricula.";
        }
        break;

    case "fechaingreso":
    case "fechanacimiento":
      if (!value || (isString(value) && !value.trim())) {
        error = "La fecha es obligatoria.";
      }
      break;

    case "numero":
      if (!isString(value) || !value.trim()) {
        error = "La dirección es obligatoria.";
      }
      break;

    case "institutoprocedencia":
      if (!isString(value) || !value.trim() || value === "N/A") {
        error = "El instituto es obligatorio.";
      }
      break;

    case "barrio":
      if (!isString(value) || !value.trim()) {
        error = "El barrio es obligatorio.";
      }
      break;

    
    case "idrol":
      if (!value) {
        error = "Seleccione un rol.";
      }
      break;

    case "idtipodocumento":
      if (!value) {
        error = "Seleccione el tipo de documento.";
      }
      break;

    case "idsexo":
      if (!value) {
        error = "Seleccione el sexo.";
      }
      break;

    case "edad":
      const edad = Number(value);
      if (!isString(value) || !value.trim()) {
        error = "La edad es obligatoria.";
      } else if (!Number.isInteger(edad) || edad <= 0) {
        error = "Ingrese una edad válida.";
      }
      break;

    case "documento":
      if (!isString(value) || !value.trim()) {
        error = "El número de documento es obligatorio.";
      } else if (value.length < 8 || value.length > 10) {
        error = "El número de documento debe tener entre 8 y 10 dígitos.";
      } else if (isNaN(value) || value.length <= 0) {
        error = "Ingrese un documento válido.";
      }
      break;
  }

  return error;
}