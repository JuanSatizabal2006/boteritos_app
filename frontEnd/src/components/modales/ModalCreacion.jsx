import React from "react";
import { Button, Dialog, DialogPanel } from "@tremor/react";

export const ModalCreacion = ({
  txtmodal,
  children,
  isOpen,
  onClose,
  onSubmit,
  isConfirm,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <form
        onSubmit={onSubmit}
        className="w-full flex items-center justify-center"
      >
        <DialogPanel className="flex flex-col gap-8 items-center lg:items-start">
          <div
            onClick={onClose}
            className="absolute top-2 right-2 p-2 rounded-full text-gray bg-white hover:bg-slate-200 hover:text-slate-500"
          >
            <i className="fa-solid fa-x"></i>
          </div>

          {!isConfirm ? (
            <>
              <div className="w-full text-title font-cocogooseRegular text-darkBlue text-center">
                <h1>{txtmodal}</h1>
              </div>

              <div className="w-full grid grid-cols-1 lg:grid-cols-1 lg:gap-x-[30px] gap-y-[20px] place-items-center text-justify">
                {children}
              </div>

              <div className="flex justify-center w-full mt-4">
                <Button className="max-w-[400px] w-full" type="submit">
                  Agregar
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="w-full h-full flex items-center justify-center flex-col gap-10">
                <img src="../../../public/img/zG59fyltWB.gif" alt=""></img>
                <div className="font-cocogooseRegular text-darkBlue text-title">
                  <h1>Datos registrados con éxito</h1>
                </div>
                <Button
                  className="max-w-[400px] w-full"
                  type="submit"
                  onClick={onClose}
                >
                  Cerrar
                </Button>
              </div>
            </>
          )}
        </DialogPanel>
      </form>
    </Dialog>
  );
};
