import { useNavigate } from "react-router-dom";
import { Elemento } from "./Elemento";
import { useState } from "react";
import { Modal } from "../modales/Modal";

export const Sidebar = ({ img, name, rol, sidebarSection = [], onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Estado para la sección activa
  const [ isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const toggleSidebar = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onToggle(newExpandedState); // Notifica a LayoutGeneral el estado de expansión
  };

  // Función para manejar cuando se selecciona una sección
  const handleSectionClick = (sectionText) => {
    if (sectionText === "Salir") {
      setIsOpen(true); // Abre el modal de confirmación
    } else {
      setActiveSection(sectionText);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleConfirmLogout = () => {
    localStorage.clear(); // Limpiar el local storage cuando se confirme el cierre
    navigate(0); // Redirigir a la página de inicio
    setIsOpen(false); // Cerrar el modal
  };

  return (
    <>
      {/* Sidebar visible en pantallas grandes */}
      <div className={`hidden xl:flex w-[95px] h-screen sticky top-0 z-50`}>
        <div className="w-full h-screen sticky top-0">
          <div
            className={`absolute sidebar h-screen bg-white flex-col items-center flex-shrink-0 transition-all duration-300 ${
              isExpanded ? "w-[300px]" : "w-[95px]"
            }`}
          >
            {/* Contenido de la sidebar */}
            <div className="bg-darkBlue px-5 h-[100px] w-full flex items-center mb-6 relative text-white">
              <div className="w-[60px] min-w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
                <img
                  src={img || ""}
                  alt="Easter egg"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div
                className={`font-cocogooseLight ml-2 ${
                  isExpanded ? "" : "hidden"
                }`}
                id="sidebar-text"
              >
                <p className="text-paragraph2 text-nowrap">{name}</p>
                <p className="text-paragraph3 text-nowrap">{rol}</p>
              </div>
              <div
                className="w-[24px] h-[24px] rounded-full bg-white shadow-2xl text-sm text-black flex justify-center items-center absolute right-[-12px] cursor-pointer"
                onClick={toggleSidebar}
              >
                <i
                  className={`fa-solid fa-angle-${
                    isExpanded ? "left" : "right"
                  }`}
                ></i>
              </div>
            </div>

            {/* Elementos del sidebar */}
            <div className="flex flex-col items-center gap-y-3 w-full px-4">
              {sidebarSection.map((section) => (
                <Elemento
                  key={section.texto}
                  icon={section.icon}
                  text={section.texto}
                  link={section.link}
                  isExpanded={isExpanded}
                  isActive={activeSection === section.texto} // Pasar el estado activo
                  onClick={() => handleSectionClick(section.texto)} // Cambiar el activo al hacer clic
                />
              ))}
              <div className="w-full border-darkBlue border-[1px]"></div>
              <Elemento
                icon="fa-solid fa-arrow-right-from-bracket"
                text="Salir"
                link={""}
                isExpanded={isExpanded}
                isActive={activeSection === "Salir"} // Para la sección de salir
                onClick={() => handleSectionClick("Salir")}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Sidebar estilo menú hamburguesa en móviles */}
      <div className="xl:hidden">
        <div className="fixed top-4 right-4 z-30">
          <button
            className="w-[40px] h-[40px] bg-darkBlue rounded-full flex justify-center items-center text-white"
            onClick={toggleSidebar}
          >
            <i className={`fa-solid fa-${isExpanded ? "times" : "bars"}`}></i>
          </button>
        </div>

        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-lg z-20 transition-transform duration-300 ${
            isExpanded ? "translate-x-0 w-full" : "-translate-x-full w-full"
          }`}
        >
          <div className="bg-darkBlue px-5 h-[100px] w-full flex items-center mb-6 text-white">
            <div className="w-[60px] min-w-[60px] h-[60px] rounded-full bg-white flex items-center justify-center">
              <img
                src={img || ""}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="font-cocogooseLight ml-2">
              <p className="text-paragraph2 text-nowrap">{name}</p>
              <p className="text-paragraph3 text-nowrap">{rol}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-y-3 w-full px-4">
            {sidebarSection.map((section) => (
              <Elemento
                key={section.texto}
                icon={section.icon}
                text={section.texto}
                link={section.link}
                isExpanded={true} 
                isActive={activeSection === section.texto} 
                onClick={() => handleSectionClick(section.texto)}
              />
            ))}
            <div className="w-full border-darkBlue border-[1px]"></div>
            <Elemento
              icon="fa-solid fa-arrow-right-from-bracket"
              text="Salir"
              link={""}
              isExpanded={true}
              isActive={activeSection === "Salir"}
              onClick={() => handleSectionClick("Salir")}
            />
          </div>
        </div>
      </div>

    {/* modal de confirmación de cerrar sesión */}
        <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
        txtmodal={"¿Estas seguro de que deseas cerrar sesión?"}
        txtbutton2={"Cerrar sesión"}
        txtboton={"Cancelar"}
        />
    </>
  );
};
