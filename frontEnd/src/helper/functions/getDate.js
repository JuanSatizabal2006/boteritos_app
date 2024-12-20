export const getDate = ()=>{
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener el día, mes y año
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1; // Nota: Los meses van de 0 a 11 en JavaScript
    const año = fechaActual.getFullYear();

    // Formatear la fecha en el formato yyyy-mm-dd
    const fechaFormateada = año + '-' + (mes < 10 ? '0' : '') + mes + '-' + (dia < 10 ? '0' : '') + dia
    return fechaFormateada
}

//función para obtener el año
export const getYear = () => {
    const anoActual = new Date();
    const año = anoActual.getFullYear();
    return año; 
}
