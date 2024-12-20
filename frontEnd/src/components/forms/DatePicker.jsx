import { DatePicker } from "@tremor/react";
import { es } from "date-fns/locale";

export function DatePicker2({ name, texto, value, onChange, error }) {
  // Manejador de cambio de fecha
  const handleDateChange = (date) => {
    if (date) {
      onChange({ target: { name, value: date } }); // Guardar la fecha como objeto Date
    }
  };

  return (
    <div className="flex flex-col gap-2 ">
      <label
        htmlFor={name}
        className="text-paragraph font-cocogooseLight text-black rounded-xl"
      >
        {texto}
      </label>
      <div
        className={`max-h-10 h-full rounded-xl max-w-[400px] w-full text-paragraph3 border-darkBlue font-cocogooseLight border-[1.5px] ${
          error ? "border-red-500" : ""
        }`}
      >
        <DatePicker
          enableYearNavigation={true}
          locale={es}
          placeholder="Selecciona la fecha"
          value={value ? new Date(value) : null} // Convierte la fecha a un objeto Date
          onValueChange={handleDateChange}
          className="w-full h-full "
        />
      </div>
      {error && (
        <p className="font-cocogooseLight text-paragraph3 text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
