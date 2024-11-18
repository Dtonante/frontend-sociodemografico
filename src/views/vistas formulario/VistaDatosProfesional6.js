import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, Typography, Divider, CardContent, Button, TextField, FormControl, RadioGroup, FormHelperText, FormControlLabel, Radio, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

const VistaDatosProfesional6 = () => {
    const [nivelEscolaridad, setNivelEscolaridad] = useState('');
    const [actualmenteEstudia, setActualmenteEstudia] = useState();
    const [nombreCarrera, setNombreCarrera] = useState('');
    const [certificadoPdf, setCertificadoPdf] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.nivelEscolaridad && !nivelEscolaridad) {
            nuevosErrores.nivelEscolaridad = "El nombre completo es obligatorio";
        }

        if (touchedFields.actualmenteEstudia && (actualmenteEstudia === undefined )) {
            nuevosErrores.actualmenteEstudia = "El tipo de documento es obligatorio";
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
        }


    };

    const manejarCambioPdf = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                alert("Por favor, sube un archivo PDF");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {  // 10 MB
                alert("El archivo es demasiado grande");
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
        if (certificadoPdf) {
            formData.append("certificado", certificadoPdf);  // Adjunta solo el PDF

            try {
                // Enviamos el formulario con el archivo PDF al backend
                const response = await axios.post("http://localhost:3001/certificados/subir/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                // Si la respuesta es exitosa, obtenemos la URL del certificado y la guardamos en localStorage
                const { id, url } = response.data;
                console.log("Archivo PDF enviado correctamente");
                console.log("ID del certificado:", id);
                console.log("URL del certificado:", url);

                // Guardamos la URL en el localStorage
                localStorage.setItem('certificadoUrl', url);

                const nuevosErrores = {};

                if (!nivelEscolaridad) {
                    nuevosErrores.nivelEscolaridad = "El nombre completo es obligatorio";
                } actualmenteEstudia

                if (actualmenteEstudia === undefined ) {
                    nuevosErrores.actualmenteEstudia = "El nombre completo es obligatorio";
                }


                if (Object.keys(nuevosErrores).length > 0) {
                    setErrors(nuevosErrores);
                    return;
                }

                // Navegamos a la siguiente vista
                navigate("/datosProfesional7");
            } catch (error) {
                console.error("Error al enviar el archivo:", error);
                alert("Hubo un error al enviar el archivo. Inténtalo nuevamente.");
            }
        } else {
            alert("Por favor, sube un archivo PDF antes de continuar.");
        }
    };



    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>Formación académica</Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.nivelEscolaridad}>
                        <Typography variant="h6" >Nivel de Escolaridad : </Typography>
                        <Select onBlur={handleBlur} labelId="nivelEscolar-label" name="nivelEscolaridad" value={nivelEscolaridad} onChange={manejarCambio} label="Nivel de Escolaridad" >
                            <MenuItem value="bachicher">Bachiller </MenuItem>
                            <MenuItem value="tecnico">Técnico </MenuItem>
                            <MenuItem value="tecnologo">Tecnólogo </MenuItem>
                            <MenuItem value="universitario">Universitario </MenuItem>
                            <MenuItem value="posgrado">Posgrado </MenuItem>
                            <MenuItem value="doctorado">Doctorado </MenuItem>
                        </Select>
                        {errors.nivelEscolaridad && (
                            <FormHelperText
                                sx={{ marginLeft: 0, }}
                            >{errors.nivelEscolaridad}</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6">Anexar certificado :</Typography>
                        <input id="certificado-pdf" name="certificadoPdf" type="file" accept="application/pdf" onChange={manejarCambioPdf} />
                        {certificadoPdf && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2">
                                    <strong>Archivo seleccionado: </strong>
                                    <span onClick={manejarVerPdf} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>
                                        {certificadoPdf.name}
                                    </span>
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Tamaño: </strong>{(certificadoPdf.size / 1024).toFixed(2)} KB
                                </Typography>
                            </Box>
                        )}
                    </FormControl>

                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.actualmenteEstudia} >
                        <Typography variant="h6" >¿Actualmente Estudia? :</Typography>
                        <RadioGroup name="boolean_actualmenteEstudia" value={actualmenteEstudia} onChange={manejarCambio} row onBlur={handleBlur} >
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                        {errors.actualmenteEstudia && (
                            <Typography variant="caption" color="error"> {errors.actualmenteEstudia} </Typography>
                        )}
                    </FormControl>

                    {actualmenteEstudia && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" >Nombre del programa : </Typography>
                            <TextField name="nombreCarrera" value={nombreCarrera} onChange={manejarCambio} variant="outlined" />
                        </FormControl>
                    )}

                    <Button variant="contained" onClick={manejarSiguiente} color="primary" sx={{ mt: 2 }}>Siguiente</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional6;








