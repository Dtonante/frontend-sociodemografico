import React from "react";
import logoicn from "../../../../public/logoo_admin.png";
import logotxt from "../../../../public/logo_letras.png";

const LogoIcon = (props) => {
  return (
    <>
      <img alt="Logo" src={logoicn} style={{ width: '70px', height: 'auto', display: 'inline-block' }}  {...props} />
      <img alt="Logo" src={logotxt} style={{ width: '105px', height: 'auto', display: 'inline-block' }} {...props} />
    </>
  );
};

export default LogoIcon;

