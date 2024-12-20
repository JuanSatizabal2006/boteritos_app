import { LayoutGeneral } from '../../../../layouts/LayoutGeneral'
import { MedicalInfoSection } from '../../../../sections/admin/registro/StudentRegister/MedicalInfo'
import { ProgressBarD } from '../../../../components/forms/ProgressBar'

export const MedicalInfo = () => {
  return (
    <div>
      <LayoutGeneral titleHeader="Registro de usuarios (Estudiante)" title="Registro">
        <div className="flex w-full h-full items-center justify-center">
          <div className="flex flex-col max-w-[910px] bg-white w-full p-10 rounded-xl gap-y-7">
            <ProgressBarD />
            <MedicalInfoSection />
          </div>
        </div>
      </LayoutGeneral>
    </div>
  )
}

export default MedicalInfo;