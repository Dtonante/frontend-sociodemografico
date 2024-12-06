import React from "react";
import logotxt from "../../../../public/logo_letras.png";

const LogoIcon = (props) => {
  return (
    <>
      <img alt="Logo" src={logotxt} style={{ width: '180px', height: 'auto', margin: 'auto', display: 'inline-block' }} {...props} />
    </>
  );
};

export default LogoIcon;

