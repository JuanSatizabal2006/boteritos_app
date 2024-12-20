export const Input = ({ texto, placeholder, name, tipo, onChange, value, error }) => {
    return (
      <div className="max-w-[400px] flex flex-col gap-2 text-xd w-full">
        <label htmlFor={name} className="text-paragraph font-cocogooseLight text-black">
          {texto}
        </label>
        <div className="relative w-full flex">
          <input
            type={tipo}
            id={name}
            name={name}
            placeholder={placeholder}
            className={`h-10 rounded-xl w-full px-5 text-paragraph3 color-black border-darkBlue font-cocogooseLight border-[1.5px] ${error ? 'border-red-500' : ''}`}
            onChange={onChange}
            value={value}
          />
        </div>
        {error && <p className="font-cocogooseLight text-paragraph3 text-red-500">{error}</p>}
        {/* Mensajes de error con un espacio fijo, para que no modifique el alto */}
        {/* <div className="h-4"> 
          {error && <p className="font-cocogooseLight text-paragraph3 text-red-500">{error}</p>}
        </div> */}
      </div>
    );
  };
  