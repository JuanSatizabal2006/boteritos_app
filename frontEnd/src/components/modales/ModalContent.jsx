import React, { useState, useEffect } from "react";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";
import { UploadFile } from "../forms/UploadFile";
import {
  dataDoc,
  dataSexo,
  dataTipoParentesco,
  dataDiagnostico,
  dataDiscapacidad,
} from "../../helper/objects/dropdownArray";

export const ModalContent = ({
  selectedContent,
  values,
  handleInputChange,
  handleDropdownChange,
  handleFileChange,
  errores,
}) => {
  console.log("Selected Content:", selectedContent);
  const [dataDropdown, setDataDropdown] = useState({
    dropdownDocumento: [],
    dropdownSexo: [],
    dataTipoParentesco: [],
    dataDiagnostico: [],
    dataDiscapacidad: [],
  });

  useEffect(() => {
    const getDataDropdown = async () => {
      const resultDocumento = await dataDoc();
      const resultSexo = await dataSexo();
      const resultParentesco = await dataTipoParentesco();
      const resultDiagnostico = await dataDiagnostico();
      const resultDiscapacidad = await dataDiscapacidad();
      setDataDropdown({
        dropdownDocumento: resultDocumento,
        dropdownSexo: resultSexo,
        dataTipoParentesco: resultParentesco,
        dataDiagnostico: resultDiagnostico,
        dataDiscapacidad: resultDiscapacidad,
      });
    };

    getDataDropdown();
  }, []);
  console.log("Errores en ModalContent:", errores);

  switch (selectedContent) {
    case "responsable":
      return (
        <>
          <Input
            texto="Nombre"
            placeholder="Ingresa el nombre"
            name="nombre"
            tipo="text"
            onChange={handleInputChange}
            value={values.nombre || ""}
            error={errores.nombre}
          />
          <Input
            texto="Apellido"
            placeholder="Ingresa el apellido"
            name="apellido"
            tipo="text"
            onChange={handleInputChange}
            value={values.apellido || ""}
            error={errores.apellido}
          />
          <Dropdown
            name="idtipodocumento"
            label="Tipo de documento"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("idtipodocumento", value)}
            value={values.idtipodocumento || ""}
            placeholder={"Seleccione el tipo de documento"}
            error={errores.idtipodocumento}
          />
          <Input
            texto="Número de documento"
            placeholder="Ingresa el número documento"
            name="numerodocumento"
            tipo="text"
            onChange={handleInputChange}
            value={values.numerodocumento || ""}
            error={errores.numerodocumento}
          />
          <Input
            texto="Teléfono"
            placeholder="Ingresa el número de teléfono"
            name="telefono"
            tipo="text"
            onChange={handleInputChange}
            value={values.telefono || ""}
            error={errores.telefono}
          />
          <Input
            texto="Dirección"
            placeholder="Ingresa la dirección"
            name="direccion"
            tipo="text"
            onChange={handleInputChange}
            value={values.direccion || ""}
            error={errores.direccion}
          />
          <Input
            texto="Correo electronico"
            placeholder="Ingresa el correo electronico"
            name="correo"
            tipo="text"
            onChange={handleInputChange}
            value={values.correo || ""}
            error={errores.correo}
          />
          <Input
            texto="Ocupación"
            placeholder="Ingresa la ocupación"
            name="ocupacion"
            tipo="text"
            onChange={handleInputChange}
            value={values.ocupacion || ""}
            error={errores.ocupacion}
          />
          <Input
            texto="Profesión"
            placeholder="Ingresa la profesión"
            name="profesion"
            tipo="text"
            onChange={handleInputChange}
            value={values.profesion || ""}
            error={errores.profesion}
          />
          <Input
            texto="Empresa"
            placeholder="Ingresa la empresa"
            name="empresa"
            tipo="text"
            onChange={handleInputChange}
            value={values.empresa || ""}
            error={errores.empresa}
          />
          <Dropdown
            name="idsexo"
            label="Sexo"
            data={dataDropdown.dropdownSexo}
            onChange={(value) => handleDropdownChange("idsexo", value)}
            value={values.idsexo || ""}
            placeholder={"Seleccione el sexo"}
            error={errores.idsexo}
          />
          <Dropdown
            name="idtipoparentesco"
            label="Tipo de parentesco"
            data={dataDropdown.dataTipoParentesco}
            onChange={(value) =>
              handleDropdownChange("idtipoparentesco", value)
            }
            value={values.idtipoparentesco || ""}
            placeholder={"Seleccione el parentesco"}
            error={errores.idtipoparentesco}
          />
        </>
      );

    case "historiaclinica":
      return (
        <>
          <Dropdown
            label="Diagnostico"
            name="iddiagnostico"
            data={dataDropdown.dataDiagnostico}
            onChange={(value) => handleDropdownChange("iddiagnostico", value)}
            value={values.iddiagnostico || ""}
            placeholder={"Seleccione el diagnostico del estudiante"}
            error={errores.iddiagnostico}
          />
          <Dropdown
            name="iddiscapacidad"
            label="Discapacidad"
            data={dataDropdown.dataDiscapacidad}
            onChange={(value) => handleDropdownChange("iddiscapacidad", value)}
            value={values.iddiscapacidad || ""}
            placeholder={"Seleccione la discapacidad del estudiante"}
            error={errores.iddiscapacidad}
          />

          <Input
            texto="Restricciones alimenticias"
            placeholder="Ingresa las restricciones alimenticias"
            name="restriccionesalimenticias"
            tipo="text"
            onChange={handleInputChange}
            value={values.restriccionesalimenticias || ""}
            error={errores.restriccionesalimenticias}
          />
          <Input
            texto="Medicamentos"
            placeholder="Ingresa los medicamentos que necesita"
            name="medicamentos"
            tipo="text"
            onChange={handleInputChange}
            value={values.medicamentos || ""}
            error={errores.medicamentos}
          />

          <Input
            texto="Observacion"
            placeholder="Ingresa alguna observación sobre el estudiante"
            name="observacion"
            tipo="text"
            onChange={handleInputChange}
            value={values.observacion || ""}
            error={errores.observacion}
          />
          <UploadFile
            typefile={".pdf"}
            title={"Archivo"}
            id="archivo"
            onFileChange={(file) => handleFileChange("archivo", file)}
            validationText={"Tamaño maximo de archivo: 5MB"}
          />
        </>
      );

    case "Informes":
      return (
        <div>
          <h2>Informes</h2>
          <p>Esto NO será un modal.</p>
        </div>
      );

    default:
      return null;
  }
};
