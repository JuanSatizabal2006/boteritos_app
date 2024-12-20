import React from 'react'
import { Boton } from './Boton'
import { Link } from 'react-router-dom'

export const RegistroExito = ({ rol, nombre, url1, url2 }) => {
    return (
        <div className='bg-white max-w-[751px] mt-2 w-full p-[40px] gap-y-8 flex flex-col items-center rounded-xl shadow-xl'>
            <i className="fa-regular fa-circle-check text-9xl text-darkBlue"></i>
            <p className='text-title font-cocogooseRegular text-center '>{rol} registrado exitosamente</p>
            <p className='text-paragraph font-cocogooseLight text-center'>El {rol} {nombre} ha sido registrado exitosamente, ¿Que desea hacer ahora?</p>
            <div className='w-full flex flex-col gap-y-4 sm:flex-row lg:gap-y-0 gap-x-6'>
                <Link to={`/${url1}`} className='w-full'>
                    <Boton text={"Seguir registrando"} />
                </Link>
                <Link to={`/${url2}`} className='w-full'>
                    <Boton text={"Continuar"} type={"blue"} />
                </Link>
            </div>
        </div>
    )
}
