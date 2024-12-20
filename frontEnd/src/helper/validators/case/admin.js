export const caseAdmin = (name, value) => {
  let error = "";

  // Asegurarse de que value sea una cadena
  const stringValue = String(value).trim();

  switch (name) {
    case "nombre":
      if (!stringValue) {
        error = "El nombre es obligatorio.";
      }
      break;

    case "correo":
      if (!stringValue) {
        error = "El correo es obligatorio.";
      } else if (!/\S+@\S+\.\S+/.test(stringValue)) {
        error = "El correo no es válido.";
      }
      break;

    case "apellido":
      if (!stringValue) {
        error = "El apellido es obligatorio.";
      }
      break;

    case "comuna":
      if (!stringValue) {
        error = "La comuna es obligatoria.";
      }
      break;

    case "numero":
      if (!stringValue) {
        error = "La dirección es obligatoria.";
      }
      break;

    case "barrio":
      if (!stringValue) {
        error = "El barrio es obligatorio.";
      }
      break;

    case "fechanacimiento":
      if (!stringValue) {
        error = "La fecha de nacimiento es obligatoria.";
      }
      break;

    case "fechaingreso":
      if (!stringValue) {
        error = "La fecha de ingreso es obligatoria.";
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
      const edad = Number(stringValue);
      if (!stringValue) {
        error = "La edad es obligatoria.";
      } else if (!Number.isInteger(edad) || edad <= 0) {
        error = "Ingrese una edad valida.";
      }
      break;

    case "documento":
      if (!stringValue) {
        error = "El número de documento es obligatorio.";
      } else if (stringValue.length < 8 || stringValue.length > 10) {
        error = "El número de documento debe tener entre 8 y 10 dígitos.";
      } else if (isNaN(stringValue) || stringValue.length <= 0) {
        error = "Ingrese un documento valido.";
      }
      break;

    case "observacion":
      if (!stringValue) {
        error = "La observación es obligatoria.";
      }
      break;
  }
  return error;
};
