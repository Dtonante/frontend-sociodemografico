

import React, { useState } from "react";
import { Grid, Box, Typography, Card, CardContent, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecuperarContrasena = () => {
  const [formData, setFormData] = useState({ var_correoElectronicoPersonal: "" });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { var_correoElectronicoPersonal } = formData;

    if (!var_correoElectronicoPersonal) {
      setError("Por favor, ingresa tu correo electrónico.");
      setMensaje("");
      return;
    }

    try {
      // Realiza la petición GET con axios
      const response = await axios.get(
        `http://localhost:3001/usuarios/buscar/${var_correoElectronicoPersonal}`
      );
      
      console.log(response.data); // Verifica la respuesta completa
      console.log(response.status); // Verifica el código de estado

      if (response.status === 200) {
        const data = response.data;
      
        // Verifica si la respuesta contiene datos de usuario
        if (data && data.var_correoElectronicoPersonal === var_correoElectronicoPersonal) {
          setMensaje("Correo verificado. Por favor, revisa tu bandeja de entrada.");
          setError("");
        } else {
          setError("El correo no está registrado.");
          setMensaje("");
        }
      } else {
        setError("Error al verificar el correo. Intenta nuevamente más tarde.");
        setMensaje("");
      }
    } catch (err) {
      setError("Error al conectar con el servidor. Verifica tu conexión.");
      setMensaje("");
    }
  };

  const handleBack = () => {
    navigate("/login")
  };

  return (
    <Grid container direction="column" style={{ minHeight: "100vh", backgroundColor: "#F2F2F2" }}>
      <Grid item xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
        <Box style={{  backgroundImage: `url('public/fondo_login.jpg')`,  backgroundSize: "cover", backgroundPosition: "center",  width: "60%",  height: "34.5vh",  margin: "0 auto", borderRadius: "10px", }} />
        <Box mt={3}>
          <img src="public/logo_form.png" alt="Logo Esumer" style={{ width: "20%",  height: "auto", }}  />
        </Box>
      </Grid>
      <Grid item  xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1, }} >
        <Grid item xs={10} sm={8} md={4}>
          <Card variant="outlined" style={{ backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Typography variant="h5" align="center" color="primary" gutterBottom>
                  Recuperar Contraseña
                </Typography>
                <TextField label="Correo Electrónico" name="var_correoElectronicoPersonal" variant="outlined" fullWidth margin="normal"  value={formData.var_correoElectronicoPersonal} onChange={handleChange} style={{ backgroundColor: "#F2F2F2" }} />
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
                {/* botones */}
                <Box mt={2}>
                  <Button type="submit" variant="contained" style={{ backgroundColor: "#202B52" }} fullWidth > Recuperar Contraseña </Button>
                </Box>
                <Box mt={2}>
                  <Button variant="contained"  style={{ backgroundColor: "#00A5CE" }}  fullWidth  onClick={handleBack} >  Atrás </Button>
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
