import { getDropdown } from '../../api/get'

export const dataDoc = async () => {

  let dataDrop = []
  const result = await getDropdown('dropdowns/tiposdocumento/');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.tipodocumento,
        "value" : value.idtipodocumento
      })
    )
  }

  return dataDrop
}

export const dataRh = async () => {

  let dataDrop = []
  const result = await getDropdown('dropdowns/rh/');
  
  console.log(result);
  
  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.rh,
        "value" : value.idrh
      })
    )
  }

  return dataDrop
}

export const dataRol = async () => {

  let dataDrop = []
  const result = await getDropdown('dropdowns/roles/');
  
  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.rol,
        "value" : value.idrol
      })
    )
  }

  return dataDrop
}

export const dataSexo = async () => {

  let dataDrop = []
  const result = await getDropdown('dropdowns/sexo/')

  if (result.data) {
    
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.sexo,
        "value" : value.idsexo
      })
    )
  }

  return dataDrop
}
  

export const dataMatricula = async  () =>{
  let dataDrop = []
  const result = await getDropdown('dropdowns/matriculas/')

  if (result.data) {
    
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.matricula,
        "value" : value.idmatricula
      })
    )
  }

  return dataDrop
}

export const dataArea = async ()=> {

  let dataDrop = []
  const result = await getDropdown('dropdowns/areas/');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.area,
        "value" : value.idarea
      })
    )
  }

  return dataDrop
}

export const dataEps = async () =>{

  let dataDrop = []
  const result = await getDropdown('dropdowns/eps/');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.eps,
        "value" : value.ideps
      })
    )
  }

  return dataDrop
}

export const dataDiagnostico = async () =>{

  let dataDrop = []
  const result = await getDropdown('dropdowns/diagnostico/');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.diagnostico,
        "value" : value.iddiagnostico
      })
    )
  }

  return dataDrop
}

export const dataDiscapacidad = async () =>{

  let dataDrop = []
  const result = await getDropdown('dropdowns/discapacidad/');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.discapacidad,
        "value" : value.iddiscapacidad
      })
    )
  }

  return dataDrop
}

export const dataTipoLogro = async () =>{

  let dataDrop = []
  const result = await getDropdown('dropdowns/tipologro/');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.tipologro,
        "value" : value.idtipologro
      })
    )
  }

  return dataDrop
}

export const dataTipoParentesco = async () =>{

  let dataDrop = []
  const result = await getDropdown('dropdowns/tipoparentesco/');

  if (result.data) {
    let arrayData = result.data
  
    dataDrop = arrayData.map((value)=> (
      {
        "option" : value.tipoparentesco,
        "value" : value.idtipoparentesco
      })
    )
  }

  return dataDrop
}
