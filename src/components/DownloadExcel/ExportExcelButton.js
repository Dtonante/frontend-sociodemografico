
// import React from 'react';
// import { Button } from '@mui/material';
// import Tooltip from '@mui/material/Tooltip';
// import * as XLSX from 'xlsx';

// const ExportExcelButton = ({ data }) => {
//   // Define las columnas que deseas descargar
//   const columnsToDownload = [
//     "var_nombreCompleto",
//     "var_nombreDocumento",
//     "var_numeroDocumento",
//     "var_genero",
//     "date_fechaNacimiento",
//     "var_correoElectronicoPersonal",
//     "date_fechaIngresoInstitucion",
//     "var_celular",
//     "var_contactoEmergencia",
//     "var_telefonoEmergencia",
//     "var_estadoCivil",
//     "var_numeroPersonasConLasQueVive",
//     "var_nombreEps",
//     "var_nombreFondoPension",
//     "var_nombreCuentaBancaria",
//     "var_tipoCuenta",
//     "var_numeroCuenta",
//     "var_tipoContrato",
//     "var_salario",
//     "date_fechaIngresoInstitucion",
//     "var_antiguedadInstitucion",
//     "var_nombreArea",
//     "var_cargo",
//     "var_jefeInmediato",
//     "var_sede",
//   ];

//   // Mapeo de nombres de columnas
//   const columnNamesMapping = {
//     var_nombreCompleto: "Nombre Completo",
//     var_nombreDocumento: "Tipo de Documento",
//     var_numeroDocumento: "Número de Documento",
//     var_genero: "Género",
//     date_fechaNacimiento: "Fecha de Nacimiento",
//     var_correoElectronicoPersonal: "Correo Electrónico Personal",
//     date_fechaIngresoInstitucion: "Fecha de Ingreso a la Institución",
//     var_celular: "Celular",
//     var_contactoEmergencia: "Contacto de Emergencia",
//     var_telefonoEmergencia: "Teléfono de Emergencia",
//     var_estadoCivil: "Estado Civil",
//     var_numeroPersonasConLasQueVive: "Número de Personas con las que Vive",
//     var_nombreEps: "EPS",
//     var_nombreFondoPension: "Fondo de Pensión",
//     var_nombreCuentaBancaria: "Cuenta Bancaria",
//     var_tipoCuenta: "Tipo de Cuenta",
//     var_numeroCuenta: "Número de Cuenta",
//     var_tipoContrato: "Tipo de Contrato",
//     var_salario: "Salario",
//     var_antiguedadInstitucion: "Antigüedad en la Institución",
//     var_nombreArea: "Área",
//     var_cargo: "Cargo",
//     var_jefeInmediato: "Jefe Inmediato",
//     var_sede: "Sede"
//   };

//   // Aplanar los datos y seleccionar solo las columnas deseadas
//   const flattenedData = data.map((prof) => {
//     const flatProf = {
//       ...prof, // Incluye todas las propiedades del profesional
//       ...prof.Usuario, // Incluye todas las propiedades del objeto Usuario
//       var_nombreDocumento: prof.Usuario.TipoDocumento?.var_nombreDocumento || "N/A", // Accede al nombre del documento
//       ...prof.Eps,
//       ...prof.FondoDePension,
//       ...prof.CuentaBancaria,
//       ...prof.EstructuraOrganizacional,
//     };

//     // Filtra solo las columnas que deseas descargar
//     const filteredProf = {};
//     columnsToDownload.forEach((column) => {
//       if (flatProf[column] !== undefined) {
//         filteredProf[column] = flatProf[column];
//       }
//     });

//     return filteredProf;
//   });

//   // Imprimir los datos aplanados y filtrados en la consola
//   console.log("Datos aplanados y filtrados:", flattenedData);

//   const handleDownloadExcel = () => {
//     // Crear una hoja de trabajo (worksheet) con los datos aplanados y filtrados
//     const ws = XLSX.utils.json_to_sheet(flattenedData);

