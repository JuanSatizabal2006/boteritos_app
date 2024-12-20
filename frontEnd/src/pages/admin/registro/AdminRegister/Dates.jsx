import { LayoutGeneral } from '../../../../layouts/LayoutGeneral'
import { DatesSection } from '../../../../sections/admin/registro/GeneralRegister/Dates'
import { ProgressBarD } from '../../../../components/forms/ProgressBar'

const Dates = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Administrador)" title="Registro">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <ProgressBarD />
            <DatesSection />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  )
}

export default Dates;
