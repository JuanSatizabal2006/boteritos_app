import { useEffect, useState } from "react";
import { Dropdown } from "../../../../components/forms/Dropdown.jsx";
import { Input } from "../../../../components/forms/Input.jsx";
import { UploadFile } from "../../../../components/forms/UploadFile.jsx";
import {
  dataArea,
} from "../../../../helper/objects/dropdownArray.js";
import { Boton } from "../../../../components/forms/Boton.jsx";
import { validateField } from "../../../../helper/validators/register.js";
import { useNavigate, Link } from "react-router-dom";
import { useRegFormContext } from "../../../../hooks/RegFormProvider.jsx";
import { caseProfesor } from "../../../../helper/validators/case/profesor.js";
import { RegistroExito } from "../../../../components/forms/RegistroExito.jsx";

export const TeacherRegister = () => {
  const [state, dispatch] = useRegFormContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // Estado para los errores
  const [dataDropdown, setDataDropdown] = useState({
    dropdownArea: [],
  });
  const [values, setValues] = useState({
    titulo: "",
    idarea: "",

  });
  const dataFormInd = new FormData();

  const [finish, setFinish] = useState(false);

  const [estadoValida, setEstadoValida] = useState(false); // Estado que controla el renderizado condicional


  useEffect(() => {
    dispatch({ type: "CHANGE_PERCENT", data: 100 });
  }, []);

  //PASAR DATOS A LOS DROPDOWNS (DATOS DE LA DB)
  useEffect(() => {
    const getDataDropdown = async () => {
      const resultArea = await dataArea();

      setDataDropdown({
        ...dataDropdown,
        dropdownArea: resultArea,
      });
    };

    getDataDropdown();
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

  // Función genérica para manejar cambios en otros dropdowns
  const handleDropdownChange = (name, value) => {
    setValues({ ...values, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Eliminar mensaje de error
    }));
  };

  // Handle file changes
  const handleFileChange = (name, file) => {
    const maxFileSize = 5 * 1024 * 1024; // 5MB en bytes

  // Verificar si el archivo es mayor a 5MB
  if (file.size > maxFileSize) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "El tamaño del archivo no debe ser mayor a 10MB.",
    }));
    return;
  }

  
  // Eliminar cualquier error anterior asociado al archivo si es válido
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "", // Eliminar mensaje de error
  }));
  dataFormInd.set(name, file);
  setValues({ ...values, hojavida: file });
  console.log(file);
  };

  // Maneja el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "SET_PROFESSION_DATA", data: values });

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

    // Verificar si la imagen ha sido seleccionada
    if (!values.hojavida) {
      newErrors.hojavida = "La hoja de vida es obligatoria.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataUser = {
      ...values,
      titulo: values.titulo.trim(),
    };

    //Recorrido del objeto para añadirlo al formData
    for (const key in dataUser) {
      if (Object.hasOwn(values, key)) {
        dataFormInd.set(key, dataUser[key]);
      }
    }

    dispatch({ type: "ADD_DATA_FORM", data: dataFormInd });

    setFinish(true);
  };

  const pito = async () => {  
    
    console.log(state);
    
    const response = await fetch("http://localhost:8000/api/v3/registro/profesor/", {
      method: "POST",
      body: state.dataForm,
    });
    
    setFinish(false)

    if (response.status === 201) {
      setEstadoValida(true); // Cambiar estado cuando el usuario se cree exitosamente
    }
    const data = await response.json();
    console.log(data);
  };

  if(finish){
    pito();
  }
  return (
    <>
    {
      estadoValida ? (
        <div className="w-full flex justify-center">
      <RegistroExito rol={"Profesor"} url1={"admin/registro"} url2={"admin/listaprofesores"}/>
    </div>
      ) : (
    
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
          {/* Renderiza dropdowns adicionales según el rol seleccionado */}
          <Input
            name={"titulo"}
            texto={"Titulo"}
            placeholder={"Titulación del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.titulo}
            error={errors.titulo}
          />
          <Dropdown
            name={"idarea"}
            label={"Area"}
            //data={dataMatricula}
            data={dataDropdown.dropdownArea}
            onChange={(value) => handleDropdownChange("idarea", value)}
            placeholder={"Selecciona un area"}
            error={errors.idarea}
          />
          <UploadFile
          typefile={".pdf"}
            title={"Hoja de vida"}
            id="hojavida"
            onFileChange={(file) => handleFileChange("hojavida", file)}
            validationText={"Tamaño maximo del archivo: 10MB"}
            error={errors.hojavida}
          />
        </div>
        <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
          {/* Botón para confirmar el formulario */}
          <Link
            to={"/admin/registro/registroprofesor/telefonos"}
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