//     // Renombrar las columnas
//     const range = XLSX.utils.decode_range(ws['!ref']);
//     for (let C = range.s.c; C <= range.e.c; ++C) {
//       const headerCell = XLSX.utils.encode_cell({ r: range.s.r, c: C });
//       const originalHeader = ws[headerCell].v;
//       if (columnNamesMapping[originalHeader]) {
//         ws[headerCell].v = columnNamesMapping[originalHeader];
//       }
//     }

//     // Crear un libro de trabajo (workbook) y agregar la hoja de trabajo
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Profesionales');

//     // Escribir el archivo Excel y descargarlo
//     XLSX.writeFile(wb, 'Profesionales.xlsx');
//   };

//   return (
//     <Tooltip
//       title="Descargar Excel"
//       arrow
//       placement="top"
//       sx={{
//         '& .MuiTooltip-tooltip': {
//           fontSize: '0.75rem',
//         },
//         '& .MuiTooltip-arrow': {
//           color: '#ff0003',
//         },
//       }}
//     >
//       <Button
//         type="button"
//         onClick={handleDownloadExcel}
//         style={{ backgroundColor: '#4CAF50' }} // Cambia el color a verde para diferenciarlo
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
//           <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z"/>
//           <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
//         </svg>
//       </Button>
//     </Tooltip>
//   );
// };

// export default ExportExcelButton;





// import React from 'react';
// import { Button } from '@mui/material';
// import Tooltip from '@mui/material/Tooltip';
// import * as XLSX from 'xlsx';

// const ExportExcelButton = ({ data }) => {
//   // Define las columnas que deseas descargar
//   const columnsToDownload = [
//     "var_nombreCompleto",
//     "var_nombreDocumento",
//     "var_numeroDocumento",
//     "var_genero",
//     "date_fechaNacimiento",
//     "var_correoElectronicoPersonal",
//     "date_fechaIngresoInstitucion",
//     "var_celular",
//     "var_contactoEmergencia",
//     "var_telefonoEmergencia",
//     "var_estadoCivil",
//     "var_numeroPersonasConLasQueVive",
//     "var_nombreEps",
//     "var_nombreFondoPension",
//     "var_nombreCuentaBancaria",
//     "var_tipoCuenta",
//     "var_numeroCuenta",
//     "var_tipoContrato",
//     "var_salario",
//     "date_fechaIngresoInstitucion",
//     "var_antiguedadInstitucion",
//     "var_nombreArea",
//     "var_cargo",
//     "var_jefeInmediato",
//     "var_sede",
//   ];

//   // Mapeo de nombres de columnas
//   const columnNamesMapping = {
//     var_nombreCompleto: "Nombre Completo",
//     var_nombreDocumento: "Tipo de Documento",
//     var_numeroDocumento: "Número de Documento",
//     var_genero: "Género",
//     date_fechaNacimiento: "Fecha de Nacimiento",
//     var_correoElectronicoPersonal: "Correo Electrónico Personal",
//     date_fechaIngresoInstitucion: "Fecha de Ingreso a la Institución",
//     var_celular: "Celular",
//     var_contactoEmergencia: "Contacto de Emergencia",
//     var_telefonoEmergencia: "Teléfono de Emergencia",
//     var_estadoCivil: "Estado Civil",
//     var_numeroPersonasConLasQueVive: "Número de Personas con las que Vive",
//     var_nombreEps: "EPS",
//     var_nombreFondoPension: "Fondo de Pensión",
//     var_nombreCuentaBancaria: "Cuenta Bancaria",
//     var_tipoCuenta: "Tipo de Cuenta",
//     var_numeroCuenta: "Número de Cuenta",
//     var_tipoContrato: "Tipo de Contrato",
//     var_salario: "Salario",
//     var_antiguedadInstitucion: "Antigüedad en la Institución",
//     var_nombreArea: "Área",
//     var_cargo: "Cargo",
//     var_jefeInmediato: "Jefe Inmediato",
//     var_sede: "Sede"
//   };

