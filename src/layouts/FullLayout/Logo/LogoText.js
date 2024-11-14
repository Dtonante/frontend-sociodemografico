import React from "react";
import logotxt from "../../../../public/logo_letras.png";
const LogoText = (props) => {
  
  return (
    <img alt="Logo" src={logotxt} {...props} />
    )
  ;};

export default LogoText;


// import React from "react";
// import logotxt from "../../../../public/logo_letras.png";
// const LogoText = (props) => {
  
//   return (
//     <img alt="Logo" style={{ width: '70px', height: 'auto' }} src={logotxt} {...props} />
//     )
//   ;};

// export default LogoText;