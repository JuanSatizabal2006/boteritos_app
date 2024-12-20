import { lazy } from "react";

//ADMINISTRADOR
export const Admin = lazy(() => import("./pages/admin/registro/AdminRegister/AdminRegister.jsx"));
export const FormLogin = lazy(() => import("./sections/FormLogin.jsx"));
export const DatosEstudiante = lazy(() => import("./pages/admin/estudiantes/DatosEstudiante.jsx"));
export const ListEstudiantes = lazy(() => import("./pages/admin/estudiantes/ListEstudents.jsx"));
export const AdminMain = lazy(() => import("./pages/admin/AdminMain.jsx"));
export const RecibirLogros = lazy(() => import("./pages/admin/RecibirLogros.jsx"));
export const Informe = lazy(() => import("./pages/admin/Informe.jsx"));
export const Trimestre = lazy (()=>import("./pages/admin/Trimestres.jsx"));
export const ListProfesores = lazy (()=>import("./pages/admin/profesores/ListTeachers.jsx"));
export const ListAdmins = lazy (()=>import("./pages/admin/administradores/ListAdmins.jsx"));
export const Informes = lazy (()=>import("./pages/admin/Informe.jsx"));
export const DatosProfesor = lazy(()=> import("./pages/admin/profesores/DatesTeacher.jsx"))
//GENERAL
export const Perfil = lazy(() => import("./pages/general/Profile.jsx"));
export const PasswordHelp = lazy(() => import("./pages/general/PasswordHelp.jsx"));
export const ForgotPassword = lazy(() => import("./pages/general/ForgotPassword.jsx"));
export const ChangePassword = lazy(() => import("./pages/general/CambiarContrasena.jsx"));
//REGISTRO DE ADMINISTRADORES
export const Registro = lazy(() => import("./pages/admin/registro/Registro.jsx"));
export const Addres = lazy(() => import("./pages/admin/registro/AdminRegister/Addres.jsx"));
export const Dates = lazy(() => import("./pages/admin/registro/AdminRegister/Dates.jsx"));
export const MedicalInfo = lazy(() => import("./pages/admin/registro/AdminRegister/MedicalInfo.jsx"));
export const PhoneNumber = lazy(() => import("./pages/admin/registro/AdminRegister/PhoneNumber.jsx"));
//REGISTRO DE PROFESORES
export const TeacherRegister = lazy(() => import("./pages/admin/registro/TeacherRegister/TeacherRegister.jsx"));
export const ProfessionTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/ProfessionTeacher.jsx"));
export const AddressTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/Addres.jsx"));
export const DatesTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/Dates.jsx"));
export const MedicalInfoTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/MedicalInfo.jsx"));
export const PhoneNumberTeacher = lazy(() => import("./pages/admin/registro/TeacherRegister/PhoneNumber.jsx"));
//REGISTRO DE ESTUDIANTE
export const StudentRegister = lazy(() => import("./pages/admin/registro/StudenRegister/StudentRegister.jsx"));
export const AddressStudent = lazy(() => import("./pages/admin/registro/StudenRegister/Addres.jsx"));
export const DatesStudent = lazy(() => import("./pages/admin/registro/StudenRegister/Dates.jsx"));
export const MedicalInfoStudent = lazy(() => import("./pages/admin/registro/StudenRegister/MedicalInfo.jsx"));
export const PhoneNumberStudent = lazy(() => import("./pages/admin/registro/StudenRegister/PhoneNumber.jsx"));
//PROFESOR
export const Calificar = lazy(() => import("./pages/profesor/Calificar.jsx"));
export const CrearLogros = lazy(() => import("./pages/profesor/CrearLogros.jsx"));
export const ListEstudents = lazy(() => import("./pages/profesor/ListStudents.jsx"));
export const TeacherMain = lazy(() => import("./pages/profesor/index.jsx"));
//ESTUDIANTE
export const StudentMain = lazy(() => import("./pages/estudiante/index.jsx"));
export const InformesRecibidos = lazy(() => import("./pages/estudiante/InformesRecibidos.jsx"));