import { Suspense } from "react";
import { Outlet, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import RegFormLayout from "./hooks/ContextLayout.jsx";

import "./index.css";
import {
  Addres,
  AddressStudent,
  AddressTeacher,
  Admin,
  AdminMain,
  Calificar,
  ChangePassword,
  CrearLogros,
  Dates,
  DatesStudent,
  DatesTeacher,
  DatosEstudiante,
  ForgotPassword,
  FormLogin,
  Informe,
  Informes,
  ListAdmins,
  ListEstudents,
  ListEstudiantes,
  ListProfesores,
  MedicalInfo,
  MedicalInfoStudent,
  MedicalInfoTeacher,
  PasswordHelp,
  Perfil,
  PhoneNumber,
  PhoneNumberStudent,
  PhoneNumberTeacher,
  ProfessionTeacher,
  RecibirLogros,
  Registro,
  StudentMain,
  StudentRegister,
  TeacherMain,
  TeacherRegister,
  Trimestre,
  DatosProfesor,
  InformesRecibidos
} from "./App.jsx";

import Loading from "./components/loaders/loading.jsx";
import RutaProtegida from "./auth/RutaProtegida.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <RutaProtegida />,
    children: [
      { path: "", element: <FormLogin /> },
      { path: "ayudacontrasena", element: <PasswordHelp /> },
      { path: "recuperarcontrasena/:token", element: <ForgotPassword /> }
    ],
  },
  {
    path: "admin",
    element: <RutaProtegida />,
    children: [
      { path: "", element: <AdminMain /> },
      { path: "perfil", element: <Perfil /> },
      { path: "listaprofesores", element: <ListProfesores /> },
      { path: "cambiarcontrasena", element: <ChangePassword /> },

      { path: "listaestudiantes", element: <ListEstudiantes /> },
      {
        path: "listaestudiantes/datoestudiante/:id",
        element: <DatosEstudiante />,
      },
      { path: "logrosrecibidos", element: <RecibirLogros /> },
      { path: "informe", element: <Informe /> },
      { path: "creartrimestres", element: <Trimestre /> },
      { path: "listaadministradores", element: <ListAdmins /> },
      {
        path: "listaestudiantes/datoestudiante/informe/:id",
        element: <Informes />,
      },
      {
        path: "listaprofesores/datosprofesor/:id",
        element: <DatosProfesor />,
      },
      { path: "registro", element: <Registro /> },
      {
        path: "registro",
        element: <RegFormLayout />,
        children: [
          //RUTAS REGISTRO DE ADMIN
          { path: "registroadmin", element: <Admin /> },
          { path: "registroadmin/direcciones", element: <Addres /> },
          { path: "registroadmin/fechas", element: <Dates /> },
          { path: "registroadmin/datosmedicos", element: <MedicalInfo /> },
          { path: "registroadmin/telefonos", element: <PhoneNumber /> },
          //RUTAS REGISTRO DE ESTUDIANTE
          { path: "registroestudiante", element: <StudentRegister /> },
          {
            path: "registroestudiante/direcciones",
            element: <AddressStudent />,
          },
          { path: "registroestudiante/fechas", element: <DatesStudent /> },
          {
            path: "registroestudiante/datosmedicos",
            element: <MedicalInfoStudent />,
          },
          {
            path: "registroestudiante/telefonos",
            element: <PhoneNumberStudent />,
          },
          //RUTAS REGISTRO DE PROFESOR
          { path: "registroprofesor", element: <TeacherRegister /> },
          { path: "registroprofesor/direcciones", element: <AddressTeacher /> },
          { path: "registroprofesor/fechas", element: <DatesTeacher /> },
          {
            path: "registroprofesor/datosmedicos",
            element: <MedicalInfoTeacher />,
          },
          {
            path: "registroprofesor/telefonos",
            element: <PhoneNumberTeacher />,
          },
          { path: "registroprofesor/cargo", element: <ProfessionTeacher /> },
        ],
      },
    ],
  },
  {
    path: "profesor",
    element: <RutaProtegida />,
    children: [
      { path: "", element: <TeacherMain /> },
      {
        path: "listaestudiantes/calificarestudiante/:id",
        element: <Calificar />,
      },
      { path: "crearlogro", element: <CrearLogros /> },
      { path: "listaestudiantes", element: <ListEstudents /> },
      { path: "perfil", element: <Perfil /> },

      { path: "cambiarcontrasena", element: <ChangePassword /> },
    ],
  },
  {
    path: "estudiante",
    element: <RutaProtegida />,
    children: [
      { path: "", element: <StudentMain /> },
      { path: "perfil", element: <Perfil /> },
      { path: "informesrecibidos", element: <InformesRecibidos/> },

      { path: "cambiarcontrasena", element: <ChangePassword /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </Suspense>
);
