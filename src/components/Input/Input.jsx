import React, { useContext } from "react";
import propTypes from "prop-types";
import { ContextoFormulario } from "../../context/ContextoFormulario";

const Input = ({ name, label, type = "text", isPokemon = false }) => {
  const { handleInputBlur, formulario } = useContext(ContextoFormulario);

  const [value, setValue] = React.useState("");

  const onChange = (e) => setValue(e.target.value);

  /**
   * Función que se ejecuta al quitar el foco de los inputs, y actualiza el estado del formulario en el contexto
  @author Abril
   @param {Event} e
 */
  const onBlur = (e) => {
    e.preventDefault();

    handleInputBlur(
      isPokemon ? "ACTUALIZAR_POKEMON" : "ACTUALIZAR_ENTRENADOR",
      {
        campo: name,
        valor: value,
      }
    );
  };

  return (
    <div className="input-contenedor">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

Input.propTypes = {
  name: propTypes.string.isRequired,
  type: propTypes.string,
  label: propTypes.string.isRequired,
  isPokemon: propTypes.bool,
}

export default Input;
