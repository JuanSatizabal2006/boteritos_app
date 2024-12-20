import { Sidebar } from "../components/sidebar/Sidebar";
import { Layout } from "./Layout";
import { sidebarsection } from "../helper/objects/sidebarElementsArray";
import { Header } from "../components/header/Header";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

export const LayoutGeneral = ({ titleHeader, children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Estado de expansión de la sidebar

  // Obtener el token del localStorage y decodificarlo para extraer el rol
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const decodedToken = jwtDecode(access_token);
  const rol = decodedToken.rol;
  const imagen = decodedToken.img;

  // Seleccionar la sección del sidebar que corresponde al rol
  const selectedSection = sidebarsection[rol] || [];

  return (
    <Layout>
      {/* Sidebar */}
      <Sidebar
        img={imagen}
        name={decodedToken.nombre || "Usuario"}
        rol={
          rol === 1 ? "Administrador" : rol === 2 ? "Profesor" : "Estudiante"
        }
        sidebarSection={selectedSection}
        onToggle={setIsSidebarExpanded} // Escuchar el estado de expansión
      />

      {/* Overlay, se muestra solo si la sidebar está expandida */}
      <div
        className={`fixed inset-0 bg-black transition-opacity h-full duration-300 ${
          isSidebarExpanded ? "opacity-50" : "opacity-0 pointer-events-none"
        } z-10`}
      ></div>

      {/* Contenido principal */}
      <div className="w-full h-full">
        <Header title={titleHeader} />
        <div className="px-5 sm:px-10 py-5 min-w-screen h-full">{children}</div>
      </div>
    </Layout>
  );
};
