import React from "react";

export const Info = ({ title, text }) => {
  return (
    <div
      className={`flex flex-col w-full ${
        title === "Correo"
          ? "border-b-0"
          : "border-b-2 border-b-placeholderBlue"
      } py-4`}
    >
      <div className="flex justify-between">
        <p className="text-subTitle font-Cocogoose-SemiLight text-darkBlue">
          {title}
        </p>
        <p
          className={`underline font-Cocogoose-SemiLight text-darkBlue ${
            title === "Dirección" || title === "Comuna" || title === "Teléfono"
              ? "block"
              : "hidden"
          }`}
        >
          Editar
        </p>
      </div>
      <p className="text-paragraph font-Cocogoose-Light">{text}</p>
    </div>
  );
};
