import React, { useReducer } from "react";
import propTypes from "prop-types";

export const ContextoFormulario = React.createContext();

  const initialState = {
    entrenador: {
      nombre: "",
      apellido: "",
      email: "",
    },
    pokemon: {
      nombrePokemon: "",
      tipoPokemon: "",
      elementoPokemon: "",
      alturaPokemon: "",
      edadPokemon: "",
    },
  };
   
  /**
 * Función reductora para el estado del formulario que actualiza el estado en base a la acción.
 *
 * @param {initialState} state
 * @param {{
 *    type: string,
   *   payload: {
   *    [string]: string,
   * }} action
   *
   * @returns {initialState}
   */
  const reducer = (state, action) => {
    switch (action.type) {
      case "ACTUALIZAR_ENTRENADOR":
        return {
          ...state,
          entrenador: {
            ...state.entrenador,
            ...action.payload,
          },
        };
      case "ACTUALIZAR_POKEMON":
        return {
          ...state,
          pokemon: {
            ...state.pokemon,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };

/**
  Provider global del formulario de inscripción del Pokemon
  
  @author Abril
  @param {JSX.Element} children Elemento jsx que tendra como hijo el provider
  @returns {JSX.Element} Elemento Provider del contexto del formulario
 */

const ProviderFormulario = ({ children }) => {
  
  const [formulario, dispatch] = useReducer(reducer, initialState);
  
  /**
   * Función que recibe los parametros del formulario y dispara la acción de actualización, utilizada cuando el usuario saca el foco del input.
   *
   * @param {String} type
   * @param {{
   *    [string]: string,
   * }} valorInput
   */
  const handleInputBlur = (type, valorInput) => {
    const { campo, valor } = valorInput;

    dispatch({
      type,
      payload: {
        [campo]: valor,
      },
    });
  };

  return (
    <ContextoFormulario.Provider
      value={{
        formulario,
        handleInputBlur,
      }}
    >
      {children}
    </ContextoFormulario.Provider>
  );
};

ProviderFormulario.propTypes = {
  children: propTypes.node.isRequired
}

export default ProviderFormulario;
