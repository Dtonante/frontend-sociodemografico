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

const URI_SERVICIO_SALUD_ADICIONAL =
  "http://localhost:3001/servicioSaludAdicional/";

const CompEditarServiciosDeSaludAdicional = () => {
  const [
    var_nombreServicioDeSaludAdicional,
    setVar_nombreServicioDeSaludAdicional,
  ] = useState("");
  const navigate = useNavigate();
  const { id_servicioDeSaludAdicionalPK } = useParams();
  const [error, setError] = useState(false);
  const [errorNombreServicioSalud, setErrorNombreServicioSalud] = useState(false);


  //procedimiento para actualizar
  const actualizar = async (e) => {
    e.preventDefault();

    const camposObligatorios = [
      {
        nombre: "var_nombreServicioDeSaludAdicional",
        valor: var_nombreServicioDeSaludAdicional,
      },
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
          await axios.put(
            URI_SERVICIO_SALUD_ADICIONAL + id_servicioDeSaludAdicionalPK,
            {
              var_nombreServicioDeSaludAdicional:
                var_nombreServicioDeSaludAdicional,
            }
          );
          show_alert("Cambios guardados exitosamente", "success");
          navigate("/app/serviciosSaludAdicional");
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
    getServiciosDeSaludAdicional();
  }, []);

  const getServiciosDeSaludAdicional = async () => {
    const res = await axios.get(
      URI_SERVICIO_SALUD_ADICIONAL + id_servicioDeSaludAdicionalPK
    );
    setVar_nombreServicioDeSaludAdicional(
      res.data.var_nombreServicioDeSaludAdicional
    );
  };

  const handleGoBack = () => {
    navigate("/app/serviciosSaludAdicional");
<<<<<<< HEAD
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
        <img
          src="public/fondo_form.png"
          alt="Descripción de la imagen"
          style={{ width: "20%", height: "auto" }}
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
                fontSize: "30px",
                fontWeight: "500",
                textAlign: "center",
                color: "#202B52",
                fontFamily: "Roboto Condensed",
              }}
            >
              <strong>Editar servicio adicional</strong>
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
              Nombre del servicio adicional:
            </Typography>
            <TextField
              value={var_nombreServicioDeSaludAdicional}
              //   onChange={(e) =>
              //     setVar_nombreServicioDeSaludAdicional(e.target.value)
              //   }
              onKeyPress={(event) =>
                handleKeyPress(event, "var_nombreServicioDeSaludAdicional")
              }
              onChange={(e) => {
                const valor = e.target.value;
                setVar_nombreServicioDeSaludAdicional(valor);

                // Validar si el campo está vacío al cambiar el valor
                validarCampoRequerido(valor, setErrorNombreServicioSalud);
              }}
              error={errorNombreServicioSalud} // Mostrar borde rojo si hay error
              helperText={
                errorNombreServicioSalud ? "Este campo es obligatorio" : ""
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
=======
    };
   
    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
           
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "30px", fontWeight: "500", textAlign: "center", color: "#202B52", fontFamily: "Roboto Condensed" }}>
                            <strong>Editar servicio adicional</strong>
                        </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: "5%", marginRight: "5%", borderColor: "#202B52" }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={actualizar}>
    
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Nombre del servicio adicional:</Typography>
                        <TextField
                            value={var_nombreServicioDeSaludAdicional}
                            onChange={(e) => setVar_nombreServicioDeSaludAdicional(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />
    
                        <div style={{ display: "flex", justifyContent: "flex-end", gap:"10px" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit">
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
>>>>>>> ea3cf1462f650f680d2be512dc3c80e215cb20dd

export default CompEditarServiciosDeSaludAdicional;
