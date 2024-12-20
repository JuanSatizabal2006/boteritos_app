import React from "react";

import { LayoutGeneral } from "../../layouts/LayoutGeneral.jsx";
import { CrearTrimestre } from "../../sections/admin/trimestres/CrearTrimestre.jsx";

const Trimestres = () => {
  return (
    <LayoutGeneral titleHeader={"Crear Trimestres"} title={"Crear Trimestres"}>
      <CrearTrimestre />
    </LayoutGeneral>
  );
};

export default Trimestres;
