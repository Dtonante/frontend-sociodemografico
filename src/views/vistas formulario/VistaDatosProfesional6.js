import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, Typography, Divider, CardContent, Button, TextField, FormControl, RadioGroup, FormHelperText, FormControlLabel, Radio, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import show_alert from "../../components/showAlert/alertFuntion";

const VistaDatosProfesional6 = () => {
    const [nivelEscolaridad, setNivelEscolaridad] = useState('');
    const [actualmenteEstudia, setActualmenteEstudia] = useState();
    const [nombreCarrera, setNombreCarrera] = useState('');
    const [certificadoPdf, setCertificadoPdf] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const porcentajeProgreso = 80;
    const [graduacion, setGraduacion] = useState();

    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.nivelEscolaridad && !nivelEscolaridad) {
            nuevosErrores.nivelEscolaridad = "El nombre completo es obligatorio";
        }

        if (touchedFields.actualmenteEstudia && (actualmenteEstudia === undefined)) {
            nuevosErrores.actualmenteEstudia = "El tipo de documento es obligatorio";
        }

        if (touchedFields.graduacion && (graduacion === undefined)) {
            nuevosErrores.graduacion = "El tipo de documento es obligatorio";
        }



        setErrors(nuevosErrores);
    }, [nivelEscolaridad, actualmenteEstudia, touchedFields]);

    // Marcar un campo como "tocado" cuando pierde el enfoque
    const handleBlur = (event) => {
        const { name } = event.target;
        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });
    };

    // Manejo del cambio en el Select y RadioGroup
    const manejarCambio = (event) => {
        const { name, value } = event.target;

        if (name === "nivelEscolaridad") {
            setNivelEscolaridad(value);
            localStorage.setItem('nivelEscolaridad', value);
        } else if (name === "boolean_actualmenteEstudia") {
            const estudia = value === "true";
            setActualmenteEstudia(estudia);
            console.log("Actualmente estudia (boolean):", estudia);
            if (!estudia) {
                setNombreCarrera("N/A");
                localStorage.setItem('nombreCarrera', "N/A"); // Si selecciona "No", el valor se pone en "N/A"
            }


            localStorage.setItem('actualmenteEstudia', estudia);
        } else if (name === "nombreCarrera") {
            setNombreCarrera(value);
            localStorage.setItem('nombreCarrera', value);
        } else if (name === "graduacion") {
            const gradua=value=== "true"
            setGraduacion(gradua)
            if (!gradua){
                setCertificadoPdf("N/A")
            }
        }


    };

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

    const manejarSiguiente = async () => {
        const formData = new FormData();
    
        // Verificar si la variable graduacion es true
        if (graduacion) {
            // Solo se adjunta el certificado si graduacion es true
            if (certificadoPdf) {
                formData.append("file", certificadoPdf);  // Adjunta el archivo PDF
            } 
            // else {
            //     show_alert("Por favor, sube un archivo PDF antes de continuar." , 'info');
            //     return; 
            // }
        }
    
        try {
            // Enviar el formulario con el archivo PDF al backend si graduacion es true
            if (graduacion && certificadoPdf) {
                const response = await axios.post("/uploadsfiles/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
    
                // Si la respuesta es exitosa, obtenemos la URL del certificado y la guardamos en localStorage
                const {  file_patch } = response.data;
                console.log("Archivo PDF enviado correctamente");
                console.log("var_certificado del certificado:", file_patch);
    
                // Guardamos la URL en el localStorage si es necesario
                localStorage.setItem('certificadoUrl', file_patch);
            }else {
                localStorage.setItem('certificadoUrl', "N/A");
            }

            
    
            // Validaciones de otros campos (por ejemplo, nivelEscolaridad, actualmenteEstudia)
            const nuevosErrores = {};
    
            if (!nivelEscolaridad) {
                nuevosErrores.nivelEscolaridad = "El nivel de escolaridad es obligatorio.";
            }
    
            if (actualmenteEstudia === undefined) {
                nuevosErrores.actualmenteEstudia = "Este campo es obligatorio.";
            }

            if (graduacion === undefined) {
                nuevosErrores.graduacion = "Este campo es obligatorio.";
            }
    
            if (Object.keys(nuevosErrores).length > 0) {
                setErrors(nuevosErrores);
                return;
            }
    
            // Navegar a la siguiente vista
            navigate("/SaludFisica");
        } catch (error) {
            console.error("Error al enviar el archivo:", error);
            show_alert("Hubo un error al enviar el archivo. Inténtalo nuevamente.", 'error');
        }
    };
    



    return (
        <div style={{ backgroundColor: '#F2F2F2', paddingTop: '3%', boxSizing: 'border-box', height: '150vh', overflow: 'hidden' }}>

            <div style={{ textAlign: 'center', marginBottom: '1%', marginTop: '-1%' }}>
                <img
                    src="public/logo_form.png"
                    alt="Descripción de la imagen"
                    style={{
                        width: '20%',
                        height: 'auto',
                    }}
                />
            </div>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: " auto", backgroundColor: '#F2F2F2', borderColor: '#202B52' }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: 'center', color: '#202B52', fontFamily: 'Roboto Condensed' }}><strong>Formación académica</strong> </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: '5%', marginRight: '5%', borderColor: '#202B52' }} />

                <CardContent sx={{ padding: "30px" }}>
                    <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.nivelEscolaridad}>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Nivel de Escolaridad: </Typography>
                        <Select onBlur={handleBlur} labelId="nivelEscolar-label" name="nivelEscolaridad" value={nivelEscolaridad} onChange={manejarCambio}
                            sx={{
                                height: "40px",
                                fontFamily: "Roboto Condensed",
                                fontSize: "16px"
                            }} >
                            <MenuItem value="bachicher">Bachiller </MenuItem>
                            <MenuItem value="tecnico">Técnico </MenuItem>
                            <MenuItem value="tecnologo">Tecnólogo </MenuItem>
                            <MenuItem value="pregrado">Pregrado </MenuItem>
                            <MenuItem value="posgrado">Posgrado </MenuItem>
                            <MenuItem value="doctorado">Doctorado </MenuItem>
                            <MenuItem value="maestria">Maestría </MenuItem>
                        </Select>
                        {errors.nivelEscolaridad && (
                            <FormHelperText
                                sx={{ marginLeft: 0, }}
                            >{errors.nivelEscolaridad}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.graduacion} >
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Te has graduado en los ultimos dos años?:</Typography>
                        <RadioGroup name="graduacion" value={graduacion} onChange={manejarCambio} row onBlur={handleBlur}
                            sx={{
                                height: "40px",
                                fontFamily: "Roboto Condensed",
                                fontSize: "16px"
                            }}>
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                        {errors.graduacion && (
                            <Typography variant="caption" color="error"> {errors.graduacion} </Typography>
                        )}
                    </FormControl>

                    {graduacion && (
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



                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.actualmenteEstudia} >
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Actualmente Estudia?:</Typography>
                        <RadioGroup name="boolean_actualmenteEstudia" value={actualmenteEstudia} onChange={manejarCambio} row onBlur={handleBlur}
                            sx={{
                                height: "40px",
                                fontFamily: "Roboto Condensed",
                                fontSize: "16px"
                            }}>
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                        {errors.actualmenteEstudia && (
                            <Typography variant="caption" color="error"> {errors.actualmenteEstudia} </Typography>
                        )}
                    </FormControl>

                    {actualmenteEstudia && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Nombre del programa: </Typography>
                            <TextField name="nombreCarrera" value={nombreCarrera} onChange={manejarCambio} variant="outlined"
                                InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    },
                                }} />
                        </FormControl>
                    )}

                    <div
                        style={{
                            fontFamily: 'Poppins',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#F2F2F2',
                            padding: '10px 15px',
                            borderRadius: '20px',
                            width: '100%',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'Poppins',
                                height: '10px',
                                width: '90%',
                                backgroundColor: '#F2F2F2',
                                borderRadius: '7px',
                                overflow: 'hidden',
                                border: '2px solid #202B52',
                                marginRight: '10px',
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: 'Poppins',
                                    width: `${porcentajeProgreso}%`,
                                    height: '100%',
                                    backgroundColor: '#202B52',
                                    borderRadius: '5px 0 0 5px',
                                }}
                            ></div>
                        </div>
                        <span style={{ color: '#202B52', fontWeight: 'bold' }}>{porcentajeProgreso}%</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button sx={{ backgroundColor: '#202B52', fontFamily: 'Poppins' }} variant="contained" onClick={manejarSiguiente} type="submit">
                            Siguiente
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional6;








