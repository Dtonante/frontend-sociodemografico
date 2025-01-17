import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Typography,
  Divider,
  CardContent,
  Button,
  FormHelperText,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VistaDatosProfesional5 = () => {
  const [afiliado, setAfiliado] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [salario, setSalario] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [antiguedadInstitucion, setAntiguedadInstitucion] = useState("");
  const [estructuraOrganizacional, setEstructuraOrganizacional] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [cargo, setCargo] = useState("");
  const [jefeInmediato, setJefeInmediato] = useState("");
  const [sede, setSede] = useState("");
  const [
    var_correoElectronicoInstitucional,
    setVar_correoElectronicoInstitucional,
  ] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const porcentajeProgreso = 70;
  // Calcular la fecha máxima (5 días después de hoy)
  const fechaHoy = new Date();
  const fechaMaxima = new Date();
  fechaMaxima.setDate(fechaHoy.getDate() + 5); // 5 días después de hoy
  const fechaMaximaISO = fechaMaxima.toISOString().split("T")[0];

  // Validaciones basadas en los campos tocados
  useEffect(() => {
    const nuevosErrores = {};

    if (touchedFields.afiliado && !afiliado) {
      nuevosErrores.afiliado = "El departamento es obligatorio";
    }

    if (
      afiliado == "si" &&
      touchedFields.var_correoElectronicoInstitucional &&
      !var_correoElectronicoInstitucional
    ) {
      nuevosErrores.var_correoElectronicoInstitucional =
        "El correo electrónico institucional es obligatorio";
    } else if (
      var_correoElectronicoInstitucional &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(var_correoElectronicoInstitucional)
    ) {
      nuevosErrores.var_correoElectronicoInstitucional =
        "El correo electrónico institucional no es válido";
    }

    if (afiliado === "si" && touchedFields.tipoContrato && !tipoContrato) {
      nuevosErrores.tipoContrato = "El tipo de contrato es obligatorio.";
    }

    if (afiliado == "si" && touchedFields.var_salario && !salario) {
      nuevosErrores.salario = "El salario es obligatorio.";
    }

    if (afiliado === "si" && touchedFields.date_fechaIngresoInstitucion && !fechaIngreso) {
      nuevosErrores.fechaIngreso = "La fecha de ingreso es obligatorio.";
    }

    if (
      afiliado === "si" &&
      touchedFields.area &&
      !areaSeleccionada
    ) {
      nuevosErrores.areaSeleccionada = "El área laboral es obligatorio.";
    }

    if (afiliado === "si" && touchedFields.var_cargo && !cargo) {
      nuevosErrores.cargo = "El cargo es obligatorio.";
    }

    if (afiliado === "si" && touchedFields.var_jefeInmediato && !jefeInmediato) {
      nuevosErrores.jefeInmediato = "El jefe inmediato es obligatorio.";
    }

    if (afiliado === "si" && touchedFields.var_sede && !sede) {
      nuevosErrores.sede = "La sede es obligatorio";
    }

    // Validar que la fecha de ingreso no sea futura
    if (afiliado === "si" && touchedFields.date_fechaIngresoInstitucion) {
      const fechaHoy = new Date().toISOString().split("T")[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD
      if (!fechaIngreso || fechaIngreso > fechaHoy) {
        nuevosErrores.fechaIngreso = "La fecha de ingreso no puede ser futura";
      }
    }

    setErrors(nuevosErrores);
  }, [
    afiliado,
    tipoContrato,
    salario,
    var_correoElectronicoInstitucional,
    cargo,
    sede,
    fechaIngreso,
    areaSeleccionada,
    jefeInmediato,
    touchedFields,
  ]);

  // Marcar un campo como "tocado" cuando pierde el enfoque
  const handleBlur = (event) => {
    const { name } = event.target;
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });
  };

  useEffect(() => {
    const fetchEstructuraOrganizacional = async () => {
      try {
        const response = await axios.get('https://evaluacion.esumer.edu.co/api/estructuraOrganizacional');
        setEstructuraOrganizacional(response.data);
      } catch (error) {
        console.error('Error al obtener las áreas:', error);
      }
    };

    if (afiliado === "si") {
      fetchEstructuraOrganizacional();
    }
  }, [afiliado]);

  useEffect(() => {
    if (afiliado === "no") {
      // Si el usuario selecciona "no", se resetean los valores
      setTipoContrato("");
      setSalario("");
      setFechaIngreso("");
      setAntiguedadInstitucion("");
      setAreaSeleccionada("");
      setCargo("");
      setJefeInmediato("");
      setSede("");
      setVar_correoElectronicoInstitucional("");
    }
  }, [afiliado]);

  const manejarCambio = (event) => {
    const { name, value } = event.target;

    if (name === "afiliado") {
      setAfiliado(value);

      if (value === "no") {
        // Establecer todos los campos como "N/A" si la respuesta es "no"
        const areaNA = estructuraOrganizacional.find(area => area.var_nombreArea === "N/A");
        if (areaNA) {
          const areaId = Number(areaNA.id_areaPk); // Convertir el id a un número
          setAreaSeleccionada(areaId);
          localStorage.setItem('area', areaId.toString()); // Guardar como string pero asegurándonos que es un número
        }
        setFechaIngreso("2024-11-03T00:00:00.000Z");
        setTipoContrato("N/A");
        setSalario("N/A");
        setAntiguedadInstitucion("N/A");
        setJefeInmediato("N/A");
        setSede("N/A");
        setVar_correoElectronicoInstitucional("N/A");
        setCargo("N/A")

        // Almacenar en localStorage
        localStorage.setItem('date_fechaIngresoInstitucion', "2024-11-03T00:00:00.000Z");
        localStorage.setItem('var_tipoContrato', "N/A");
        localStorage.setItem('var_salario', "N/A");
        localStorage.setItem('var_antiguedadInstitucion', "N/A");
        localStorage.setItem('var_jefeInmediato', "N/A");
        localStorage.setItem('var_sede', "N/A");
        localStorage.setItem('var_correoElectronicoInstitucional', "N/A");
        localStorage.setItem('var_cargo', "N/A")
      }
    } else if (name === "tipoContrato") {
      setTipoContrato(value);
      localStorage.setItem('var_tipoContrato', value);

    } else if (name === "var_salario") {
      // Elimina los puntos para trabajar con el valor numérico puro
      const rawValue = value.replace(/\./g, "");

      // Verifica si el valor ingresado es un número
      if (!isNaN(rawValue)) {
        // Aplica el formato con puntos como separadores de miles
        const formattedValue = new Intl.NumberFormat("de-DE").format(rawValue);

        // Actualiza el estado y guarda en localStorage
        setSalario(formattedValue);
        localStorage.setItem("var_salario", formattedValue);
      }

    } else if (name === "date_fechaIngresoInstitucion") {
      setFechaIngreso(value);
      localStorage.setItem('date_fechaIngresoInstitucion', value);

      const fechaIngresoDate = new Date(value);
      const fechaActual = new Date();

      if (fechaIngresoDate > fechaActual) {
        setAntiguedadInstitucion("N/A");
        localStorage.setItem("var_antiguedadInstitucion", "N/A");
      } else {
        const diferenciaTiempo = fechaActual - fechaIngresoDate;
        const diasAntiguedad = Math.floor(
          diferenciaTiempo / (1000 * 3600 * 24)
        );
        setAntiguedadInstitucion(diasAntiguedad);
        localStorage.setItem(
          "var_antiguedadInstitucion",
          diasAntiguedad.toString()
        );
      }
    } else if (name === "area") {
      setAreaSeleccionada(value);
      localStorage.setItem("area", value);
    } else if (name === "var_cargo") {
      setCargo(value);
      localStorage.setItem("var_cargo", value);
    } else if (name === "var_jefeInmediato") {
      setJefeInmediato(value);
      localStorage.setItem("var_jefeInmediato", value);
    } else if (name === "var_sede") {
      setSede(value);
      localStorage.setItem("var_sede", value);
    } else if (name === "var_correoElectronicoInstitucional") {
      setVar_correoElectronicoInstitucional(value);
      localStorage.setItem("var_correoElectronicoInstitucional", value);
    }
  };

 

  


  const manejarSiguiente = () => {
    const nuevosErrores = {};

    if (!afiliado) {
      nuevosErrores.afiliado = "Indicar el tipo de proceso es obligatorio.";
    }

    if (afiliado === "si" && !var_correoElectronicoInstitucional) {
      nuevosErrores.var_correoElectronicoInstitucional =
        "El correo electronico institucional es obligatorio.";
    }

    if (afiliado === "si" && !tipoContrato) {
      nuevosErrores.tipoContrato = "El tipo de contrato es obligatorio.";
    }

    if (afiliado === "si" && !salario) {
      nuevosErrores.salario = "El salario es obligatorio.";
    }

    if (afiliado === "si" && !fechaIngreso) {
      nuevosErrores.fechaIngreso = "La fecha de ingreso es obligatorio.";
    }

    if (afiliado === "si" && !areaSeleccionada) {
      nuevosErrores.areaSeleccionada = "El área laboral es obligatorio.";
    }

    if (afiliado === "si" && !cargo) {
      nuevosErrores.cargo = "El cargo es obligatorio.";
    }

    if (afiliado === "si" && !jefeInmediato) {
      nuevosErrores.jefeInmediato = "El jefe inmediato es obligatorio.";
    }

    if (afiliado === "si" && !sede) {
      nuevosErrores.sede =
        "La sede es obligatorio";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }

    navigate("/FormacionAcademica");
  };

  const handleKeyPress = (event, fieldName) => {
    let regex;

    // Condicional según el name del campo
    if (fieldName === "var_salario" || fieldName === "var_salario") {
      // Solo permitimos números
      regex = /^[0-9]*$/;
    } else if (fieldName === "var_jefeInmediato") {
      // Solo permitimos letras (incluyendo acentos y ñ) y espacios
      regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    }
    else if (fieldName === "var_cargo") {
      // Solo permitimos letras (incluyendo acentos y ñ) y espacios
      regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    }

    if (regex && !regex.test(event.key)) {
      event.preventDefault(); // Evita la entrada de caracteres no válidos
    }
  };

  const manejarAtras = () => {
    navigate('/InformacionBancaria')
  }

  return (
    <div
      style={{
        backgroundColor: "#F2F2F2",
        paddingTop: "3%",
        paddingBottom: "3%",
        minHeight: "100vh",
        overflow: "auto",
      }}
    >
      <div
        style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}
      >
        <img
          src="public/logo_form.png"
          alt="Descripción de la imagen"
          style={{
            width: "20%",
            height: "auto",
          }}
        />
      </div>
      <Card
        variant="outlined"
        sx={{
          p: 0,
          width: "100%",
          maxWidth: 800,
          margin: "auto",
          backgroundColor: "#F2F2F2",
          borderColor: "#202B52",
        }}
      >
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                textAlign: "center",
                color: "#202B52",
                fontFamily: "Roboto Condensed",
              }}
            >
              <strong>Información laboral</strong>
            </Typography>
          </Box>
        </Box>
        <Divider
          style={{
            marginLeft: "5%",
            marginRight: "5%",
            borderColor: "#202B52",
          }}
        />
        <CardContent sx={{ padding: "30px" }}>
          <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.afiliado}>
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
            >
              ¿En proceso de ingreso o vinculado?:
            </Typography>
            <Select
              labelId="afiliado-label"
              name="afiliado"
              value={afiliado}
              onChange={manejarCambio}
              onBlur={handleBlur}
              sx={{
                height: "40px",
                fontFamily: "Roboto Condensed",
                fontSize: "16px",
              }}
            >
              <MenuItem value="si">Vinculado</MenuItem>
              <MenuItem value="no">Proceso de ingreso</MenuItem>
            </Select>
            {errors.afiliado && (
              <FormHelperText
                sx={{
                  marginLeft: 0,
                }}
              >
                {errors.afiliado}
              </FormHelperText>
            )}
          </FormControl>

          {afiliado === "si" && (
            <form>
              <Typography
                variant="h6"
                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
              >
                Correo Electrónico Institucional:
              </Typography>
              <TextField
                name="var_correoElectronicoInstitucional"
                type="email"
                variant="outlined"
                value={var_correoElectronicoInstitucional}
                onChange={manejarCambio}
                fullWidth
                sx={{ mb: 2 }}
                onBlur={handleBlur}
                error={!!errors.var_correoElectronicoInstitucional}
                helperText={errors.var_correoElectronicoInstitucional}
                FormHelperTextProps={{
                  sx: {
                    marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                  },
                }}
                InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px",
                  },
                }}
              />

              <FormControl
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.tipoContrato}
              >
                <Typography
                  variant="h6"
                  sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                >
                  Tipo de Contrato:
                </Typography>
                <Select
                  labelId="tipo-contrato-label"
                  name="tipoContrato"
                  value={tipoContrato}
                  onChange={manejarCambio}
                  onBlur={handleBlur}
                  sx={{
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px",
                  }}
                >
                  <MenuItem value="indefinido">
                    Contrato a término indefinido
                  </MenuItem>
                  <MenuItem value="fijo">Contrato a término fijo</MenuItem>
                  <MenuItem value="prestacion_servicios">
                    Contrato por prestación de servicios
                  </MenuItem>
                  <MenuItem value="medio_tiempo">Medio tiempo</MenuItem>
                  <MenuItem value="docente_catedra">
                    Docente de cátedra
                  </MenuItem>
                  <MenuItem value="obra_labor">Obra/Labor</MenuItem>
                </Select>
                {errors.tipoContrato && (
                  <FormHelperText
                    sx={{
                      marginLeft: 0,
                    }}
                  >
                    {errors.tipoContrato}
                  </FormHelperText>
                )}
              </FormControl>

              <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} > Salario: </Typography>
              <TextField variant="outlined" fullWidth name="var_salario" value={salario}
                onChange={manejarCambio}
                onKeyPress={(event) => handleKeyPress(event, "var_salario")} 
                sx={{ mb: 2 }}
                onBlur={handleBlur}
                error={!!errors.salario}
                helperText={errors.salario}
                FormHelperTextProps={{
                  sx: {
                    marginLeft: 0,
                  },
                }}
                InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px",
                  }, inputProps: { maxLength: 11 }
                }}
              />

              <Typography
                variant="h6"
                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
              >
                Fecha de Ingreso:
              </Typography>
              <TextField
                name="date_fechaIngresoInstitucion"
                type="date"
                variant="outlined"
                value={fechaIngreso}
                onChange={manejarCambio}
                fullWidth
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                error={!!errors.fechaIngreso}
                helperText={errors.fechaIngreso}
                FormHelperTextProps={{
                  sx: {
                    marginLeft: 0,
                  },
                }}
                inputProps={{
                  max: fechaMaximaISO, // Deshabilita fechas futuras
                }}
                InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px",
                  },
                }}
              />

              <Typography
                variant="h6"
                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
              >
                Antigüedad en la Institución (días):
              </Typography>
              <TextField
                name="var_antiguedadInstitucion"
                type="text"
                variant="outlined"
                value={antiguedadInstitucion}
                onChange={manejarCambio}
                fullWidth
                sx={{ mb: 2 }}
                disabled
                InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px",
                  },
                }}
              />

              <FormControl
                fullWidth
                sx={{ mb: 2 }}
                error={!!errors.areaSeleccionada}
              >
                <Typography
                  variant="h6"
                  sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                >
                  Área laboral a la que pertenece:
                </Typography>
                <Select
                  labelId="area-label"
                  name="area"
                  value={areaSeleccionada}
                  onChange={manejarCambio}
                  onBlur={handleBlur}
                  sx={{
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px",
                  }}
                >
                  {estructuraOrganizacional.map((area) => (
                    <MenuItem key={area.id_areaPk} value={area.id_areaPk}>
                      {area.var_nombreArea}
                    </MenuItem>
                  ))}
                </Select>
                {errors.areaSeleccionada && (
                  <FormHelperText
                    sx={{
                      marginLeft: 0,
                    }}
                  >
                    {errors.areaSeleccionada}
                  </FormHelperText>
                )}
              </FormControl>

              <Typography
                variant="h6"
                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
              >
                Cargo:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                name="var_cargo"
                onKeyPress={(event) => handleKeyPress(event, "var_cargo")}
                value={cargo}
                onChange={(event) =>
                  manejarCambio({
                    target: {
                      name: "var_cargo",
                      value: event.target.value.toUpperCase(),
                    },
                  })
                }
                sx={{ mb: 2 }}
                onBlur={handleBlur}
                error={!!errors.cargo}
                helperText={errors.cargo}
                FormHelperTextProps={{
                  sx: {
                    marginLeft: 0,
                  },
                }}
                InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px",
                  },
                }}
              />

              <Typography
                variant="h6"
                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
              >
                Jefe Inmediato:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                name="var_jefeInmediato"
                value={jefeInmediato}
                onChange={(event) =>
                  manejarCambio({
                    target: {
                      name: "var_jefeInmediato",
                      value: event.target.value.toUpperCase(), // Convierte a mayúsculas
                    },
                  })
                }
                sx={{ mb: 2 }}
                onBlur={handleBlur}
                onKeyPress={(event) =>
                  handleKeyPress(event, "var_jefeInmediato")
                } // Condicional basado en el nombre del campo
                error={!!errors.jefeInmediato}
                helperText={errors.jefeInmediato}
                FormHelperTextProps={{
                  sx: {
                    marginLeft: 0,
                  },
                }}
                InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px",
                  },
                }}
              />

              <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.sede}>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                >
                  Sede:
                </Typography>
                <Select
                  labelId="sede-label"
                  name="var_sede"
                  value={sede}
                  onChange={manejarCambio}
                  onBlur={handleBlur}
                  sx={{
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px",
                  }}
                >
                  <MenuItem value="robledo">Robledo</MenuItem>
                  <MenuItem value="premium_plaza">Premium Plaza</MenuItem>
                  <MenuItem value="robledo_premium_plaza">
                    Robledo / Premium Plaza
                  </MenuItem>
                  <MenuItem value="otro">Otro</MenuItem>
                </Select>
                {errors.sede && (
                  <FormHelperText
                    sx={{
                      marginLeft: 0,
                    }}
                  >
                    {errors.sede}
                  </FormHelperText>
                )}
              </FormControl>
            </form>
          )}

          <div
            style={{
              fontFamily: 'Poppins',
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F2F2F2",
              padding: "10px 15px",
              borderRadius: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                fontFamily: 'Poppins',
                height: "10px",
                width: "90%",
                backgroundColor: "#F2F2F2",
                borderRadius: "7px",
                overflow: "hidden",
                border: "2px solid #202B52",
                marginRight: "10px",
              }}
            >
              <div
                style={{
                  fontFamily: 'Poppins',
                  width: `${porcentajeProgreso}%`,
                  height: "100%",
                  backgroundColor: "#202B52",
                  borderRadius: "2px 0 0 4px",
                }}
              ></div>
            </div>
            <span style={{ color: "#202B52", fontWeight: "bold" }}>
              {porcentajeProgreso}%
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              style={{
                fontFamily: 'poppins',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#202B52',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '8px'

              }}
              onClick={manejarAtras}
            >
              Atras
            </button>
            <Button
              sx={{ backgroundColor: "#202B52", fontFamily: 'Poppins' }}
              onClick={manejarSiguiente}
              variant="contained"
              type="submit"
            >
              Siguiente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VistaDatosProfesional5;
