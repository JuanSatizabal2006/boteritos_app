const DataState = ({ state }) => {
  return (
    <>
      {
        state === 1 ? ( // Verifica si el estado es 1
          <div className="bg-greenOpaque rounded-md py-1 px-2 flex gap-3 items-center justify-center w-auto">
            <p className="text-greenFull">Aceptado</p>
          </div>
        ) : state === 0 ? (
          <div className="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center justify-center w-auto">
            
            <p className="text-redFull">Rechazado</p>
          </div>
        ) : state === 2 ? (
          <div className="bg-redOpaque rounded-md py-1 px-2 flex gap-3 items-center justify-center w-auto">
            <p className="text-orange">En espera</p>
          </div>
        ) : null
      }
    </>
  );
};

export default DataState;
