import React from "react";
import { LayoutGeneral } from "../../../../layouts/LayoutGeneral";
import { GeneralRegister } from "../../../../sections/admin/registro/GeneralRegister/GeneralRegister"
import { ProgressBarD } from "../../../../components/forms/ProgressBar";
import { RegFormProvider } from "../../../../hooks/RegFormProvider";

const Admin = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Administrador)" title="Registro">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <ProgressBarD />
            <GeneralRegister />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  );
};

export default Admin;