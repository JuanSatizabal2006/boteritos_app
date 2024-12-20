import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { Notificacion } from "../../components/notificaciones/Notificacion";
import { datosnoti } from "../../helper/objects/notificationArray";
import  Buscador  from "../../components/search/Buscador";

export const Notificaciones = () => {
  return (
    <LayoutGeneral title="Notificaciones" titleHeader="Notificaciones">
      <div className="flex flex-col w-full bg-white sm:p-10 p-2 rounded-xl gap-y-3">
        <Buscador />
        <div className="divide-y divide-ligthBlue">
          {datosnoti.map((datonoti) => (
            <Notificacion
              img={datonoti.img}
              nombre={datonoti.nombre}
              area={datonoti.area}
              hora={datonoti.hora}
            />
          ))}
        </div>
      </div>
    </LayoutGeneral>
  );
};
