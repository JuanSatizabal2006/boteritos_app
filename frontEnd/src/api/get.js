import { fetchFunction, fetchFunctionPDF } from "./fetch";

//const fetchFunction = async (method, body, header, url)

export const getAllUser = async (url) => {
  const allUser = await fetchFunction("GET", null, null, url);
  return allUser;
};

export const getOneUser = async (url) => {
  const oneUser = await fetchFunction("GET", null, null, url);
  return oneUser;
};

export const getDropdown = async (url) => {
  const data = await fetchFunction("GET", null, null, url);
  return data;
};

// GETS DE LA INFORMACIÓN ADICCIONAL DE LOS PROFESORES
export const dataDatosMedicosProfesor = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const dataContactosProfesor = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const DataDireccionesProfesor = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const DataFechasProfesor = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const DataPersonalProfesor = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

// GETS DE LA INFORMACIÓN ADICCIONAL DE LOS ESTUDIANTES

//http://localhost:8000/api/v3/usuarios/historiaclinica/?idestudiante=2
export const dataDetailEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const dataResponsableEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const dataDatosMedicosEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const DataFechasEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const dataContactosEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const DataDireccionesEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

export const DataPersonal = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

//GET PARA LOS TRIMESTRES
export const getTrimestres = async (url) =>{
  const data = await fetchFunction ("GET", null, null, `logros/${url}`);
  return data;
}

//GET PARA LOS PROFESORES
export const getAllTeachers = async (url) => {
  const data = await fetchFunction("GET", null, null, `registro/${url}`);
  return data;
};

//GET PARA AREAS CON LOGROS CALIFICADOS
export const getAllAreas = async (url) => {
  const data = await fetchFunction("GET", null, null, `logros/informe/${url}`);
  return data;
};

//GET PARA LISTAR INFORMES DE UN ESTUDIANTE
export const getInformesEstudiante = async (url) => {
  const data = await fetchFunction("GET", null, null, `logros/${url}`);
  return data
}

//GET LOGROS PROFESOR A ESTUDIANTE
export const getLogrosEstudiante = async (url) =>{
  const data = await fetchFunction("GET", null, null, `logros/${url}`);
  return data
}

//GET PARA DESCARGAR EL INFORME DE UN ESTUDIANTE
export const downloadInforme = async (url) => {
  const response = await fetchFunctionPDF("GET", null, null, `logros/${url}`);

  console.log(response);

  //RESPUESTA ERRONEA
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error al enviar el informe", errorData);
    return errorData;
  }
  
  //RESPUESTA CORRECTA
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/pdf")) {
    const textfile = response.headers.get("textfile");
    let filename = textfile || "informe.pdf";
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    return "valido"
  } else {
    console.log("La respuesta no es un PDF");
  }

}

