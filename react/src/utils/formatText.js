import React from "react";
import PropTypes from "prop-types";

const FormattedText = ({ text }) => {
  // Función para formatear el texto
  const formatText = (inputText) => {
    // Encuentra texto entre ** y lo pone en negrita
    const boldText = inputText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Encuentra colores hexadecimales y aplica el color
    const coloredText = boldText.replace(
      /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\((.*?)\)/g,
      '<span style="color:#$1;">$2</span>'
    );

    return { __html: coloredText };
  };

  return <div dangerouslySetInnerHTML={formatText(text)} />;
};

FormattedText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FormattedText;
