// updateLogic.js
import { putUpdate } from "../../../api/put";

export const updateSectionData = async (
  selectedSection,
  sectionData,
  id,
  dataFormInd
) => {
  console.log(sectionData);
  console.log(dataFormInd);
  
  
  const newData = new FormData();
  newData.append("section", selectedSection);
  // newData.append('idprofesor', id);

  for (const key in sectionData) {
    if (sectionData.hasOwnProperty(key)) {
      newData.append(key, sectionData[key]);
    }
  }

  if (dataFormInd.has("hojavida")) {
    newData.append("hojavida", dataFormInd.get("hojavida"));
  }

  let endpoint = "";
  switch (selectedSection) {
    case "Datos personales":
      endpoint = `registro/profesor/`;
      break;
    case "Datos Medicos":
      endpoint = `registro/datosmedicos/`;
      break;
    case "Contactos":
      endpoint = `registro/telefono/`;
      break;
    case "Dirección":
      endpoint = `registro/direccion/`;
      break;
    default:
      return { error: "Invalid section" };
  }

  const result = await putUpdate(newData, endpoint, id);

  return result;
};
