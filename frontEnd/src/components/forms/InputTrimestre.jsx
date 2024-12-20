import { DatePicker2 } from "./DatePicker";

import React from "react";

const InputTrimestre = ({ total, eliminar, onChange, trimestre }) => {
  return (
    <div className="flex flex-row w-full justify-center items-center gap-6 mb-6 ">
      <label className="text-paragraph font-cocogooseLight">
        Trimestre {total}
      </label>{" "}
      <DatePicker2
        name={`inicio${total}`}
        texto={"Seleccione la Fecha inicial"}
        onChange={(e) => onChange("inicio", e.target.value)}
        value={trimestre.inicio}
      />
      <DatePicker2
        name={`fin${total}`}
        texto={"Seleccione la Fecha Final"}
        onChange={(e) => onChange("fin", e.target.value)}
        value={trimestre.fin}
 
      />
      <i
        className="fa-solid fa-trash text-2xl cursor-pointer text-redFull eliminar"
        onClick={eliminar}
      ></i>
    </div>
  );
};

export default InputTrimestre;
