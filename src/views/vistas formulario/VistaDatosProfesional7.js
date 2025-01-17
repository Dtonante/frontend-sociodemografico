import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, Divider, Checkbox, FormHelperText, ListItemText, CardContent, Button, FormControl, RadioGroup, Radio, FormControlLabel, Select, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VistaDatosProfesional7 = () => {
    const [pasoMayorTiempoLibre, setPasoMayorTiempoLibre] = useState('');

    const [actividadTiempoLibreOptions, setActividadTiempoLibre] = useState([]);
    const [selectedActividadTiempoLibre, setSelectedActividadTiempoLibre] = useState([]);
    const [actividadFisica, setActividadFisica] = useState();
    const [frecuenciaActividadFisica, setFrecuenciaActividadFisica] = useState("");
    const [fuma, setFuma] = useState();
    const [frecuenciaFuma, setFrecuenciaFuma] = useState("");
    const [toma, setToma] = useState();
    const [frecuenciaToma, setFrecuenciaToma] = useState("");
    const [sustanciaPsicoactiva, setSustanciaPsicoactiva] = useState();
    const [frecuenciaSustanciaPsicoactiva, setFrecuenciaSustanciaPsicoactiva] = useState("");
    const [peso, setPeso] = useState("");
    const [altura, setAltura] = useState("");
    const [boolean_usaLentes, setBoolean_usaLentes] = useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [boolean_bebidasEnergizantes, setBoolean_bebidasEnergizantes] = useState();
    const [var_frecuenciaBebidasEnergeticas, setVar_frecuenciaBebidasEnergeticas] = useState("")
    const porcentajeProgreso = 90;

    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.set_pasoMayorTiempoLibre && !pasoMayorTiempoLibre) {
            nuevosErrores.pasoMayorTiempoLibre = "Este campo es obligatorio.";
        }

        if (touchedFields.var_peso && (!peso || peso.trim() === "")) {
            nuevosErrores.peso = "Indicar su peso(KG) es obligatorio.";
        }

        if (touchedFields.var_altura && (!altura || altura.trim() === "")) {
            nuevosErrores.altura = "Indicar su altura es obligatorio.";
        }

        if (touchedFields.actividadTiempoLibre && (!selectedActividadTiempoLibre || selectedActividadTiempoLibre.length === 0)) {
            nuevosErrores.selectedActividadTiempoLibre = "Las actividades de tiempo libre es obligatorio.";
        }

        if (touchedFields.var_frecuenciaSustanciasPsicoactivas && !frecuenciaSustanciaPsicoactiva) {
            nuevosErrores.frecuenciaSustanciaPsicoactiva = "Indicar la frecuencia de consumo es obligatorio.";
        }

        if (touchedFields.var_frecuenciaToma && !frecuenciaToma) {
            nuevosErrores.frecuenciaToma = "Indicar la frecuencia de consumo es obligatorio.";
        }

        if (touchedFields.var_frecuenciaFuma && !frecuenciaFuma) {
            nuevosErrores.frecuenciaFuma = "Indicar la frecuencia de consumo es obligatorio.";
        }

        if (touchedFields.var_frecuenciaBebidasEnergeticas && !var_frecuenciaBebidasEnergeticas) {
            nuevosErrores.var_frecuenciaBebidasEnergeticas = "Indicar la frecuencia de actividad fisica es obligatorio.";
        }





        setErrors(nuevosErrores);
    }, [pasoMayorTiempoLibre, boolean_usaLentes, actividadFisica, var_frecuenciaBebidasEnergeticas, frecuenciaFuma, frecuenciaToma, peso, altura, frecuenciaSustanciaPsicoactiva, selectedActividadTiempoLibre, frecuenciaActividadFisica, touchedFields]);

    const handleBlur = (event) => {
        const { name } = event.target;
        setTouchedFields((prev) => ({
            ...prev,
            [name]: true,
        }));

    };

    const generarOpciones = () => {
        const opciones = [
            { value: "Familia primaria", label: "Familia primaria" },
            { value: "madre", label: "Madre" },
            { value: "padre", label: "Padre" },
            { value: "hermanos", label: "Hermanos" },
            { value: "abuelos", label: "Abuelos" },
            { value: "tios", label: "Tíos" },
            { value: "mascotas", label: "Mascotas" },
            { value: "Amigos", label: "Amigos" },
            { value: "solo", label: "Solo" },
            { value: "Otros", label: "Otros" },
        ];
        return opciones.map((opcion) => (
            <MenuItem key={opcion.value} value={opcion.value}>
                {opcion.label}
            </MenuItem>
        ));
    };


    // fectch para los las actividades que realiza en su tiempo libre
    useEffect(() => {
        const fetchActividadTiempoLibre = async () => {
            try {
                const response = await axios.get('https://evaluacion.esumer.edu.co/api/tiempoLibre/');
                setActividadTiempoLibre(response.data);
            } catch (error) {
                console.error('Error al obtener las actividades de tiempo libre:', error);
            }
        };

        fetchActividadTiempoLibre();
    }, []);


    const manejarCambio = (event, campo) => {
        const { name, value } = event.target;

        // Guardar en el estado y localStorage valores booleanos con comparación
        if (name === "boolean_actividadFisica") {
            const booleanValue = value === "true";
            setActividadFisica(booleanValue);
            localStorage.setItem('boolean_actividadFisica', booleanValue.toString());
        } else if (name === "var_frecuenciaActividadFisica") {
            setFrecuenciaActividadFisica(value);
            localStorage.setItem('var_frecuenciaActividadFisica', value);
        } else if (name === "boolean_fuma") {
            const booleanValue = value === "true";
            setFuma(booleanValue);
            localStorage.setItem('boolean_fuma', booleanValue.toString());
        } else if (name === "var_frecuenciaFuma") {
            setFrecuenciaFuma(value);
            localStorage.setItem('var_frecuenciaFuma', value);
        } else if (name === "boolean_toma") {
            const booleanValue = value === "true";
            setToma(booleanValue);
            localStorage.setItem('boolean_toma', booleanValue.toString());
        } else if (name === "var_frecuenciaToma") {
            setFrecuenciaToma(value);
            localStorage.setItem('var_frecuenciaToma', value);
        } else if (name === "boolean_sustanciasPsicoactivas") {
            const booleanValue = value === "true";
            setSustanciaPsicoactiva(booleanValue);
            localStorage.setItem('boolean_sustanciasPsicoactivas', booleanValue.toString());
        } else if (name === "var_frecuenciaSustanciasPsicoactivas") {
            setFrecuenciaSustanciaPsicoactiva(value);
            localStorage.setItem('var_frecuenciaSustanciasPsicoactivas', value);
        } else if (name === "var_peso") {
            if (/^\d*$/.test(value)) {
                setPeso(value);
                localStorage.setItem('var_peso', value);
            }
        } else if (name === "var_altura") {
            if (/^\d*$/.test(value)) {
                setAltura(value); // Actualizamos el estado
                localStorage.setItem('var_altura', value); // Guardamos en localStorage
            }
        } else if (name === "set_pasoMayorTiempoLibre") {
            setPasoMayorTiempoLibre(value);
            localStorage.setItem('set_pasoMayorTiempoLibre', JSON.stringify(value));

        } else if (campo === 'actividadTiempoLibre') {
            setSelectedActividadTiempoLibre(value);
            localStorage.setItem('actividadTiempoLibre', JSON.stringify(value));
        } else if (name === "boolean_usaLentes") {
            const booleanValue = value === "true";
            setBoolean_usaLentes(booleanValue);
            localStorage.setItem('boolean_usaLentes', booleanValue.toString());
        } else if (name === "boolean_bebidasEnergizantes") {
            const booleanValue = value === "true";
            setBoolean_bebidasEnergizantes(booleanValue);
            localStorage.setItem('boolean_bebidasEnergizantes', booleanValue.toString());
        } else if (name === "var_frecuenciaBebidasEnergeticas") {
            setVar_frecuenciaBebidasEnergeticas(value);
            localStorage.setItem('var_frecuenciaBebidasEnergeticas', value)
        }



    };

    const manejarSiguiente = () => {

        const nuevosErrores = {};

        if (!pasoMayorTiempoLibre) {
            nuevosErrores.pasoMayorTiempoLibre = "Este campo es obligatorio.";
        }

        if (!peso || peso.trim() === "") {
            nuevosErrores.peso = "Indicar su peso(KG) es obligatorio.";
        }

        if (!altura) {
            nuevosErrores.altura = "Indicar su altura es obligatorio.";
        }

        if (!selectedActividadTiempoLibre || selectedActividadTiempoLibre.length === 0) {
            nuevosErrores.selectedActividadTiempoLibre = "Las actividades de tiempo libre es obligatorio.";
        }

        if (sustanciaPsicoactiva === true && !frecuenciaSustanciaPsicoactiva) {
            nuevosErrores.frecuenciaSustanciaPsicoactiva = "Indicar la frecuencia de consumo es obligatorio.";
        }



        if (boolean_bebidasEnergizantes === true && !var_frecuenciaBebidasEnergeticas) {
            nuevosErrores.var_frecuenciaBebidasEnergeticas = "Indicar la frecuencia de consumo es obligatorio.";
        }

        if (toma === true && !frecuenciaToma) {
            nuevosErrores.frecuenciaToma = "Indicar la frecuencia de consumo es obligatorio.";
        }

        if (fuma === true && !frecuenciaFuma) {
            nuevosErrores.frecuenciaFuma = "Indicar la frecuencia de consumo es obligatorio.";
        }

        if (actividadFisica === true && !frecuenciaActividadFisica) {
            nuevosErrores.frecuenciaActividadFisica = "Indicar la frecuencia es obligatorio.";
        }

        if (actividadFisica == null) {
            nuevosErrores.actividadFisica = "El género es obligatorio";
        }

        if (boolean_usaLentes == null) {
            nuevosErrores.boolean_usaLentes = "El género es obligatorio";
        }

        if (boolean_bebidasEnergizantes == null) {
            nuevosErrores.boolean_bebidasEnergizantes = "El género es obligatorio";
        }

        if (sustanciaPsicoactiva == null) {
            nuevosErrores.sustanciaPsicoactiva = "El género es obligatorio";
        }
        if (toma == null) {
            nuevosErrores.toma = "El género es obligatorio";
        }
        if (fuma == null) {
            nuevosErrores.fuma = "El género es obligatorio";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }



        navigate("/Transporte");
    };

    const manejarAtras = () => {
        navigate('/FormacionAcademica')
    }

    return (
        <div style={{ backgroundColor: '#F2F2F2', paddingTop: '3%', paddingBottom: '3%' }}>
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
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: '#F2F2F2', borderColor: '#202B52' }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: 'center', color: '#202B52', fontFamily: 'Roboto Condensed' }}><strong>Salud física</strong> </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: '5%', marginRight: '5%', borderColor: '#202B52' }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                    }}>


                        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.selectedActividadTiempoLibre}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione las actividades que realiza en su tiempo libre (se pueden seleccionar varias opciones):</Typography>
                            <Select name='actividadTiempoLibre'
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}
                                multiple onBlur={handleBlur} value={selectedActividadTiempoLibre} onChange={(event) => manejarCambio(event, 'actividadTiempoLibre')} renderValue={(selected) => {
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
                                }} fullWidth variant="outlined" MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}  >
                                {actividadTiempoLibreOptions.map((actividad) => (
                                    <MenuItem key={actividad.id_tiempoLibrePK} value={actividad.id_tiempoLibrePK}>
                                        <Checkbox checked={selectedActividadTiempoLibre.indexOf(actividad.id_tiempoLibrePK) > -1} />
                                        <ListItemText primary={actividad.var_nombreOcuapacionTiempoLibre} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.selectedActividadTiempoLibre && (
                                <FormHelperText error sx={{ marginLeft: 0 }}>
                                    {errors.selectedActividadTiempoLibre}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.pasoMayorTiempoLibre}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>
                                ¿Con quién pasa la mayor parte de su tiempo libre?:
                            </Typography>
                            <Select
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}
                                name="set_pasoMayorTiempoLibre"
                                value={pasoMayorTiempoLibre}
                                onChange={manejarCambio}
                                fullWidth
                                variant="outlined"
                                onBlur={handleBlur}
                                displayEmpty
                            >
                                {generarOpciones()}
                            </Select>
                            {errors.pasoMayorTiempoLibre && (
                                <FormHelperText error sx={{ marginLeft: 0 }}>
                                    {errors.pasoMayorTiempoLibre}
                                </FormHelperText>
                            )}
                        </FormControl>


                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.boolean_usaLentes}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} > ¿Usa Lentes?:</Typography>
                            <RadioGroup name="boolean_usaLentes" value={boolean_usaLentes} onChange={manejarCambio} row onBlur={handleBlur}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}  >
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                            {errors.boolean_usaLentes && (
                                <Typography variant="caption" color="error">
                                    {errors.boolean_usaLentes}
                                </Typography>
                            )}
                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Altura (cm): </Typography>
                            <TextField name="var_altura" value={altura} onChange={manejarCambio} placeholder="Ingrese su altura en cm" fullWidth onBlur={handleBlur} error={!!errors.altura} helperText={errors.altura} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                                },
                            }}
                                InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    },
                                }} />
                        </FormControl>


                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Peso (kg): </Typography>
                            <TextField name="var_peso" value={peso} onChange={manejarCambio} placeholder="Ingrese su peso en kg" fullWidth onBlur={handleBlur} error={!!errors.peso} helperText={errors.peso} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                                },
                            }}
                                InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    },
                                }} />
                        </FormControl>

                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.boolean_bebidasEnergizantes}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Consume bebidas energizantes?:</Typography>
                            <RadioGroup name="boolean_bebidasEnergizantes" value={boolean_bebidasEnergizantes} onChange={manejarCambio} row onBlur={handleBlur}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }} >
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                            {errors.boolean_bebidasEnergizantes && (
                                <Typography variant="caption" color="error">
                                    {errors.boolean_bebidasEnergizantes}
                                </Typography>
                            )}
                        </FormControl>
                        {boolean_bebidasEnergizantes && (
                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.var_frecuenciaBebidasEnergeticas}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaBebidasEnergeticas" value={var_frecuenciaBebidasEnergeticas} onChange={manejarCambio} displayEmpty onBlur={handleBlur}
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }}  >
                                    <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Mensualmente">Mensualmente</MenuItem>
                                </Select>
                                {errors.var_frecuenciaBebidasEnergeticas && (
                                    <FormHelperText sx={{ marginLeft: 0, }}
                                    >{errors.var_frecuenciaBebidasEnergeticas}</FormHelperText>
                                )}
                            </FormControl>
                        )}




                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.actividadFisica}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Realiza actividad física?: </Typography>
                            <RadioGroup name="boolean_actividadFisica" value={actividadFisica} onChange={manejarCambio} row onBlur={handleBlur}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }} >
                                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                            {errors.actividadFisica && (
                                <Typography variant="caption" color="error">
                                    {errors.actividadFisica}
                                </Typography>
                            )}
                        </FormControl>

                        {actividadFisica && (
                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.frecuenciaActividadFisica}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaActividadFisica" value={frecuenciaActividadFisica} onChange={manejarCambio} displayEmpty onBlur={handleBlur}
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }}  >
                                    <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Mensualmente">Mensualmente</MenuItem>
                                </Select>
                                {errors.frecuenciaActividadFisica && (
                                    <FormHelperText sx={{ marginLeft: 0, }}
                                    >{errors.frecuenciaActividadFisica}</FormHelperText>
                                )}
                            </FormControl>
                        )}

                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.fuma}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Fuma o vapea?:</Typography>
                            <RadioGroup name="boolean_fuma" value={fuma} onChange={manejarCambio} row onBlur={handleBlur}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}  >
                                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                            {errors.fuma && (
                                <Typography variant="caption" color="error">
                                    {errors.fuma}
                                </Typography>
                            )}
                        </FormControl>

                        {fuma && (
                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.frecuenciaFuma}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaFuma" value={frecuenciaFuma} onChange={manejarCambio} displayEmpty onBlur={handleBlur}
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }}  >
                                    <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Socialmente">Socialmente</MenuItem>
                                </Select>
                                {errors.frecuenciaFuma && (
                                    <FormHelperText sx={{ marginLeft: 0, }}
                                    >{errors.frecuenciaFuma}</FormHelperText>
                                )}
                            </FormControl>
                        )}

                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.toma}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Consume bebidas alcohólicas?:</Typography>
                            <RadioGroup name="boolean_toma" value={toma} onChange={manejarCambio} row onBlur={handleBlur}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}  >
                                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                            {errors.toma && (
                                <Typography variant="caption" color="error">
                                    {errors.toma}
                                </Typography>
                            )}
                        </FormControl>

                        {toma && (
                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.frecuenciaToma}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaToma" value={frecuenciaToma} onChange={manejarCambio} displayEmpty onBlur={handleBlur}
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }} >
                                    <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Socialmente">Socialmente</MenuItem>
                                </Select>
                                {errors.frecuenciaToma && (
                                    <FormHelperText sx={{ marginLeft: 0, }}
                                    >{errors.frecuenciaToma}</FormHelperText>
                                )}
                            </FormControl>
                        )}

                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} error={!!errors.sustanciaPsicoactiva}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Consume sustancias psicoactivas?:</Typography>
                            <RadioGroup name="boolean_sustanciasPsicoactivas" value={sustanciaPsicoactiva} onChange={manejarCambio} row
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }} >
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                            {errors.sustanciaPsicoactiva && (
                                <Typography variant="caption" color="error">
                                    {errors.sustanciaPsicoactiva}
                                </Typography>
                            )}
                        </FormControl>

                        {sustanciaPsicoactiva && (
                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.frecuenciaSustanciaPsicoactiva}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaSustanciasPsicoactivas" onBlur={handleBlur} value={frecuenciaSustanciaPsicoactiva} onChange={manejarCambio} displayEmpty
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }}  >
                                    <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Socialmente">Socialmente</MenuItem>
                                </Select>
                                {errors.frecuenciaSustanciaPsicoactiva && (
                                    <FormHelperText sx={{ marginLeft: 0, }}
                                    >{errors.frecuenciaSustanciaPsicoactiva}</FormHelperText>
                                )}
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
                            <button
                                style={{
                                    fontFamily: 'poppins',
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    backgroundColor: '#202B52',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    marginRight: '8px'

                                }}
                                onClick={manejarAtras}
                            >
                                Atras
                            </button>
                            <Button sx={{ backgroundColor: '#202B52', fontFamily: 'Poppins' }} onClick={manejarSiguiente} variant="contained" type="submit">
                                Siguiente
                            </Button>
                        </div>

                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional7;
