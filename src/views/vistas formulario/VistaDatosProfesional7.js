import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, Divider, Checkbox, ListItemText, CardContent, Button, FormControl, RadioGroup, Radio, FormControlLabel, Select, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VistaDatosProfesional7 = () => {
    const [pasoMayorTiempoLibre, setPasoMayorTiempoLibre] = useState([]);

    const [actividadTiempoLibreOptions, setActividadTiempoLibre] = useState([]);
    const [selectedActividadTiempoLibre, setSelectedActividadTiempoLibre] = useState([]);

    const navigate = useNavigate();

    // fectch para los las actividades que realiza en su tiempo libre
    useEffect(() => {
        const fetchActividadTiempoLibre = async () => {
            try {
                const response = await axios.get('http://localhost:3001/tiempoLibre/');
                setActividadTiempoLibre(response.data);
            } catch (error) {
                console.error('Error al obtener las actividades de tiempo libre:', error);
            }
        };

        fetchActividadTiempoLibre();
    }, []);



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

        // Datos de escolaridad
        const nivelEscolaridad = localStorage.getItem('nivelEscolaridad');
        const actualmenteEstudia = localStorage.getItem('actualmenteEstudia') === "true";
        const nombreCarrera = localStorage.getItem('nombreCarrera') || "N/A"; // Si no tiene nombre de carrera, muestra "N/A"

        // Agrupamos todos los datos en un solo objeto
        const datosProfesionalCompleto = {
            formDataProfesional,
            datosProfesional,
            direccion,
            banco,
            tipo_cuenta,
            numero_cuenta,
            selectedServiciosSaludAdicional,
            tipoVinculacion,
            tipoContrato,
            salario,
            fechaIngreso,
            antiguedadInstitucion,
            areaSeleccionada,
            cargo,
            jefeInmediato,
            sede,
            turnoTrabajo,
            nivelEscolaridad,
            actualmenteEstudia,
            nombreCarrera
        };

        // Mostramos el objeto completo en la consola
        console.log("Datos completos del Profesional:", datosProfesionalCompleto);

    }, []);


    const [actividadFisica, setActividadFisica] = useState(null);
    const [frecuenciaActividadFisica, setFrecuenciaActividadFisica] = useState("");
    const [fuma, setFuma] = useState(null);
    const [frecuenciaFuma, setFrecuenciaFuma] = useState("");
    const [toma, setToma] = useState(null);
    const [frecuenciaToma, setFrecuenciaToma] = useState("");
    const [sustanciaPsicoactiva, setSustanciaPsicoactiva] = useState(null);
    const [frecuenciaSustanciaPsicoactiva, setFrecuenciaSustanciaPsicoactiva] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");



    const manejarCambio = (event, campo) => {
        const { name, value } = event.target;

        if (name === "boolean_actividadFisica") {
            setActividadFisica(value === "true");
            localStorage.setItem('boolean_actividadFisica', value);
        } else if (name === "var_frecuenciaActividadFisica") {
            setFrecuenciaActividadFisica(value);
            localStorage.setItem('var_frecuenciaActividadFisica', value);
        } else if (name === "boolean_fuma") {
            setFuma(value === "true");
            localStorage.setItem('boolean_fuma', value);
        } else if (name === "var_frecuenciaFuma") {
            setFrecuenciaFuma(value);
            localStorage.setItem('var_frecuenciaFuma', value);
        } else if (name === "boolean_toma") {
            setToma(value === "true");
            localStorage.setItem('boolean_toma', value);
        } else if (name === "var_frecuenciaToma") {
            setFrecuenciaToma(value);
            localStorage.setItem('var_frecuenciaToma', value);
        } else if (name === "boolean_sustanciasPsicoactivas") {
            setSustanciaPsicoactiva(value === "true");
            localStorage.setItem('boolean_sustanciasPsicoactivas', value);
        } else if (name === "var_frecuenciaSustanciasPsicoactivas") {
            setFrecuenciaSustanciaPsicoactiva(value);
            localStorage.setItem('var_frecuenciaSustanciasPsicoactivas', value);
        } else if (name === "var_peso") {
            setPeso(value);
            localStorage.setItem('var_peso', value);
        } else if (name === "var_altura") {
            setAltura(value);
            localStorage.setItem('var_altura', value);
        } else if (name === "set_pasoMayorTiempoLibre") {
            // Si el valor es un arreglo, se maneja de la siguiente manera
            setPasoMayorTiempoLibre(value);  // value será un arreglo
            localStorage.setItem('set_pasoMayorTiempoLibre', JSON.stringify(value));
        } else if (campo === 'actividadTiempoLibre') {
            setSelectedActividadTiempoLibre(value);
            localStorage.setItem('selectedActividadTiempoLibre', JSON.stringify(value));
        }
    };

    const manejarSiguiente = () => {

        navigate("/datosProfesional8");
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}> Actividad Física </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>


                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6">Seleccione las actividades que realiza en su tiempo libre: </Typography>
                        <Select
                            multiple
                            value={selectedActividadTiempoLibre}
                            onChange={(event) => manejarCambio(event, 'actividadTiempoLibre')}
                            renderValue={(selected) => {
                                // Obtener los nombres de los las actividades que realiza en su tiempo libre seleccionados
                                const selectedNames = actividadTiempoLibreOptions
                                    .filter(actividad => selected.includes(actividad.id_tiempoLibrePK))
                                    .map(actividad => {
                                        const name = actividad.var_nombreOcuapacionTiempoLibre;
                                        const index = name.indexOf('(');
                                        // Si encuentra un paréntesis, extrae solo la parte antes del paréntesis
                                        if (index !== -1) {
                                            return name.substring(0, index).trim();
                                        }
                                        return name; // Si no hay paréntesis, devuelve el nombre completo
                                    });

                                return selectedNames.join(' - '); // Unir los nombres con un guion
                            }}
                            fullWidth
                            variant="outlined"
                            MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}
                        >
                            {actividadTiempoLibreOptions.map((actividad) => (
                                <MenuItem key={actividad.id_tiempoLibrePK} value={actividad.id_tiempoLibrePK}>
                                    <Checkbox checked={selectedActividadTiempoLibre.indexOf(actividad.id_tiempoLibrePK) > -1} />
                                    <ListItemText primary={actividad.var_nombreOcuapacionTiempoLibre} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>






                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6" > ¿con quien pasa el mayor tiempo libre ? </Typography>
                        <TextField select name="set_pasoMayorTiempoLibre" value={pasoMayorTiempoLibre} onChange={manejarCambio} fullWidth variant="outlined" sx={{ mb: 2 }} SelectProps={{ multiple: true, }} >
                            <MenuItem value="">
                                <em>Selecciona una opción</em>
                            </MenuItem>
                            <MenuItem value="tio">Tío</MenuItem>
                            <MenuItem value="hermanos">Hermanos</MenuItem>
                            <MenuItem value="madre">Madre</MenuItem>
                            <MenuItem value="padre">Padre</MenuItem>
                            <MenuItem value="abuelos">Abuelos</MenuItem>
                            <MenuItem value="mascota">Mascota</MenuItem>
                        </TextField>

                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6" > Peso (kg) </Typography>
                        <TextField name="var_peso" value={peso} onChange={manejarCambio} placeholder="Ingrese su peso en kg" fullWidth />
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6" > Altura (cm) </Typography>
                        <TextField name="var_altura" value={altura} onChange={manejarCambio} placeholder="Ingrese su altura en cm" fullWidth />
                    </FormControl>


                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6" > ¿Realiza actividad física? </Typography>
                        <RadioGroup name="boolean_actividadFisica" value={actividadFisica ? "true" : "false"} onChange={manejarCambio} row >
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {actividadFisica && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" > Frecuencia de actividad física </Typography>
                            <Select name="var_frecuenciaActividadFisica" value={frecuenciaActividadFisica} onChange={manejarCambio} displayEmpty >
                                <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                <MenuItem value="diariamente">Diariamente</MenuItem>
                                <MenuItem value="semanalmente">Semanalmente</MenuItem>
                                <MenuItem value="quincenalmente">Quincenalmente</MenuItem>
                                <MenuItem value="mensualmente">Mensualmente</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: "500" }}> ¿Fuma? </Typography>
                        <RadioGroup name="boolean_fuma" value={fuma ? "true" : "false"} onChange={manejarCambio} row >
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {fuma && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: "500" }}> Frecuencia de fumar </Typography>
                            <Select name="var_frecuenciaFuma" value={frecuenciaFuma} onChange={manejarCambio} displayEmpty >
                                <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                <MenuItem value="diariamente">Diariamente</MenuItem>
                                <MenuItem value="semanalmente">Semanalmente</MenuItem>
                                <MenuItem value="quincenalmente">Quincenalmente</MenuItem>
                                <MenuItem value="mensualmente">Mensualmente</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: "500" }}> ¿Toma? </Typography>
                        <RadioGroup name="boolean_toma" value={toma ? "true" : "false"} onChange={manejarCambio} row  >
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {toma && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: "500" }}> Frecuencia de toma </Typography>
                            <Select name="var_frecuenciaToma" value={frecuenciaToma} onChange={manejarCambio} displayEmpty >
                                <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                <MenuItem value="diariamente">Diariamente</MenuItem>
                                <MenuItem value="semanalmente">Semanalmente</MenuItem>
                                <MenuItem value="quincenalmente">Quincenalmente</MenuItem>
                                <MenuItem value="mensualmente">Mensualmente</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: "500" }}> ¿sustancia psicoactivas? </Typography>
                        <RadioGroup name="boolean_sustanciasPsicoactivas" value={sustanciaPsicoactiva ? "true" : "false"} onChange={manejarCambio} row >
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {sustanciaPsicoactiva && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: "500" }}> Frecuencia de toma </Typography>
                            <Select name="var_frecuenciaSustanciasPsicoactivas" value={frecuenciaSustanciaPsicoactiva} onChange={manejarCambio} displayEmpty >
                                <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                <MenuItem value="diariamente">Diariamente</MenuItem>
                                <MenuItem value="semanalmente">Semanalmente</MenuItem>
                                <MenuItem value="quincenalmente">Quincenalmente</MenuItem>
                                <MenuItem value="mensualmente">Mensualmente</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <Button variant="contained" onClick={manejarSiguiente} color="primary" sx={{ mt: 2 }}>Siguiente</Button>

                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional7;
