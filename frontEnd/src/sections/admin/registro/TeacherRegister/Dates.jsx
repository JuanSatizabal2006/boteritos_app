import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DatePicker2 } from "../../../../components/forms/DatePicker.jsx";
import { Boton } from "../../../../components/forms/Boton.jsx";
import { getDate } from "../../../../helper/functions/getDate.js";
import { format } from "date-fns";
import { validateField } from "../../../../helper/validators/register.js";
import { useRegFormContext } from "../../../../hooks/RegFormProvider.jsx";
import { caseProfesor } from "../../../../helper/validators/case/profesor.js";

export const DatesSection = () => {
  const [state, dispatch] = useRegFormContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // Estado para los errores
  const [values, setValues] = useState({
    fechaingreso: "",
    fechanacimiento: "",
    fecharegistro : ""
  });
  const dataFormInd = new FormData();

  useEffect(() => {
    dispatch({ type: "CHANGE_PERCENT", data: 60 });
  }, []);

  // Maneja cambios en los inputs de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const error = caseProfesor(name, value); // Validar el campo específico

    setErrors({
      ...errors,
      [name]: error,
    }); // Actualizar el estado de errores y valores

    setValues({
      ...values,
      [name]: value,
    });
  };

  // Maneja el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validar todos los campos antes de enviar
    const newErrors = {};
    for (const key in values) {
      if (Object.hasOwn(values, key)) {
        const error = caseProfesor(key, values[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    //Limpieza de datos
    const dataUser = {
      ...values,
      fechaingreso: values.fechaingreso
        ? format(new Date(values.fechaingreso), "yyyy-MM-dd")
        : null,
      fechanacimiento: values.fechanacimiento
        ? format(new Date(values.fechanacimiento), "yyyy-MM-dd")
        : null,
      fecharegistro: getDate(),
    };

    //Recorrido del objeto para añadirlo al formData
    for (const key in dataUser) {
      if (Object.hasOwn(values, key)) {
        dataFormInd.set(key, dataUser[key]);
      }
    }

    dispatch({ type: "ADD_DATA_FORM", data: dataFormInd });
    navigate("/admin/registro/registroprofesor/datosmedicos");
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
          <DatePicker2
            name={"fechanacimiento"}
            texto={"Fecha de nacimiento"}
            value={values.fechanacimiento}
            onChange={handleInputChange}
            error={errors.fechanacimiento}
          />
          <DatePicker2
            name={"fechaingreso"}
            texto={"Fecha de ingreso"}
            value={values.fechaingreso}
            onChange={handleInputChange}
            error={errors.fechaingreso}
          />
        </div>

        <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
          {/* Botón para confirmar el formulario */}
          <Link
            to={"/admin/registro/registroprofesor/direcciones"}
            className="max-w-[400px] w-full"
          >
            <Boton text="Atras" type="blue" />
          </Link>
          <Boton text="Confirmar" type="blue" />
        </div>
      </form>
    </>
  );
};
