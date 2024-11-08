import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Box, Typography, Divider, CardContent, Button, TextField, FormControl, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem } from "@mui/material";

const VistaDatosProfesional6 = () => {
    const [nivelEscolaridad, setNivelEscolaridad] = useState('');
    const [actualmenteEstudia, setActualmenteEstudia] = useState(false); 
    const [nombreCarrera, setNombreCarrera] = useState('N/A'); 
    const navigate = useNavigate();

    useEffect(() => {
        // Recuperamos todos los datos guardados en localStorage

        // Datos del profesional
        const formDataProfesional = localStorage.getItem('formDataProfesional') ? JSON.parse(localStorage.getItem('formDataProfesional')) : null;
        const datosProfesional = localStorage.getItem('datosProfesional') ? JSON.parse(localStorage.getItem('datosProfesional')) : null;
        const direccion = localStorage.getItem('direccion') ? JSON.parse(localStorage.getItem('direccion')) : null;
        const banco = localStorage.getItem('selectedBanco') || null;
        const tipo_cuenta = localStorage.getItem('tipoCuenta') || null;
        const numero_cuenta = localStorage.getItem('numeroCuenta') || null;
        const selectedServiciosSaludAdicional = localStorage.getItem('selectedServiciosSaludAdicional') ? JSON.parse(localStorage.getItem('selectedServiciosSaludAdicional')) : null;

        // Datos adicionales
        const tipoVinculacion = localStorage.getItem('var_tipoVinculacion');
        const tipoContrato = localStorage.getItem('var_tipoContrato');
        const salario = localStorage.getItem('var_salario');
        const fechaIngreso = localStorage.getItem('date_fechaIngresoInstitucion');
        const antiguedadInstitucion = localStorage.getItem('var_antiguedadInstitucion');
        const areaSeleccionada = localStorage.getItem('area');
        const cargo = localStorage.getItem('var_cargo');
        const jefeInmediato = localStorage.getItem('var_jefeInmediato');
        const sede = localStorage.getItem('var_sede');
        const turnoTrabajo = localStorage.getItem('var_turnoTrabajo');

        // Agrupamos todos los datos en un solo objeto
        const datosProfesionalCompleto = { formDataProfesional, datosProfesional, direccion, banco, tipo_cuenta, numero_cuenta, selectedServiciosSaludAdicional, tipoVinculacion, tipoContrato, salario, fechaIngreso, antiguedadInstitucion, areaSeleccionada, cargo, jefeInmediato, sede, turnoTrabajo };

        // Mostramos el objeto completo en la consola
        console.log("Datos completos del Profesional:", datosProfesionalCompleto);

    }, []);

    // Manejo del cambio en el Select y RadioGroup
    const manejarCambio = (event) => {
        const { name, value } = event.target;

        if (name === "nivelEscolaridad") {
            setNivelEscolaridad(value);
            localStorage.setItem('nivelEscolaridad', value);  // Guardamos el valor en localStorage
        } else if (name === "boolean_actualmenteEstudia") {
            const estudia = value === "true";
            setActualmenteEstudia(estudia);
            if (!estudia) {
                setNombreCarrera("N/A"); // Si selecciona "No", el valor se pone en "N/A"
            }
            localStorage.setItem('actualmenteEstudia', estudia);  // Guardamos el valor en localStorage
        } else if (name === "nombreCarrera") {
            setNombreCarrera(value);
            localStorage.setItem('nombreCarrera', value);  // Guardamos el valor en localStorage
        }
    };

    const manejarSiguiente = () => {
        
        navigate("/datosProfesional7");
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{  p: 0,  width: "100%",   maxWidth: 800,  margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                            Nivel de Escolaridad
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="nivelEscolar-label">Nivel de Escolaridad</InputLabel>
                        <Select labelId="nivelEscolar-label" name="nivelEscolaridad" value={nivelEscolaridad} onChange={manejarCambio} label="Nivel de Escolaridad" >
                            <MenuItem value="tecnico_incompleto">Técnico Incompleto</MenuItem>
                            <MenuItem value="tecnico_completo">Técnico Completo</MenuItem>
                            <MenuItem value="tecnologo_incompleto">Tecnólogo Incompleto</MenuItem>
                            <MenuItem value="tecnologo_completo">Tecnólogo Completo</MenuItem>
                            <MenuItem value="universitario_incompleto">Universitario Incompleto</MenuItem>
                            <MenuItem value="universitario_completo">Universitario Completo</MenuItem>
                            <MenuItem value="posgrado_incompleto">Posgrado Incompleto</MenuItem>
                            <MenuItem value="posgrado_completo">Posgrado Completo</MenuItem>
                            <MenuItem value="doctorado_incompleto">Doctorado Incompleto</MenuItem>
                            <MenuItem value="doctorado_completo">Doctorado Completo</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: "500" }}>
                            ¿Actualmente Estudia?
                        </Typography>
                        <RadioGroup
                            name="boolean_actualmenteEstudia"
                            value={actualmenteEstudia ? "true" : "false"}  
                            onChange={manejarCambio}
                            row
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    
                    {actualmenteEstudia && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <TextField
                                label="Nombre de la Carrera"
                                name="nombreCarrera"
                                value={nombreCarrera}
                                onChange={manejarCambio}
                                variant="outlined"
                            />
                        </FormControl>
                    )}

                    <Button variant="contained" onClick={manejarSiguiente} color="primary" sx={{ mt: 2 }}>Siguiente</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional6;
