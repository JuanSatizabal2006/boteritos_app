//import React from "react";
import { useState } from "react";
import HeaderData from "../../../components/list/headerData/HeaderData";
import TableStudents from "../../../components/list/tables/TableStudents";

export const List = () => {

  const [idEstudiante, setIdEstudiante] = useState('')
  
  //ID QUE IRÁ CAMBIANDO, ESTE ES EL ID QUE ENVIA LA LISTA Y VA A RECIBIR EL HEAD
  const getId = (value) =>{
    setIdEstudiante(value)
  }

  return (
    <>
      <main className="flex flex-col gap-8">
        <HeaderData id={idEstudiante} urlApi={'sql/estudiantes/header/'} typeLink={'go'} urlGo={'datoestudiante'} typeHeaderdata={"view1"}/>
        <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">
          LISTA DE ESTUDIANTES
        </p>
        <TableStudents getId={getId} />
      </main>
    </>
  );
};
