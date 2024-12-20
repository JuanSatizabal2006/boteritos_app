import { LayoutGeneral } from "../../layouts/LayoutGeneral.jsx";
import { Boton } from "../../components/forms/Boton.jsx";
import { Input } from "../../components/forms/Input.jsx";
import React, { useState } from "react";
import { validatePasswordChange } from "../../helper/validators/passwordValidators.js";
import { jwtDecode } from "jwt-decode";
import { putPassword } from "../../api/put.js";
import { useNavigate } from "react-router-dom";

const CambiarContrasena = () => {
  const [typeContrasena, setTypeContrasena] = useState("password");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorCurrentPassword, setErrorCurrentPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Controla el mensaje de éxito
  const navigate = useNavigate(); // Para redirigir al usuario

  // Obtener el idusuario desde el token
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const decodedToken = jwtDecode(access_token);
  const idusuario = decodedToken.idusuario;

  const vercontrasena = (event) => {
    const isCheck = event.target.checked;
    if (isCheck) {
      setTypeContrasena("text");
    } else {
      setTypeContrasena("password");
    }
  };

  const validatePwd = async (e) => {
    e.preventDefault();
    setErrorNewPassword("");
    setErrorCurrentPassword("");
    setErrorConfirmPassword("");

    // Validación de contraseñas
    const { isValid, errors } = validatePasswordChange(
      currentPassword,
      newPassword,
      confirmPassword
    );

    if (!isValid) {
      setErrorNewPassword(errors.new);
      setErrorCurrentPassword(errors.current);
      setErrorConfirmPassword(errors.confirm);
    } else {
      const data = JSON.stringify({
        contrasena: currentPassword,
        idusuario: idusuario,
        nuevacontrasena: newPassword,
      });

      try {
        // Hacer la solicitud PUT utilizando la función putPassword
        const response = await putPassword(data, "correo/cambiar/");
        const responseData = await response.json(); // Obtener los datos de la respuesta
        if (response.ok) {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setShowSuccessMessage(true);
          console.log("Contraseña cambiada exitosamente.");
        } else {
          // Si la contraseña actual es incorrecta, marcar el error en el campo correspondiente
          if (responseData.error === "Contraseña incorrecta") {
            setErrorCurrentPassword("La contraseña actual es incorrecta."); // Mostrar como validación
          } else {
            setErrorCurrentPassword(
              responseData.message || "Error al cambiar la contraseña."
            );
          }
          console.log("Error al cambiar la contraseña.");
        }
      } catch (error) {
        console.error("Error al actualizar el estado:", error);
      }
    }
  };

  // Lógica para cerrar sesión y redirigir al usuario
  const handleLogout = () => {
    localStorage.clear(); // Limpiar el localStorage
    navigate("/"); // Redirigir al inicio de sesión o cualquier otra página
  };

  return (
    <LayoutGeneral title="Cambiar contraseña" titleHeader="Cambiar Contraseña">
      <main className="w-full h-full sm:h-[calc(100vh-150px)] flex items-center justify-center">
        {showSuccessMessage ? (
          // Mostrar el mensaje de éxito 
          <div className="w-full h-full flex items-center justify-center flex-col">
            <div className="bg-white flex flex-col items-center justify-center gap-10 rounded-2xl p-8">
              <img src="../../../public/img/zG59fyltWB.gif" alt="Éxito"></img>
              <div className="font-cocogooseRegular text-darkBlue text-title text-center">
                <h1>Contraseña cambiada exitosamente.</h1>
                <h2>Por favor, vuelva a iniciar sesión.</h2>
              </div>
              <Boton
                className="max-w-[400px] w-full"
                type="blue"
                text={"Iniciar Sesión"}
                onClick={handleLogout} // Cerrar sesión y limpiar localStorage
              >
                Cerrar
              </Boton>
            </div>
          </div>
        ) : (
          <div className="sm:max-w-[920px] grid sm:grid-cols-[1fr_1fr] gap-10 bg-white rounded-xl py-8 px-10 ">
            <div className="flex flex-col gap-5">
              <p className="text-title2 font-Cocogoose-SemiLight">
                Ten en cuenta:
              </p>
              <ol className="list-decimal	text-paragraph font-Cocogoose-Light flex-col">
                <li>
                  Introduce tu contraseña actual en el campo correspondiente
                  para verificar tu identidad.
                </li>
                <li>
                  Escribe tu nueva contraseña en el campo destinado para ello.
                  Asegúrate de que la nueva contraseña sea segura y cumpla con
                  los requisitos de seguridad.
                </li>
                <li>
                  Confirma tu nueva contraseña escribiéndola nuevamente en el
                  campo de confirmación
                </li>
              </ol>
            </div>
            <form onSubmit={validatePwd}>
              <div className="flex flex-col gap-5">
                <Input
                  texto="Contraseña actual"
                  placeholder="Ingrese su contraseña"
                  icon=""
                  tipo={typeContrasena}
                  error={errorCurrentPassword} // Mostrar error de contraseña actual
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setErrorCurrentPassword(""); // Limpia el error al escribir
                  }}
                  value={currentPassword}
                />
                <Input
                  texto="Nueva contraseña"
                  placeholder="Ingrese nueva contraseña"
                  icon=""
                  tipo={typeContrasena}
                  error={errorNewPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setErrorNewPassword(""); // Limpia el error al escribir
                  }}
                  value={newPassword}
                />
                <Input
                  texto="Confirmar contraseña"
                  placeholder="Confirme nueva contraseña"
                  icon=""
                  tipo={typeContrasena}
                  error={errorConfirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorConfirmPassword(""); // Limpia el error al escribir
                  }}
                  value={confirmPassword}
                />
                <div className="flex gap-3">
                  <input
                    type="checkbox"
                    id="ver"
                    className="rounded-full"
                    onChange={(event) => vercontrasena(event)}
                  />
                  <label
                    htmlFor="ver"
                    className="text-paragraph2 font-cocogooseLight"
                  >
                    Ver contraseña
                  </label>
                </div>

                <Boton text="Guardar" type="blue" />
              </div>
            </form>
          </div>
        )}
      </main>
    </LayoutGeneral>
  );
};

export default CambiarContrasena;
