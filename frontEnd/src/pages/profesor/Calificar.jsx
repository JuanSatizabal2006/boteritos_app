import { useParams } from "react-router-dom";
import { LayoutGeneral } from "../../layouts/LayoutGeneral.jsx";
import { Calificar as CalificarImportado } from "../../sections/profesor/Calificar.jsx";
import HeaderData from "../../components/list/headerData/HeaderData.jsx";

const Calificar = () => {
  const { id } = useParams();

  return (
    <LayoutGeneral titleHeader="Calificar">
      <main className="flex flex-col w-full gap-y-8">
        <HeaderData
          id={id}
          urlApi={"sql/estudiantes/header/"}
          typeLink={"back"}
          urlGo={"listaestudiantes"}
        />
      </main>
      <CalificarImportado />
    </LayoutGeneral>
  );
};
export default Calificar;
