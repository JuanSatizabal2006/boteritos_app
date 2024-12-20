import { Link, useLocation } from "react-router-dom";

export const Elemento = ({ icon, text, isExpanded, link, onClick }) => {
  const location = useLocation();

  // Verifica si el link actual coincide con la ruta activa
  const isActive = location.pathname === `/${link}`;

  return (
    <div className="w-full">
      {text === "Salir" ? (
        // Si es "Salir", utiliza onClick
        <div
          onClick={onClick}
          className={`w-full flex items-center rounded-3xl text-gray hover:bg-darkBlue transition duration-300 ease-in-out hover:text-white cursor-pointer ${
            isActive ? "bg-darkBlue text-white" : ""
          }`}
        >
          <div className="flex items-center">
            <div className="w-[60px] h-[44px] flex justify-center items-center">
              <i className={`text-xl ${icon}`}></i>
            </div>
            <span
              className={`font-cocogooseLight text-paragraph2 text-nowrap ${
                isExpanded ? "" : "hidden"
              }`}
            >
              {text}
            </span>
          </div>
        </div>
      ) : (
        // Para los demás elementos, utiliza Link
        <Link to={`/${link}`} className="w-full">
          <div
            className={`w-full flex items-center h-[44px] rounded-3xl text-gray hover:bg-darkBlue transition duration-300 ease-in-out hover:text-white cursor-pointer ${
              isActive ? "bg-darkBlue text-white" : ""
            }`}
          >
            <div className="flex items-center">
              <div className="w-[60px] flex justify-center items-center">
                <i className={`text-xl ${icon}`}></i>
              </div>
              <span
                className={`font-cocogooseLight text-paragraph2 text-nowrap ${
                  isExpanded ? "" : "hidden"
                }`}
              >
                {text}
              </span>
            </div> 
          </div>
        </Link>
      )}
    </div>
  );
};
