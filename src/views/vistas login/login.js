import React, { useState } from "react";
import { Card, CardContent, TextField, Button, Typography, Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const response = await axios.post("http://localhost:3001/login/", formData);
      
      // Redirigir al usuario a la página de inicio después del inicio de sesión exitoso
      navigate("/app");
    } catch (error) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={4}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Iniciar Sesión
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                label="Correo Electrónico"
                name="var_correoElectronicoPersonal"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.var_correoElectronicoPersonal} 
                onChange={handleChange}
              />
              <TextField
                label="Contraseña"
                name="var_contrasena" 
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.var_contrasena}
                onChange={handleChange}
              />
              {error && (
                <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Box mt={3} display="flex" justifyContent="center">
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Iniciar Sesión
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
