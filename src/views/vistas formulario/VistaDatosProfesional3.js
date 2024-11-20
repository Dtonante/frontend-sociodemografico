import React, { useEffect, useState } from "react";
import { Card, CardContent, Divider, Box, Typography, TextField, Button, MenuItem, FormHelperText, Checkbox, ListItemText, Select, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VistaDatosProfesional3 = () => {
    const [epsOptions, setEpsOptions] = useState([]);
    const [selectedEps, setSelectedEps] = useState('');
    const [antecedentesOptions, setAntecedentesOptions] = useState([]);
    const [selectedAntecedentes, setSelectedAntecedentes] = useState([]);
    const [fondoPensionOptions, setFondoPensionOptions] = useState([]);
    const [selectedFondoPension, setSelectedFondoPension] = useState('');
    const [cambioEpsOArl, setCambioEpsOArl] = useState();
    const [serviciosSaludAdicionalOptions, setServiciosSaludAdicionalOptions] = useState([]);
    const [selectedServiciosSaludAdicional, setSelectedServiciosSaludAdicional] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const porcentajeProgreso = 38;


    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.selectedEps && !selectedEps) {
            nuevosErrores.selectedEps = "El nombre completo es obligatorio";
        }

        if (touchedFields.selectedFondoPension && !selectedFondoPension) {
            nuevosErrores.selectedFondoPension = "El nombre completo es obligatorio";
        }

        if (touchedFields.selectedServiciosSaludAdicional && (!selectedServiciosSaludAdicional || selectedServiciosSaludAdicional.length === 0)) {
            nuevosErrores.selectedServiciosSaludAdicional = "El nombre completo es obligatorio";
        }

        if (touchedFields.cambioEpsOArl && !cambioEpsOArl) {
            nuevosErrores.cambioEpsOArl = "El nombre completo es obligatorio";
        }

        if (touchedFields.antecedentes && (!selectedAntecedentes || selectedAntecedentes.length === 0)) {
            nuevosErrores.selectedAntecedentes = "El nombre completo es obligatorio";
        }



        setErrors(nuevosErrores);
    }, [selectedEps, selectedFondoPension, selectedServiciosSaludAdicional, cambioEpsOArl, touchedFields]);

    // Marcar un campo como "tocado" cuando pierde el enfoque
    const handleBlur = (event) => {
        const { name } = event.target;
        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });
    };


    // Hacer la solicitud para obtener los servicios de salud adicional
    useEffect(() => {
        const fetchServiciosSaludAdicional = async () => {
            try {
                const response = await axios.get('http://localhost:3001/servicioSaludAdicional/');
                setServiciosSaludAdicionalOptions(response.data);
            } catch (error) {
                console.error('Error al obtener los servicios de salud adicional:', error);
            }
        };
        fetchServiciosSaludAdicional();
    }, []);

    // Hacer la solicitud para obtener las EPS al cargar el componente
    useEffect(() => {
        const fetchEps = async () => {
            try {
                const response = await axios.get('http://localhost:3001/eps/');
                setEpsOptions(response.data);
            } catch (error) {
                console.error('Error al obtener las EPS:', error);
            }
        };

        fetchEps();
    }, []);

    // Hacer la solicitud para obtener los antecedentes médicos
    useEffect(() => {
        const fetchAntecedentes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/antecedentesMedicos/');
                setAntecedentesOptions(response.data);
            } catch (error) {
                console.error('Error al obtener los antecedentes médicos:', error);
            }
        };

        fetchAntecedentes();
    }, []);


    // Hacer la solicitud para obtener los fondos de pensión
    useEffect(() => {
        const fetchFondosPension = async () => {
            try {
                const response = await axios.get('http://localhost:3001/fondoPension/');
                setFondoPensionOptions(response.data); // Guardamos las opciones en el estado
            } catch (error) {
                console.error('Error al obtener los fondos de pensión:', error);
            }
        };
        fetchFondosPension();
    }, []);

    // Guardar los datos en el localStorage al cambiar alguna selección
    const manejarCambio = (event, campo) => {
        const { value } = event.target;

        if (campo === 'eps') {
            setSelectedEps(value);
            localStorage.setItem('selectedEps', value);
        } else if (campo === 'antecedentes') {
            setSelectedAntecedentes(value);
            localStorage.setItem('selectedAntecedentes', JSON.stringify(value));
        } else if (campo === 'fondoPension') {
            setSelectedFondoPension(value);
            localStorage.setItem('selectedFondoPension', value);
        } else if (campo === 'cambioEpsOArl') {
            setCambioEpsOArl(value);
            localStorage.setItem('cambioEpsOArl', value);
        } else if (campo === 'serviciosSaludAdicional') {
            setSelectedServiciosSaludAdicional(value);
            localStorage.setItem('selectedServiciosSaludAdicional', JSON.stringify(value));
        }
    };

    // Manejar el envío y redirigir a la siguiente vista
    const manejarSiguiente = (event) => {
        event.preventDefault();
        const nuevosErrores = {};

        if (!selectedEps) {
            nuevosErrores.selectedEps = "El nombre completo es obligatorio";
        }

        if (!selectedFondoPension) {
            nuevosErrores.selectedFondoPension = "El nombre completo es obligatorio";
        }

        if (!cambioEpsOArl) {
            nuevosErrores.cambioEpsOArl = "El nombre completo es obligatorio";
        }

        if (!selectedServiciosSaludAdicional || selectedServiciosSaludAdicional.length === 0) {
            nuevosErrores.selectedServiciosSaludAdicional = "El nombre completo es obligatorio";
        }

        if (!selectedAntecedentes || selectedAntecedentes.length === 0) {
            nuevosErrores.selectedAntecedentes = "El nombre completo es obligatorio";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }


        // Guardamos todos los datos relevantes en localStorage
        const formData = {
            selectedEps,
            selectedAntecedentes,
            selectedFondoPension,
            cambioEpsOArl
        };
        localStorage.setItem('formDataProfesional', JSON.stringify(formData));  // Guardar todos los datos

        // Redirigir a la siguiente vista (ajustar el nombre de la ruta según tu configuración)
        navigate('/datosProfesional4');
    };

    return (
        <div style={{ backgroundColor: '#F2F2F2', paddingTop: '3%', paddingBottom: '3%', height: '100vh' }}>
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
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: '#F2F2F2',  borderColor: '#202B52'  }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: 'center', color: '#202B52', fontFamily: 'Roboto Condensed' }}>Seguridad social</Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: '5%', marginRight: '5%',  borderColor: '#202B52'  }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form >
                        <FormControl sx={{ mb: 2 }} error={!!errors.cambioEpsOArl}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>¿Ha cambiado de EPS o AFP?</Typography>
                            <RadioGroup row value={cambioEpsOArl} onChange={(event) => manejarCambio(event, 'cambioEpsOArl')} onBlur={handleBlur} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }}>
                                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                            {errors.cambioEpsOArl && (
                                <Typography variant="caption" color="error">
                                    {errors.cambioEpsOArl}
                                </Typography>
                            )}
                        </FormControl>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Seleccione EPS: </Typography>
                        <TextField select value={selectedEps} name="selectedEps" onChange={(event) => manejarCambio(event, 'eps')} fullWidth variant="outlined" sx={{ mb: 2 }} onBlur={handleBlur}
                            error={!!errors.selectedEps}
                            helperText={errors.selectedEps} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }} >
                            {epsOptions.map((eps) => (
                                <MenuItem key={eps.id_epsPK} value={eps.id_epsPK}> {eps.var_nombreEps} </MenuItem>
                            ))}
                        </TextField>
                        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.selectedFondoPension}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Seleccione Fondo de Pensión: </Typography>
                            <Select name="selectedFondoPension" value={selectedFondoPension} onChange={(event) => manejarCambio(event, 'fondoPension')} onBlur={handleBlur}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                }}

                            >
                                {fondoPensionOptions.map((fondo) => (
                                    <MenuItem key={fondo.id_fondoPensionPK} value={fondo.id_fondoPensionPK}>
                                        {fondo.var_nombreFondoPension}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.selectedFondoPension && (
                                <FormHelperText
                                    sx={{
                                        marginLeft: 0,
                                    }}
                                >{errors.selectedFondoPension}</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl sx={{ mb: 2 }} fullWidth error={!!errors.selectedServiciosSaludAdicional}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Seleccione los servicios de salud adicional:</Typography>
                            <Select
                                name="selectedServiciosSaludAdicional"
                                multiple
                                onBlur={handleBlur}
                                value={selectedServiciosSaludAdicional}
                                onChange={(event) => manejarCambio(event, 'serviciosSaludAdicional')}
                                renderValue={(selected) => {
                                    const selectedNames = serviciosSaludAdicionalOptions.filter(servicio =>
                                        selected.includes(servicio.id_servicioDeSaludAdicionalPK)
                                    ).map(servicio => servicio.var_nombreServicioDeSaludAdicional);
                                    return selectedNames.join(' - ');
                                }}
                                fullWidth
                                variant="outlined"
                                MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                }}

                            >
                                {serviciosSaludAdicionalOptions.map((servicio) => (
                                    <MenuItem key={servicio.id_servicioDeSaludAdicionalPK} value={servicio.id_servicioDeSaludAdicionalPK}>
                                        <Checkbox checked={selectedServiciosSaludAdicional.indexOf(servicio.id_servicioDeSaludAdicionalPK) > -1} />
                                        <ListItemText primary={servicio.var_nombreServicioDeSaludAdicional} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.selectedServiciosSaludAdicional && (
                                <FormHelperText
                                    sx={{
                                        marginLeft: 0,
                                    }}
                                >{errors.selectedServiciosSaludAdicional}</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl sx={{ mb: 2 }} fullWidth error={!!errors.selectedAntecedentes}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Seleccione Antecedentes Médicos:</Typography>

                            <Select name="antecedentes" onBlur={handleBlur} multiple value={selectedAntecedentes} onChange={(event) => manejarCambio(event, 'antecedentes')} renderValue={(selected) => {
                                const selectedNames = antecedentesOptions.filter(antecedente => selected.includes(antecedente.id_antecedenteMedicoPK)).map(antecedente => {
                                    // Extraer solo la parte del nombre antes del primer paréntesis, si existe
                                    const name = antecedente.var_nombreAntecedenteMedico;
                                    const index = name.indexOf('(');
                                    if (index !== -1) {
                                        return name.substring(0, index).trim(); // Tomar todo hasta el primer paréntesis
                                    }
                                    return name; // Si no hay paréntesis, devolver el nombre completo
                                });

                                return selectedNames.join(' - '); // Unir los nombres con un guion
                            }} fullWidth variant="outlined" MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250, } }, }}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                }}
                            >
                                {antecedentesOptions.map((antecedente) => (
                                    <MenuItem key={antecedente.id_antecedenteMedicoPK} value={antecedente.id_antecedenteMedicoPK}>
                                        <Checkbox checked={selectedAntecedentes.indexOf(antecedente.id_antecedenteMedicoPK) > -1} />
                                        <ListItemText primary={antecedente.var_nombreAntecedenteMedico} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.selectedAntecedentes && (
                                <FormHelperText
                                    sx={{
                                        marginLeft: 0,
                                    }}
                                >{errors.selectedAntecedentes}</FormHelperText>
                            )}
                        </FormControl>

                        <div
                            style={{
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
                            <Button sx={{ backgroundColor: '#202B52' }} variant="contained" onClick={manejarSiguiente} type="submit">
                                Siguiente
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional3;
