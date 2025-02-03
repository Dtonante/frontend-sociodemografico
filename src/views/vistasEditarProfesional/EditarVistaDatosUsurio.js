import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { showAlert, show_alert } from "../../components/showAlert/alertFuntion"; // Asegúrate de importar las funciones

const URI_USUARIOS = "https://evaluacion.esumer.edu.co/api/usuarios/";
const URI_PROFESIONAL = "https://evaluacion.esumer.edu.co/api/profesional/";
const URI_PROFESIONAL_POR_ID_USUARIO =
  "https://evaluacion.esumer.edu.co/api/profesional/porUsuario/";
const URI_TIPO_DOCUMENTO = "https://evaluacion.esumer.edu.co/api/tipodocumentos/";

const CompEditarUsuario = () => {
  const [id_profesionalPK, setId_profesionalPK] = useState();
  const [id_rolFK, setId_rolFK] = useState("");
  const [boolean_estado, setBoolean_estado] = useState("");
  const [var_nombreCompleto, setVar_nombreCompleto] = useState("");
  const [int_tipoDocumentoFK, setInt_tipoDocumentoFK] = useState("");
  const [var_numeroDocumento, setVar_numeroDocumento] = useState("");
  const [var_genero, setVar_genero] = useState("");
  const [var_correoElectronicoPersonal, setVar_correoElectronicoPersonal] =
    useState("");
  const [var_contactoEmergencia, setVar_contactoEmergencia] = useState("");
  const [var_contrasena, setVar_contrasena] = useState("");
  const [var_grupoEtnico, setVar_grupoEtnico] = useState("");
  const [var_rh, setVar_rh] = useState("");
  const [date_fechaNacimiento, setDate_fechaNacimiento] = useState("");
  const [var_telefonoEmergencia, setVar_telefonoEmergencia] = useState("");
  const navigate = useNavigate();
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [errorNombreCompleto, setErrorNombreCompleto] = useState(false);
  const [errorNumeroDocumento, setErrorNumeroDocumento] = useState(false);
  const [errorCorreoElectronico, setErrorCorreoElectronico] = useState(false);
  const [errorNombreContactoEmergencia, setErrorNombreContactoEmergencia] =
    useState(false);
  const [errorTelefonoEmergencia, setErrorTelefonoEmergencia] = useState(false);

  const [error, setError] = useState(false);

  // Obtener el ID desde localStorage
  const id_usuarioPK = localStorage.getItem("id_usuario");

  // Procedimiento para actualizar
  const actualizar = async (e) => {
    e.preventDefault();

    // Definimos los campos obligatorios a validar
    const camposObligatorios = [
      { nombre: "fechaNacimiento", valor: date_fechaNacimiento },
      { nombre: "nombreCompleto", valor: var_nombreCompleto },
      { nombre: "correoElectronico", valor: var_correoElectronicoPersonal },
      { nombre: "telefonoEmergencia", valor: var_telefonoEmergencia },
      { nombre: "contactoEmergencia", valor: var_contactoEmergencia },

      { nombre: "numeroDocumento", valor: var_numeroDocumento },
      { nombre: "rol", valor: id_rolFK },
      { nombre: "genero", valor: var_genero },
      { nombre: "grupoEtnico", valor: var_grupoEtnico },
      { nombre: "rh", valor: var_rh },
    ];

    // Recorremos los campos para validar que no estén vacíos
    let camposValidos = true;
    camposObligatorios.forEach((campo) => {
      // Verificamos si el valor no es nulo o indefinido y si es una cadena
      if (typeof campo.valor === "string" && campo.valor.trim() === "") {
        setError((prevState) => ({
          ...prevState,
          [campo.nombre]: true, // Marcamos el error para el campo específico
        }));
        camposValidos = false;
      } else if (
        campo.valor === null ||
        campo.valor === undefined ||
        campo.valor === ""
      ) {
        setError((prevState) => ({
          ...prevState,
          [campo.nombre]: true, // Marcamos el error para el campo específico
        }));
        camposValidos = false;
      } else {
        setError((prevState) => ({
          ...prevState,
          [campo.nombre]: false, // Si el campo tiene valor, eliminamos el error
        }));
      }
    });

    if (!camposValidos) {
      // Si algún campo es inválido, mostramos la alerta y detenemos el proceso
      show_alert("Por favor, completa todos los campos obligatorios.", "info");
      return; // Detenemos el proceso si algún campo requerido está vacío
    }

    // Validación de la fecha (mínimo 18 años)
    const selectedDate = new Date(date_fechaNacimiento);
    const today = new Date();
    const minDate = new Date(today.setFullYear(today.getFullYear() - 18));

    if (selectedDate > minDate) {
      show_alert("Debes tener mínimo 18 años para el registro.", "info");
      return; // Detener el proceso si la fecha es inválida
    }

    // Si todos los campos son válidos, mostramos la alerta de confirmación
    showAlert(
      {
        title: "¿Estás seguro?",
        text: "¿Deseas guardar los cambios realizados?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
      },
      async () => {
        try {
          // Operaciones de actualización
          await axios.put(URI_USUARIOS + id_usuarioPK, {
            id_rolFK: id_rolFK,
            boolean_estado: boolean_estado,
            var_nombreCompleto: var_nombreCompleto,
            int_tipoDocumentoFK: int_tipoDocumentoFK,
            var_numeroDocumento: var_numeroDocumento,
            var_genero: var_genero,
            var_correoElectronicoPersonal: var_correoElectronicoPersonal,
            var_contactoEmergencia: var_contactoEmergencia,
          });

          await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            date_fechaNacimiento: date_fechaNacimiento,
            var_grupoEtnico: var_grupoEtnico,
            var_rh: var_rh,
            var_telefonoEmergencia: var_telefonoEmergencia,
          });

          show_alert("Cambios guardados exitosamente", "success");

          setTimeout(() => {
            navigate("/app/editarUsuario");
          }, 1500);
        } catch (error) {
          show_alert("Error al guardar los cambios", "error");
        }
      },
      () => {
        show_alert("Cambios cancelados", "info");
      }
    );
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    const res = await axios.get(URI_USUARIOS + id_usuarioPK);
    setId_rolFK(res.data.id_rolFK);
    setBoolean_estado(res.data.boolean_estado);
    setVar_nombreCompleto(res.data.var_nombreCompleto);
    setInt_tipoDocumentoFK(res.data.int_tipoDocumentoFK);
    setVar_numeroDocumento(res.data.var_numeroDocumento);
    setVar_genero(res.data.var_genero);
    setVar_correoElectronicoPersonal(res.data.var_correoElectronicoPersonal);
    setVar_contactoEmergencia(res.data.var_contactoEmergencia);
  };

  useEffect(() => {
    getProfesional();
  }, []);

  const getProfesional = async () => {
    const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
    setId_profesionalPK(res.data.id_profesionalPK);
    setDate_fechaNacimiento(res.data.date_fechaNacimiento);
    setVar_grupoEtnico(res.data.var_grupoEtnico);
    setVar_rh(res.data.var_rh);
    setVar_telefonoEmergencia(res.data.var_telefonoEmergencia);

    const fetchedDate = res.data.date_fechaNacimiento;
    const formattedDate = fetchedDate.split("T")[0]; // Convierte al formato 'YYYY-MM-DD'
    setDate_fechaNacimiento(formattedDate);
  };

  useEffect(() => {
    const fetchTiposDocumento = async () => {
      try {
        const response = await axios.get(URI_TIPO_DOCUMENTO);
        setTiposDocumento(response.data);
      } catch (error) {
        console.error("Error al cargar los tipos de documento", error);
      }
    };

    fetchTiposDocumento();
  }, []);

  // Definición de los grupos étnicos
  const gruposEtnicos = [
    "Indígena",
    "Afrocolombiano",
    "Raizal del Archipiélago de San Andrés",
    "Palenquero",
    "Rom",
    "Mestizo",
    "Ninguno",
  ];

  const handleKeyPress = (event, fieldName) => {
    let regex;

    // Validación para campos como teléfono y número de documento (solo números)
    if (
      fieldName === "var_telefonoEmergencia" ||
      fieldName === "var_celular" ||
      fieldName === "var_numeroDocumento"
    ) {
      // Solo permitimos números
      regex = /^[0-9]*$/;
    } else if (
      fieldName === "var_nombreCompleto" ||
      fieldName === "var_contactoEmergencia"
    ) {
      // Solo permitimos letras (incluyendo acentos y ñ) y espacios
      regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    } else if (fieldName === "var_correoElectronicoPersonal") {
      // Validar formato de correo electrónico
      regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    }

    // Verificamos si se ha definido una expresión regular para el campo
    if (regex && !regex.test(event.key)) {
      event.preventDefault(); // Evita la entrada de caracteres no válidos
      return; // Salimos de la función si el carácter no es válido
    }

    // Validación para el número de documento
    if (fieldName === "var_numeroDocumento") {
      const tipoDocumento = tiposDocumento.find(
        (option) => option.id_tipoDocumentoPK === formData.int_tipoDocumentoFK
      )?.var_nombreDocumento;

      // Bloquear entrada si no se ha seleccionado un tipo de documento
      if (!tipoDocumento) {
        event.preventDefault(); // Bloquea cualquier entrada si no se ha seleccionado un tipo
        return;
      }

      // Reglas de validación según el tipo de documento
      const validationRules = {
        "Cédula de Ciudadanía (CC)": /^[0-9]*$/, // Solo números
        "Tarjeta de Identidad (TI)": /^[0-9]*$/, // Solo números
        "Cédula de Extranjería (CE)": /^[A-Za-z0-9]*$/, // Letras y números
        "Registro Civil de Nacimiento (RCN)": /^[A-Za-z0-9]*$/, // Letras y números
        Pasaporte: /^[A-Za-z0-9]*$/, // Letras y números
        "Permiso Especial de Permanencia (PEP)": /^[A-Za-z0-9]*$/, // Letras y números
        "Permiso por Protección Temporal (PPT)": /^[A-Za-z0-9]*$/, // Letras y números
        "Documento Nacional de Identificación de otro país (DNI)":
          /^[A-Za-z0-9]*$/, // Letras y números
        "Licencia de Conducción": /^[A-Za-z0-9]*$/, // Letras y números
        "Carné Diplomatico": /^[A-Za-z0-9]*$/, // Letras y números
        "Permiso Especial de Trabajo (PET)": /^[A-Za-z0-9]*$/, // Letras y números
        "Carné de Migración o Carné de Extranjería Temporal": /^[A-Za-z0-9]*$/, // Letras y números
      };

      // Verificamos si la validación para el tipo de documento está definida
      regex = validationRules[tipoDocumento];

      // Validación del número de documento
      if (regex && !regex.test(event.key)) {
        event.preventDefault(); // Bloquea la entrada si no cumple con la expresión regular
      }
    }
  };

  const validarCampoRequerido = (valor, setError) => {
    if (!valor || valor.trim() === "") {
      setError(true); // Establece el error si el campo está vacío
      return false; // Retorna false para indicar que la validación falló
    } else {
      setError(false); // Si el campo tiene valor, quita el error
      return true; // Retorna true si la validación pasa
    }
  };

  const handleDateChange = (event) => {
    const { value } = event.target; // Obtenemos la fecha seleccionada por el usuario
    const selectedDate = new Date(value); // Convertimos la fecha en un objeto Date
    const today = new Date();
    const minDate = new Date(today.setFullYear(today.getFullYear() - 18)); // Fecha mínima para 18 años

    // Validación en tiempo real
    if (selectedDate > minDate) {
      show_alert("Debes tener mínimo 18 años para el registro.", "info"); // Mostrar la alerta
      return; // No actualizamos el estado si la fecha no es válida
    }

    // Si la fecha es válida, la almacenamos en el estado
    setDate_fechaNacimiento(value);
  };

  return (
    <div
      style={{
        backgroundColor: "#F2F2F2",
        paddingTop: "3%",
        paddingBottom: "3%",
      }}
    >
      <div
        style={{ textAlign: "center", marginBottom: "1%", marginTop: "-3%" }}
      >
        <p> Edita la información necesaria y al final del formulario pulsa el botón GUARDAR para conservar los cambios.</p>
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
              <strong>Actualizar información de usuario</strong>
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
          <form onSubmit={actualizar}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Nombre Usuario:
            </Typography>
            <TextField
              value={var_nombreCompleto}
              onChange={(e) => {
                const valor = e.target.value.toUpperCase();
                setVar_nombreCompleto(valor);

                // Validar si el campo está vacío al cambiar el valor
                validarCampoRequerido(valor, setErrorNombreCompleto);
              }}
              fullWidth
              onKeyPress={(event) =>
                handleKeyPress(event, "var_nombreCompleto")
              }
              sx={{ mb: 2 }}
              error={errorNombreCompleto} // Mostrar borde rojo si hay error
              helperText={
                errorNombreCompleto ? "Este campo es obligatorio" : "" // Mensaje de error
              }
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
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Tipo de Documento:
            </Typography>
            <TextField
              select
              name="int_tipoDocumentoFK"
              label=""
              variant="outlined"
              value={int_tipoDocumentoFK}
              onChange={(e) => setInt_tipoDocumentoFK(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            >
              {tiposDocumento.map((option) => (
                <MenuItem
                  key={option.id_tipoDocumentoPK}
                  value={option.id_tipoDocumentoPK}
                >
                  {option.var_nombreDocumento}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Número Documento:
            </Typography>
            <TextField
              value={var_numeroDocumento}
              onChange={(e) => {
                const valor = e.target.value.toUpperCase();
                setVar_numeroDocumento(valor);
                // Validar si el campo está vacío al cambiar el valor
                validarCampoRequerido(valor, setErrorNumeroDocumento);
              }}
              onKeyPress={(event) =>
                handleKeyPress(event, "var_numeroDocumento")
              } // Validación de solo letras
              error={errorNumeroDocumento} // Mostrar borde rojo si hay error
              helperText={
                errorNumeroDocumento ? "Este campo es obligatorio" : "" // Mensaje de error
              }
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
                inputProps: {
                  maxLength: 10, // Definir el máximo de caracteres (ajusta el número según lo que necesites)
                },
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Fecha de Nacimiento:
            </Typography>
            <TextField
              type="date"
              value={date_fechaNacimiento || ""} // El estado controlado
              onChange={handleDateChange} // Llamamos a la función para manejar los cambios en tiempo real
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }} // Mantiene la etiqueta arriba
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
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Género:
            </Typography>
            <FormControl className="genero" component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup
                className="genero"
                name="var_genero"
                value={var_genero}
                onChange={(e) => setVar_genero(e.target.value)}
                row
                sx={{
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                }}
              >
                <FormControlLabel
                  value="Masculino"
                  control={<Radio />}
                  label="Masculino"
                />
                <FormControlLabel
                  value="Femenino"
                  control={<Radio />}
                  label="Femenino"
                />
                <FormControlLabel
                  value="Otro"
                  control={<Radio />}
                  label="Otro"
                />
                <FormControlLabel
                  value="Prefiero no decirlo"
                  control={<Radio />}
                  label="Prefiero no decirlo"
                />
              </RadioGroup>
            </FormControl>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Grupo Étnico:
            </Typography>
            <TextField
              select
              name="var_grupoEtnico"
              value={var_grupoEtnico}
              onChange={(e) => setVar_grupoEtnico(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            >
              {gruposEtnicos.map((grupo) => (
                <MenuItem key={grupo} value={grupo}>
                  {grupo}
                </MenuItem>
              ))}
            </TextField>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              {" "}
              Grupo Sanguíneo:{" "}
            </Typography>
            <TextField
              select
              name="var_rh"
              variant="outlined"
              value={var_rh}
              onChange={(e) => setVar_rh(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
            </TextField>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Correo Electrónico Personal:
            </Typography>

            <TextField
              value={var_correoElectronicoPersonal}
              onChange={(e) => {
                const valor = e.target.value;
                setVar_correoElectronicoPersonal(valor);

                // Validar si el campo está vacío o tiene un formato incorrecto
                const esCorreoValido =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    valor
                  );

                if (!valor) {
                  setErrorCorreoElectronico(true); // Si el campo está vacío, hay error
                } else if (!esCorreoValido) {
                  setErrorCorreoElectronico(true); // Si el formato no es válido, hay error
                } else {
                  setErrorCorreoElectronico(false); // Si el correo es válido, no hay error
                }
              }}
              fullWidth
              error={errorCorreoElectronico} // Mostrar borde rojo si hay error
              helperText={
                errorCorreoElectronico
                  ? var_correoElectronicoPersonal
                    ? "Formato de correo no válido" // Mostrar error de formato si no es válido
                    : "Este campo es obligatorio" // Mostrar error si está vacío
                  : ""
              } // Mensaje de error
              sx={{ mb: 2 }}
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
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Nombre contacto de Emergencia:
            </Typography>
            <TextField
              value={var_contactoEmergencia}
              onKeyPress={(event) =>
                handleKeyPress(event, "var_contactoEmergencia")
              }
              onChange={(e) => {
                const valor = e.target.value.toUpperCase();
                setVar_contactoEmergencia(valor);

                // Validar si el campo está vacío al cambiar el valor
                validarCampoRequerido(valor, setErrorNombreContactoEmergencia);
              }}
              error={errorNombreContactoEmergencia} // Mostrar borde rojo si hay error
              helperText={
                errorNombreContactoEmergencia ? "Este campo es obligatorio" : ""
              } // Mensaje de error
              fullWidth
              sx={{ mb: 2 }}
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
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Teléfono de contacto de emergencia:
            </Typography>
            <TextField
              value={var_telefonoEmergencia}
              sx={{ mb: 2 }}
              fullWidth
              onChange={(e) => {
                const valor = e.target.value;
                setVar_telefonoEmergencia(valor);

                // Validar si el campo está vacío al cambiar el valor
                validarCampoRequerido(valor, setErrorTelefonoEmergencia);
              }}
              error={errorTelefonoEmergencia} // Mostrar borde rojo si hay error
              helperText={
                errorTelefonoEmergencia ? "Este campo es obligatorio" : ""
              } // Mensaje de error
              onKeyPress={(event) =>
                handleKeyPress(event, "var_telefonoEmergencia")
              } // Validación de solo letras
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
                inputProps: {
                  maxLength: 10, // Definir el máximo de caracteres (ajusta el número según lo que necesites)
                },
              }}
            />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{ backgroundColor: "#202B52", fontFamily: "poppins" }}
                variant="contained"
                type="submit"
              >
                Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompEditarUsuario;
