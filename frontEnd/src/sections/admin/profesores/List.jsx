import { useState, useEffect } from "react";
import HeaderData from "../../../components/list/headerData/HeaderData";
import TableListTeacher from "../../../components/list/tables/TableListTeachers";

const List = () => {
  const [idProfesor, setIdProfesor] = useState("");
  const [headerData, setHeaderData] = useState(null);

  // Función que recibe el ID del profesor desde la tabla
  const getId = (value) => {
    setIdProfesor(value);
  };

  // Efecto para hacer la solicitud GET cuando cambie idProfesor
  // useEffect(() => {
  //   if (idProfesor) {
  //     const fetchHeaderData = async () => {
  //       try {
  //         const response = await fetch(`http://localhost:8000/api/v3/registro/profesor/header/${idProfesor}`);
  //         if (!response.ok) {
  //           throw new Error("Error al obtener los datos del profesor");
  //         }
  //         const data = await response.json();
  //         console.log("Datos recibidos del header:", data);
  //         setHeaderData(data);
  //       } catch (error) {
  //         console.error("Error fetching header data:", error);
  //       }
  //     };

  //     fetchHeaderData();
  //   }
  // }, [idProfesor]);

  return (
    <>
      {/* datoprofesor no existe, provicional por ahora, no me regañe */}
      <main className="flex flex-col gap-8">
        <HeaderData
          id={idProfesor}
          urlApi={"sql/profesor/header/"}
          typeLink={"go"}
          urlGo={"datosprofesor"}
          typeHeaderdata={"view1"}
        />
        <p className="text-subTitle font-cocogooseSemiLight text-darkBlue">
          LISTA DE PROFESORES
        </p>
        <TableListTeacher getId={getId} />
      </main>
    </>
  );
};

export default List;
