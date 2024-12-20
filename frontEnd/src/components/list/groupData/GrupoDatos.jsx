import React from "react";

export const GrupoDatos = ({ titulo, update, children }) => {
  return (
    <div className="w-full bg-white p-6 rounded-xl flex flex-col gap-y-5">
      <div className="flex justify-between text-darkBlue">
        <p className="font-cocogooseSemiLight text-subTitle">{titulo}</p>
        <button onClick={update}>
          <p className="font-cocogooseSemiLight text-subTitle2 underline">
            Editar
          </p>
        </button>
      </div>
      <div className="flex flex-col xl:flex-row px-5 justify-between gap-y-3">
        {children}
      </div>
    </div>
  );
};
