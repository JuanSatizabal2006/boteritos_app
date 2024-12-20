import { useEffect, useState } from "react";
import { getOneUser } from "../../../api/get";
import { useNavigate } from "react-router-dom";
import CardsData from "./CardsData";
import ActionData from "./actionData";

//ESTUDIANTES
export const HeaderData = ({ id, urlApi, urlGo ,typeLink, typeHeaderdata }) => {

  const idTrimestre = JSON.parse(localStorage.getItem("trimestre"))
  console.log(urlApi);
  console.log(urlGo);
  
  const [dataCard1, setDataCard1] = useState({});
  const [dataCard2, setDataCard2] = useState({});
  const [dataCard3, setDataCard3] = useState([])

  const navigate = useNavigate();

  //OBTENCION DE LOS DATOS  
  useEffect(() => {
    const getData = async () => {
      if (id) {
        const response = await getOneUser(`${urlApi}${id}/${idTrimestre}`);
        console.log(response);
        
        setDataCard1(response.data.data.card1);
        setDataCard2(response.data.data.card2);
        setDataCard3(response.data.data.card3);
      }
    };
    getData();
  }, [id]);
  
  const linkTo = (id)=>{

    if (typeLink == 'back') {
      navigate(-1)
      return
    }

    if (id) {
      navigate(`${urlGo}/${id}`)
    }
        
  }

  return (
    <CardsData dataGraphic={dataCard3} dataCard1={dataCard1} dataCard2={dataCard2} >
      <ActionData type={typeLink} data={dataCard1.id} goTo={linkTo} typeHeaderdata={typeHeaderdata}/>
    </CardsData>
  );
};

export default HeaderData;
