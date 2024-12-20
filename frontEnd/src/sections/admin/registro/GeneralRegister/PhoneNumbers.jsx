import React, { useEffect, useState } from "react";
import { Input } from "../../../../components/forms/Input.jsx";
import { Boton } from "../../../../components/forms/Boton.jsx";
import { postUserStudent } from "../../../../api/post.js";
import { validateField } from "../../../../helper/validators/register.js";
import { useRegFormContext } from "../../../../hooks/RegFormProvider.jsx";
import { useNavigate, Link } from "react-router-dom";
import { caseTelefono } from "../../../../helper/validators/case/telefono.js";
import { RegistroExito } from "../../../../components/forms/RegistroExito.jsx";

export const PhoneNumberSection = () => {
  const [state, dispatch] = useRegFormContext();

  //const navigate = useNavigate();

  const [errors, setErrors] = useState({}); // Estado para los errores

  const [values, setValues] = useState({
    telefono1: "",
    telefono2: "",
  });

  const dataFormInd = new FormData();

  const [finish, setFinish] = useState(false);

  const [estadoValida, setEstadoValida] = useState(false); // Estado que controla el renderizado condicional

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
    console.log('ACTIVACION DE FUNCION SUBMIT');
    
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

    dispatch({ type: "CHANGE_PERCENT", data: 100 });
    dispatch({ type: "ADD_DATA_FORM", data: dataFormInd });

    setFinish(true);
  };

  const pito = async () => {
    console.log(state);

    const response = await fetch(
      "http://localhost:8000/api/v3/registro/admin/",
      {
        method: "POST",
        body: state.dataForm,
      }
    );

    setFinish(false);
    
    if (response.status === 201) {
      setEstadoValida(true); // Cambiar estado cuando el usuario se cree exitosamente
    }

    const data = await response.json();
    console.log(data);
  };

  if (finish) {
    console.log('ACTIVACION DE LA API');
    
    pito();
  }

  return (
    <>
      {estadoValida ? (
        <div className="w-full flex justify-center">
          <RegistroExito
            rol={"Administrador"}
            url1={"admin/registro"}
            url2={"admin/"}
          />
        </div>
      ) : (
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
            <Input
              name={"telefono1"}
              texto={"Primer telefono"}
              placeholder={"Telefono del usuario"}
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
            <Link
              to={"/admin/registro/registroadmin/datosmedicos"}
              className="max-w-[400px] w-full"
            >
              <Boton text="Atras" type="blue" />
            </Link>
            <Boton text="Confirmar" type="blue" />
          </div>
        </form>
      )}
    </>
  );
};
