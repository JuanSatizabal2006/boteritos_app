import React, { useState, useEffect } from "react";
import { Boton } from "../../components/forms/Boton";
import { Input } from "../../components/forms/Input.jsx";
import { Link } from "react-router-dom";
import { putCambiarPwd } from "../../api/put.js";
import { LoadingModal } from "../../components/modales/LoadingModal.jsx";
import ErrorWarning from "../../components/messages/error.jsx";
import SuccessWarning from "../../components/messages/SuccessWarning.jsx";

export const PasswordHelp = () => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [correoEncriptado, setCorreoEncriptado] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [resendAttempts, setResendAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (e) => {
    setDocumentNumber(e.target.value);
    if (errorMessage) {
      setErrorMessage(""); // Limpia el mensaje de error al escribir
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentNumber) {
      setErrorMessage("Debes ingresar tu número de documento.");
      return;
    }

    const body = JSON.stringify({ documento: documentNumber });

    try {
      setIsLoading(true);
      const response = await putCambiarPwd(body, "correo/recuperar/");
      const data = await response.json();

      if (response.status === 200) {
        setIsSubmitted(true);
        setCorreoEncriptado(data.data.correo); // Almacena el correo encriptado recibido
      } else {
        setErrorMessage(
          "No hay cuentas vinculadas con ese número de documento."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Hubo un problema al enviar el correo. Intenta de nuevo más tarde"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    const body = JSON.stringify({ documento: documentNumber });

    try {
      setIsLoading(true);
      const response = await putCambiarPwd(body, "correo/recuperar/");
      const data = await response.json();

      if (response.status === 200) {
        setSuccessMessage(
          "El enlace de recuperación ha sido reenviado a tu correo."
        );
        setResendAttempts((prev) => prev + 1); // Incrementa el contador de intentos

        // Si se alcanza el límite de intentos, comienza el temporizador
        if (resendAttempts + 1 === 2) {
          setTimer(120); // Establece el tiempo de espera en 120 segundos
          setIsButtonDisabled(true); // Desactiva el botón
        }
      } else {
        setErrorMessage(
          "Hubo un problema al enviar el correo. Intenta de nuevo más tarde."
        );
      }
    } catch (error) {
      setErrorMessage(
        "Hubo un problema al enviar el correo. Intenta de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsButtonDisabled(false); // Rehabilita el botón
      setResendAttempts(0); // Reinicia el contador de intentos
    }

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [timer]);

  const handleCorrect = () => {
    setDocumentNumber(""); // Limpia el input
    setIsSubmitted(false); // Vuelve a mostrar el formulario
    setErrorMessage(""); // Limpia los errores
    setCorreoEncriptado(""); // Limpia el correo encriptado
    setSuccessMessage(""); // Limpia el mensaje de éxito
  };

  return (
    <main className="w-full h-screen flex justify-center items-center p-4 text-black">
      <form
        onSubmit={handleSubmit}
        className="md:p-20 p-7 flex gap-20 rounded-xl shadow-[0_0_20px_0px_rgba(94,175,232,0.5)]"
      >
        <div className="max-h-96 max-w-[520px] w-full md:block hidden">
          <img
            src="../../../public/img/Forgotimg.png"
            alt="Forgot password"
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-7 max-w-[400px] w-full order-3 justify-center">
          {!isSubmitted ? (
            <>
              <h1 className="text-title font-cocogooseRegular tracking-normal text-darkBlue">
                Recuperar contraseña
              </h1>
              <Input
                texto="Número de documento"
                placeholder="Ingresa tu documento"
                icon=""
                value={documentNumber}
                onChange={handleChange}
                error={errorMessage}
              />
              <Boton text="Continuar" type="blue" />
            </>
          ) : (
            <div className="text-center grid gap-2
            ">
              <h1 className="text-title2 font-cocogooseRegular tracking-normal text-darkBlue break-words">
                Se envió un enlace al correo, {correoEncriptado}, con el cúal
                podrás recuperar tu contraseña.
              </h1>
              <p className="text-paragraph font-cocogooseLight">
                Puedes cerrar esta página y reanudar la recuperación de tu
                cuenta desde el enlace. Si no recibiste un correo puedes
                presionar el botón reenviar
              </p>

              {successMessage ? <SuccessWarning text={successMessage} /> : null}
              {errorMessage ? <ErrorWarning text={errorMessage} /> : null}

              <div className="flex justify-center mt-4">
                <Boton
                  text={
                    timer > 0
                      ? `Reenviar (${Math.floor(timer / 60)}:${(timer % 60)
                          .toString()
                          .padStart(2, "0")})`
                      : "Reenviar enlace"
                  }
                  type="blue"
                  onClick={handleResend}
                  disabled={isButtonDisabled} // Desactiva el botón si se han hecho 2 intentos
                />
              </div>

              <div className="flex justify-center mt-4">
                <a
                  href="#"
                  className="text-paragraph2 font-cocogooseLight text-darkBlue underline"
                  onClick={handleCorrect}
                >
                  Corregir documento
                </a>
              </div>

              <div
                className={`flex justify-center ${
                  isSubmitted ? "block" : "hidden"
                }`}
              >
                <Link
                  to="/"
                  className="text-paragraph2 font-cocogooseLight text-darkBlue underline"
                >
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>
          )}

          <div
            className={`flex justify-center ${
              isSubmitted ? "hidden" : "block"
            }`}
          >
            <Link
              to="/"
              className="text-paragraph2 font-cocogooseLight text-darkBlue underline"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </div>
      </form>
      <LoadingModal
        text={
          "Estamos procesando tu solicitud y enviando el enlace de recuperación. Por favor, espera un momento."
        }
        isOpen={isLoading}
        onClose={() => {}}
      />
    </main>
  );
};

export default PasswordHelp;
