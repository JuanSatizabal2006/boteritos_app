import React from 'react';

export const Dato = ({ data }) => {
  return (
    <>
      {data.map((dataKey) => (
        <div key={dataKey.id} className="flex flex-col sm:flex-row gap-x-3">
          <p className="font-cocogooseLight text-paragraph text-darkBlue">{dataKey.tituloDato}:</p>
          <p className="font-cocogooseLight text-paragraph2 flex-1">{dataKey.dato}</p>
        </div>
      ))}
    </>
  );
};