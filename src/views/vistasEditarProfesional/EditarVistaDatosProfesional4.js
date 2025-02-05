import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { showAlert, show_alert } from "../../components/showAlert/alertFuntion"; // Asegúrate de importar las funciones

const URI_PROFESIONAL = "https://evaluacion.esumer.edu.co/api/profesional/";
const URI_PROFESIONAL_POR_ID_USUARIO =
  "https://evaluacion.esumer.edu.co/api/profesional/porUsuario/";

const EditarDatosProfesional4 = () => {
  const [id_profesionalPK, setId_profesionalPK] = useState();
  const [id_cuentaBancariaFK, setId_cuentaBancariaFK] = useState();
  const [var_tipoCuenta, setVar_tipoCuenta] = useState("");
  const [var_numeroCuenta, setVar_numeroCuenta] = useState("");
  const [selectedBanco, setSelectedBanco] = useState("");
  const [bancos, setBancos] = useState([]);
  const [errorNumeroCuenta, setErrorNumeroCuenta] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Obtener el ID desde localStorage
  const id_usuarioPK = localStorage.getItem("id_usuario");

  // Procedimiento para actualizar
  const actualizar = async (e) => {
    e.preventDefault();

    // Definimos los campos obligatorios a validar
    const camposObligatorios = [
      { nombre: "var_numeroCuenta", valor: var_numeroCuenta },
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
          await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            id_cuentaBancariaFK: selectedBanco,
            var_tipoCuenta: var_tipoCuenta,
            var_numeroCuenta: var_numeroCuenta,
          });
          navigate("/app/editarDatosProfesional4");
          show_alert("Cambios guardados exitosamente", "success");
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
    const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
    setId_profesionalPK(res.data.id_profesionalPK);
    setId_cuentaBancariaFK(res.data.id_cuentaBancariaFK);
    setVar_tipoCuenta(res.data.var_tipoCuenta);
    setVar_numeroCuenta(res.data.var_numeroCuenta);
  };

  const manejarCambio = (event) => {
    const { value } = event.target;
    setSelectedBanco(value); // Esto actualiza el estado de selectedBanco
  };

  // useEffect para obtener los bancos desde el servidor
  useEffect(() => {
    const fetchBancos = async () => {
      try {
        const response = await axios.get(
          "https://evaluacion.esumer.edu.co/api/cuentasBancarias"
        );
        setBancos(response.data);
        // Establecer el banco seleccionado si ya tienes el id_cuentaBancariaFK
        if (id_cuentaBancariaFK) {
          setSelectedBanco(id_cuentaBancariaFK); // Esto hará que se seleccione el banco correcto en el Select
        }
      } catch (error) {
        console.error("Error al obtener los bancos:", error);
      }
    };

    fetchBancos();
  }, [id_cuentaBancariaFK]);

  const validarCampoRequerido = (valor, setError) => {
    if (!valor || valor.trim() === "") {
      setError(true); // Establece el error si el campo está vacío
      return false; // Retorna false para indicar que la validación falló
    } else {
      setError(false); // Si el campo tiene valor, quita el error
      return true; // Retorna true si la validación pasa
    }
  };

  const handleKeyPress = (event, fieldName) => {
    let regex;

    // Validación para campos como teléfono y número de documento (solo números)
    if (fieldName === "var_numeroCuenta") {
      // Solo permitimos números
      regex = /^[0-9]*$/;
    }
    // Verificamos si se ha definido una expresión regular para el campo
    if (regex && !regex.test(event.key)) {
      event.preventDefault(); // Evita la entrada de caracteres no válidos
      return; // Salimos de la función si el carácter no es válido
    }
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
        style={{ textAlign: "center", marginBottom: "1%", marginTop: "-3%", fontFamily: "Poppins", fontSize: "14.8px" }}
      >
        <p>Edita la información necesaria y al final del formulario pulsa el botón <b>GUARDAR</b> para conservar los cambios.</p>
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
              <strong>Datos bancarios</strong>
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
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Roboto Condensed",
                  color: "#202B52",
                  fontSize: "16px",
                }}
              >
                Seleccione su banco:
              </Typography>

              <Select
                name="banco"
                value={selectedBanco}
                onChange={manejarCambio}
                sx={{
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                }}
              >
                {bancos.map((banco) => (
                  <MenuItem
                    key={banco.id_cuentaBancariaPK}
                    value={banco.id_cuentaBancariaPK}
                  >
                    {" "}
                    {banco.var_nombreCuentaBancaria}{" "}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Roboto Condensed",
                  color: "#202B52",
                  fontSize: "16px",
                }}
              >
                Tipo de Cuenta Bancaria:
              </Typography>
              <RadioGroup
                name="tipoCuenta"
                value={var_tipoCuenta}
                onChange={(e) => setVar_tipoCuenta(e.target.value)}
                row
                sx={{
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                }}
              >
                <FormControlLabel
                  value="ahorro"
                  control={<Radio />}
                  label="Ahorro"
                />
                <FormControlLabel
                  value="corriente"
                  control={<Radio />}
                  label="Corriente"
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
              Número de cuenta bancaria:
            </Typography>
            <TextField
              value={var_numeroCuenta}
              //   onChange={(e) => setVar_numeroCuenta(e.target.value)}
              onKeyPress={(event) => handleKeyPress(event, "var_numeroCuenta")}
              onChange={(e) => {
                const valor = e.target.value;
                setVar_numeroCuenta(valor);

                // Validar si el campo está vacío al cambiar el valor
                validarCampoRequerido(valor, setErrorNumeroCuenta);
              }}
              error={errorNumeroCuenta} // Mostrar borde rojo si hay error
              helperText={errorNumeroCuenta ? "Este campo es obligatorio" : ""} // Mensaje de error
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

export default EditarDatosProfesional4;
