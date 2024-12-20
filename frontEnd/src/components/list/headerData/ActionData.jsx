const ActionData = ({ data, type, goTo, typeHeaderData }) => {
  // Verificamos si el valor de typeHeaderData es 'view1'
  const isViewMode = typeHeaderData != 'view1'; // Retorna true si es 'view1'

  return (
    <div
      className={`min-h-[130px] h-full grow ${
        data ? "bg-darkBlue cursor-pointer" : "bg-gray"
      } rounded-xl max-w-[100px] p-4 text-white flex flex-col items-center justify-center gap-3`}
      onClick={() => goTo(data)}
    >
      {/* Cambia el ícono según el valor booleano de isViewMode */}
      <i className={`text-5xl ${type === 'go' ? (isViewMode ? 'fa-regular fa-eye' : 'fa-solid fa-star') : 'fa-solid fa-arrow-turn-up -rotate-90'}`}></i>
      <p className="text-paragraph2">{type === 'go' ? 'Ver' : 'Volver'}</p>
    </div>
  );
};

export default ActionData;

