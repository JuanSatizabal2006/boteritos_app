export const caseLogros = (name, value) => {
  let error;

  // Verificar si el valor es una cadena antes de aplicar trim
  const trimmedValue = typeof value === "string" ? value.trim() : value;

  switch (name) {
    case "idtipologro":
      if (!trimmedValue) {
        error = "Seleccione un tipo de logro";
      }
      break;
    case "logro":
      // Mostrar error solo si el campo está vacío
      if (!trimmedValue) {
        error = "El nombre del logro es obligatorio";
      }
      break;
    default:
      break;
  }
  return error;
};
