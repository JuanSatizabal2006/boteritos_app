export const caseTelefono = (name, value) => {
  let error;
  switch (name) {
      case "telefono1":
          if (!value.trim()) {
              error = "El campo teléfono es obligatorio.";
          } else if (value.length !== 10 || isNaN(value)) {
              error = "El número de teléfono debe tener 10 dígitos y solo contener números.";
          }
          break;
          case "telefono2":
          if (!value.trim()) {
              error = "El campo teléfono es obligatorio.";
          } else if (value.length !== 10 || isNaN(value)) {
              error = "El número de teléfono debe tener 10 dígitos y solo contener números.";
          }
          break;
      default:
          break;
  }
  return error;
};
