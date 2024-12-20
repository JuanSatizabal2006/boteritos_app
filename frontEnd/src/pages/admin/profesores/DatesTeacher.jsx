import { LayoutGeneral } from "../../../layouts/LayoutGeneral.jsx";

import { DetailsTeachers } from "../../../sections/admin/profesores/DetailsTeachers.jsx";

const DatesTeacher = () => {
 
  return (
      <LayoutGeneral title="DatosAdicionales" titleHeader="Profesores">
       <DetailsTeachers/>
      </LayoutGeneral>
  );
};

export default DatesTeacher;