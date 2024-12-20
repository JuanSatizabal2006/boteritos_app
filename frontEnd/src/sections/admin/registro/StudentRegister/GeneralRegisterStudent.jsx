import React, { useEffect, useState } from "react";
import { Dropdown } from "../../../../components/forms/Dropdown.jsx";
import { Input } from "../../../../components/forms/Input.jsx";
import { UploadFile } from "../../../../components/forms/UploadFile.jsx";
import {
  dataDoc,
  dataSexo,
  dataMatricula,
} from "../../../../helper/objects/dropdownArray.js";
import { Boton } from "../../../../components/forms/Boton.jsx";
import { validateField } from "../../../../helper/validators/register.js";
import { useNavigate, Link } from "react-router-dom";
import { useRegFormContext } from "../../../../hooks/RegFormProvider.jsx";
import { caseEstudiante } from "../../../../helper/validators/case/estudiante.js";

export const GeneralRegisterStudent = () => {
  const [state, dispatch] = useRegFormContext();

  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // Estado para los errores

  const [dataDropdown, setDataDropdown] = useState({
    dropdownDocumento: [],
    dropdownSexo: [],
    dropdownMatricula: [],
  });

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    correo: "",
    tallacamisa: "",
    institutoprocedencia: "",
    edad: "",
    idtipodocumento: "",
    idsexo: "",
    contrasena: "",
    cambiocontrasena: "0",
    estado: "1",
    idrol: 3,
    idmatricula: "",
  });

  const dataFormInd = new FormData();

  //PASAR DATOS A LOS DROPDOWNS (DATOS DE LA DB)
  useEffect(() => {
    const getDataDropdown = async () => {
      const resultSexo = await dataSexo();
      const resultDocumento = await dataDoc();
      const resultMatricula = await dataMatricula();

      setDataDropdown({
        ...dataDropdown,
        dropdownSexo: resultSexo,
        dropdownDocumento: resultDocumento,
        dropdownMatricula: resultMatricula,
      });
    };

    getDataDropdown();
  }, []);

  // Maneja cambios en los inputs de texto
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Validar el campo específico
    const error = caseEstudiante(name, value);

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
    console.log("dropdowns value:", value); // Mostrar el valor seleccionado de los otros dropdowns en la consola
     // Eliminar cualquier error anterior asociado al archivo si es válido
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "", // Eliminar mensaje de error
  }));
  };

  // Handle file changes
  const handleFileChange = (name, file) => {

    const maxFileSize = 1 * 1024 * 1024; // 1MB en bytes

  // Verificar si el archivo es mayor a 5MB
  if (file.size > maxFileSize) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "El tamaño de la imagen no debe ser mayor a 5MB.",
    }));
    return;
  }

  
  // Eliminar cualquier error anterior asociado al archivo si es válido
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: "", // Eliminar mensaje de error
  }));
  dataFormInd.set(name, file);
  setValues({ ...values, imagen: file });
  console.log(file);
  };

  // Maneja el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Validar todos los campos antes de enviar
    const newErrors = {};
    for (const key in values) {
      if (Object.hasOwn(values, key)) {
        const error = caseEstudiante(key, values[key]);
        if (error) {
          newErrors[key] = error;
        }
      }
    }

    // Verificar si la imagen ha sido seleccionada
    if (!values.imagen) {
      newErrors.imagen = "La imagen es obligatoria.";
    }
    

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const dataUser = {
      ...values,
      nombre: values.nombre.trim(),
      apellido: values.apellido.trim(),
      documento: values.documento.trim(),
      tallacamisa: values.tallacamisa.trim(),
      institutoprocedencia: values.institutoprocedencia.trim(),
      correo: values.correo.trim(),
      edad: values.edad.trim(),
      contrasena: values.documento.trim(),
    };

    checkDoc(dataUser);
  };

  const checkDoc = async (value) => {
    const response = await fetch(
      `http://localhost:8000/api/v3/sql/checkdoc/${value.documento}`
    );
    const data = await response.json();

    console.log(data);

    if (data.error) {
      // Si el documento ya existe, mostramos el error en el campo 'documento'
      setErrors((prevErrors) => ({
        ...prevErrors,
        documento: "El número de documento ya existe.",
      }));
      return;
    }

    //Recorrido del objeto para añadirlo al formData
    for (const key in value) {
      if (Object.hasOwn(values, key)) {
        dataFormInd.set(key, value[key]);
      }
    }

    dispatch({ type: "ADD_DATA_FORM", data: dataFormInd });
    navigate("/admin/registro/registroestudiante/direcciones");
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col max-w-[830px] w-full gap-x-[30px] gap-y-10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-8">
          <Input
            name={"nombre"}
            texto={"Nombre"}
            placeholder={"Nombre del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.nombre}
            error={errors.nombre}
          />
          <Input
            name={"apellido"}
            texto={"Apellidos"}
            placeholder={"Apellido del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.apellido}
            error={errors.apellido}
          />
          {/* Dropdown para seleccionar el tipo de documento */}
          <Dropdown
            name={"idtipodocumento"}
            label={"Tipo de documento"}
            //data={dataMatricula}
            data={dataDropdown.dropdownDocumento}
            onChange={(value) => handleDropdownChange("idtipodocumento", value)}
            placeholder={"Selecciona el tipo de documento"}
            error={errors.idtipodocumento}
          />
          <Input
            name={"tallacamisa"}
            texto={"Talla de camisa"}
            placeholder={"Talla de camisa del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.tallacamisa}
            error={errors.tallacamisa}
          />
          <Input
            name={"documento"}
            texto={"Número de documento"}
            placeholder={"Documento del usuario"}
            tipo={"number"}
            onChange={handleInputChange}
            value={values.documento}
            error={errors.documento}
          />
          <Input
            name={"edad"}
            texto={"Edad"}
            placeholder={"Edad del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.edad}
            error={errors.edad}
          />
          <Input
            name={"correo"}
            texto={"Correo"}
            placeholder={"Correo electrónico del usuario"}
            tipo={"email"}
            onChange={handleInputChange}
            value={values.correo}
            error={errors.correo}
          />
          <Dropdown
            name={"idsexo"}
            label={"Sexo"}
            data={dataDropdown.dropdownSexo}
            onChange={(value) => handleDropdownChange("idsexo", value)}
            placeholder={"Selecciona el sexo"}
            error={errors.idsexo}
          />
          <Dropdown
            name={"idmatricula"}
            label={"Matricula"}
            data={dataDropdown.dropdownMatricula}
            onChange={(value) => handleDropdownChange("idmatricula", value)}
            placeholder={"Selecciona la matricula"}
            error={errors.idmatricula}
          />
          <Input
            name={"institutoprocedencia"}
            texto={"Instituto de procedencia"}
            placeholder={"Instituto de procedencia del usuario"}
            tipo={"text"}
            onChange={handleInputChange}
            value={values.institutoprocedencia}
            error={errors.institutoprocedencia}
          />
          <UploadFile
            typefile={"image/*"}
            title={"Foto"}
            id="imagen"
            onFileChange={(file) => handleFileChange("imagen", file)}
            error={errors.imagen}
            validationText={"(Tamaño maximo del archivo: 5MB)"}
          />
        </div>
        <div className="w-full flex flex-col gap-y-5 xl:gap-y-0 xl:flex-row justify-between">
          {/* Botón para confirmar el formulario */}
          <Link to={"/admin/registro"} className="max-w-[400px] w-full">
            <Boton text="Atras" type="blue" />
          </Link>
          <Boton text="Continuar" type="blue" />
        </div>
      </form>
    </>
  );
};
