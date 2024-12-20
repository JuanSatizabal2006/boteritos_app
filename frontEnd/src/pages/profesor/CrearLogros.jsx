
import TableListaLogros from "../../components/list/tables/TableListaLogros.jsx";
import {LayoutGeneral} from "../../layouts/LayoutGeneral.jsx";

const CrearLogros = () => {
  return (
    <LayoutGeneral titleHeader="Logros">
      <main className="flex flex-col w-full gap-y-8">
        <TableListaLogros />
      </main>
    </LayoutGeneral>
  );
};

export default CrearLogros;
