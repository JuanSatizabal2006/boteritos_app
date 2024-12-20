//import React from "react";
import { LayoutGeneral } from "../../../layouts/LayoutGeneral";
import { List } from "../../../sections/admin/estudiantes/List";

const ListEstudiantes = () => {
  return (
    <LayoutGeneral titleHeader="Estudiantes">
      <List />
    </LayoutGeneral>
  );
};

export default ListEstudiantes;
