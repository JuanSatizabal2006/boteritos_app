import React, { useEffect, useState } from "react";
import { Input } from "../../../../components/forms/Input.jsx";
import { Boton } from "../../../../components/forms/Boton.jsx";
import { postUserStudent } from "../../../../api/post.js";
import { validateField } from "../../../../helper/validators/register.js";
import { useRegFormContext } from "../../../../hooks/RegFormProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import { caseTelefono } from "../../../../helper/validators/case/telefono.js";

export const PhoneNumberSection = () => {
  const [state, dispatch] = useRegFormContext();
  const [errors, setErrors] = useState({}); // Estado para los errores
  const navigate = useNavigate();
  const [values, setValues] = useState({
    telefono1: "",
    telefono2: "",
  });
  const dataFormInd = new FormData();

  useEffect(() => {
    dispatch({ type: "CHANGE_PERCENT", data: 90 });
  }, []);

  // Maneja cambios en los inputs de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const error = caseTelefono(name, value); // Validar el campo específico

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
        const error = caseTelefono(key, values[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataUser = {
      ...values,
      telefono1: values.telefono1.trim(),
      telefono2: values.telefono2.trim(),
    };

    //Recorrido del objeto para añadirlo al formData
    for (const key in dataUser) {
      if (Object.hasOwn(values, key)) {
        dataFormInd.set(key, dataUser[key]);
      }
    }

    dispatch({ type: "ADD_DATA_FORM", data: dataFormInd });

    navigate("/admin/registro/registroprofesor/cargo");
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
          <Input
            name={"telefono1"}
            texto={"Primer telefono"}
            placeholder={"telefono del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.telefono1}
            error={errors.telefono1}
          />
          <Input
            name={"telefono2"}
            texto={"Segundo telefono"}
            placeholder={"Telefono de respaldo del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.telefono2}
            error={errors.telefono2}
          />
        </div>
        <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
          {/* Botón para confirmar el formulario */}
          <Link
            to={"/admin/registro/registroprofesor/datosmedicos"}
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
