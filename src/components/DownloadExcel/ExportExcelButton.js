
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

  // Función para formatear la sede
  const formatSede = (sede) => {
    if (!sede) return "N/A"; // Si no hay sede, devolver "N/A"

    // Formatear la sede
    if (sede.includes("premium_plaza")) {
      if (sede.includes("robledo_")) {
        return "Robledo y Premium Plaza";
      } else {
        return "Premium Plaza";
      }
    }

    return sede; // Devolver el valor original si no coincide con los casos anteriores
  };

  // Aplanar los datos y seleccionar solo las columnas deseadas
  const flattenedData = data.map((prof) => {

    const flatProf = {
      ...prof,
      ...prof.Usuario,
      var_nombreDocumento: prof.Usuario.TipoDocumento?.var_nombreDocumento || "N/A",
      date_fechaNacimiento: formatDate(prof.date_fechaNacimiento),
      date_fechaIngresoInstitucion: formatDate(prof.date_fechaIngresoInstitucion),
      var_sede: formatSede(prof.var_sede), // Formatear la sede
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

  const handleDownloadExcel = () => {
    // Crear una hoja de trabajo (worksheet) con los datos aplanados y filtrados
    const ws = XLSX.utils.json_to_sheet(flattenedData);

    // Renombrar las columnas y aplicar negrita
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const headerCell = XLSX.utils.encode_cell({ r: range.s.r, c: C });
      const originalHeader = ws[headerCell].v;

      if (columnNamesMapping[originalHeader]) {
        // Cambiar el nombre de la columna
        ws[headerCell].v = columnNamesMapping[originalHeader];

        // Aplicar estilo de negrita
        ws[headerCell].s = {
          font: {
            bold: true, // Texto en negrita
          },
        };
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
          fontSize: '0.875rem', // Tamaño de fuente un poco más grande
          backgroundColor: '#333', // Fondo oscuro para el tooltip
          color: '#fff', // Texto blanco
          borderRadius: '4px', // Bordes redondeados
          padding: '8px 12px', // Espaciado interno
        },
        '& .MuiTooltip-arrow': {
          color: '#333', // Color de la flecha que coincide con el fondo del tooltip
        },
      }}
    >
      <Button
        type="button"
        onClick={handleDownloadExcel}
        sx={{
          backgroundColor: '#fff', // Fondo blanco
          color: '#202B52', // Texto en color #202B52
          border: '2px solid #202B52', // Borde de color #202B52
          padding: '8px 16px', // Espaciado interno
          borderRadius: '8px', // Bordes redondeados
          textTransform: 'none', // Evita que el texto se transforme a mayúsculas
          fontSize: '0.875rem', // Tamaño de fuente
          fontWeight: '500', // Grosor de la fuente
          display: 'flex', // Activa Flexbox
          alignItems: 'center', // Centra verticalmente
          justifyContent: 'center', // Centra horizontalmente
          '&:hover': {
            backgroundColor: '#f0f0f0', // Color de fondo más claro al hacer hover
            borderColor: '#202B52', // Mantener el borde en hover
          },
          '& svg': {
            width: '20px', // Tamaño del ícono
            height: '20px', // Tamaño del ícono
            fill: '#202B52', // Color del ícono (mismo que el texto)
          },
        }}
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 309.529 309.529"
          style={{ enableBackground: 'new 0 0 309.529 309.529' }}
          xmlSpace="preserve"
        >
          <g>
            <path
              style={{ fill: '#3DB39E' }}
              d="M179.728,251.279c0-39.586,32.096-71.682,71.682-71.682c6.698,0,13.173,0.995,19.329,2.716V86.711 L183.69,0H19.46C8.79,0,0.13,8.65,0.13,19.329v270.609c0,10.679,8.659,19.329,19.329,19.329h189.929 C191.441,296.239,179.728,275.161,179.728,251.279z"
            />
            <path
              style={{ fill: '#2F8A78' }}
              d="M270.46,86.981h-67.372c-10.67,0-19.329-8.659-19.329-19.329V0.193L270.46,86.981z"
            />
            <path
              style={{ fill: '#3DB39E' }}
              d="M251.41,193.553c32.028,0,57.988,25.969,57.988,57.988c0,32.009-25.959,57.988-57.988,57.988 c-32.009,0-57.988-25.978-57.988-57.988C193.422,219.522,219.401,193.553,251.41,193.553z"
            />
            <path
              style={{ fill: '#FFFFFF' }}
              d="M270.74,241.876h-9.665v-9.665c0-5.345-4.32-9.665-9.665-9.665c-5.345,0-9.665,4.32-9.665,9.665 v9.665h-9.665c-5.345,0-9.665,4.32-9.665,9.665c0,5.354,4.32,9.665,9.665,9.665h9.665v9.665c0,5.354,4.32,9.665,9.665,9.665 c5.344,0,9.665-4.31,9.665-9.665v-9.665h9.665c5.345,0,9.665-4.31,9.665-9.665C280.404,246.206,276.085,241.876,270.74,241.876z"
            />
            <path
              style={{ fill: '#8BD1C5' }}
              d="M183.758,228.026v-5.741h2.252c1.508-3.373,3.267-6.601,5.258-9.665h-7.509V193.3h19.329v5.422 c3.006-2.754,6.224-5.258,9.665-7.471V125.64H58.118v125.64h121.619C179.776,243.123,181.216,235.333,183.758,228.026z M183.758,135.304h19.329v19.329h-19.329V135.304z M183.758,164.308h19.329v19.32h-19.329V164.308z M87.112,241.625H67.783v-19.339 h19.329V241.625z M87.112,212.621H67.783v-19.32h19.329V212.621z M87.112,183.627H67.783v-19.32h19.329V183.627z M87.112,154.634 H67.783v-19.329h19.329V154.634z M116.106,241.625h-19.33v-19.339h19.329L116.106,241.625L116.106,241.625z M116.106,212.621 h-19.33v-19.32h19.329L116.106,212.621L116.106,212.621z M116.106,183.627h-19.33v-19.32h19.329L116.106,183.627L116.106,183.627z M116.106,154.634h-19.33v-19.329h19.329L116.106,154.634L116.106,154.634z M145.099,241.625H125.77v-19.339h19.329V241.625z M145.099,212.621H125.77v-19.32h19.329V212.621z M145.099,183.627H125.77v-19.32h19.329V183.627z M145.099,154.634H125.77v-19.329 h19.329V154.634z M174.093,241.625h-19.329v-19.339h19.329V241.625z M174.093,212.621h-19.329v-19.32h19.329V212.621z M174.093,183.627h-19.329v-19.32h19.329V183.627z M154.764,154.634v-19.329h19.329v19.329H154.764z"
            />
          </g>
        </svg>
      </Button>
    </Tooltip>
  );
};

export default ExportExcelButton;

