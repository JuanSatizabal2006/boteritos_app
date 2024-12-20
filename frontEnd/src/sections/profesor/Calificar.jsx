import TableCalificarEstudiante from "../../components/list/tables/TableCalificarEstudiante";
import { useState, useEffect } from "react";
import { ConfirmationModal } from "../../components/modales/ConfirmationModal";
import { Button } from "@tremor/react";
import { enviarLogros, guardarLogros } from "../../api/put";
import { useParams } from "react-router-dom";

export const Calificar = () => {
  const { id } = useParams(); // Obtener el id del estudiante desde la URL
  const [isOpen, setIsOpen] = useState(false);
  const [isSaveOpen, setIsSaveOpen] = useState(false);
  const [selectedLogros, setSelectedLogros] = useState({}); //estado para los logros seleccionados
  const [isSubmitted, setIsSubmitted] = useState(false); // Estado para verificar si ya se envió la calificación
  const [isConfirm, setIsConfirm] = useState(false);
  const [handleConfirm, setHandleConfirm] = useState(false);

  // Cargar estado de envío para el estudiante específico desde localStorage al cargar el componente
  useEffect(() => {
    const submittedLogros = JSON.parse(localStorage.getItem("submittedLogros")) || {};
    setIsSubmitted(submittedLogros[id] === true);
  }, [id]);

  const handleSaveModalOpen = () => {
    setIsSaveOpen(true)
    setIsConfirm(false);
  }

  const handleSaveModalClose = () => {
    setIsSaveOpen(false)

  }

  const handleOpenModal = () => {
    // Verificar si selectedLogros está vacío
    if (Object.keys(selectedLogros).length === 0) {
      <p className="font-cocogooseLight text-paragraph text-red-600">No hay logros calificados para enviar</p>;
      return;
    }
    setIsOpen(true);
    setHandleConfirm(false)
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  //GUARDAR
  const handleSave = async () => {
    
    const data = await guardarLogros(selectedLogros);
    console.log(data);
    setIsConfirm(true);
  };

  //ENVIAR
  const handleSubmit = async () => {
    const data = await enviarLogros(selectedLogros);
    
    if (data.status === 200) {
      setIsSubmitted(true); // Actualizar el estado de envío local
      const submittedLogros = JSON.parse(localStorage.getItem("submittedLogros")) || {};
      submittedLogros[id] = true;
      localStorage.setItem("submittedLogros", JSON.stringify(submittedLogros));
    } else {
      console.error("Error al enviar los logros:", data.error);
    }
    setHandleConfirm(true);
  };

  return (
    <>
      <main className="flex flex-col w-full gap-y-8">
        <TableCalificarEstudiante setSelectedLogros={setSelectedLogros} />

        <div className="w full flex justify-end gap-x-3">
          <Button
            onClick={handleSaveModalOpen}
            className="max-w-[400px] min-w-28 w-full h-[50px] rounded-xl font-cocogooseRegular tracking-widest text-button bg-white text-darkBlue hover:bg-darkBlue hover:text-white"
          >
            Guardar
          </Button>

          {!isSubmitted && ( // Ocultamos el botón de enviar si ya se ha enviado
            <Button
              onClick={handleOpenModal}
              className="max-w-[400px] min-w-28 w-full h-[50px] rounded-xl font-cocogooseRegular tracking-widest text-button text-white"
              disabled={Object.keys(selectedLogros).length === 0} // Deshabilitar si no hay logros seleccionados
            >
              Enviar
            </Button>
          )}
        </div>

        <ConfirmationModal
          onConfirm={handleSubmit}
          isOpen={isOpen}
          onClose={handleCloseModal}
          txtQuestion={"¿Está seguro de enviarlo?"}
          txtWarning={
            "Una vez enviada, no podrás modificar esta calificación. Por favor, asegúrate de que toda la información es correcta antes de continuar."
          }
          isConfirm={handleConfirm}
          textCheck={"Calificación enviada"}
        />

        <ConfirmationModal 
        onConfirm={handleSave}
        isOpen={isSaveOpen}
        onClose={handleSaveModalClose}
        txtQuestion={"¿Guardar resultados?"}
        txtWarning={"Tranquilo, los resultados guardados no serán enviados al administrador, es solo para que lleves tus calificaciones con mayor seguridad a lo largo del trimestre."}
        isConfirm={isConfirm}
        textCheck={"Calificación guardada"}
        />
      </main>
    </>
  );
};
