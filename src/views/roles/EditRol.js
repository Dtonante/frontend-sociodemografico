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

import { showAlert, show_alert } from "../../components/showAlert/alertFuntion"; // Asegúrate de importar las funciones

const URI_ROL = "https://evaluacion.esumer.edu.co/api/roles/";

const CompEditarRol = () => {
  const [var_nombreRol, setVar_nombreRol] = useState("");
  const navigate = useNavigate();
  const { id_rolPK } = useParams();
  const [errorNombreRol, setErrorNombreRol] = useState(false);
  const [error, setError] = useState(false);


  //procedimiento para actualizar
  const actualizar = async (e) => {
    e.preventDefault();

    const camposObligatorios = [
      { nombre: "var_nombreRol", valor: var_nombreRol}
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
          await axios.put(URI_ROL + id_rolPK, {
            var_nombreRol: var_nombreRol,
          });
          show_alert("Cambios guardados exitosamente", "success");
          navigate("/app/roles");
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
    getRol();
  }, []);

  const handleGoBack = () => {
    navigate("/app/roles");
  };

  const getRol = async () => {
    const res = await axios.get(URI_ROL + id_rolPK);
    setVar_nombreRol(res.data.var_nombreRol);
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
      fieldName === "var_nombreRol" 
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
        <p>Edita la información necesaria y al final del formulario pulsa el botón GUARDAR para conservar los cambios.</p>
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
                fontFamily: "poppins",
              }}
            >
              <strong>Editar Rol</strong>
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
              Nombre del Rol:
            </Typography>
            <TextField
              value={var_nombreRol}
              // onChange={(e) => setVar_nombreRol(e.target.value)}
              onKeyPress={(event) => handleKeyPress(event, "var_nombreRol")}
              onChange={(e) => {
                const valor = e.target.value.toUpperCase();
                setVar_nombreRol(valor);

                // Validar si el campo está vacío al cambiar el valor
                validarCampoRequerido(valor, setErrorNombreRol);
              }}
              error={errorNombreRol} // Mostrar borde rojo si hay error
              helperText={errorNombreRol ? "Este campo es obligatorio" : ""} // Mensaje de error
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
                Guardar
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

export default CompEditarRol;
