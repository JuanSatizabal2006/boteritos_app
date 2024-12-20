import React, { useState, useEffect } from "react";
import Buscador from "../../search/Buscador";
import { ConfirmationModal } from "../../modales/ConfirmationModal";
import { getAllTeachers } from "../../../api/get";
import { putDeleteTeacher } from "../../../api/put";
import ReactPaginate from "react-paginate";

const TableListTeachers = ({ getId }) => {
  const [openAcc, setOpenAcc] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [dataTeacher, setDataTeacher] = useState([]); // Estado para almacenar los profesores.
  const [selectedIdTeacher, setSelectedIdTeacher] = useState(null); 

  // Paginación
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handleOpen = (idprofesor) => {
    setSelectedIdTeacher(idprofesor);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedIdTeacher(null); //Limpiar id
  };

  const toggleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  // useEffect para cargar los profesores
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const dataApi = await getAllTeachers("profesor/tabla");
        console.log(dataApi);
        setDataTeacher(dataApi.data.data || []);
      } catch (error) {
        console.error("Error al obtener los profesores:", error);
      }
    };
    fetchTeachers(); // Ejecuta la función
  }, []);

  const handleDeleteTeacher = async () => {
    if (selectedIdTeacher) {
      const body = {
        idprofesor: selectedIdTeacher,
        estado: 0, // Establece el estado en 0 para eliminar
      };

      try {
        const result = await putDeleteTeacher(body); // Llama a la función con body 
        console.log(result);

        // Actualiza el estado de los profesores
        setDataTeacher((prevData) => 
          prevData.filter(teacher => teacher.idprofesor !== selectedIdTeacher)
        );

        handleClose(); // Cierra el modal de confirmación
        
      } catch (error) {
        console.error("Error eliminando profesor:", error);
      }
    }
  };

  // Calcula la paginación
  const pageCount = Math.ceil(dataTeacher.length / itemsPerPage);

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  // Obtiene los datos de la página actual
  const displayedTeachers = dataTeacher.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        <div className="flex gap-2 justify-between w-full pb-5">
          <Buscador />
        </div>

        <section className="max-h[80vh] overflow-y-scroll">
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(400px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Nombre</p>
            <p>Título</p>
            <p>Área</p>
            <p>Acción</p>
          </div>
          {displayedTeachers.map((data, index) => (
            <div
              className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(400px,1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${openAcc === index ? "open" : "close"}`}
              key={index}
            >
              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">No°</p>
                <div className="acc-header w-full flex justify-between items-center">
                  <p>{data.idprofesor.toString().length === 2 ? data.idprofesor : `0${data.idprofesor}`}</p>
                  <button onClick={() => toggleRow(index)}>
                    <i className="fa-solid fa-angle-down block lg:hidden"></i>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Nombre:</p>
                <div className="acc-header w-full flex justify-between items-center cursor-pointer underline" onClick={() => getId(data.idprofesor)}>
                  <p>{`${data.nombre}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Título:</p>
                <div className="w-full flex justify-between items-center">
                  <p>{`${data.titulo}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Área:</p>
                <div className="w-full flex justify-between items-center">
                  <p>{`${data.area}`}</p>
                </div>
              </div>

              <div className="acc-body flex gap-2 lg:gap-0 items-end">
                <p className="text-darkBlue lg:hidden">Acción:</p>
                <div className="w-full flex items-center">
                  <i className="fa-solid fa-trash text-2xl cursor-pointer text-redFull" onClick={() => handleOpen(data.idprofesor)}></i>
                </div>
              </div>
            </div>
          ))}
        </section>
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
      <ConfirmationModal
        isOpen={isOpen}
        onClose={handleClose}
        txtQuestion={`¿Está seguro de eliminar este usuario?`}
        txtWarning={`Si presionas continuar, no podrás modificar esta selección. Por favor, asegúrate de que la acción es correcta antes de continuar.`}
        onConfirm={handleDeleteTeacher}
      />
    </>
  );
};

export default TableListTeachers;
