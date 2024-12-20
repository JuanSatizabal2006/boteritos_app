import { Input } from "../components/forms/Input.jsx";
import { Boton } from "../components/forms/Boton.jsx";
import { useState } from "react";
import { postLogin } from "../api/post.js";
import { defRol } from "../helper/functions/defRol.js";
import { Link, useNavigate } from "react-router-dom";
import ErrorWarning from "../components/messages/error.jsx";
import { getDate } from "../helper/functions/getDate.js";

const FormLogin = () => {
  const navigate = useNavigate();
  // Estado para almacenar los valores de los inputs
  const [values, setValues] = useState({
    documento: "",
    contrasena: "",
  });

  const [typeContrasena, setTypeContrasena] = useState("password");

  const [errors, setErrors] = useState({}); //Errores de inputs
  const [errorMessage, setError] = useState(); //Errores de la API

  // Función para manejar cambios en los inputs de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleFormLoginSubmit = (event) => {
    event.preventDefault();
    let dataUser = { ...values };
    validateLogin(dataUser);
  };

  const validateLogin = async (data) => {
    console.log(data);

    if(!data.contrasena && !data.documento){
      setError('Todos los campos son obligatorios')
      return
    }

    if(!data.documento){
      setError('El documento es obligatorio')
      return
    }

    if(!data.contrasena){
      setError('La contraseña es obligatoria')
      return
    }

    const response = await postLogin(data, "auth/login/");

    if (response.data.error) {
      //Se presentaron errores (API):
      const error = await response.data.error;
      console.log(error);

      setError(error);
      return;
    }
    localStorage.setItem("fecha", getDate());
    //¡El acceso fue exitoso!
    defLogin(response);
  };

  const defLogin = (dataResponse) => {
    //Establecemos datos en el localeStorage
    localStorage.setItem(
      "access_token",
      JSON.stringify(dataResponse.data.data.access_token)
    );
    
    localStorage.setItem(
      "refresh_token",
      JSON.stringify(dataResponse.data.data.refresh_token)
    );

    localStorage.setItem(
      "trimestre",
      JSON.stringify(dataResponse.data.data.trimestre) // Guardar el trimestre
    );

    //Define para donde va
    const rol = defRol();
    navigate(0);
  };

  //Mostrar contraseña
  const verContrasena = (event) => {
    const isCheck = event.target.checked;
    if (isCheck) {
      setTypeContrasena("text");
    } else {
      setTypeContrasena("password");
    }
  };

  

  return (
    <main className="w-full h-screen flex justify-center items-center p-4 text-black">
      <form
        onSubmit={handleFormLoginSubmit}
        className="bg-white md:p-16 p-7 flex gap-20 rounded-xl shadow-[0_0_20px_0px_rgba(94,175,232,0.5)]"
      >
        <div className="flex flex-col gap-7 max-w-[400px] w-full">
          <h1 className="text-title font-cocogooseRegular tracking-widest text-darkBlue">
            Inicio de sesión
          </h1>
          {errorMessage ? <ErrorWarning text={errorMessage} /> : null}
          <Input
            texto="Número de documento"
            placeholder="Ingresa tu documento"
            name="documento"
            tipo="text"
            onChange={handleInputChange}
            value={values.documento}
            error={errors.documento}
          />
          <Input
            texto="Contraseña"
            placeholder="Ingresa tu contraseña"
            name="contrasena"
            tipo={typeContrasena}
            onChange={handleInputChange}
            value={values.contrasena}
            error={errors.contrasena}
          />
          <div className="flex flex-col lg:flex-row justify-between gap-y-2">
            <div className="space-x-2">
              <input
                type="checkbox"
                id="ver"
                className="rounded-full"
                onChange={(event) => verContrasena(event)}
              />
              <label
                htmlFor="ver"
                className="text-paragraph2 font-cocogooseLight"
              >
                Ver contraseña
              </label>
            </div>
            <Link to="/ayudacontrasena" className="text-paragraph2 font-cocogooseLight text-darkBlue underline">
               ¿Olvidaste tu contraseña?
              </Link>
          </div>

          <Boton text="Iniciar Sesión" type="blue" />
        </div>
        <div className="max-h-96 max-w-[520px] w-full md:block hidden">
          <img
            src="../../../public/img/imgLogin.png"
            alt=""
            className="object-contain w-full h-full"
            slot="imagen"
          />
        </div>
      </form>
    </main>
  );
};

export default FormLogin;
