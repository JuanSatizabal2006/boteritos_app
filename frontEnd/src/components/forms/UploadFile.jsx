import React, { useState } from 'react';

export const UploadFile = ({ title, onFileChange, id, typefile, error, validationText }) => {
    const [fileName, setFileName] = useState("");

    // Maneja el cambio de archivo
    const handleFileChange = (event) => {
        
        console.log(event);
        
        const file = event.target.files[0];

        if (file) {
            setFileName(file.name); // Actualiza el nombre del archivo en el estado
            onFileChange(file); // Llama a la función de callback con el archivo seleccionado
        }
    };

    // Dispara el evento de click en el input de archivo correspondiente
    const handleClick = () => {
        document.getElementById(id).click(); // Usa el ID pasado como prop
    };

    return (
        <div className="flex flex-col max-w-[400px] w-full gap-y-2">
            <p className="font-cocogooseLight text-paragraph">{title}</p>
            <div className="h-[68px] flex flex-col w-full rounded-xl border-orange border-[1.5px] justify-center items-center gap-y-1 cursor-pointer" onClick={handleClick}>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-x-1">
                    <i className="fa-solid fa-file-arrow-up text-title text-orange"></i>
                    <p className="font-cocogooseLight text-paragraph3"><span className="text-orange">Click para subir</span> o arrastre y suelte</p>
                    <input type="file" accept={typefile} onChange={handleFileChange} id={id} className="hidden"/> {/* Input oculto con ID único */}
                </div>
                <p className="font-cocogooseUltraLight text-paragraphSmall">{fileName ? `Archivo seleccionado: ${fileName}` : `${validationText}`}</p> {/* Muestra el nombre del archivo seleccionado */}
            </div>
            {error && <p className="font-cocogooseLight text-paragraph3 text-red-500">{error}</p>}
        </div>
    );
};