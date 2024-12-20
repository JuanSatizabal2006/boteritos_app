import React from "react";

export const Boton = ({ text, type, onClick, disabled }) => {
    const buttonClass = `font-cocogooseRegular tracking-widest text-button max-w-[400px] min-w-28 w-full h-[40px] rounded-xl border-darkBlue ${
        type === 'blue'
            ? 'bg-darkBlue text-white hover:bg-sky-900 hover:text-white'
            : 'bg-white text-darkBlue hover:bg-darkBlue hover:text-white'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`; // Agregada clase para estado deshabilitado

    return (
        <button 
            type="submit" 
            className={buttonClass} 
            onClick={onClick} 
            disabled={disabled} // Agregada propiedad disabled
        >
            {text}
        </button>
    );
};
