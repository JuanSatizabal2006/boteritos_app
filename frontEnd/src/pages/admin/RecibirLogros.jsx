import React from 'react'
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import { TablaLogrosRecibidos } from '../../components/logros/TablaLogrosRecibidos';

const RecibirLogros = () => {
  return (
    <LayoutGeneral titleHeader={"Logros Recibidos"}>
        <div className='bg-white w-full rounded-xl  sm:px-0'>  
            <TablaLogrosRecibidos/>
        </div>
    </LayoutGeneral>
  )
}

export default RecibirLogros; 
