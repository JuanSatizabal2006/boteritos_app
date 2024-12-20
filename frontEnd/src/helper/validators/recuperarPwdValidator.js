// src/utils/validaciones.js

export const recuperarPwdValidator = (newPassword, confirmPassword) => {
  let errors = {
    new: "",
    confirm: ""
  };
  let isValid = true;

  // Validación de nueva contraseña
  const longitudMinima = 6;
  const tieneNumero = /\d/;
  const tieneMayuscula = /[A-Z]/;
  const tieneCaracterEspecial = /[!@#+$%^&*(),.?":{}|<>]/;

  if (newPassword.length < longitudMinima) {
    errors.new = "La nueva contraseña debe tener al menos 6 caracteres.";
    isValid = false;
  }
  if (!tieneNumero.test(newPassword)) {
    errors.new = "La nueva contraseña debe contener al menos un número.";
    isValid = false;
  }
  if (!tieneMayuscula.test(newPassword)) {
    errors.new = "La nueva contraseña debe contener al menos una letra mayúscula.";
    isValid = false;
  }
  if (!tieneCaracterEspecial.test(newPassword)) {
    errors.new = "La nueva contraseña debe contener al menos un carácter especial. Ejemplo: [!@#+$%^&*(),.?:{}|<>]";
    isValid = false;
  }

  // Validación de confirmación de contraseña
  if (newPassword !== confirmPassword) {
    errors.confirm = "Las contraseñas no coinciden.";
    isValid = false;
  }

  return { isValid, errors };
};
