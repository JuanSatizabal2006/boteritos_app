import { fetchFunction, fetchFunctionFiles, fetchFunctionPDF } from "./fetch";

//const fetchFunction = async (method, body, header, url)

export const postUserStudent = async (body, url) => {
  const data = await fetchFunction("POST", body, null, url);
  return data;
};

export const postLogin = async (body, url) => {
  const data = await fetchFunction("POST", body, null, url);
  return data;
};

export const postModales = async (body, url) => {
  const data = await fetchFunction("POST", body, null, `registro/${url}`);
  return data;
};

export const postTrimestres = async (body, url) => {
  const data = await fetchFunction("POST", body, null, `logros/${url}`);
  return data;
};

export const authToken = async (body, url) => {
  const data = await fetchFunction("POST", body, null, `auth/${url}`);
  return data;
};

export const postCreateInforme = async (body, url) => {

  const response = await fetchFunctionPDF("POST", body, null, `logros/${url}`);

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
    return "valido";
  } else {
    console.log("La respuesta no es un PDF");
  }
};
