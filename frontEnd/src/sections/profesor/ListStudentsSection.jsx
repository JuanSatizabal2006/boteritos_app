import { useState } from "react";
import HeaderData from "../../components/list/headerData/HeaderData";
import TablesStudentsTeacher from "../../components/list/tables/TablesStudentsTeacher";

export const ListStudentsSection = () => {
  const [idEstudiante, setIdEstudiante] = useState("");

  //ID QUE IRÁ CAMBIANDO, ESTE ES EL ID QUE ENVIA LA LISTA Y VA A RECIBIR EL HEAD
  const getId = (value) => {
    setIdEstudiante(value);
  };

  return (
    <main className="flex flex-col gap-8">
      <HeaderData
        id={idEstudiante}
        urlApi={"sql/estudiantes/header/"}
        typeLink={"go"}
        urlGo={"calificarestudiante"}
        typeActiondata={"view2"}
      />
      <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">
        LISTA DE ESTUDIANTES
      </p>
      <TablesStudentsTeacher getId={getId} />
    </main>
  );
};
