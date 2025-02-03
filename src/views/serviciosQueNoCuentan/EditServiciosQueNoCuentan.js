import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import {showAlert,show_alert} from '../../components/showAlert/alertFuntion'

const URI_SERVICIO_QUE_NO_CUENTAN =
  "https://evaluacion.esumer.edu.co/api/serviciosQueNoCuentan/";

const CompEditarServiciosQueNoCuentan = () => {
  const [var_nombreServicioQueNoCuenta, setVar_nombreServicioQueNoCuenta] =
    useState("");
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/app/serviciosQueNoCuentan");
  };
  const { id_servicioQueNoCuentaPK } = useParams();
  const [errorServicioQueNoCuenta, setErrorServicioQueNoCuenta] = useState(false);
  const [error, setError] = useState(false);



  //procedimiento para actualizar
  const actualizar = async (e) => {
    e.preventDefault();

    const camposObligatorios = [
      { nombre: "var_nombreServicioQueNoCuenta", valor: var_nombreServicioQueNoCuenta}
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
          await axios.put(URI_SERVICIO_QUE_NO_CUENTAN + id_servicioQueNoCuentaPK, {
            var_nombreServicioQueNoCuenta: var_nombreServicioQueNoCuenta,
          });
          show_alert("Cambios guardados exitosamente", "success");
          navigate("/app/serviciosQueNoCuentan");
        } catch (error) {
          show_alert("Error al guardar los cambios", "error");
        }
      },
      () => {
        show_alert("Cambios cancelados", "info");
      }
    );
    
    
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

  const handleKeyPress = (event, fieldName) => {
    let regex;

    if (
      fieldName === "var_nombreServicioQueNoCuenta" 
    ) {
      // Solo permitimos letras (incluyendo acentos y ñ) y espacios
      regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    }

    // Verificamos si se ha definido una expresión regular para el campo
    if (regex && !regex.test(event.key)) {
      event.preventDefault(); // Evita la entrada de caracteres no válidos
      return; // Salimos de la función si el carácter no es válido
    }
  };

  useEffect(() => {
    getServiciosQueNoCuentan();
  }, []);

  const getServiciosQueNoCuentan = async () => {
    const res = await axios.get(
      URI_SERVICIO_QUE_NO_CUENTAN + id_servicioQueNoCuentaPK
    );
    setVar_nombreServicioQueNoCuenta(res.data.var_nombreServicioQueNoCuenta);
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
        style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}
      >
        <p>
          Edita la información necesaria y al final del formulario pulsa el
          botón GUARDAR para conservar los cambios.
        </p>
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
                fontSize: "30px",
                fontWeight: "500",
                textAlign: "center",
                color: "#202B52",
                fontFamily: "Roboto Condensed",
              }}
            >
              <strong>Editar servicio que no cuenta</strong>
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
              Nombre del servicio que no cuenta:
            </Typography>
            <TextField
              value={var_nombreServicioQueNoCuenta}
              
              onKeyPress={(event) => handleKeyPress(event, "var_nombreServicioQueNoCuenta")}
              onChange={(e) => {
                const valor = e.target.value;
                setVar_nombreServicioQueNoCuenta(valor);

                // Validar si el campo está vacío al cambiar el valor
                validarCampoRequerido(valor, setErrorServicioQueNoCuenta);
              }}
              error={errorServicioQueNoCuenta} // Mostrar borde rojo si hay error
              helperText={errorServicioQueNoCuenta ? "Este campo es obligatorio" : ""} // Mensaje de error
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

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                sx={{ backgroundColor: "#202B52", fontFamily: "poppins" }}
                variant="contained"
                type="submit"
              >
                Actualizar
              </Button>
              <Button
                sx={{ backgroundColor: "#ff0000", fontFamily: "poppins" }}
                variant="contained"
                onClick={handleGoBack}
              >
                Volver
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompEditarServiciosQueNoCuentan;
