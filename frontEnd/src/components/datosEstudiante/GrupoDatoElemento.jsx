// src/components/GrupoDatoElemento.js
import React, { useState, useEffect } from "react";
import { DatoElemento } from "./DatoElemento";
import { RegisterModal } from "../modales/RegisterModal";
import { ModalContent } from "../modales/ModalContent";
import { getModalConfig } from "../../helper/modales/getModalConfig";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { modaleValidators } from "../../helper/validators/modalesValidator";

export const GrupoDatoElemento = () => {
  const [cols, setCols] = useState(1);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [values, setValues] = useState({});
  const { id } = useParams();
  const formData = new FormData();
  const [errors, setErrors] = useState({});

  // Maneja cambios en campos de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const content = selectedContent || "default";

    const error = modaleValidators(content, name, value);

    setErrors({
      ...errors,
      [name]: error,
    });

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Maneja cambios en dropdowns
  const handleDropdownChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (name, file) => {
    formData.set(name, file);
  };

  const handleForm = (event) => {
    event.preventDefault();

    const newErrors = {};
    for (const key in values) {
      if (Object.hasOwn(values, key)) {
        const error = modaleValidators(selectedContent, key, values[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Recorrer y aplicar .trim() a cada valor del objeto
    const trimmedValues = Object.entries(values).reduce((acc, [key, value]) => {
      acc[key] = typeof value === "string" ? value.trim() : value;
      return acc;
    }, {});

    // Convertir idtipodocumento e idparentesco a enteros si existen
    if (trimmedValues.idtipodocumento) {
      trimmedValues.idtipodocumento = parseInt(trimmedValues.idtipodocumento);
    }

    if (trimmedValues.idtipoparentesco) {
      trimmedValues.idtipoparentesco = parseInt(trimmedValues.idtipoparentesco);
    }

    if (trimmedValues.idsexo) {
      trimmedValues.idsexo = parseInt(trimmedValues.idsexo);
    }

    // Si no hay campos vacíos, continuar con el proceso
    // setValues(trimmedValues);

    // Aquí puedes proceder con el envío de los datos
    console.log("Valores actualizados:", values);

    console.log("valores de trimmed", trimmedValues);
    fetchModal(trimmedValues, selectedContent);
  };

  const fetchModal = async (data) => {
    console.log(data);

    // Agregar los datos al objeto FormData
    Object.keys(data).forEach((key) => {
      console.log(key, data[key]);
      formData.set(key, data[key]);
    });

    try {
      const response = await fetch(
        `http://localhost:8000/api/v3/registro/${selectedContent}/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Datos recibidos:", responseData);
        setIsConfirm(true);
      } else {
        console.error("Error en la respuesta:", response.status);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  // Abre el modal con valores iniciales según el tipo de contenido
  const handleOpenModal = (contentType) => {
    const { initialValues, columns } = getModalConfig(contentType);

    if (contentType === "responsable" || "historia clinica") {
      // Agrega el ID del estudiante al nuevo campo idestudiante en responsable
      initialValues.idestudiante = parseInt(id);
      // Convertir idparentesco e idtipodocumento a enteros si existen
      if (initialValues.idtipoparentesco) {
        initialValues.idtipoparentesco = parseInt(
          initialValues.idtipoparentesco
        );
      }

      if (initialValues.idtipodocumento) {
        initialValues.idtipodocumento = parseInt(initialValues.idtipodocumento);
      }

      if (initialValues.idsexo) {
        initialValues.idsexo = parseInt(initialValues.idsexo);
      }

      console.log("ID estudiante:", initialValues.idestudiante);
    }

    setValues(initialValues); // Configura los valores iniciales del formulario

    setCols(columns);

    setSelectedContent(contentType);

    setIsOpen(true);

    setIsConfirm(false);
  };

  // Cierra el modal y resetea el contenido seleccionado
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedContent(null);
    setIsConfirm(false); // Reinicia el estado de confirmación al cerrar el modal
    setErrors({});
  };

  return (
    <>
      <div className="flex flex-wrap gap-y-3 justify-between">
        <DatoElemento
          icon={"fa-solid fa-user-group"}
          texto={"Responsable(s)"}
          onClick={() => handleOpenModal("responsable")}
        />
        <DatoElemento
          icon={"fa-solid fa-address-card"}
          texto={"Historia clinica"}
          onClick={() => handleOpenModal("historiaclinica")}
        />
        <Link
          to={`/admin/listaestudiantes/datoestudiante/informe/${id}`}
          className="xl:max-w-[340px] 2xl:max-w-[440px] w-full"
        >
          <DatoElemento icon={"fa-solid fa-file-lines"} texto={"Informes"} />
        </Link>
      </div>
      <RegisterModal
        txtmodal={`Información de ${selectedContent}`}
        cols={cols}
        isOpen={isOpen}
        onClose={handleCloseModal}
        values={values}
        onSubmit={handleForm}
        isConfirm={isConfirm}
        selectedContent={selectedContent}
        textButton={"Confirmar"}
      >
        <ModalContent
          selectedContent={selectedContent}
          values={values}
          handleInputChange={handleInputChange}
          handleDropdownChange={handleDropdownChange}
          handleFileChange={handleFileChange}
          errores={errors}
        />
      </RegisterModal>
    </>
  );
};
