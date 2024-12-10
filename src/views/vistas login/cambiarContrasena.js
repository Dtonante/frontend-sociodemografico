import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import show_alert from "../../components/showAlert/alertFuntion";
import axios from "axios";

const URI_USUARIO = "http://localhost:3001/usuarios/";

const CambiarContrasena = () => {
  const [formData, setFormData] = useState({
    var_contrasenaNueva: "",
    var_contrasenaConfirmada: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(""); // Estado para errores generales
  const [mensaje, setMensaje] = useState("");
  const [contrasenaActual, setContrasenaActual] = useState(""); // Nueva variable
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    if (id) {
      setUserId(id);
      obtenerContrasenaActual(id); // Obtener la contraseña actual al cargar
    }
  }, [location]);

  const obtenerContrasenaActual = async (id) => {
    try {
      const response = await axios.get(`${URI_USUARIO}${id}`);
      if (response.status === 200) {
        setContrasenaActual(response.data.var_contrasena); // Guardar la contraseña actual
      }
    } catch (error) {
      show_alert("Error al obtener los datos del usuario.", "error");
    }
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name === "var_contrasenaNueva") {
      if (!value.trim()) {
        newErrors[name] = "Este campo es obligatorio.";
      } else if (value === contrasenaActual) {
        newErrors[name] = "La nueva contraseña debe ser diferente a la actual.";
      } else if (value.length < 8) {
        newErrors.var_contrasenaNueva =
          "La contraseña debe tener al menos 8 caracteres.";
      } else if (!/[A-Z]/.test(value)) {
        newErrors.var_contrasenaNueva =
          "La contraseña debe incluir al menos una letra mayúscula.";
      } else if (!/[a-z]/.test(value)) {
        newErrors.var_contrasenaNueva =
          "La contraseña debe incluir al menos una letra minúscula.";
      } else if (!/[0-9]/.test(value)) {
        newErrors.var_contrasenaNueva =
          "La contraseña debe incluir al menos un número.";
      } else {
        delete newErrors.var_contrasenaNueva;
      }
    }

    if (name === "var_contrasenaConfirmada") {
      if (value !== formData.var_contrasenaNueva) {
        newErrors.var_contrasenaConfirmada = "Las contraseñas no coinciden.";
      } else {
        delete newErrors.var_contrasenaConfirmada;
      }
    }

    setErrors(newErrors);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleCambiarContrasena = async (event) => {
    event.preventDefault();
    setError("");
    setMensaje("");

    // Validaciones antes de la llamada al backend
    if (!formData.var_contrasenaNueva || !formData.var_contrasenaConfirmada) {
      show_alert("Por favor, completa todos los campos.", "error");
      return;
    }

    if (formData.var_contrasenaNueva === contrasenaActual) {
      show_alert("La nueva contraseña no puede ser igual a la actual.", "error");
      return;
    }

    if (formData.var_contrasenaNueva !== formData.var_contrasenaConfirmada) {
      show_alert("Las contraseñas no coinciden.", "error");
      return;
    }

    try {
      // Realizar la petición PUT para cambiar la contraseña
      const response = await axios.put(`${URI_USUARIO}${userId}`, {
        var_contrasena: formData.var_contrasenaNueva,
      });

      if (response.status === 200) {
        show_alert("Contraseña cambiada exitosamente.", "success");
        navigate("/login");
      } else if (response.data.message === "La nueva contraseña no puede ser igual a la actual.") {
        show_alert("La nueva contraseña no puede ser igual a la actual.", "error");
      } else {
        show_alert("Error al cambiar la contraseña.", "error");
      }
    } catch (error) {
      // Verifica si la respuesta fue un error por la conexión
      if (error.response && error.response.status === 400) {
        show_alert("La nueva contraseña no puede ser igual a la actual.", "error");
      } else {
        show_alert("Error al conectar con el servidor.", "error");
      }
    }
  };


  const atras = () => {
    navigate("/login");
  };

  return (
    <Grid
      container
      direction="column"
      style={{ minHeight: "100vh", backgroundColor: "#F2F2F2" }}
    >
      <Grid item xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
        <Box
          style={{
            backgroundImage: `url('public/fondo_login.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "60%",
            height: "34.5vh",
            margin: "0 auto",
            borderRadius: "10px",
          }}
        />
        <Box mt={3}>
          <img
            src="public/logo_form.png"
            alt="Descripción de la imagen"
            style={{ width: "20%", height: "auto" }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Grid item xs={10} sm={8} md={4}>
          <Card
            variant="outlined"
            style={{ backgroundColor: "#F2F2F2", borderColor: "#202B52" }}
          >
            <CardContent>
              <form onSubmit={handleCambiarContrasena}>
                <Typography
                  variant="h5"
                  align="center"
                  color="primary"
                  gutterBottom
                >
                  Cambiar Contraseña
                </Typography>
                <TextField
                  label="Contraseña Nueva"
                  name="var_contrasenaNueva"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.var_contrasenaNueva}
                  onChange={handleChange}
                  style={{ backgroundColor: "#F2F2F2" }}
                />
                {errors.var_contrasenaNueva && (
                  <Typography color="error" variant="body2">
                    {errors.var_contrasenaNueva}
                  </Typography>
                )}
                <TextField
                  label="Confirmar Contraseña"
                  name="var_contrasenaConfirmada"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.var_contrasenaConfirmada}
                  onChange={handleChange}
                  style={{ backgroundColor: "#F2F2F2" }}
                />
                {errors.var_contrasenaConfirmada && (
                  <Typography color="error" variant="body2">
                    {errors.var_contrasenaConfirmada}
                  </Typography>
                )}
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#202B52" }}
                    fullWidth
                  >
                    Cambiar Contraseña
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#00A5CE" }}
                    fullWidth
                    onClick={atras}
                  >
                    Atrás
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CambiarContrasena;
