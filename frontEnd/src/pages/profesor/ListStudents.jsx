import React from "react";
import { LayoutGeneral } from "../../layouts/LayoutGeneral";
import {ListStudentsSection } from '../../sections/profesor/ListStudentsSection';

const ListStudents = () => {
  return (
    <LayoutGeneral titleHeader="Estudiantes">
      <ListStudentsSection/>
    </LayoutGeneral>
  );
};
export default ListStudents;
