import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl, Select, MenuItem, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const EditarDatosProfesional4 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [var_nivelEscolaridad, setVar_nivelEscolaridad] = useState("")
    const [var_urlDatosAdjuntos, setVar_urlDatosAdjuntos] = useState('');
    const [boolean_actualmenteEstudia, setBoolean_actualmenteEstudia] = useState("")
    const [var_nombreCarrera, setVar_nombreCarrera] = useState("")
    const [certificadoPdf, setCertificadoPdf] = useState();
    const [actualmenteEstudia, setActualmenteEstudia] = useState("");

    const validarRadius = () => {
        if (var_nombreCarrera === "N/A") {
            setActualmenteEstudia("false")
        } else {
            setActualmenteEstudia("true")
        }

        if (var_urlDatosAdjuntos === "N/A") {
            setBoolean_actualmenteEstudia("false")
        } else {
            setBoolean_actualmenteEstudia("true")
        }
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    useEffect(() => {
        validarRadius();
    }, [var_nombreCarrera]);

    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            var_nivelEscolaridad: var_nivelEscolaridad,
            var_urlDatosAdjuntos: var_urlDatosAdjuntos,
            boolean_actualmenteEstudia: boolean_actualmenteEstudia,
            var_nombreCarrera: var_nombreCarrera,

        });
        navigate('/app/editarDatosProfesional6');
    };

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setVar_nivelEscolaridad(res.data.var_nivelEscolaridad);
        setVar_urlDatosAdjuntos(res.data.var_urlDatosAdjuntos);
        setBoolean_actualmenteEstudia(res.data.boolean_actualmenteEstudia);
        setVar_nombreCarrera(res.data.var_nombreCarrera);


    };

    // manejar el cambio de estado del certificado
    const manejarCambioPdf = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                show_alert("Por favor, sube un archivo PDF", 'info');
                return;
            }
            if (file.size > 10 * 1024 * 1024) {  // 10 MB
                show_alert("El archivo es demasiado grande", 'info');
                return;
            }
            setCertificadoPdf(file);  // Guardamos el archivo en el estado
        }
    };

    // Manejo del clic en el archivo PDF
    const manejarVerPdf = () => {
        if (certificadoPdf) {
            const fileURL = URL.createObjectURL(certificadoPdf);
            window.open(fileURL, "_blank"); // Abre el archivo en una nueva pestaña
        }
    };


    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-3%" }}>
                <p> Edita la información necesaria y al final del formulario pulsa el botón GUARDAR para conservar los cambios.</p>
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
                    <form onSubmit={actualizar}>


                        <FormControl fullWidth sx={{ mb: 2 }} >
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Nivel de Escolaridad: </Typography>
                            <Select labelId="nivelEscolar-label" name="nivelEscolaridad" value={var_nivelEscolaridad}
                                onChange={(e) => setVar_nivelEscolaridad(e.target.value)}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }} >
                                <MenuItem value="Bachiller">Bachiller </MenuItem>
                                <MenuItem value="Técnico">Técnico </MenuItem>
                                <MenuItem value="Tecnólogo">Tecnólogo </MenuItem>
                                <MenuItem value="Pregrado">Pregrado </MenuItem>
                                <MenuItem value="Posgrado">Posgrado </MenuItem>
                                <MenuItem value="Doctorado">Doctorado </MenuItem>
                                <MenuItem value="Maestría">Maestría </MenuItem>
                            </Select>

                        </FormControl>


                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} >
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Te has graduado en los ultimos dos años?:</Typography>
                            <RadioGroup name="graduacion" value={boolean_actualmenteEstudia}
                                onChange={(e) => setBoolean_actualmenteEstudia(e.target.value)} row
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}>
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>



                        </FormControl>

                        {(boolean_actualmenteEstudia === "true") && (
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Anexar certificado:</Typography>
                                <input id="certificado-pdf" name="certificadoPdf" type="file" accept="application/pdf" onChange={manejarCambioPdf}
                                    style={{
                                        border: "1px solid #202B52",
                                        borderRadius: "4px",
                                        padding: "10px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "14px",
                                        color: "#202B52",
                                        cursor: "pointer",
                                    }} />
                                {certificadoPdf && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body2">
                                            <strong style={{ fontFamily: "Roboto Condensed", fontSize: "14px", color: "#202B52" }}>Archivo seleccionado: </strong>
                                            <span onClick={manejarVerPdf} style={{ color: "#202B52", textDecoration: "underline", cursor: "pointer" }}>
                                                {certificadoPdf.name}
                                            </span>
                                        </Typography>
                                        <Typography variant="body2">
                                            <strong style={{ fontFamily: "Roboto Condensed", fontSize: "14px", color: "#202B52" }}>Tamaño: </strong>{(certificadoPdf.size / 1024).toFixed(2)} KB
                                        </Typography>
                                    </Box>
                                )}
                            </FormControl>

                        )}


                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} >
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Actualmente Estudia?:</Typography>
                            <RadioGroup name="boolean_actualmenteEstudia" value={actualmenteEstudia}
                                onChange={(e) => setActualmenteEstudia(e.target.value)} row
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}>
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>

                        {actualmenteEstudia === "true" && (
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Nombre del programa:</Typography>
                                <TextField
                                    name="nombreCarrera"
                                    value={var_nombreCarrera}
                                    onChange={(e) => setVar_nombreCarrera(e.target.value)}
                                    variant="outlined"
                                    InputProps={{
                                        sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" },
                                    }}
                                />
                            </FormControl>
                        )}

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );


}

export default EditarDatosProfesional4