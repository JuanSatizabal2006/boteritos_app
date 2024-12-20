import { LayoutGeneral } from "../../../../layouts/LayoutGeneral";
import { ProgressBarD } from "../../../../components/forms/ProgressBar";
import { GeneralRegisterTeacher } from "../../../../sections/admin/registro/TeacherRegister/GeneralRegisterTeacher";

const TeacherRegister = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Profesor)" title="Registro">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <ProgressBarD />
            <GeneralRegisterTeacher />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  );
};

export default TeacherRegister;