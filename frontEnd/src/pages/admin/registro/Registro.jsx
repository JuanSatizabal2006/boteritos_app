import { RegisterOption } from '../../../components/buttons/RegisterOption';
import { LayoutGeneral } from '../../../layouts/LayoutGeneral';


const Registro = () => {
  return (
    <LayoutGeneral titleHeader={"Registro de usuarios"}>
        <div className='h-full flex flex-col flex-wrap justify-center gap-y-5'>
            <p className='font-cocogooseLight text-title text-center text-darkBlue'>¿Que desea crear?</p>
            <div className='flex flex-col xl:flex-row justify-between gap-y-7'>
                <RegisterOption text={"Estudiante"} icon={"fa-solid fa-graduation-cap"} link={"admin/registro/registroestudiante"}/>
                <RegisterOption text={"Profesor"} icon={"fa-solid fa-user-tie"} link={"admin/registro/registroprofesor"}/>
                <RegisterOption text={"Administrador"} icon={"fa-solid fa-star"} link={"admin/registro/registroadmin"} />
            </div>
        </div>
    </LayoutGeneral>
  )
}

export default Registro;
