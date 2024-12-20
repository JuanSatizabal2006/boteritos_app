import { Select, SelectItem } from "@tremor/react";

export function Dropdown({ label, name, data = [], onChange, placeholder, error }) {
  // Función para manejar cambios en el dropdown
  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div className="max-w-[400px] flex flex-col gap-2 w-full">
      <div className="text-paragraph font-cocogooseLight text-black">
        {label}
      </div>
      <div className="text-paragraph3 font-cocogooseLight h-10">
        <Select
          placeholder={placeholder}
          defaultValue=""
          className={`w-full h-full border-[1.5px] border-darkBlue rounded-xl focus:text-white focus:ring-0 focus:outline-none ${
            error ? "border-red-500" : ""
          }`}
          name={name}
          onValueChange={handleChange} // Manejador de cambios asignado
        >
          {/* Verificamos que `data` sea un array antes de mapearlo */}
          {Array.isArray(data) && data.length > 0 ? (
            data.map((dropdownKey, index) => (
              <SelectItem
                key={index}
                className="cursor-pointer"
                value={dropdownKey.value}
              >
                {dropdownKey.option}
              </SelectItem>
            ))
          ) : (
            <SelectItem disabled value="">
              No hay opciones disponibles
            </SelectItem>
          )}
        </Select>
      </div>
      {error && (
        <p className="font-cocogooseLight text-paragraph3 text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
