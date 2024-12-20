import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GrupoDatoElemento } from "../../../components/datosEstudiante/GrupoDatoElemento";
import HeaderData from "../../../components/list/headerData/HeaderData";
import { GrupoDatos } from "../../../components/list/groupData/GrupoDatos";

// import { dataPersonal } from "../../../helper/objects/dataStudentsArray";

import { UpdateModal } from "../../../components/modales/UpdateModal";
import {
  dataDatosMedicosEstudiante,
  dataDetailEstudiante,
  dataResponsableEstudiante,
  DataDireccionesEstudiante,
  dataContactosEstudiante,
  DataPersonal,
  DataFechasEstudiante,
} from "../../../api/get";
import { ModalContentUpdate } from "../../../components/modales/ModalContentUpdate";
import { putUpdate } from "../../../api/put";
import { UpdateModalesValidators } from "../../../helper/validators/UpdateModalesValidators";

const Detail = () => {
  const [selectedSection, setSelectedSection] = useState(null); //Para almacenar la sección actual que se está editando.
  const [sectionData, setSectionData] = useState(null); //para almacenar los datos de cada sección
  const [isModalOpen, setModalOpen] = useState(false);
  const dataFormInd = new FormData();
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  //ESTADO PARA GET
  //Para almacenar los datos obtenidos del API para diferentes secciones.
  const [dataDetail, setDataDetail] = useState({
    historiaClinica: [],
    responsables: [],
    datosMedicos: [],
    contactos: [],
    direcciones: [],
    usuario: [],
    fechas: [],
  });

  //historiaclinica/?idestudiante=2
  //FUNCION PARA OBTENER LOS DATOS
  useEffect(() => {
    const obtainData = async () => {
      const dataHistClinic = await dataDetailEstudiante(
        `historiaclinica/${id}`
      );

      const dataResponsable = await dataResponsableEstudiante(
        `responsable/${id}`
      );

      const dataDatosMedicos = await dataDatosMedicosEstudiante(
        `datosmedicos/estudiante/${id}`
      );

      const dataContactos = await dataContactosEstudiante(
        `telefono/estudiante/${id}`
      );

      const dataFechas = await DataFechasEstudiante(`fechas/estudiante/${id}`);

      const dataDirecciones = await DataDireccionesEstudiante(
        `direccion/estudiante/${id}`
      );

      if (!dataFechas.status == 200) {
        setDataDetail({ fechas: null });
      }

      const DataPersonalEstudiante = await DataPersonal(`estudiante/${id}`);

      if (!dataHistClinic.status == 200) {
        setDataDetail({ historiaClinica: null });
      }

      if (!dataResponsable.status == 200) {
        setDataDetail({ responsables: null });
      }

      if (!dataDatosMedicos.status == 200) {
        setDataDetail({ datosMedicos: null });
      }

      if (!dataContactos.status == 200) {
        setDataDetail({ contactos: null });
      }

      if (!dataDirecciones.status == 200) {
        setDataDetail({ direcciones: null });
      }

      if (!DataPersonalEstudiante.status == 200) {
        setDataDetail({ usuario: null });
      }

      console.log("Datos Historia Clínica:", dataHistClinic.data.data);
      console.log("Datos Responsable:", dataResponsable.data.data);
      console.log("Datos datos medicos:", dataDatosMedicos.data.data);
      console.log("Datos Contactos:", dataContactos.data.data);
      console.log("Datos direcciones:", dataDirecciones.data.data);
      console.log("Datos personales:", DataPersonalEstudiante.data.datos);
      console.log("Datos fechas:", dataFechas);

      setDataDetail({
        ...dataDetail,
        historiaClinica: dataHistClinic.data.data,
        responsables: dataResponsable.data.data,
        datosMedicos: dataDatosMedicos.data.data,
        contactos: dataContactos.data.data,
        direcciones: dataDirecciones.data.data,
        usuario: DataPersonalEstudiante.data.datos,
        fechas: dataFechas.data.data,
      });
    };

    obtainData();
  }, []);

  const update = (sectionId, index) => {
    let data;

    switch (sectionId) {
      case "Datos personales":
        data = dataDetail.usuario[index];
        break;
      case "Responsables":
        data = dataDetail.responsables[index];
        break;
      case "Historia clinica":
        data = dataDetail.historiaClinica[index];
        break;
      case "Datos Medicos":
        data = dataDetail.datosMedicos[index];
        break;
      case "Contactos":
        data = dataDetail.contactos[index];
        break;
      case "Dirección":
        data = dataDetail.direcciones[index];
        break;
      case "Fechas":
        data = dataDetail.direcciones[index];
        break;
      default:
        data = null;
    }

    console.log("Selected data:", data);
    setSelectedSection(sectionId);
    setSectionData(data);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedSection(null);
    setSectionData(null);
    setErrors({});
  };

  const handleSave = async () => {
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      console.error("Errores presentes, no se puede guardar.");
      return;
    }
  
    // Crear una copia de sectionData para trabajar con ella
    const dataToSend = { ...sectionData };
  
    // Crear un nuevo FormData
    const newData = new FormData();
    newData.append("section", selectedSection);
    newData.append("idestudiante", id);
  
    // Verificar si el archivo seleccionado es un archivo nuevo
    if (dataToSend.archivo && dataToSend.archivo instanceof File) {
      // Si hay un archivo nuevo, agregarlo a FormData
      newData.append("archivo", dataToSend.archivo);
      console.log("Nuevo archivo seleccionado, se enviará:", dataToSend.archivo);
    } else {
      // Si no se seleccionó un archivo nuevo, simplemente no agregar "archivo" al FormData
      console.log("No se seleccionó un nuevo archivo, el archivo existente se mantendrá.");
    }
  
    // Agregar el resto de los datos de la sección al FormData
    for (const key in dataToSend) {
      if (key !== "archivo" && dataToSend.hasOwnProperty(key)) {
        newData.append(key, dataToSend[key]);
      }
    }
  
    // Log para verificar los datos que se están enviando
    console.log("Datos que se están enviando en FormData:");
    newData.forEach((value, key) => {
      console.log(`FormData -> ${key}:`, value);
    });
  
    let endpoint = "";
    switch (selectedSection) {
      case "Datos personales":
        endpoint = `registro/estudiante/`;
        break;
      case "Responsables":
        endpoint = `registro/responsable/`;
        break;
      case "Historia clinica":
        endpoint = `registro/historiaclinica/`;
        break;
      case "Datos Medicos":
        endpoint = `registro/datosmedicos/`;
        break;
      case "Contactos":
        endpoint = `registro/telefono/`;
        break;
      case "Dirección":
        endpoint = `registro/direccion/`;
        break;
      default:
        endpoint = "";
    }
  
    if (endpoint) {
      // Realizar la solicitud PUT
      const result = await putUpdate(newData, endpoint, id);
      if (result.status === 201) {
        console.log("Datos guardados", result.data);
      } else {
        console.error("Error al guardar los datos", result.data);
      }
    }
  
    closeModal();
  };
  

  // Handle file changes
  const handleFileChange = (name, file) => {
    if (file && file instanceof File) {
      // Si el archivo es válido y de tipo File, se almacena en sectionData
      setSectionData((prevData) => ({
        ...prevData,
        [name]: file, // Almacena el archivo seleccionado
      }));
      console.log("Archivo seleccionado:", file);
    } else {
      console.log("No se seleccionó ningún archivo válido.");
    }
  };
  

  const handleInputChange = (e, key) => {
    const { name, value } = e.target;
    const content = selectedSection || "default"; // Sección actual

    const error = UpdateModalesValidators(content, name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error, // Almacena el error en el estado
    }));

    setSectionData((prevData) => ({
      ...prevData,
      [key]: value, // Actualiza el valor en la sección
    }));
  };

  const filterData = (data) => {
    // Filtra los campos que contienen Ids
    return Object.keys(data)
      .filter((key) => !key.toLowerCase().includes("id"))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
  };

  const formatLabel = (key) => {
    // Convierte la primera letra a mayúscula y agrega espacios antes de mayúsculas.
    return key
      .replace(/([A-Z])/g, " $1") // Agrega un espacio antes de cada mayúscula.
      .replace(/^./, (str) => str.toUpperCase()) // Convierte la primera letra a mayúscula.
      .trim(); // Elimina cualquier espacio extra al principio o al final.
  };

  return (
    <div className="w-full space-y-2 grid gap-10">
      <HeaderData
        id={id}
        urlApi={"sql/estudiantes/header/"}
        typeLink={"back"}
      />
      <GrupoDatoElemento /> {/* BOTONES PARA LOS MODALES */}
      <div className="w-full h-0 border-darkBlue border-2"></div>
      <div className="space-y-7">
        {dataDetail.usuario &&
          dataDetail.usuario.map((value, index) => (
            <GrupoDatos
              titulo={"Datos personales"}
              update={() => update("Datos personales", index)}
              data={dataDetail.usuario}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Nombres:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.nombre}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Apellidos:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.apellido}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Correo:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.correo}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Sexo:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.sexo}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Tipo documento:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.tipodocumento}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Documento:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.documento}
                  </p>
                </div>

                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    edad:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.edad}
                  </p>
                </div>

                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Talla de la camisa:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.tallacamisa}
                  </p>
                </div>

                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Tipo de matricula:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.matricula}
                  </p>
                </div>

                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Institución de procedencia:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.institutoprocedencia}
                  </p>
                </div>
              </div>
            </GrupoDatos>
          ))}

        {dataDetail.responsables &&
          dataDetail.responsables.map((value, index) => (
            <GrupoDatos
              titulo={"Responsables"}
              update={() => update("Responsables", index)}
              data={dataDetail.responsables}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Nombres:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.nombre}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Apellidos:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.apellido}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Correo:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.correo}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Sexo:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.sexo}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Tipo documento:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.tipodocumento}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Documento:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.numerodocumento}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Telefono:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.telefono}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Profesion:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.profesion}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Ocupacion:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.ocupacion}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Empresa:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.empresa}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Parentesco:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.tipoparentesco}
                  </p>
                </div>
              </div>
            </GrupoDatos>
          ))}

        {dataDetail.historiaClinica &&
          dataDetail.historiaClinica.map((value, index) => (
            <GrupoDatos
              titulo={"Historia Clinica"}
              update={() => update("Historia clinica", index)}
              data={dataDetail.historiaClinica}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Medicamentos:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.medicamentos}
                  </p>
                </div>

                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Restricciones Alimenticias:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.restriccionesalimenticias}
                  </p>
                </div>

                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Diagnostico :
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.diagnostico}
                  </p>
                </div>

                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Discapacidad :
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.discapacidad}
                  </p>
                </div>

                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Observacion:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.observacion}
                  </p>
                </div>

                <div className="break-words">
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Archivo:
                  </p>
                  <a
                    download="Archivo boterito"
                    href={value.archivo}
                    className="font-cocogooseLight text-paragraph2 flex-1"
                  >
                    {value.archivo}
                  </a>
                </div>
              </div>
            </GrupoDatos>
          ))}

        {dataDetail.datosMedicos &&
          dataDetail.datosMedicos.map((value, index) => (
            <GrupoDatos
              titulo={"Datos Medicos"}
              update={() => update("Datos Medicos", index)}
              data={dataDetail.datosMedicos}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Lugar de atención:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.lugaratencion}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Peso:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.peso}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Altura:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.altura}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    EPS:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.eps}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Tipo de sangre:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.rh}
                  </p>
                </div>
              </div>
            </GrupoDatos>
          ))}

        {dataDetail.contactos &&
          dataDetail.contactos.map((value, index) => (
            <GrupoDatos
              titulo={"Contactos"}
              update={() => update("Contactos", index)}
              data={dataDetail.contactos}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Telefono:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.telefono1}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Segundo Telefono
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.telefono2}
                  </p>
                </div>
              </div>
            </GrupoDatos>
          ))}

        {dataDetail.fechas &&
          dataDetail.fechas.map((value, index) => (
            <GrupoDatos
              titulo={"Fechas"}
              update={() => update("Fechas", index)}
              data={dataDetail.fechas}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Fecha de nacimiento:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.fechanacimiento}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Fecha de registro
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.fecharegistro}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Fecha de ingreso:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.fechaingreso}
                  </p>
                </div>
              </div>
            </GrupoDatos>
          ))}

        {dataDetail.direcciones &&
          dataDetail.direcciones.map((value, index) => (
            <GrupoDatos
              titulo={"Dirección"}
              update={() => update("Dirección", index)}
              data={dataDetail.direcciones}
              key={index}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-y-3">
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Comuna:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.comuna}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Número
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.numero}
                  </p>
                </div>
                <div>
                  <p className="font-cocogooseLight text-paragraph text-darkBlue">
                    Barrio:
                  </p>
                  <p className="font-cocogooseLight text-paragraph2 flex-1">
                    {value.barrio}
                  </p>
                </div>
              </div>
            </GrupoDatos>
          ))}
      </div>
      <UpdateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
      >
        <ModalContentUpdate
          section={selectedSection}
          data={sectionData}
          onChange={handleInputChange}
          handleFileChange={handleFileChange}
          errores={errors}
        />
      </UpdateModal>
    </div>
  );
};

export default Detail;
