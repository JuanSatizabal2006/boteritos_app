import { LayoutGeneral } from '../../../../layouts/LayoutGeneral'
import { TeacherRegister } from '../../../../sections/admin/registro/TeacherRegister/TeacherRegister'
import { ProgressBarD } from '../../../../components/forms/ProgressBar'

const ProfessionTeacher = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Profesor)" title="Registro">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <ProgressBarD />
            <TeacherRegister />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  )
}

export default ProfessionTeacher;
