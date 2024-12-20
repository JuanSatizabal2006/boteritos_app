import React, { useEffect, useState } from "react";
import { Input } from "../forms/Input";
import { Dropdown } from "../forms/Dropdown";

import {
  dataDoc,
  dataSexo,
  dataTipoParentesco,
  dataDiagnostico,
  dataDiscapacidad,
  dataRh,
  dataEps,
  dataArea,
} from "../../helper/objects/dropdownArray";
import { UploadFile } from "../forms/UploadFile";
import { jwtDecode } from "jwt-decode";
import { DatePicker2 } from "../forms/DatePicker";

export const ModalContentUpdate = ({
  section,
  data,
  onChange,
  handleFileChange,
  errores,
  handleDateChange,
}) => {
  const [values, setValues] = useState({});

  const [dataDropdown, setDataDropdown] = useState({
    dropdownDocumento: [],
    dropdownSexo: [],
    dataTipoParentesco: [],
    dataDiagnostico: [],
    dataDiscapacidad: [],
    dataRh: [],
    dataEps: [],
    dropdownArea: [],
  });

  useEffect(() => {
    const getDataDropdown = async () => {
      const resultDocumento = await dataDoc();
      const resultSexo = await dataSexo();
      const resultParentesco = await dataTipoParentesco();
      const resultDiagnostico = await dataDiagnostico();
      const resultDiscapacidad = await dataDiscapacidad();
      const resultRh = await dataRh();
      const resultEps = await dataEps();
      const resultArea = await dataArea();
      setDataDropdown({
        dropdownDocumento: resultDocumento,
        dropdownSexo: resultSexo,
        dataTipoParentesco: resultParentesco,
        dataDiagnostico: resultDiagnostico,
        dataDiscapacidad: resultDiscapacidad,
        dataRh: resultRh,
        dataEps: resultEps,
        dropdownArea: resultArea,
      });
    };

    getDataDropdown();
  }, []);

  const handleDropdownChange = (name, value) => {
    setValues({ ...values, [name]: value });
    onChange({ target: { name, value } }, name);
  };

  switch (section) {
    case "Datos personales":
      return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            texto="Nombre"
            placeholder="Ingresa el nombre"
            name="nombre"
            tipo="text"
            onChange={(e) => onChange(e, "nombre")}
            value={data.nombre || ""}
            error={errores.nombre}
          />
          <Input
            texto="Apellido"
            placeholder="Ingresa el apellido"
            name="apellido"
            tipo="text"
            onChange={(e) => onChange(e, "apellido")}
            value={data.apellido || ""}
            error={errores.apellido}
          />
          <Input
            texto="Edad"
            placeholder="Ingresa la edad"
            name="edad"
            tipo="text"
            onChange={(e) => onChange(e, "edad")}
            value={data.edad || ""}
            error={errores.edad}
          />
          <Dropdown
            name="idtipodocumento"
            label="Tipo de documento"
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("idtipodocumento", value)}
            value={data.idtipodocumento || ""}
            placeholder="Seleccione el tipo de documento"
            error={errores.tipodocumento}
          />
          <Input
            texto="Número de documento"
            placeholder="Ingresa el número de documento"
            name="numerodocumento"
            tipo="text"
            onChange={(e) => onChange(e, "numerodocumento")}
            value={data.documento || ""}
            error={errores.documento}
          />
          <Dropdown
            name="idsexo"
            label="Sexo"
            data={dataDropdown.dropdownSexo}
            onChange={(value) => handleDropdownChange("idsexo", value)}
            value={data.idsexo || ""}
            placeholder="Seleccione el sexo"
            error={errores.idsexo}
          />
          <Input
            texto="Correo"
            placeholder="Ingresa el correo"
            name="correo"
            tipo="text"
            onChange={(e) => onChange(e, "correo")}
            value={data.correo || ""}
            error={errores.correo}
          />
          <Input
            texto="Título"
            placeholder="Ingresa el título"
            name="titulo"
            tipo="text"
            onChange={(e) => onChange(e, "titulo")}
            value={data.titulo || ""}
            error={errores.titulo}
          />

          <Dropdown
            name="idarea"
            label="Área"
            data={dataDropdown.dropdownArea}
            onChange={(value) => handleDropdownChange("idarea", value)}
            value={data.idarea || ""}
            placeholder="Seleccione el Área"
          />

          <UploadFile
            typefile={".pdf"}
            title={"Hoja de vida"}
            id="hojavida"
            onFileChange={(file) => handleFileChange("hojavida", file)}
            error={errores.area}
          />
        </div>
      );

    case "Responsables":
      return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            texto="Nombre"
            placeholder="Ingresa el nombre"
            name="nombre"
            tipo="text"
            onChange={(e) => onChange(e, "nombre")}
            value={data.nombre || ""}
            error={errores.nombre}
          />
          <Input
            texto="Apellido"
            placeholder="Ingresa el apellido"
            name="apellido"
            tipo="text"
            onChange={(e) => onChange(e, "apellido")}
            value={data.apellido || ""}
            error={errores.apellido}
          />

          <Input
            texto="Correo"
            placeholder="Ingresa el correo"
            name="correo"
            tipo="text"
            onChange={(e) => onChange(e, "correo")}
            value={data.correo || ""}
            error={errores.correo}
          />

          <Dropdown
            name="idsexo"
            label="Sexo"
            data={dataDropdown.dropdownSexo}
            onChange={(value) => handleDropdownChange("idsexo", value)}
            value={data.sexo || ""}
            placeholder="Seleccione el sexo"
            error={errores.idsexo}
          />

          <Dropdown
            name={"idtipodocumento"}
            label={"Tipo de documento"}
            //data={dataMatricula}
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("idtipodocumento", value)}
            placeholder={"Selecciona el tipo de documento"}
            error={errores.idtipodocumento}
          />

          <Input
            texto="Número de documento"
            placeholder="Ingresa el número de documento"
            name="numerodocumento"
            tipo="text"
            onChange={(e) => onChange(e, "numerodocumento")}
            value={data.numerodocumento || ""}
            error={errores.numerodocumento}
          />

          <Input
            texto="Profesión"
            placeholder="Ingresa la profesión"
            name="profesion"
            tipo="text"
            onChange={(e) => onChange(e, "profesion")}
            value={data.profesion || ""}
            error={errores.profesion}
          />

          <Input
            texto="Ocupación"
            placeholder="Ingresa la ocupación"
            name="ocupacion"
            tipo="text"
            onChange={(e) => onChange(e, "ocupacion")}
            value={data.ocupacion || ""}
            error={errores.ocupacion}
          />

          <Input
            texto="Empresa"
            placeholder="Ingresa la empresa"
            name="empresa"
            tipo="text"
            onChange={(e) => onChange(e, "empresa")}
            value={data.empresa || ""}
            error={errores.empresa}
          />

          <Dropdown
            name="idtipoparentesco"
            label="Tipo de parentesco"
            data={dataDropdown.dataTipoParentesco}
            onChange={(value) =>
              handleDropdownChange("idtipoparentesco", value)
            }
            value={data.idtipoparentesco || ""}
            placeholder="Seleccione el tipo de parentesco"
            error={errores.idtipoparentesco}
          />
        </div>
      );

    case "Historia clinica":
      return (
        <div className="space-y-4 grid place-items-center">
          <Input
            texto="Medicamentos"
            placeholder="Ingresa los medicamentos"
            name="medicamentos"
            tipo="text"
            onChange={(e) => onChange(e, "medicamentos")}
            value={data.medicamentos || ""}
            error={errores.medicamentos}
          />
          <Input
            texto="Restricciones alimenticias"
            placeholder="Ingresa las restricciones alimenticias"
            name="restriccionesalimenticias"
            tipo="text"
            onChange={(e) => onChange(e, "restriccionesalimenticias")}
            value={data.restriccionesalimenticias || ""}
            error={errores.restriccionesalimenticias}
          />

          <Dropdown
            name="iddiagnostico"
            label="Diagnostico"
            data={dataDropdown.dataDiagnostico}
            onChange={(value) => handleDropdownChange("iddiagnostico", value)}
            value={data.iddiagnostico || ""}
            placeholder="Seleccione el diagnostico"
            error={errores.iddiagnostico}
          />

          <Input
            texto="Observación"
            placeholder="Ingresa la observación"
            name="observacion"
            tipo="text"
            onChange={(e) => onChange(e, "observacion")}
            value={data.observacion || ""}
            error={errores.observacion}
          />

          <Dropdown
            name="iddiscapacidad"
            label="Discapacidad"
            data={dataDropdown.dataDiscapacidad}
            onChange={(value) => handleDropdownChange("iddiscapacidad", value)}
            value={values.iddiscapacidad || ""}
            placeholder="Seleccione la discapacidad"
            error={errores.iddiscapacidad}
          />

          <UploadFile
            typefile={".pdf"}
            title={"Historia clinica"}
            id="archivo"
            onFileChange={(file) => handleFileChange("archivo", file)}
          />
        </div>
      );

    case "Datos Medicos":
      return (
        <div className="space-y-4 grid place-items-center">
          <Input
            texto="Lugar de atención"
            placeholder="Ingresa el lugar de atención"
            name="lugaratencion"
            tipo="text"
            onChange={(e) => onChange(e, "lugaratencion")}
            value={data.lugaratencion || ""}
            error={errores.lugaratencion}
          />

          <Input
            texto="Peso"
            placeholder="Ingresa el peso"
            name="peso"
            tipo="text"
            onChange={(e) => onChange(e, "peso")}
            value={data.peso || ""}
            error={errores.peso}
          />

          <Input
            texto="Altura"
            placeholder="Ingresa la altura"
            name="altura"
            tipo="text"
            onChange={(e) => onChange(e, "altura")}
            value={data.altura || ""}
            error={errores.altura}
          />

          <Dropdown
            name="ideps"
            label="Eps"
            data={dataDropdown.dataEps}
            onChange={(value) => handleDropdownChange("ideps", value)}
            value={data.eps || ""}
            placeholder="Seleccione la eps"
            error={errores.eps}
          />

          <Dropdown
            name="idrh"
            label="Tipo de sangre"
            data={dataDropdown.dataRh}
            onChange={(value) => handleDropdownChange("idrh", value)}
            value={values.idrh || ""}
            placeholder="Seleccione el tipo de sangre"
            error={errores.idrh}
          />
        </div>
      );

    case "Contactos":
      return (
        <div className="space-y-4 grid place-items-center">
          <Input
            texto="Teléfono"
            placeholder="Ingresa el teléfono"
            name="telefono1"
            tipo="text"
            onChange={(e) => onChange(e, "telefono1")}
            value={data.telefono1 || ""}
            error={errores.telefono1}
          />
          <Input
            texto="Segundo teléfono"
            placeholder="Ingresa un segundo teléfono"
            name="telefono2"
            tipo="text"
            onChange={(e) => onChange(e, "telefono2")}
            value={data.telefono2 || ""}
            error={errores.telefono2}
          />
        </div>
      );

    case "Fechas":
      return (
        <div className="space-y-4 grid ">
         
            <DatePicker2
              name="fechanacimiento"
              texto={"Fecha de nacimiento"}
              value={data.fechanacimiento || ""}
              onChange={(e) =>
                handleDateChange("fechanacimiento", e.target.value)
              }
            />
        
          <DatePicker2
            name="fecharegistro"
            texto={"Fecha de registro"}
            value={data.fecharegistro || ""}
            onChange={(e) => handleDateChange("fecharegistro", e.target.value)}
          />

          <DatePicker2
            name="fechaingreso"
            texto={"Fecha de ingreso"}
            value={data.fechaingreso || ""}
            onChange={(e) => handleDateChange("fechaingreso", e.target.value)}
          />
        </div>
      );

    case "Dirección":
      return (
        <div className="space-y-4 grid place-items-center">
          <Input
            texto="Comuna"
            placeholder="Ingresa la comuna"
            name="comuna"
            tipo="text"
            onChange={(e) => onChange(e, "comuna")}
            value={data.comuna || ""}
            error={errores.comuna}
          />
          <Input
            texto="Número"
            placeholder="Ingresa el número"
            name="numero"
            tipo="text"
            onChange={(e) => onChange(e, "numero")}
            value={data.numero || ""}
            error={errores.numero}
          />

          <Input
            texto="Barrio"
            placeholder="Ingresa el barrio"
            name="barrio"
            tipo="text"
            onChange={(e) => onChange(e, "barrio")}
            value={data.barrio || ""}
            error={errores.barrio}
          />
        </div>
      );

    default:
      return <div>No hay información en este campo</div>;
  }
};
