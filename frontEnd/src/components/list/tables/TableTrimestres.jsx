import React, { useEffect, useState } from "react";
import Buscador from "../../search/Buscador";
import { Switch } from "../../forms/Switch";
import { getTrimestres } from "../../../api/get";
import { getYear } from "../../../helper/functions/getDate";
import { putUpdateTrim } from "../../../api/put";
import { Button } from "@tremor/react";
import { DatePicker2 } from "../../forms/DatePicker";
import { UpdateModal } from "../../modales/UpdateModal";
import { format, formatDate } from "date-fns";

const TableTrimestres = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState(-1);
  const [selectedTrim, setSelectedTrim] = useState(null);
  const anoActual = getYear();
  const [dataTrim, setDatatrim] = useState([]);
  const [values, setValues] = useState({
    fechainicio: "",
    fechafinal: "",
  });
  // const handleForm = (event) => {
  //   event.preventDefault();
  //   console.log(values);
  //   setValues({
  //     fechainicio: "",
  //     fechafinal: "",
  //   });
  //   setIsConfirm(true);
  // };

  const handleOpenModal = (trimestre) => {
    console.log("Trimestre seleccionado:", trimestre);
    console.log("Fecha inicio:", new Date(trimestre.fechainicio));
    console.log("Fecha final:", new Date(trimestre.fechafin));
    setSelectedTrim(trimestre); // Guarda el trimestre seleccionado
    setValues({
      fechainicio: new Date(trimestre.fechainicio), // Asegúrate de que esto sea un objeto Date
      fechafinal: new Date(trimestre.fechafin), // Asegúrate de que esto sea un objeto Date
    });
    setIsOpen(true); // Abre el modal
    setIsConfirm(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsConfirm(false);
  };

  // Alterna la fila expandida en la tabla
  const toogleRow = (index) => {
    setOpenAcc(openAcc !== index ? index : -1);
  };

  const handleDateChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Función para manejar el cambio de estado del switch
  const handleSwitchChange = async (idtrimestre, nuevoEstado) => {
    const body = {
      estado: nuevoEstado,
      idtrimestre,
    };

    try {
      await putUpdateTrim(JSON.stringify(body), `logros/trimestre/`);
      setDatatrim((prevData) =>
        prevData.map((trim) =>
          trim.idtrimestre === idtrimestre
            ? { ...trim, estado: nuevoEstado }
            : trim
        )
      );
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  useEffect(() => {
    const obtainData = async () => {
      try {
        const dataApi = await getTrimestres(`trimestre/${anoActual}/`);
        console.log(dataApi.data.data); // Verifica qué datos estás obteniendo
        setDatatrim(dataApi.data.data || []); // Establece un array vacío por defecto
      } catch (error) {
        console.error("Error al obtener los trimestres:", error);
      }
    };

    obtainData();
  }, [anoActual]);

  // Función para guardar las fechas modificadas
  const handleSaveChanges = async () => {
    // Guardar el estado actual de dataTrim
    const previousDataTrim = [...dataTrim];

    try {
      const body = {
        fechainicio: formatDate(values.fechainicio, "yyyy-MM-dd"),
        fechafin: formatDate(values.fechafinal, "yyyy-MM-dd"),
        idtrimestre: selectedTrim.idtrimestre,
        estado: selectedTrim.estado,
      };

      await putUpdateTrim(JSON.stringify(body), `logros/trimestre/`);

      setDatatrim((prevData) =>
        prevData.map((trim) =>
          trim.idtrimestre === selectedTrim.idtrimestre
            ? {
                ...trim,
                fechainicio: body.fechainicio,
                fechafin: body.fechafin,
                estado: body.estado,
              }
            : trim
        )
      );
      setIsConfirm(true);
      
    } catch (error) {
      console.error("Error al actualizar las fechas:", error);
      // Si hay un error, restaurar el estado anterior
      setDatatrim(previousDataTrim);
    }
  };

  return (
    <>
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*BUSCADOR Y MÁS */}

        <header className="flex gap-2 justify-between w-full pb-5">
          <Buscador />
        </header>

        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(200px,_1fr)_repeat(2,_minmax(250px,_1fr))_repeat(2,_minmax(150px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden bg-white ">
            <p>No°</p>
            <p>Trimestre</p>
            <p>Fecha inicio</p>
            <p>Fecha final</p>
            <p>Estado</p>
            <p>Editar</p>
          </div>
          {/*CUERPO DE LA TABLA */}
          {dataTrim.map((data, index) => (
            <div
              className={`acc-item grid grid-cols-1 lg:grid-cols-[150px_minmax(200px,_1fr)_repeat(2,_minmax(250px,_1fr))_repeat(2,_minmax(150px,_1fr))] items-center gap-x-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${
                openAcc === index ? "open" : "close"
              }`}
              key={index}
            >
              <div className="flex gap-2 lg:gap-0 ">
                <p className="text-darkBlue lg:hidden">No°</p>
                <div className="acc-header w-full flex justify-between items-center ">
                  <p>
                    {(index + 1).toString().length === 2
                      ? index + 1
                      : `0${index + 1}`}
                  </p>
                  <button onClick={() => toogleRow(index)}>
                    <i className="fa-solid fa-angle-down block lg:hidden"></i>
                  </button>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0">
                <p className="text-darkBlue lg:hidden">Trimestre:</p>
                <div className="acc-header w-full">
                  <p>{`${data.trimestre}`}</p>{" "}
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Fecha inicio:</p>
                <div className="w-full">
                  <p>{`${data.fechainicio}`}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Fecha final:</p>
                <div className="w-full">
                  <p>{`${data.fechafin}`}</p>
                </div>
              </div>

              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Estado:</p>
                <div className="w-full">
                  <Switch
                    checked={Number(data.estado)}
                    idtrimestre={data.idtrimestre}
                    onChange={handleSwitchChange}
                  />
                </div>
              </div>
              <div className="flex gap-2 lg:gap-0 acc-body">
                <p className="text-darkBlue lg:hidden">Editar</p>
                <div className="w-full">
                  <Button onClick={() => handleOpenModal(data)}>
                    Editar Fechas
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Modal para editar fechas */}
      <UpdateModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
        isConfirm={isConfirm}
        textConfirmation={"Fechas actualizadas con éxito"}
      >
        <div className="grid grid-cols-2 gap-8 w-full">
          <DatePicker2
            name="fechainicio"
            texto="Seleccione la Fecha inicial"
            value={values.fechainicio}
            onChange={(e) => handleDateChange("fechainicio", e.target.value)}
          />
          <DatePicker2
            name="fechafinal"
            texto="Seleccione la Fecha Final"
            value={values.fechafinal}
            onChange={(e) => handleDateChange("fechafinal", e.target.value)}
          />
        </div>
      </UpdateModal>
    </>
  );
};
export default TableTrimestres;
