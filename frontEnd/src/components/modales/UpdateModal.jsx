import React from "react";
import { Dialog, DialogPanel, Button } from "@tremor/react";

export function UpdateModal({ isOpen, onClose, children, onSave, isConfirm, textConfirmation }) {
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel className="bg-white p-6 rounded-lg max-w-screen-sm shadow-lg mx-auto">
        {!isConfirm ? (
          <div className="space-y-4 ">
            <h2 className="text-title font-bold mb-4 text-darkBlue font-cocogooseRegular">
              Editar Información
            </h2>
            {children}
            <div className="w-full flex flex-col gap-2 justify-between items-center sm:flex-row pt-4">
              <Button
                className="w-full max-w-[250px] bg-redFull hover:bg-red-700 text-white rounded-md border-redFull hover:border-red-800"
                type="submit"
                onClick={onClose}
              >
                Cancelar
              </Button>

              <Button
                className="w-full max-w-[250px] bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                type="submit"
                onClick={onSave}
              >
                Guardar
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col gap-10">
            <img src="../../../public/img/zG59fyltWB.gif" alt=""></img>
            <div className="font-cocogooseRegular text-darkBlue text-title">
              <h1>{textConfirmation}</h1>
            </div>
            <Button
              className="max-w-[400px] w-full"
              type="submit"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        )}
      </DialogPanel>
    </Dialog>
  );
}