//   // Función para formatear fechas
//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A"; // Si no hay fecha, devolver "N/A"
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   // Aplanar los datos y seleccionar solo las columnas deseadas
//   const flattenedData = data.map((prof) => {
//     const flatProf = {
//       ...prof, // Incluye todas las propiedades del profesional
//       ...prof.Usuario, // Incluye todas las propiedades del objeto Usuario
//       var_nombreDocumento: prof.Usuario.TipoDocumento?.var_nombreDocumento || "N/A", // Accede al nombre del documento
//     //   date_fechaNacimiento: formatDate(prof.Usuario.date_fechaNacimiento), // Formatear fecha de nacimiento
//       date_fechaIngresoInstitucion: formatDate(prof.date_fechaIngresoInstitucion), // Formatear fecha de ingreso
//       ...prof.Eps,
//       ...prof.FondoDePension,
//       ...prof.CuentaBancaria,
//       ...prof.EstructuraOrganizacional,
//     };

//     // Filtra solo las columnas que deseas descargar
//     const filteredProf = {};
//     columnsToDownload.forEach((column) => {
//       if (flatProf[column] !== undefined) {
//         filteredProf[column] = flatProf[column];
//       }
//     });

//     return filteredProf;
//   });

//   // Imprimir los datos aplanados y filtrados en la consola
//   console.log("Datos aplanados y filtrados:", flattenedData);

//   const handleDownloadExcel = () => {
//     // Crear una hoja de trabajo (worksheet) con los datos aplanados y filtrados
//     const ws = XLSX.utils.json_to_sheet(flattenedData);

//     // Renombrar las columnas
//     const range = XLSX.utils.decode_range(ws['!ref']);
//     for (let C = range.s.c; C <= range.e.c; ++C) {
//       const headerCell = XLSX.utils.encode_cell({ r: range.s.r, c: C });
//       const originalHeader = ws[headerCell].v;
//       if (columnNamesMapping[originalHeader]) {
//         ws[headerCell].v = columnNamesMapping[originalHeader];
//       }
//     }

//     // Crear un libro de trabajo (workbook) y agregar la hoja de trabajo
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Profesionales');

//     // Escribir el archivo Excel y descargarlo
//     XLSX.writeFile(wb, 'Profesionales.xlsx');
//   };

//   return (
//     <Tooltip
//       title="Descargar Excel"
//       arrow
//       placement="top"
//       sx={{
//         '& .MuiTooltip-tooltip': {
//           fontSize: '0.75rem',
//         },
//         '& .MuiTooltip-arrow': {
//           color: '#ff0003',
//         },
//       }}
//     >
//       <Button
//         type="button"
//         onClick={handleDownloadExcel}
//         style={{ backgroundColor: '#4CAF50' }} // Cambia el color a verde para diferenciarlo
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
//           <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z"/>
//           <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
//         </svg>
//       </Button>
//     </Tooltip>
//   );
// };

// export default ExportExcelButton;

import React from 'react';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import * as XLSX from 'xlsx';

