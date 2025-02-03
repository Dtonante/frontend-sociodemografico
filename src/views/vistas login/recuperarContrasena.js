
import React, { useState } from "react";
import { Grid, Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URI_RECUPERAR_CONTRASENA = "https://evaluacion.esumer.edu.co/api/usuarios/correo/";

const RecuperarContrasena = () => {
  const [formData, setFormData] = useState({
    var_correoElectronicoPersonal: "",
    var_numeroDocumento: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { var_correoElectronicoPersonal, var_numeroDocumento } = formData;

    if (!var_correoElectronicoPersonal || !var_numeroDocumento) {
      setError("Por favor, ingresa ambos campos.");
      setMensaje("");
      return;
    }

    try {
      // Realiza la petición GET con axios
      const response = await axios.get(
        `${URI_RECUPERAR_CONTRASENA}${var_correoElectronicoPersonal}`
      );

      if (response.status === 200) {
        const usuario = response.data;

        // Verificar que la cédula proporcionada coincide con la del usuario
        if (usuario.var_numeroDocumento === var_numeroDocumento) {
          setMensaje("Credenciales correctas. Redirigiendo...");
          setError("");

          // Redirigir a la siguiente vista (reemplaza con la ruta correcta)
          navigate(`/CambiarContrasena?id=${usuario.id_usuarioPK}`);
        } else {
          setError("La cédula no coincide con el correo electrónico proporcionado.");
          setMensaje("");
        }
      } else {
        setError("Usuario no encontrado con ese correo.");
        setMensaje("");
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Verifica tu conexión.");
      setMensaje("");
    }
  };

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <Grid container direction="column" style={{ minHeight: "100vh", backgroundColor: "#F2F2F2" }}>
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
            alt="Logo Esumer"
            style={{ width: "20%", height: "auto" }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}
      >
        <Grid item xs={10} sm={8} md={4}>
          <Card variant="outlined" style={{ backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Typography variant="h5" align="center" color="primary" gutterBottom>
                  Recuperar Contraseña
                </Typography>
                <TextField
                  label="Correo Electrónico"
                  name="var_correoElectronicoPersonal"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.var_correoElectronicoPersonal}
                  onChange={handleChange}
                  style={{ backgroundColor: "#F2F2F2" }}
                />
                <TextField
                  label="Cédula"
                  name="var_numeroDocumento"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.var_numeroDocumento}
                  onChange={handleChange}
                  style={{ backgroundColor: "#F2F2F2" }}
                />
                {error && (
                  <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
                {mensaje && (
                  <Typography color="primary" variant="body2" align="center" sx={{ mt: 1 }}>
                    {mensaje}
                  </Typography>
                )}
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#202B52" }}
                    fullWidth
                  >
                    Confirmar
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#00A5CE" }}
                    fullWidth
                    onClick={handleBack}
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

export default RecuperarContrasena;

