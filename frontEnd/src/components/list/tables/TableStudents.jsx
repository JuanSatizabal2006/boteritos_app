import { useEffect, useState } from "react";
import { getAllUser, getInformesEstudiante } from "../../../api/get.js";
import DataState from "../dataStates/DataState.jsx";
import { ModalInformes } from "../../modales/ModalInformes";
import { ConfirmationModal } from "../../modales/ConfirmationModal.jsx";
import { putDeleteStudents } from "../../../api/put.js";
import ReactPaginate from "react-paginate";
import { LoadingModal } from "../../modales/LoadingModal.jsx";

export default function TableStudents({ getId }) {
  const [dataStudents, setDataStudents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState(-1);
  const [selectedInforme, setSelectedInforme] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null); //ID seleccionado en el boton de eliminar

  // Paginación
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const toogleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  const handleOpenConfirmationModal = (idestudiante) => {
    setSelectedStudentId(idestudiante); // Almacena el ID del estudiante
    setIsConfirmationModalOpen(true); // Abre el modal de confirmación
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setSelectedStudentId(null); // Limpia el ID al cerrar el modal
  };

  //ABRIR MODAL DE INFORMES
  const handleOpenInformeModal = async (idstudiante) => {
    //LISTAR INFORMES
    const listInformes = await getInformesEstudiante(
      `informe/estudiante/${idstudiante}/`
    );

    console.log(listInformes);

    //INFORMES NO ENCONTRADOS
    if (listInformes.status != 200) {
      setSelectedInforme([]);
      setIsOpen(true);
      return;
    }
    //DATOS DE LOS INFORMES
    const data = listInformes.data.data;
    console.log(data);

    setSelectedInforme(data);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedInforme(null); // Limpia el informe seleccionado al cerrar
  };

  useEffect(() => {
    const obtainData = async () => {
      const dataApi = await getAllUser("sql/estudiantes/tabla");
      console.log(dataApi);
      setDataStudents(dataApi.data);
    };
    obtainData();
  }, []);

  const handleDeleteStudent = async () => {
    if (selectedStudentId) {
      const body = {
        idestudiante: selectedStudentId,
        estado: 0, // Establece el estado en 0 para eliminar
      };

      try {
        const result = await putDeleteStudents(body); // Llama a la función con body
        console.log(result);

        // Actualiza el estado de los estudiantes
        setDataStudents((prevData) =>
          prevData.filter(
            (student) => student.idestudiante !== selectedStudentId
          )
        );

        handleCloseConfirmationModal(); // Cierra el modal de confirmación
      } catch (error) {
        console.error("Error eliminando estudiante:", error);
      }
    }
  };

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

  const handleDownloadStart = (isLoading) => {
    setIsLoading(isLoading); // Muestra o cierra el modal de carga basado en el valor
  };

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        <header>
          <div className="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="w-full" />
          </div>
        </header>

        <section className="max-h-[800px] sm:max-h-[500px] overflow-y-scroll">
          <div className="sticky bg-white top-0 lg:grid grid-cols-[150px_minmax(350px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Diagnóstico</p>
            <p>Calificación</p>
            <p>Acción</p>
          </div>

          {displayedStudents.length > 0 ? (
            displayedStudents.map((data, index) => (
              <div
                className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(350px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
                  openAcc === index ? "open" : "close"
                }`}
                key={data.idestudiante}
              >
                <div className="flex gap-2 lg:gap-0 ">
                  <p className="text-darkBlue lg:hidden">No°</p>
                  <div className="acc-header w-full flex justify-between items-center ">
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
                <div className="acc-header flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Nombre:</p>
                  <div className="w-full flex justify-between items-center">
                    <p
                      className="underline cursor-pointer"
                      onClick={() => getId(data.idestudiante)}
                    >{`${data.nombre} ${data.apellido}`}</p>
                  </div>
                </div>
                <div className="acc-body flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Diagnostico:</p>
                  <div className="w-full flex justify-between items-center">
                    {data.diagnostico ? (
                      <p>{data.diagnostico}</p>
                    ) : (
                      <div className="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center w-auto">
                        <div className="w-[15px] h-[15px] bg-orange rounded-full"></div>
                        <p className="text-orange">Sin datos</p>
                      </div>
                    )}
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

                <div className="acc-body flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Acción:</p>
                  <div className="w-full flex justify-between items-center">
                    <div className="justify-self-center flex gap-3">
                      <i
                        className="fa-solid fa-file-lines text-2xl cursor-pointer text-darkBlue"
                        onClick={() =>
                          handleOpenInformeModal(data.idestudiante)
                        }
                      ></i>
                      <i
                        className="fa-solid fa-trash text-2xl cursor-pointer text-redFull"
                        onClick={() =>
                          handleOpenConfirmationModal(data.idestudiante)
                        } // Pasa el id del estudiante
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-darkBlue font-cocogooseLight text-paragraph">
              ¡No hay estudiantes registrados!
            </p>
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

      {isOpen && (
        <ModalInformes
        isOpen={isOpen}
        onClose={handleCloseModal}
        txtmodal="Informes del Estudiante"
        informes={selectedInforme || []}
        onDownloadStart={handleDownloadStart}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        txtQuestion={`¿Está seguro de eliminar este usuario?`}
        txtWarning={`Si presionas continuar, no podrás modificar esta selección. Por favor, asegúrate de que la acción es correcta antes de continuar.`}
        onConfirm={handleDeleteStudent}
      />

{isLoading && (
        <LoadingModal
          isOpen={isLoading}
          onClose={() => setIsLoading(false)} 
          text="Espera mientras se descarga el informe..."
        />
      )}
    </>
  );
}
