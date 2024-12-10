import React, { useState } from "react";
import {  Grid, Card, CardContent, Typography,  TextField,  Button, Box, Link, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URI_LOGEO = 'http://localhost:3001/login/'

const Login = () => {
  const [formData, setFormData] = useState({ var_correoElectronicoPersonal: "", var_contrasena: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    try {
      // Enviar datos de inicio de sesión al backend
      const response = await axios.post(`${URI_LOGEO}`, formData);
      // Guardar el token y el rol en localStorage
      const token = response.data.token; 
      const rol = response.data.rol;
      const idUsuario = response.data.id_usuarioPK; 
      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);
      localStorage.setItem("id_usuario", idUsuario); 
      // Redirigir al usuario a la página de inicio después del inicio de sesión exitoso
      navigate("/app");
    } catch (error) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  const atras = () => {
    navigate("/")
  }

  const olvideContrasena = ( ) => {
    navigate("/RecuperarContrasena")
  }

  return (
    <Grid container direction="column" style={{ minHeight: "100vh", backgroundColor: '#F2F2F2' }}>
      {/* Encabezado con imagen y título */}
      <Grid item xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
        <Box style={{ backgroundImage: `url('public/fondo_login.jpg')`, backgroundSize: "cover", backgroundPosition: "center",  width: "60%",  height: "34.5vh",  margin: "0 auto",  borderRadius: "10px",  }} />
        <Box mt={3}> 
          <img src="public/logo_form.png" alt="Descripción de la imagen" style={{ width: '20%', height: 'auto', }} />
        </Box>
      </Grid>

      {/* Formulario */}
      <Grid item  xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1,  }} >
        <Grid item xs={10} sm={8} md={4} >
          <Card variant="outlined" style={{backgroundColor:'#F2F2F2', borderColor: '#202B52'}}>
            <CardContent>
              <form onSubmit={handleLogin}>
                <TextField label="Usuario" name="var_correoElectronicoPersonal" variant="outlined" fullWidth margin="normal"  value={formData.var_correoElectronicoPersonal}  onChange={handleChange} style={{backgroundColor:'#F2F2F2'}} />
                <TextField label="Contraseña" name="var_contrasena" type="password" variant="outlined" fullWidth margin="normal" value={formData.var_contrasena} onChange={handleChange}  style={{backgroundColor:'#F2F2F2'}} />
                {error && (
                  <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
                {/* botones y link */}
                <Box mt={2} textAlign="center">
                  <Link onClick={olvideContrasena} underline="hover" variant="body2" > ¿Olvidaste tu usuario o contraseña? </Link>
                </Box>
                <Box mt={2}>
                  <Button type="submit" variant="contained" style={{backgroundColor:'#202B52'}} fullWidth > Iniciar sesión </Button>
                </Box>
                <Box mt={2}>
                  <Button variant="contained" style={{backgroundColor:'#00A5CE'}} fullWidth onClick={atras} > Atras </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;