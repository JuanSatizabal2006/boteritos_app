import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation  } from "react-router-dom";
import { AutorizarVista } from "./AutorizarVista";
import Loading from "../components/loaders/loading";

const RutaProtegida = () => {
    // Lógica para determinar las rutas accesibles según el rol
    const rutaActual = useLocation().pathname;
    
    const [ accesRol, setAcces ] = useState('')
    const [ rol, setRol ] = useState('')
    const [verifCompleta, setVerifCompleta] = useState(false)
    
    let esRutaAccesible = false;

    useEffect(()=>{
        const getRol = async () => {
            //LLAMAMOS A LA FUNCION QUE VALIDA EL TOKEN Y DESTRUCTURAMOS
            const [ acces, rolU ] = await AutorizarVista();

            setAcces(acces)
            setRol(rolU)
            setVerifCompleta(true)
        }
        getRol()
    },[])

    switch (accesRol) {
        case 'notLogin':
            esRutaAccesible = ['/', '/ayudacontrasena'].includes(rutaActual) || /^\/recuperarcontrasena\/[^/]+$/.test(rutaActual);
            break;

        case 'loginAdmin':    
            esRutaAccesible = rutaActual.includes('admin');
            break;

        case 'loginProf':
            esRutaAccesible = rutaActual.includes('profesor');
            break;

        case 'loginEstud':
            esRutaAccesible = rutaActual.includes('estudiante');
            break;

        default:
            break;
    }

    return (
        verifCompleta ? (
            esRutaAccesible ? (
              <Outlet />
            ) : (
              accesRol === 'notLogin' ? (
                <Navigate to={'/'} />
              ) : (
                <Navigate to={`/${rol}`} />
              )
            )
          ) : <Loading />
          
    )
}

export default RutaProtegida