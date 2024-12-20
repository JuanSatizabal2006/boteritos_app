import React, { useEffect, useState } from "react";
import CrearTrim from "../../../components/tables/CrearTrim";
import { VerTrimestres } from "./VerTrimestres";
import { getTrimestres } from "../../../api/get";
import { getYear } from "../../../helper/functions/getDate";

export const CrearTrimestre = () => {
  const [hasTrimestres, setHasTrimestres] = useState(false); // Define el estado hasTrimestres, que indica si ya hay trimestres creados o no. Inicialmente es false.


  
useEffect(()=>{ //carga el componente, hace la petición a la API para ver si ya hay trimestres.
  const fetchTrimestres = async ()=>{
    const anoActual = getYear();
    try {
      const dataApi = await getTrimestres(`trimestre/${anoActual}`);
      const trimestres = dataApi.data.data || [];
      setHasTrimestres(trimestres.length>=3); //verifica si ya hay 3 trimestres creados
    } catch (error) {
      console.log("error al obtener los trimestres", error);
      
    }
  };
  fetchTrimestres();
},[])


  return (
    <main className="flex flex-col gap-8">
      {hasTrimestres ? (
        <VerTrimestres />
      ) : (
        <CrearTrim onTrimestresCompletos={()=>setHasTrimestres(true)} />
      )}

    </main>
  );
};
