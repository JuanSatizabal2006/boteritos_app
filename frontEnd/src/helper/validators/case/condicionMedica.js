export const caseCondicionMedica = (name, value) => {
    let error;

    // Verificar si el valor es una cadena antes de aplicar trim
    const trimmedValue = typeof value === "string" ? value.trim() : value;

    switch (name) {
        case "lugaratencion":
            if (!trimmedValue) {
                error = "El campo lugar de atención es obligatorio.";
            }
            break;
        case "idrh":
            if (!trimmedValue) {
                error = "El campo RH es obligatorio.";
            }
            break;
        case "ideps":
            if (!trimmedValue) {
                error = "El campo Eps es obligatorio.";
            }
            break;
        case "altura":
            if (!trimmedValue) {
                error = "El campo altura es obligatorio.";
            } else if (isNaN(trimmedValue)) {
                error = "El campo altura debe ser un número.";
            }
            break;
        case "peso":
            if (!trimmedValue) {
                error = "El campo peso es obligatorio.";
            } else if (isNaN(trimmedValue)) {
                error = "El campo peso debe ser un número.";
            }
            break;
        default:
            break;
    }
    return error;
};