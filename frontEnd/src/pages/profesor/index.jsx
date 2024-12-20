import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral.jsx";
import { jwtDecode } from "jwt-decode";

const Index = () => {
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const decodedToken = jwtDecode(access_token);
    const nombre = decodedToken.nombre;

    // Función para determinar el saludo basado en la hora actual
    const getSaludo = () => {
        const ActualHour = new Date().getHours();

        if (ActualHour >= 0 && ActualHour < 12) {
            return `¡Buenos días, ${nombre}!`;
        } else if (ActualHour >= 12 && ActualHour < 19) {
            return `¡Buenas tardes, ${nombre}!`;
        } else {
            return `¡Buenas noches, ${nombre}!`;
        }
    };

    return (
        <LayoutGeneral titleHeader={"Profesor"}>
            <div className='flex flex-col justify-center items-center w-full bg-white rounded-2xl p-7'>
                <p className='font-cocogooseSemiLight text-darkBlue text-title text-center'>
                    ¡Bienvenido a la plataforma Boteritos!
                </p>
                <div className='h-[350px]'>
                    <img src="../../../public/img/niños.png" alt="img.png" className='h-full' />
                </div>
                <p className='font-cocogooseSemiLight text-darkBlue text-title text-center'>
                    {getSaludo()}
                </p>
            </div>
        </LayoutGeneral>
    );
}
export default Index;