import React from "react";
import { Button, Dialog, DialogPanel } from "@tremor/react";

export const LogrosRecibidosModal = ({ txtmodal, isOpen, onClose, tipo, nombre, descripcion }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel className="flex flex-col gap-8 items-center lg:items-start py-14 px-10">
        <>
          <div className="w-full text-title font-cocogooseRegular text-darkBlue text-center">
            <h1>{txtmodal}</h1>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-1 lg:gap-x-[30px] gap-y-[20px] place-items-start text-justify">
            <div className="text-paragraph font-cocogooseLight">
              <p className="text-darkBlue">Tipo:</p>
              <p className="text-black">{tipo}</p>
            </div>

            <div className="text-paragraph font-cocogooseLight">
              <p className="text-darkBlue">Nombre del logro:</p>
              <p className=" text-black">{nombre}</p>
            </div>

            <div className="text-paragraph font-cocogooseLight">
              <p className="text-darkBlue">Observación:</p>
              <p className="text-black ">{descripcion}</p>
            </div>
          </div>

          <div className="flex justify-center w-full mt-4">
            <Button className="max-w-[400px] w-full" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </>
      </DialogPanel>
    </Dialog>
  );
};
