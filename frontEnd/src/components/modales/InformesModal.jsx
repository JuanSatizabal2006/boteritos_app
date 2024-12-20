import React from 'react';
import { Dialog, DialogPanel } from "@tremor/react";

export function InformesModal({ informes, isOpen, onClose }) {
    return (
        <Dialog open={isOpen} onClose={onClose} static={true}>
            <DialogPanel className='bg-white rounded-xl max-w-[870px] w-full py-10 px-[60px]'>
                <p className='font-cocogooseRegular text-title text-darkBlue'>Informes del estudiante</p>
                <div className='flex justify-between'>
                    <p className='font-cocogooseSemiLight text-subTitle2 text-darkBlue max-w-[400px] w-full'>Informes</p>
                    <p className='font-cocogooseSemiLight text-subTitle2 text-darkBlue'>Fecha</p>
                    <p className='font-cocogooseSemiLight text-subTitle2 text-darkBlue'>Descargar</p>
                </div>
                
                {informes?.length > 0 ? (
                    informes.map((informe, index) => (
                        <div
                            key={index}
                            className='w-full divide-y-2 divide-placeholderBlue py-5 flex justify-between'
                        >
                            <p className='font-cocogooseLight text-paragraph max-w-[400px] w-full'>{informe.nombreInforme}</p>
                            <p className='font-cocogooseLight text-paragraph'>{informe.fecha}</p>
                            <div className='max-w-[150px] w-full h-[35px] bg-darkBlue rounded-2xl py-[5px] cursor-pointer'>
                                <p className='font-cocogooseSemiLight text-subTitle2 text-white text-center'>Descargar</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='font-cocogooseLight text-paragraph text-gray'>No hay informes disponibles</p>
                )}
            </DialogPanel>
        </Dialog>
    );
}
