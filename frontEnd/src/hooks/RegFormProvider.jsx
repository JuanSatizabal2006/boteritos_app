import { createContext, useContext, useReducer } from "react";

// Crea el contexto
const RegFormContext = createContext();

// Hook personalizado para usar el contexto
export const useRegFormContext = () => {
  return useContext(RegFormContext);
};

// Estado inicial
const initialState = {
  dataForm: new FormData(),
  percent: 0, //progress bar
};

initialState.dataForm.append("pito", "tragas");

console.log(initialState);

// Reductor
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA_FORM": {

      console.log(action.data);
      //Copia del contexto
      const copyState = {...state}
      const newFormData = new FormData();

      //Agregamos lo que ya existe del contexto en el formData (Temporal)
      copyState.dataForm.entries().forEach(([clave , valor]) => {
        newFormData.set(clave, valor)
      })

      //action.data => FormData que recibimos de cada seccion del registro
      action.data.entries().forEach(([clave, valor]) => {
        newFormData.set(clave, valor);
      });
    
      copyState.dataForm = newFormData;

      return copyState
    }

    // PROGRESS BAR
    case "CHANGE_PERCENT":
      return { ...state, percent: action.data };

    default:
      return state;
  }
};

// Define el proveedor de contexto
export const RegFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RegFormContext.Provider value={[state, dispatch]}>
      {children}
    </RegFormContext.Provider>
  );
};
