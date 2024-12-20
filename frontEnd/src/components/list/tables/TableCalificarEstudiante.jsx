import { useState, useEffect } from "react"; // Asegúrate de importar useEffect
import { ObjLogros } from "../../../helper/objects/logrosCalificar";
import Buscador from "../../search/Buscador";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getLogrosEstudiante } from "../../../api/get";


export default function TableCalificarEstudiante({ setSelectedLogros}) {
  const { id } = useParams();

  const [openAcc, setOpenAcc] = useState(-1);
  const [selectedLogros, setLocalSelectedLogros] = useState({});
  const [datosLogros, setDatosLogros] = useState(null);

  //OBTENEMOS EL ID DEL PROFESOR
  const access_token = JSON.parse(localStorage.getItem("access_token"));
  const decodedToken = jwtDecode(access_token);
  const idprofesor = decodedToken.idjob;

  const trimestre = JSON.parse(localStorage.getItem("trimestre")); // Trimestre

  //CONSULTA
  useEffect(() => {
    const dataLogros = async () =>{
      const data = await getLogrosEstudiante(`calificar/${trimestre}/${idprofesor}/${id}/`);

      //NO HAY LOGROS PARA CALIFICAR
      if(data.status != 200){
        console.log('Datos vacios');
        setDatosLogros([])
        return
      }
      // Inicializar selectedLogros con los datos existentes
      const initialSelectedLogros = {};
      data.data.forEach(logro => {
        if (logro.resultado !== null) {
          initialSelectedLogros[logro.idlogroestudiante] = {
            idestudiante: id,
            idlogroestudiante: logro.idlogroestudiante,
            idlogro: logro.idlogro,
            resultado: parseInt(logro.resultado),
            fecha: logro.fecha,
          };
        }
      });
      
      setLocalSelectedLogros(initialSelectedLogros);
      setSelectedLogros(initialSelectedLogros);
      setDatosLogros(data.data);
    }
    dataLogros(); 
  }, [id, idprofesor]);

  const handleRadioChange = (idLogro, idLogroEstudiante, resultadoTexto) => {
    // Mapeo de texto a números
    const resultado = resultadoTexto === "LN" ? 0 : resultadoTexto === "LA" ? 1 : 2;

    const date = new Date().toISOString().split("T")[0];
    const newSelection = {
      ...selectedLogros,
      [idLogro]: {
        idestudiante: id,
        idlogroestudiante: idLogro,
        idlogro: idLogroEstudiante,
        resultado,
        fecha: date,
      },
    };

    setLocalSelectedLogros(newSelection);
    setSelectedLogros(newSelection); // para actualizar en el componente padre (Calificar)
    console.log("Selecciones actualizadas:", newSelection);
  };

  const toogleRow = (index) => {
    openAcc !== index ? setOpenAcc(index) : setOpenAcc(-1);
  };

  const isChecked = (idLogroEstudiante, expectedResultado) => {
    const selection = selectedLogros[idLogroEstudiante];
    if (!selection) return false;
    
    const resultadoNumerico = expectedResultado === "LN" ? 0 : expectedResultado === "LA" ? 1 : 2;
    return selection.resultado === resultadoNumerico;
  };

  return (
    <>
      <main className="bg-white rounded-xl mt-7 py-7 px-8 w-full overflow-y-hidden">
        {/* Buscador */}
        <Buscador />

        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky top-0 hidden bg-white lg:grid lg:grid-cols-[50px_minmax(550px,_1fr)_minmax(150px,_1fr)_minmax(250px,_1fr)] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue">
            <p>No°</p>
            <p>Nombre del logro</p>
            <p className="flex justify-self-center">Fecha</p>
            <div className="flex justify-around w-full max-w-[250px] flex-auto justify-self-center">
              <p>LA</p>
              <p>LP</p>
              <p>LN</p>
            </div>
          </div>

          {/* CUERPO DE LA TABLA */}
          {datosLogros && datosLogros.length > 0 ? (
            datosLogros.map((logro, index) => (
              <div
                className={`acc-item lg:grid grid-cols-1 lg:grid-cols-[50px_minmax(550px,_1fr)_minmax(150px,_1fr)_minmax(250px,_1fr)] items-center gap-3 text-paragraph2 font-cocogooseLight text-black p-5 border-b-2 border-b-placeholderBlue ${openAcc === index ? "open" : "close"}`}
                key={index}
              >
                <div className="flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">No°:</p>
                  <div className="acc-header w-full flex justify-between items-center ">
                    <p>{(logro.idlogro).toString().length === 2 ? logro.idlogro : `0${logro.idlogro}`}</p>
                    <button onClick={() => toogleRow(index)}>
                      <i className="fa-solid fa-angle-down block lg:hidden"></i>
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 lg:gap-0">
                  <p className="text-darkBlue lg:hidden">Nombre del logro:</p>
                  <div className="flex justify-self-center acc-header">
                    <p>{logro.idlogro_display}</p>
                  </div>
                </div>

                <div className="flex gap-2 lg:gap-0 acc-body lg:justify-center">
                  <p className="text-darkBlue lg:hidden">Fecha</p>
                  <div className="flex justify-self-center">
                    <p>{logro.fecha}</p>
                  </div>
                </div>

                <div className="flex pl-4 gap-2 lg:gap-0 acc-body lg:justify-center acc-body">
                  <div className="flex flex-col gap-2 justify-around w-full max-w-[250px] lg:flex-auto lg:justify-self-center lg:gap-0 lg:flex-row">
                    <div className="flex justify-around w-full max-w-[250px] flex-auto justify-self-center">
                      <label htmlFor={`la-${index}`} className="pr-5 text-darkBlue lg:hidden">
                        LA
                      </label>
                      <input
                        id={`la-${index}`}
                        name={`logro-${logro.idlogroestudiante}`}
                        type="radio"
                        className="w-4 h-4 text-darkBlue bg-darkBlue"
                        onChange={() => handleRadioChange(logro.idlogroestudiante, logro.idlogro, "LA")}
                        checked={isChecked(logro.idlogroestudiante, "LA")}
                      />

                      <label htmlFor={`lp-${index}`} className="pr-5 text-darkBlue lg:hidden">
                        LP
                      </label>
                      <input
                        id={`lp-${index}`}
                        name={`logro-${logro.idlogroestudiante}`}
                        type="radio"
                        className="w-4 h-4 text-darkBlue bg-darkBlue"
                        onChange={() => handleRadioChange(logro.idlogroestudiante, logro.idlogro, "LP")}
                        checked={isChecked(logro.idlogroestudiante, "LP")}
                      />

                      <label htmlFor={`ln-${index}`} className="pr-5 text-darkBlue lg:hidden">
                        LN
                      </label>
                      <input
                        id={`ln-${index}`}
                        name={`logro-${logro.idlogroestudiante}`}
                        type="radio"
                        className="w-4 h-4 text-darkBlue bg-darkBlue"
                        onChange={() => handleRadioChange(logro.idlogroestudiante, logro.idlogro, "LN")}
                        checked={isChecked(logro.idlogroestudiante, "LN")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-darkBlue mt-5">
              <p className="font-cocogooseLight text-paragraph2 text-gray">No hay logros por calificar.</p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