const ExportExcelButton = ({ data }) => {
  // Define las columnas que deseas descargar
  const columnsToDownload = [
    "var_nombreCompleto",
    "var_nombreDocumento",
    "var_numeroDocumento",
    "var_genero",
    "date_fechaNacimiento",
    "var_correoElectronicoPersonal",
    "date_fechaIngresoInstitucion",
    "var_celular",
    "var_contactoEmergencia",
    "var_telefonoEmergencia",
    "var_estadoCivil",
    "var_numeroPersonasConLasQueVive",
    "var_nombreEps",
    "var_nombreFondoPension",
    "var_nombreCuentaBancaria",
    "var_tipoCuenta",
    "var_numeroCuenta",
    "var_tipoContrato",
    "var_salario",
    "date_fechaIngresoInstitucion",
    "var_antiguedadInstitucion",
    "var_nombreArea",
    "var_cargo",
    "var_jefeInmediato",
    "var_sede",
  ];

  // Mapeo de nombres de columnas
  const columnNamesMapping = {
    var_nombreCompleto: "Nombre Completo",
    var_nombreDocumento: "Tipo de Documento",
    var_numeroDocumento: "Número de Documento",
    var_genero: "Género",
    date_fechaNacimiento: "Fecha de Nacimiento",
    var_correoElectronicoPersonal: "Correo Electrónico Personal",
    date_fechaIngresoInstitucion: "Fecha de Ingreso a la Institución",
    var_celular: "Celular",
    var_contactoEmergencia: "Contacto de Emergencia",
    var_telefonoEmergencia: "Teléfono de Emergencia",
    var_estadoCivil: "Estado Civil",
    var_numeroPersonasConLasQueVive: "Número de Personas con las que Vive",
    var_nombreEps: "EPS",
    var_nombreFondoPension: "Fondo de Pensión",
    var_nombreCuentaBancaria: "Cuenta Bancaria",
    var_tipoCuenta: "Tipo de Cuenta",
    var_numeroCuenta: "Número de Cuenta",
    var_tipoContrato: "Tipo de Contrato",
    var_salario: "Salario",
    var_antiguedadInstitucion: "Antigüedad en la Institución",
    var_nombreArea: "Área",
    var_cargo: "Cargo",
    var_jefeInmediato: "Jefe Inmediato",
    var_sede: "Sede"
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Si no hay fecha, devolver "N/A"

    // Intentar crear un objeto Date
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      console.warn("Fecha no válida:", dateString); // Depuración: Verificar fechas no válidas
      return "N/A"; // Si la fecha no es válida, devolver "N/A"
    }

    // Formatear la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11, sumamos 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Aplanar los datos y seleccionar solo las columnas deseadas
  const flattenedData = data.map((prof) => {
    console.log("Usuario:", prof.Usuario); // Verifica la estructura de Usuario
    console.log("Fecha de nacimiento:", prof.Usuario.date_fechaNacimiento); // Verifica el valor de date_fechaNacimiento

    const flatProf = {
      ...prof,
      ...prof.Usuario,
      var_nombreDocumento: prof.Usuario.TipoDocumento?.var_nombreDocumento || "N/A",
      date_fechaNacimiento: formatDate(prof.date_fechaNacimiento),
      date_fechaIngresoInstitucion: formatDate(prof.date_fechaIngresoInstitucion),
      ...prof.Eps,
      ...prof.FondoDePension,
      ...prof.CuentaBancaria,
      ...prof.EstructuraOrganizacional,
    };

    const filteredProf = {};
    columnsToDownload.forEach((column) => {
      if (flatProf[column] !== undefined) {
        filteredProf[column] = flatProf[column];
      }
    });

    return filteredProf;
  });

  // Imprimir los datos aplanados y filtrados en la consola
  console.log("Datos aplanados y filtrados:", flattenedData);

  const handleDownloadExcel = () => {
    // Crear una hoja de trabajo (worksheet) con los datos aplanados y filtrados
    const ws = XLSX.utils.json_to_sheet(flattenedData);

    // Renombrar las columnas
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const headerCell = XLSX.utils.encode_cell({ r: range.s.r, c: C });
      const originalHeader = ws[headerCell].v;
      if (columnNamesMapping[originalHeader]) {
        ws[headerCell].v = columnNamesMapping[originalHeader];
      }
    }

    // Crear un libro de trabajo (workbook) y agregar la hoja de trabajo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Profesionales');

    // Escribir el archivo Excel y descargarlo
    XLSX.writeFile(wb, 'Profesionales.xlsx');
  };

  return (
    <Tooltip
      title="Descargar Excel"
      arrow
      placement="top"
      sx={{
        '& .MuiTooltip-tooltip': {
          fontSize: '0.75rem',
        },
        '& .MuiTooltip-arrow': {
          color: '#ff0003',
        },
      }}
    >
      <Button
        type="button"
        onClick={handleDownloadExcel}
        style={{ backgroundColor: '#4CAF50' }} // Cambia el color a verde para diferenciarlo
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-excel" viewBox="0 0 16 16">
          <path d="M5.884 6.68a.5.5 0 1 0-.768.64L7.349 10l-2.233 2.68a.5.5 0 0 0 .768.64L8 10.781l2.116 2.54a.5.5 0 0 0 .768-.641L8.651 10l2.233-2.68a.5.5 0 0 0-.768-.64L8 9.219l-2.116-2.54z"/>
          <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
        </svg>
      </Button>
    </Tooltip>
  );
};

export default ExportExcelButton;