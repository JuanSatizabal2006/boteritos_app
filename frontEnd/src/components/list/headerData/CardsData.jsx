import { Children } from "react";
import GraphicPie from "../../graphics/GraphicPie";

const CardsData = ({ dataCard1, dataCard2, dataGraphic, children }) => {
  let isObj1 = Object.keys(dataCard1).length != 0;

  return (
    <div className="flex gap-3 text-black font-cocogooseLight sm:flex-row flex-col">
      {/*IMAGEN DEL ESTUDIANTE*/}
      <div className="max-h-[130px] flex flex-row gap-x-3">
        <div className="max-h-[130px] grow bg-white rounded-xl max-w-[100px] p-4">
          <img
            src={
              isObj1
                ? dataCard1.imagen
                : `../../../../public/img/studentDefault.png`
            }
            alt=""
            className="w-full h-full object-fill rounded-xl"
          />
        </div>

        {/* INFORMACION */}
        <div className="max-h-[130px] grow bg-white rounded-xl p-4 flex flex-col justify-center gap-1">
          <p className="text-paragraph text-darkBlue">
            {isObj1 ? dataCard1.nombre : "Nombre Completo"}
          </p>
          <p className="text-paragraph2">
            {isObj1 ? dataCard1.documento : "Identificacion"}
          </p>
          <p className="text-paragraph2">
            {isObj1 ? dataCard1.edad : "XX"} años
          </p>
        </div>
      </div>

      <div className="max-h-[130px] grow bg-white rounded-xl p-4 flex flex-col justify-center gap-1">
        {Object.keys(dataCard2).length != 0 ? (
          dataCard2.map((values, index) => (
            <>
              {values.name == null ? (
                <>
                  <div className="flex flex-col xl:flex-row justify-between items-center w-full">
                    <p className="text-paragraph text-darkBlue">
                      {"Responsable:"}
                    </p>
                    <p className="text-paragraph2">{"--------------"}</p>
                  </div>

                  <div className="flex flex-col xl:flex-row justify-between items-center w-full">
                    <p className="text-paragraph text-darkBlue">
                      {"Responsable:"}
                    </p>
                    <p className="text-paragraph2">{"--------------"}</p>
                  </div>
                </>
              ) : (
                <div
                  className="flex flex-col lg:flex-row items-start justify-between  w-full"
                  key={index}
                >
                  <p className="text-paragraph text-darkBlue">{values.name}:</p>
                  <p className="text-paragraph2 lg:text-right">
                    {values.value}
                  </p>
                </div>
              )}
            </>
          ))
        ) : (
          <>
            <div className="flex flex-col xl:flex-row justify-between items-center w-full">
              <p className="text-paragraph text-darkBlue">{"Responsable:"}</p>
              <p className="text-paragraph2">{"--------------"}</p>
            </div>

            <div className="flex flex-col xl:flex-row justify-between items-center w-full">
              <p className="text-paragraph text-darkBlue">{"Responsable:"}</p>
              <p className="text-paragraph2">{"--------------"}</p>
            </div>
          </>
        )}
      </div>

      {/* ESTADISTICAS */}
      <div className="max-h-[130px] grow bg-white rounded-xl p-4 flex justify-start">
        <GraphicPie data={dataGraphic} />
      </div>

      {/*BOTON VER */}
      {children}
    </div>
  );
};

export default CardsData;
