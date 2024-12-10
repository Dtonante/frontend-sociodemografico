import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Divider, Box, Typography, TextField, FormControlLabel,  Checkbox, Button, Grid, RadioGroup, Radio, FormControl, MenuItem} from "@mui/material";

const EditarDatosUsuario = () => {
    // Estado para los datos del usuario
    const [usuarioData, setUsuarioData] = useState(null);
    const [var_nombreCompleto, setVar_nombreCompleto] = useState('');
    const [int_tipoDocumentoFK, setInt_tipoDocumentoFK] = useState('');
    const [var_numeroDocumento, setVar_numeroDocumento] = useState('');
    const [date_fechaNacimiento, setDate_fechaNacimiento] = useState('');
    const [var_genero, setVar_genero] = useState('');
    const [var_rh, setVar_rh] = useState('');
    const [var_correoElectronicoPersonal, setVar_correoElectronicoPersonal] = useState('');
    const [var_celular, setVar_celular] = useState('');
    const [var_contactoEmergencia, setVar_contactoEmergencia] = useState('');
    const [var_telefonoEmergencia, setVar_telefonoEmergencia] = useState('');
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // useEffect para actualizar el tamaño de la ventana
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // useEffect para obtener los datos del usuario desde la API
    useEffect(() => {
        const idUsuario = localStorage.getItem("id_usuario");
        console.log("ya veremos",idUsuario)

        if (idUsuario) {
            const obtenerDatosUsuario = async () => {
                try {
                    const response = await axios.get(`https://evaluacion.esumer.edu.co/api/usuarios/${idUsuario}`);
                    setUsuarioData(response.data);
                    setVar_nombreCompleto(response.data.var_nombreCompleto);
                    setInt_tipoDocumentoFK(response.data.int_tipoDocumentoFK);
                    setVar_numeroDocumento(response.data.var_numeroDocumento);
                    setDate_fechaNacimiento(response.data.date_fechaNacimiento);
                    setVar_genero(response.data.var_genero);
                    setVar_rh(response.data.var_rh);
                    setVar_correoElectronicoPersonal(response.data.var_correoElectronicoPersonal);
                    setVar_celular(response.data.var_celular);
                    setVar_contactoEmergencia(response.data.var_contactoEmergencia);
                    setVar_telefonoEmergencia(response.data.var_telefonoEmergencia);

                    const tiposDocumentoResponse = await axios.get('https://evaluacion.esumer.edu.co/api/tiposDocumento');
                    setTiposDocumento(tiposDocumentoResponse.data);
                } catch (error) {
                    console.error("Error al cargar los datos del usuario.", error);
                }
            };

            obtenerDatosUsuario();
        }
    }, []);


    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }} >
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }} >
                <img src="public/logo_form.png" alt="Descripción de la imagen" style={{ width: windowWidth < 1000 ? "50%" : "20%", height: "auto" }} />
            </div>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center", color: "#202B52", fontFamily: "Roboto Condensed" }}>
                            <strong>Datos personales</strong>
                        </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: "5%", marginRight: "5%", borderColor: "#202B52" }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Nombre Completo:</Typography>
                        <TextField
                            name="var_nombreCompleto"
                            variant="outlined"
                            value={var_nombreCompleto}  // Datos obtenidos de la consulta Axios
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Tipo de Documento:</Typography>
                        <TextField
                            select
                            name="int_tipoDocumentoFK"
                            variant="outlined"
                            value={int_tipoDocumentoFK}  // Datos obtenidos de la consulta Axios
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        >
                            {tiposDocumento.map((option) => (
                                <MenuItem key={option.id_tipoDocumentoPK} value={option.id_tipoDocumentoPK}>
                                    {option.var_nombreDocumento}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Número de Documento:</Typography>
                        <TextField
                            name="var_numeroDocumento"
                            variant="outlined"
                            value={var_numeroDocumento}  // Datos obtenidos de la consulta Axios
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Fecha de Nacimiento:</Typography>
                        <TextField
                            name="date_fechaNacimiento"
                            type="date"
                            variant="outlined"
                            value={date_fechaNacimiento}  // Datos obtenidos de la consulta Axios
                            fullWidth
                            sx={{ mb: 2 }}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Género:</Typography>
                        <FormControl className="genero" component="fieldset" sx={{ mb: 2 }}>
                            <RadioGroup
                                name="var_genero"
                                value={var_genero}  // Datos obtenidos de la consulta Axios
                                row
                                sx={{ height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" }}
                            >
                                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                                <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
                                <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                                <FormControlLabel value="Prefiero no decirlo" control={<Radio />} label="Prefiero no decirlo" />
                            </RadioGroup>
                        </FormControl>
    
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Grupo Sanguíneo:</Typography>
                        <TextField
                            select
                            name="var_rh"
                            variant="outlined"
                            value={var_rh}  // Datos obtenidos de la consulta Axios
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        >
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="O+">O+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                        </TextField>
    
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Correo Electrónico Personal:</Typography>
                        <TextField
                            name="var_correoElectronicoPersonal"
                            type="email"
                            variant="outlined"
                            value={var_correoElectronicoPersonal}  // Datos obtenidos de la consulta Axios
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />
    
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Celular:</Typography>
                        <TextField
                            name="var_celular"
                            variant="outlined"
                            value={var_celular}  // Datos obtenidos de la consulta Axios
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" }, inputProps: { maxLength: 12 } }}
                        />
    
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Nombre del contacto de emergencia</Typography>
                        <TextField
                            name="var_contactoEmergencia"
                            variant="outlined"
                            value={var_contactoEmergencia}  // Datos obtenidos de la consulta Axios
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />
    
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Teléfono fijo o celular del contacto de emergencia:</Typography>
                        <TextField
                            name="var_telefonoEmergencia"
                            variant="outlined"
                            value={var_telefonoEmergencia}  // Datos obtenidos de la consulta Axios
                            fullWidth sx={{ mb: 2 }} InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" }, inputProps: { maxLength: 10 } }} />
    
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit">
                                Siguiente
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
    
}
export default EditarDatosUsuario