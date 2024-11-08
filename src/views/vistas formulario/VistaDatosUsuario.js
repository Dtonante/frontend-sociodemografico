import { Card, CardContent, Divider, Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid, RadioGroup, Radio, FormControl, MenuItem } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VistaDatosUsuario = () => {
  const [formData, setFormData] = React.useState({
    var_nombreCompleto: "",
    int_tipoDocumentoFK: "",
    var_numeroDocumento: "",
    var_genero: "",
    var_correoElectronicoPersonal: "",
    var_correoElectronicoInstitucional: "",
    var_rh: "",
    var_grupoEtnico: "",
    date_fechaNacimiento: "",
    var_celular: "",
    var_telefonoFijo: ""
  });


  const [tiposDocumento, setTiposDocumento] = useState([]);
  const navigate = useNavigate();


  // Función para obtener los tipos de documentos desde el servidor
  useEffect(() => {
    const fetchTiposDocumento = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tipodocumentos/");
        setTiposDocumento(response.data);
      } catch (error) {
        console.error("Error al obtener los tipos de documentos:", error);
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
    "Ninguno"
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const manejarEnvio = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/usuarios/", formData);
      console.log("Usuario creado:", response.data);

      // Obtén el ID del nuevo usuario de la respuesta
      const nuevoUsuarioId = response.data.id_usuarioPK;

      // Almacena el ID en localStorage
      localStorage.setItem('usuarioId', nuevoUsuarioId);

      localStorage.setItem('var_rh', formData.var_rh);
      localStorage.setItem('var_grupoEtnico', formData.var_grupoEtnico);
      localStorage.setItem('date_fechaNacimiento', formData.date_fechaNacimiento);
      localStorage.setItem('var_celular', formData.var_celular);
      localStorage.setItem('var_telefonoFijo', formData.var_telefonoFijo);

      navigate("/datosProfesional");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };


  return (
    <div >
      <Card variant="outlined" sx={{  p: 0,  width: "100%",  maxWidth: 800,  margin: "50px auto" }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
              Formulario de Usuario
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={manejarEnvio}>
            <Typography variant="h6">Nombre Completo:</Typography>
            <TextField name="var_nombreCompleto" variant="outlined" value={formData.var_nombreCompleto} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
            <Typography variant="h6">Tipo de Documento:</Typography>
            <TextField select name="int_tipoDocumentoFK" label="" variant="outlined" value={formData.int_tipoDocumentoFK} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} >
              {tiposDocumento.map((option) => (
                <MenuItem key={option.id_tipoDocumentoPK} value={option.id_tipoDocumentoPK}> {option.var_nombreDocumento} </MenuItem>
              ))}
            </TextField>
            <Typography variant="h6">Número de Documento:</Typography>
            <TextField name="var_numeroDocumento" variant="outlined" value={formData.var_numeroDocumento} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
            <Typography variant="h6">Fecha de Nacimiento:</Typography>
            <TextField name="date_fechaNacimiento" type="date" variant="outlined" value={formData.date_fechaNacimiento} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
            <Typography variant="h6">Género:</Typography>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup name="var_genero" value={formData.var_genero} onChange={handleInputChange} row >
                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
                <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
              </RadioGroup>
            </FormControl>
            <Typography variant="h6">Grupo Sanguíneo:</Typography>
            <TextField select name="var_rh" variant="outlined" value={formData.var_rh} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
            </TextField>
            <Typography variant="h6">Grupo Étnico:</Typography>
            <TextField select name="var_grupoEtnico" value={formData.var_grupoEtnico} onChange={handleInputChange} fullWidth sx={{ mb: 2 }}>
              {gruposEtnicos.map(grupo => (
                <MenuItem key={grupo} value={grupo}>
                  {grupo}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="h6">Correo Electrónico Personal:</Typography>
            <TextField name="var_correoElectronicoPersonal" type="email" variant="outlined" value={formData.var_correoElectronicoPersonal} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
            <Typography variant="h6">Correo Electrónico Institucional:</Typography>
            <TextField name="var_correoElectronicoInstitucional" type="email" variant="outlined" value={formData.var_correoElectronicoInstitucional} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
            <Typography variant="h6">Celular:</Typography>
            <TextField name="var_celular" variant="outlined" value={formData.var_celular} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />
            <Typography variant="h6">Telefono fijo:</Typography>
            <TextField name="var_telefonoFijo" variant="outlined" value={formData.var_telefonoFijo} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} />

            <Button color="primary" variant="contained" type="submit"> Enviar </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VistaDatosUsuario;
