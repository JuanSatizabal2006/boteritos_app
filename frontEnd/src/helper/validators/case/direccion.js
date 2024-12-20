export const caseDirecciones = (name, value) => {
  let error;
  switch (name) {
      case "comuna":
          if (!value.trim()) {
              error = "El campo comuna es obligatorio.";
          } 
          break;
          case "numero":
          if (!value.trim()) {
              error = "El campo numero es obligatorio.";
          }
          case "barrio":
            if (!value.trim()) {
                error = "El campo barrio es obligatorio.";
            } 
            break;
      default:
          break;
  }
  return error;
};
