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
    var_telefonoFijo: "",
    var_contrasena: "",
    confirmar_contrasena: ""
  });
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const navigate = useNavigate();

  const [touched, setTouched] = useState(false); // Estado para rastrear si el formulario fue modificado
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Validar solo si el formulario ha sido "tocado"
    if (touched) {
      const nuevosErrores = {};
      if (!formData.var_nombreCompleto.trim())
        nuevosErrores.var_nombreCompleto = "El nombre completo es obligatorio";
      if (!formData.int_tipoDocumentoFK)
        nuevosErrores.int_tipoDocumentoFK = "El tipo de documento es obligatorio";
      if (!formData.var_numeroDocumento.trim())
        nuevosErrores.var_numeroDocumento = "El número de documento es obligatorio";
      if (!formData.date_fechaNacimiento)
        nuevosErrores.date_fechaNacimiento = "La fecha de nacimiento es obligatoria";
      if (!formData.var_genero)
        nuevosErrores.var_genero = "El género es obligatorio";
      if (!formData.var_correoElectronicoPersonal.trim())
        nuevosErrores.var_correoElectronicoPersonal = "El correo electrónico personal es obligatorio";
      if (!formData.var_rh.trim())
        nuevosErrores.var_rh = "El grupo sanguineo es obligatorio es obligatorio";
      if (!formData.var_grupoEtnico.trim())
        nuevosErrores.var_grupoEtnico = "El grupo etnico es obligatorio es obligatorio";
      if (!formData.var_contrasena.trim())
        nuevosErrores.var_contrasena = "La contraseña es obligatoria";
      if (formData.var_contrasena !== formData.confirmar_contrasena)
        nuevosErrores.confirmar_contrasena = "Las contraseñas no coinciden";

      setErrors(nuevosErrores);
    }
  }, [formData, touched]); // El efecto se ejecuta cuando cambia el formulario o se toca

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Marcar el formulario como tocado cuando se modifique por primera vez
    if (!touched) setTouched(true);
  };


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



  const manejarEnvio = async (event) => {
    event.preventDefault();


    // Validación de contraseñas
    if (formData.var_contrasena !== formData.confirmar_contrasena) {
      console.error("Las contraseñas no coinciden.");
      return;
    }

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
      <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "50px auto" }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "500" }}> Formulario de Usuario </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={manejarEnvio}>
            <Typography variant="h6">Nombre Completo:</Typography>
            <TextField name="var_nombreCompleto" variant="outlined" value={formData.var_nombreCompleto} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.var_nombreCompleto} helperText={errors.var_nombreCompleto} />
            <Typography variant="h6">Tipo de Documento:</Typography>
            <TextField select name="int_tipoDocumentoFK" label="" variant="outlined" value={formData.int_tipoDocumentoFK} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.int_tipoDocumentoFK} helperText={errors.int_tipoDocumentoFK} >
              {tiposDocumento.map((option) => (
                <MenuItem key={option.id_tipoDocumentoPK} value={option.id_tipoDocumentoPK}> {option.var_nombreDocumento} </MenuItem>
              ))}
            </TextField>
            <Typography variant="h6">Número de Documento:</Typography>
            <TextField name="var_numeroDocumento" variant="outlined" value={formData.var_numeroDocumento} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.var_numeroDocumento} helperText={errors.var_numeroDocumento} />
            <Typography variant="h6">Fecha de Nacimiento:</Typography>
            <TextField name="date_fechaNacimiento" type="date" variant="outlined" value={formData.date_fechaNacimiento} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} error={!!errors.date_fechaNacimiento} helperText={errors.date_fechaNacimiento} />
            <Typography variant="h6">Género:</Typography>
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <RadioGroup name="var_genero" value={formData.var_genero} onChange={handleInputChange} row error={!!errors.var_genero} helperText={errors.var_genero}  >
                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
                <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
              </RadioGroup>
            </FormControl>
            <Typography variant="h6">Grupo Sanguíneo:</Typography>
            <TextField select name="var_rh" variant="outlined" value={formData.var_rh} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.var_rh} helperText={errors.var_rh} >
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
            <TextField select name="var_grupoEtnico" value={formData.var_grupoEtnico} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.var_grupoEtnico} helperText={errors.var_grupoEtnico} >
              {gruposEtnicos.map(grupo => (
                <MenuItem key={grupo} value={grupo}>
                  {grupo}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="h6">Correo Electrónico Personal:</Typography>
            <TextField name="var_correoElectronicoPersonal" type="email" variant="outlined" value={formData.var_correoElectronicoPersonal} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.var_correoElectronicoPersonal} helperText={errors.var_correoElectronicoPersonal} />
            <Typography variant="h6">Correo Electrónico Institucional:</Typography>
            <TextField name="var_correoElectronicoInstitucional" type="email" variant="outlined" value={formData.var_correoElectronicoInstitucional} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.var_correoElectronicoInstitucional} helperText={errors.var_correoElectronicoInstitucional} />
            <Typography variant="h6">Celular:</Typography>
            <TextField name="var_celular" variant="outlined" value={formData.var_celular} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.var_celular} helperText={errors.var_celular} />
            <Typography variant="h6">Telefono fijo:</Typography>
            <TextField name="var_telefonoFijo" variant="outlined" value={formData.var_telefonoFijo} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.var_telefonoFijo} helperText={errors.var_telefonoFijo} />
            <Typography variant="h6">Contraseña:</Typography>
            <TextField name="var_contrasena" type="password" variant="outlined" value={formData.var_contrasena} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.var_contrasena} helperText={errors.var_contrasena} />
            <Typography variant="h6">Confirmar Contraseña:</Typography>
            <TextField name="confirmar_contrasena" type="password" variant="outlined" value={formData.confirmar_contrasena} onChange={handleInputChange} fullWidth sx={{ mb: 2 }} error={!!errors.confirmar_contrasena} helperText={errors.confirmar_contrasena} />

            <Button color="primary" variant="contained" type="submit"> Enviar </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VistaDatosUsuario;
