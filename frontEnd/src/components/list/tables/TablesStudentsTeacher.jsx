
import { useState, useEffect } from "react";
import Buscador from "../../search/Buscador";
import DataState from "../dataStates/DataState";
import { getAllUser } from "../../../api/get";
import ReactPaginate from "react-paginate";


export default function TablesStudentsTeacher({ getId }) {

  // Paginación
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const [dataStudents, setDataStudents] = useState([]);

  const [openAcc, setOpenAcc] = useState(-1);

  const toogleRow = (index) => {
    openAcc != index ? setOpenAcc(index) : setOpenAcc(-1);
  }

  useEffect(() => {
    const obtainData = async () => {
      const dataApi = await getAllUser("sql/estudiantes/tabla");
      console.log(dataApi);
      setDataStudents(dataApi.data);
    };
    obtainData();
  }, []);

  // Calcula la paginación
  const pageCount = Math.ceil(dataStudents.length / itemsPerPage);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  // Obtiene los datos de la página actual
  const displayedStudents = dataStudents.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*buscador*/}
        {/*<Buscador/>*/}
        <header className="flex justify-center sm:flex sm:justify-start">
          <Buscador />
        </header>

        <section className="max-h-[80vh] overflow-y-scroll ">
          {/* HEADER TABLA */}
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(350px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue bg-white hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p>Calificación</p>
          </div>

          {/* CUERPO DE LA TABLA */}
          {displayedStudents.length > 0 ? (
            displayedStudents.map((data, index) => (
              <div
                className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(350px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${openAcc === index ? "open" : "close"
                  }`}
                key={data.idestudiante}
              >
                <div className="flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">No°:</p>
                  <div className="acc-header w-full flex justify-between items-center">
                    <p>
                      {data.idestudiante.toString().length === 2
                        ? data.idestudiante
                        : `0${data.idestudiante}`}
                    </p>
                    <button onClick={() => toogleRow(index)}>
                      <i className="fa-solid fa-angle-down block lg:hidden"></i>
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Nombre:</p>
                  <div className="flex justify-self-center acc-header">
                    <p
                      className="underline cursor-pointer"
                      onClick={() => getId(data.idestudiante)}
                    >
                      {`${data.nombre} ${data.apellido}`}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 lg:gap-0 acc-body">
                  <p className="text-darkBlue lg:hidden">Diagnostico:</p>
                  <div className="flex justify-self-center">
                    <p>{data.diagnostico || <div className="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
                      <div className="w-[15px] h-[15px] bg-orange rounded-full"></div>
                      <p className="text-orange">Sin datos</p>
                    </div>}</p>
                  </div>
                </div>

                <div className="acc-body flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Calificación:</p>
                  <div className="w-full flex justify-between items-center">
                    {data.calificado ? (
                      <DataState state={data.calificado} />
                    ) : (
                      <div className="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
                        <div className="w-[15px] h-[15px] bg-orange rounded-full"></div>
                        <p className="text-orange">Sin datos</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>¡No hay estudiantes registrados!</p>
          )}
        </section>
        {/* Agregar el componente de paginación */}
        <ReactPaginate
          previousLabel={
            <div className="flex justify-center items-center bg-blue-500 text-white  text-subTitle px-4 py-2 rounded hover:bg-darkBlue transition-all duration-200 ease-in">
              <i className="fa-solid fa-angles-left"></i>
            </div>
          }
          nextLabel={
            <div className="flex justify-center items-center bg-blue-500 text-white text-subTitle px-4 py-2 rounded hover:bg-darkBlue transition-all duration-200 ease-in">
              <i className="fa-solid fa-angles-right"></i>
            </div>
          }
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center items-center space-x-2 py-4"}
          previousClassName={"cursor-pointer"}
          nextClassName={"cursor-pointer"}
          pageClassName={"cursor-pointer"}
          pageLinkClassName={
            "flex justify-center items-center bg-blue-500 text-white font-cocogooseLight text-paragraph2 px-4 py-2 rounded hover:bg-darkBlue transition-all duration-200 ease-in"
          } // Estilo de enlace de página
          activeClassName={"bg-darkBlue text-white rounded"} // Clase para el botón de página activa
          activeLinkClassName={"bg-darkBlue text-white rounded"} // Clase para el enlace activo
        />
      </main>
    </>
  );
}