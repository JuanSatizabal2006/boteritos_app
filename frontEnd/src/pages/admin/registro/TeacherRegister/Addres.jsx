import { LayoutGeneral } from '../../../../layouts/LayoutGeneral'
import { AdressSection } from '../../../../sections/admin/registro/TeacherRegister/Address'
import { ProgressBarD } from '../../../../components/forms/ProgressBar'

const Addres = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Profesor)" title="Registro">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <ProgressBarD />
            <AdressSection />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  )
}

export default Addres;