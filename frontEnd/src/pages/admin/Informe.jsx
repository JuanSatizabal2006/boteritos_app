import React from "react";
import { GrupoDatoElemento } from "../../components/datosEstudiante/GrupoDatoElemento";
import HeaderData from "../../components/list/headerData/HeaderData";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import Calificaciones from "../../sections/admin/estudiantes/Calificaciones";
import { useParams } from "react-router-dom";

const Informe = () => { 
  const { id } = useParams();

  return (
    <LayoutGeneral title="InformeObservacion" titleHeader="Informe">
      <div className="w-full space-y-7">
        <HeaderData
          id={id}
          urlApi={"sql/estudiantes/header/"}
          typeLink={"back"}
        />
        <GrupoDatoElemento />
        <div className="w-full h-0 border-darkBlue border-2"></div>

        <Calificaciones />

      </div>

    </LayoutGeneral>
  );
};

export default Informe;
