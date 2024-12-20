import React from 'react'
import { LayoutGeneral } from '../../layouts/LayoutGeneral';
import { downloadInforme, getInformesEstudiante } from '../../api/get';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Button } from '@tremor/react';
import { LoadingModal } from '../../components/modales/LoadingModal';
import ReactPaginate from 'react-paginate';

const InformesRecibidos = () => {

    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const decodedToken = jwtDecode(access_token);
    const idstudiante = decodedToken.idjob;
    const [informes, setInformes] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    // Paginación
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    //DESCARGAR INFORME 
    const downloadInform = async (idinforme) => {
        setIsLoading(true); // Muestra el modal de carga

        try {
            console.log(idinforme);
            const data = await downloadInforme(`informe/estudiante/one/${idinforme}/`);
            //VALIDACIONES Y CARGANDO
            console.log("Descarga completada", data);

            // Descarga completada, oculta el modal de carga
            setIsLoading(false);
        } catch (error) {
            console.error("Error al descargar el informe:", error);
            // por si algo lo cierro si hay error, por si algo
            setIsLoading(false);
        }
    }

    // LISTAR INFORMES
    const listInformes = async (idstudiante) => {
        try {
            const response = await getInformesEstudiante(`informe/estudiante/${idstudiante}/`);

            if (response.status !== 200) {
                setInformes([]); // Vaciar el estado si no se encuentran informes
                return;
            }

            // Guardar los datos de los informes en el estado
            const data = response.data.data;
            console.log(data);
            setInformes(data);

        } catch (error) {
            console.error("Error al listar los informes:", error);
            setInformes([]); // En caso de error, también vaciar el estado
        }
    };

    // Llamar a listInformes cuando el componente se monta
    useEffect(() => {
        listInformes(idstudiante);
    }, [idstudiante]);

    const handleDownloadStart = (isLoading) => {
        setIsLoading(isLoading); // Muestra o cierra el modal de carga basado en el valor
    };

    // Calcula la paginación
    const pageCount = Math.ceil(informes.length / itemsPerPage);

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };

    // Obtiene los datos de la página actual
    const displayedInformes = informes.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    return (
        <LayoutGeneral titleHeader={"Informes recibidos"}>
            <div className="relative flex flex-col gap-4 items-start py-6 px-4 w-full mx-auto bg-white rounded-lg shadow-lg">
                {/* Header tabla */}
                <div className="w-full grid grid-cols-3 sm:grid-cols-[minmax(300px,_1fr)_repeat(2,minmax(200px,_1fr))] gap-4 text-subTitle2 font-cocogooseSemiLight text-darkBlue mb-2">
                    <p className="col-span-full sm:col-span-1 text-title xl:text-subTitle2">Informes</p>
                    <p className="hidden sm:block">Fecha</p>
                    <p className="hidden sm:block text-center">Descargar</p>
                </div>
                {/* BODY */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-paragraph font-cocogooseLight text-black border-t-2 border-placeholderBlue pt-4">
                    {displayedInformes && displayedInformes.length > 0 ? (
                        displayedInformes.map((informe, index) => (
                            <React.Fragment key={index}>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:col-span-1">
                                    <p className="font-cocogooseLight text-subTitle text-darkBlue sm:hidden">Informe:</p>
                                    <p>{informe.informe}</p>
                                </div>
                                <div className="flex flex-col sm:flex-row  sm:col-span-1">
                                    <p className="font-cocogooseLight text-subTitle text-darkBlue sm:hidden">Fecha:</p>
                                    <p>{informe.fecha}</p>
                                </div>
                                <Button className="rounded-2xl transition ease-in-out sm:col-span-1" onClick={() => downloadInform(informe.idinforme)}>
                                    <div className="flex gap-2 w-full sm:w-fit items-center justify-center">
                                        <i className="fa-regular fa-eye"></i>
                                        <span className="">Descargar</span>
                                    </div>
                                </Button>
                            </React.Fragment>
                        ))
                    ) : (
                        <p className="col-span-full font-cocogooseLight text-darkBlue text-subTitle text-center">No hay informes disponibles.</p>
                    )}
                </div>
                <div className='w-full flex justify-center'>
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
                </div>
            </div>
            {isLoading && (
                <LoadingModal
                    isOpen={isLoading}
                    onClose={() => setIsLoading(false)}
                    text="Espera mientras se descarga el informe..."
                />
            )}


        </LayoutGeneral>
    )
}
export default InformesRecibidos;
