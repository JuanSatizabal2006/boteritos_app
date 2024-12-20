import React, { useEffect, useState } from "react";
import ProfileField from "../../components/profile/ProfileField";
import profileData from "../../pages/general/profileData";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  dataContactosEstudiante,
  dataDatosMedicosEstudiante,
  dataDetailEstudiante,
  DataDireccionesEstudiante,
  DataFechasEstudiante,
  DataPersonal,
  dataResponsableEstudiante,
} from "../../api/get";

const Profile = () => {
  const [data, setData] = useState(profileData);

  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const decodedToken = jwtDecode(access_token);
  const id = decodedToken.idjob;
  const rol = decodedToken.rol;
  const imagen = decodedToken.img;

  const getRoleName = (role) => {
    switch (role) {
      case 1:
        return "administrador";
      case 2:
        return "profesor";
      default:
        return "estudiante";
    }
  };

  const roleName = getRoleName(rol);

  console.log(id, rol, roleName);

  //Para almacenar los datos obtenidos del API para diferentes secciones.
  const [dataDetail, setDataDetail] = useState({
    historiaClinica: [],
    responsables: [],
    datosMedicos: [],
    contactos: [],
    direcciones: [],
    personal: [],
    fechas: [],
  });

  useEffect(() => {
    const obtainData = async () => {
      const dataHistClinic = await dataDetailEstudiante(
        `historiaclinica/${id}`
      );

      const dataResponsable = await dataResponsableEstudiante(
        `responsable/${id}`
      );

      const dataDatosMedicos = await dataDatosMedicosEstudiante(
        `datosmedicos/${roleName}/${id}`
      );

      const dataContactos = await dataContactosEstudiante(
        `telefono/${roleName}/${id}`
      );

      const dataFechas = await DataFechasEstudiante(`fechas/${roleName}/${id}`);

      const dataDirecciones = await DataDireccionesEstudiante(
        `direccion/${roleName}/${id}`
      );

      if (!dataFechas.status == 200) {
        setDataDetail({ fechas: null });
      }

      let personalData = null;

      try {
        if (roleName === "profesor") {
          const dataPersonalResponse = await DataPersonal(`profesor/${id}`);
          if (dataPersonalResponse.status === 200) {
            personalData = dataPersonalResponse.data.data;
          } else {
            console.error(
              `Error fetching personal data for profesor:`,
              dataPersonalResponse
            );
          }

          console.log(
            "Respuesta de la API para profesor:",
            dataPersonalResponse
          );
        } else {
          const dataPersonalEstudiante = await DataPersonal(`estudiante/${id}`);
          if (dataPersonalEstudiante.status === 200) {
            personalData = dataPersonalEstudiante.data.datos;
          } else {
            console.error(
              `Error fetching personal data for estudiante:`,
              dataPersonalEstudiante
            );
          }
        }
      } catch (error) {
        console.error("Error fetching personal data:", error);
      }

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

      console.log("Datos Historia Clínica:", dataHistClinic.data.data);
      console.log("Datos Responsable:", dataResponsable.data.data);
      console.log("Datos datos medicos:", dataDatosMedicos.data.data);
      console.log("Datos Contactos:", dataContactos.data.data);
      console.log("Datos direcciones:", dataDirecciones.data.data);
      console.log("Datos personales:", personalData);

      console.log("Datos fechas:", dataFechas);

      setDataDetail({
        ...dataDetail,
        historiaClinica: dataHistClinic.data.data,
        responsables: dataResponsable.data.data,
        datosMedicos: dataDatosMedicos.data.data,
        contactos: dataContactos.data.data,
        direcciones: dataDirecciones.data.data,
        personal: personalData,
        fechas: dataFechas.data.data,
      });
    };

    obtainData();
  }, [id, roleName]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex items-center mb-6">
        <img
          src={imagen}
          alt="Profile"
          className="w-32 h-32 rounded-full mr-2 sm:mr-6"
        />
        <div>
          {rol === 2 // Profesor
            ? dataDetail.personal &&
              Object.keys(dataDetail.personal).length > 0 && (
                <div>
                  <h2 className="sm:text-subTitle font-cocogooseSemiLight text-darkBlue">
                    {dataDetail.personal.nombre} {dataDetail.personal.apellido}
                  </h2>
                  <p className="text-xs sm:text-paragraph font-cocogooseLight">
                    {dataDetail.personal.correo}
                  </p>
                </div>
              )
            : // Estudiante
              dataDetail.personal &&
              dataDetail.personal.length > 0 && (
                <div>
                  <h2 className="sm:text-subTitle font-cocogooseSemiLight text-darkBlue">
                    {dataDetail.personal[0].nombre} {dataDetail.personal[0].apellido}
                  </h2>
                  <p className="text-xs sm:text-paragraph font-cocogooseLight">
                    {dataDetail.personal[0].correo}
                  </p>
                </div>
              )}
        </div>
      </div>

      {rol === 2 // Si el rol es profesor
        ? dataDetail.personal &&
          Object.keys(dataDetail.personal).length > 0 && (
            <div className="mt-8">
              <h1 className="font-cocogooseSemiLight text-title2 text-darkBlue">
                Datos Personales
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4">
                <ProfileField
                  label="Nombre"
                  value={dataDetail.personal.nombre}
                />
                <ProfileField
                  label="Apellido"
                  value={dataDetail.personal.apellido}
                />
                <ProfileField label="Edad" value={dataDetail.personal.edad} />
                <ProfileField label="Sexo" value={dataDetail.personal.sexo} />
                <ProfileField
                  label="Tipo de documento"
                  value={dataDetail.personal.tipodocumento}
                />
                <ProfileField
                  label="Número documento"
                  value={dataDetail.personal.documento}
                />
                <ProfileField
                  label="Título"
                  value={dataDetail.personal.titulo}
                />
                <ProfileField label="Área" value={dataDetail.personal.area} />
                <ProfileField
                  label="Correo"
                  value={dataDetail.personal.correo}
                  editable
                />
                <div className="col-span-1 md:col-span-2">
                  <ProfileField
                    label="Hoja de Vida"
                    value={dataDetail.personal.hojavida}
                  />
                </div>
              </div>
            </div>
          )
        : // Si el rol es estudiante
          dataDetail.personal &&
          dataDetail.personal.length > 0 && (
            <div className="mt-8">
              <h1 className="font-cocogooseSemiLight text-title2 text-darkBlue">
                Datos Personales
              </h1>
              {dataDetail.personal.map((persona, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4"
                >
                  <ProfileField label="Nombre" value={persona.nombre} />
                  <ProfileField label="Apellido" value={persona.apellido} />
                  <ProfileField label="Edad" value={persona.edad} />
                  <ProfileField label="Sexo" value={persona.sexo} />
                  <ProfileField
                    label="Tipo de documento"
                    value={persona.tipodocumento}
                  />
                  <ProfileField
                    label="Número documento"
                    value={persona.documento}
                  />
                  <ProfileField label="Título" value={persona.título} />
                  <ProfileField label="Área" value={persona.area} />
                  <ProfileField
                    label="Correo"
                    value={persona.correo}
                    editable
                  />
                  <div className="col-span-2">
                    <ProfileField
                      label="Hoja de Vida"
                      value={persona.hojavida}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

      <div className="mt-8">
        <h1 className="font-cocogooseSemiLight text-title2 text-darkBlue">
          Datos Médicos
        </h1>
        {dataDetail.datosMedicos && dataDetail.datosMedicos.length > 0 ? (
          dataDetail.datosMedicos.map((medicoData, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4"
            >
              <ProfileField label="Altura" value={medicoData.altura} />
              <ProfileField label="Peso" value={medicoData.peso} />
              <ProfileField label="EPS" value={medicoData.eps} />
              <ProfileField
                label="Lugar de Atención"
                value={medicoData.lugaratencion}
              />
              <ProfileField label="Tipo de Sangre" value={medicoData.rh} />
            </div>
          ))
        ) : (
          <p className="text-paragraph font-cocogooseLight text-redFull">
            No se encontraron datos médicos.
          </p>
        )}
      </div>

      {rol !== 2 && ( // Verifica si el rol no es de profesor (rol 2)
        <div className="mt-8">
          <h1 className="font-cocogooseSemiLight text-title2 text-darkBlue">
            Responsables
          </h1>
          {dataDetail.responsables && dataDetail.responsables.length > 0 ? (
            dataDetail.responsables.map((responsable, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4"
              >
                <ProfileField
                  label="Nombre del Responsable"
                  value={responsable.nombre}
                />
                <ProfileField label="Teléfono" value={responsable.telefono} />
                <ProfileField
                  label="Correo"
                  value={responsable.correo}
                  editable
                />
              </div>
            ))
          ) : (
            <p className="text-paragraph font-cocogooseLight text-redFull">
              No se encontraron responsables.
            </p>
          )}
        </div>
      )}

      {rol !== 2 && ( // Verifica si el rol no es de profesor (rol 2)
        <div className="mt-8">
          <h1 className="font-cocogooseSemiLight text-title2 text-darkBlue">
            Historia Clinica
          </h1>
          {dataDetail.historiaClinica &&
          dataDetail.historiaClinica.length > 0 ? (
            dataDetail.historiaClinica.map((historiaclini, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4"
              >
                <ProfileField
                  label="Diagnostico"
                  value={historiaclini.diagnostico}
                />
                <ProfileField
                  label="Discapacidad"
                  value={historiaclini.discapacidad}
                />
                <ProfileField
                  label="Medicamentos"
                  value={historiaclini.medicamentos}
                />
                <ProfileField
                  label="Observacion"
                  value={historiaclini.observacion}
                />
                <ProfileField
                  label="Restricciones alimenticias"
                  value={historiaclini.restriccionesalimenticias}
                />
                <ProfileField label="Archivo" value={historiaclini.archivo} />
              </div>
            ))
          ) : (
            <p className="text-paragraph font-cocogooseLight text-redFull">
              No se encontró una historia clinica.
            </p>
          )}
        </div>
      )}

      <div className="mt-8">
        <h1 className="font-cocogooseSemiLight text-title2 text-darkBlue">
          Contactos
        </h1>
        {dataDetail.contactos && dataDetail.contactos.length > 0 ? (
          dataDetail.contactos.map((contacto, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4"
            >
              <ProfileField label="Nombre" value={contacto.nombre} />
              <ProfileField
                label="Teléfono"
                value={contacto.telefono1}
                editable
              />
              <ProfileField
                label="Segundo teléfono"
                value={contacto.telefono2}
                editable
              />
            </div>
          ))
        ) : (
          <p className="text-paragraph font-cocogooseLight text-redFull">
            No se encontraron contactos.
          </p>
        )}
      </div>

      <div className="mt-8">
        <h1 className="font-cocogooseSemiLight text-title2 text-darkBlue">
          Direcciones
        </h1>
        {dataDetail.direcciones && dataDetail.direcciones.length > 0 ? (
          dataDetail.direcciones.map((direccion, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4"
            >
              <ProfileField label="Barrio" value={direccion.barrio} editable />
              <ProfileField label="comuna" value={direccion.comuna} editable />
              <ProfileField label="Número" value={direccion.numero} editable />
            </div>
          ))
        ) : (
          <p className="text-paragraph font-cocogooseLight text-redFull">
            No se encontraron direcciones.
          </p>
        )}
      </div>

      <div className="mt-8">
        <h1 className="font-cocogooseSemiLight text-title2 text-darkBlue">
          Fechas
        </h1>
        {dataDetail.fechas && dataDetail.fechas.length > 0 ? (
          dataDetail.fechas.map((fecha, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-4"
            >
              <ProfileField
                label="Fecha de nacimiento"
                value={fecha.fechanacimiento}
              />
              <ProfileField
                label="Fecha de ingreso"
                value={fecha.fechaingreso}
              />
              <ProfileField
                label="Fecha de registro"
                value={fecha.fecharegistro}
              />
            </div>
          ))
        ) : (
          <p className="text-paragraph font-cocogooseLight text-redFull">
            No se encontraron fechas importantes.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
