import React from "react";
import { Dialog, DialogPanel } from "@tremor/react";

export function CheckGiftModal({
    isOpen,
    onClose, 
    text
     }) {
    return (
      <Dialog open={isOpen} onClose={onClose} static={true} show={isOpen}>
        <DialogPanel className="bg-white px-6 py-8 rounded-lg max-w-[370px] w-full shadow-lg mx-auto">
          <div className="space-y-4 flex flex-col items-center justify-center">
          <img src="../../../public/img/zG59fyltWB.gif" alt=""></img>
            <p className="font-cocogooseLight text-paragraph2 text-center text-black">{text}</p>
          </div>
        </DialogPanel>
      </Dialog>
    );
  }