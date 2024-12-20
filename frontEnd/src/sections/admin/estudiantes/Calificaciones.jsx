import React, { useState, useEffect } from "react";
import { InformeIndividual } from "../../../components/informe/InformeIndividual"
import { useParams } from "react-router-dom";
import { Boton } from "../../../components/forms/Boton";
import { Observacion } from "../../../components/forms/Observacion";
import { ConfirmationModal } from "../../../components/modales/ConfirmationModal";
import { LoadingModal } from "../../../components/modales/LoadingModal";
import { getAllAreas } from "../../../api/get"
import { postCreateInforme } from "../../../api/post";

const Calificaciones = () => {
  const [observacion, setObservacion] = useState("");
  const trimestre = JSON.parse(localStorage.getItem("trimestre"));
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el modal de carga
  const [isInformeCreado, setIsInformeCreado] = useState(false); // Estado para saber si el informe ya ha sido creado
  const { id } = useParams();
  const idestud = id;

  // Estado para almacenar los datos de todas las áreas
  const [areasData, setAreasData] = useState([]);

  // Arreglo con los títulos de las áreas en el orden correcto
  const titulosAreas = [
    "Socio - Afectiva",
    "Vida Diaria",
    "Teatro",
    "Danza",
    "Música",
    "Pintura",
  ];

  // Obtener datos de las 6 áreas
  useEffect(() => {
    const fetchAllAreas = async () => {
      let allAreasData = [];
      for (let idArea = 1; idArea <= 6; idArea++) {
        try {
          const response = await getAllAreas(
            `list/${trimestre}/${idArea}/${idestud}/`
          );
          const calificaciones = Array.isArray(
            response.data.data.calificaciones
          )
            ? response.data.data.calificaciones
            : [];

          // Si el informe ya ha sido creado, marcarlo y cargar la observación
          if (response.status === 208) {
            setIsInformeCreado(true);
            // Cargar la observación si está disponible en la respuesta
            if (response.data.data.observacion) {
              setObservacion(response.data.data.observacion);
            }
          }

          // Añadir la data del área al array total
          allAreasData.push({ idArea, calificaciones });
        } catch (error) {
          console.error(
            `Error al obtener los datos del área ${idArea}:`,
            error
          );
          // Asegurar que si hay error, se incluya el área con calificaciones vacías
          allAreasData.push({ idArea, calificaciones: [] });
        }
      }
      setAreasData(allAreasData);
    };

    fetchAllAreas();
  }, [trimestre, idestud]);

  const handleObservacionChange = (event) => {
    const { value } = event.target;
    setObservacion(value);

    if (errors.observacion) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        observacion: "", // Elimina el error de observación
      }));
    }
  };

  const openModal = () => {

    const areasSinCalificar = areasData.some((area) => area.calificaciones.length === 0);
    const newErrors = {};
  
    // Verificar si hay áreas sin calificar
    if (areasSinCalificar) {
      newErrors.areas = (
        <p className="font-cocogooseLight text-paragraph text-red-600">
          Todas las áreas deben estar calificadas para enviar el informe
        </p>
      );
    }
  
    // Verificar si la observación está vacía
    if (!observacion) {
      newErrors.observacion = "La observación es obligatoria";
    }
  
    // Si hay errores relacionados con las áreas, actualizar el estado y desplazarse al inicio de la página
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      
      // Solo desplazarse al inicio si hay áreas sin calificar
      if (areasSinCalificar) {
        window.scrollTo({ top: 0, behavior: "smooth" }); // Desplazarse al inicio
      }
  
      return;
    }
  
    // Si no hay errores, abrir el modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    if (!observacion) {
      setErrors({ observacion: "La observación es obligatoria" })
      return
    }
    /*
    const error = caseAdmin("observacion", observacion);

    if (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        observacion: error,
      }));
      return;
    }
    */

    const data = {
      idestudiante: idestud,
      idtrimestre: trimestre,
      observacion: observacion,
    };

    try {
      setIsLoading(true);
      setIsModalOpen(false);

      const response = await postCreateInforme(data, "informe/create/");
      //VALIDACIONES
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      console.log("FINISH");
      setIsLoading(false);
      // Desplazarse al inicio de la página
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="w-full space-y-7">
        {/* Mostrar mensaje de error si hay áreas sin calificar */}
        {errors.areas && (
          <p className="text-red-500 text-center">{errors.areas}</p>
        )}

        {/* Mapear las áreas para renderizar InformeIndividual */}
        {areasData.map(({ idArea, calificaciones }, index) => (
          <InformeIndividual
            key={idArea}
            tituloArea={titulosAreas[index]}
            idArea={idArea}
            idtrim={trimestre}
            idestud={idestud}
            data={calificaciones}
          />
        ))}

        <Observacion
          texto={"Observación"}
          placeholder={"Ingrese la observación del estudiante"}
          name={"observacion"}
          onChange={handleObservacionChange}
          value={observacion}
          error={errors.observacion}
          disabled={isInformeCreado} // Deshabilitar si el informe ya está creado
        />
      </div>

      {/* Solo mostrar el botón si el informe no ha sido creado */}
      {!isInformeCreado && (
        <div className="mt-7 flex justify-center">
          <Boton
            text={"Enviar y Descargar"}
            type={"blue"}
            onClick={openModal}
          />
        </div>
      )}

      <ConfirmationModal
        txtQuestion="¿Está seguro de crear el informe?"
        txtWarning="Al crear el informe, no habrá posibilidad de revertir esta opción..."
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={async () => {
          await handleSubmit();
          closeModal();
        }}
      />

      <LoadingModal
        isOpen={isLoading}
        onClose={() => { }}
        text={"Espera mientras se genera el informe..."}
      />
    </>
  );
};

export default Calificaciones;
