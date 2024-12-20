import React from "react";
import { Button, Dialog, DialogPanel } from "@tremor/react";

export function Modal({ isOpen, onClose, onConfirm, txtmodal, txtboton, txtbutton2 }) {
  return (
    <Dialog open={isOpen} onClose={onClose} static={true}>
      <DialogPanel className="flex flex-col gap-6 items-center w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-blue-500 text-5xl mb-2">
          <i className="fas fa-sign-out-alt"></i>
        </div>
        <h2 className="text-2xl font-bold text-darkBlue text-center">{txtmodal}</h2>
        <div className="flex flex-col gap-4 w-full mt-4">
          <Button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <i className="fas fa-check mr-2"></i> {txtbutton2}
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            <i className="fas fa-times mr-2"></i> Cancelar
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}