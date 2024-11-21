import { Select, Card, CardContent, Divider, Box, Typography, TextField, FormControl, FormHelperText, ListItemText, Checkbox, Button, MenuItem, Grid, } from "@mui/material";
import React, { useState, useEffect } from "react";
import departamentosCiudades from './departamentosCiudades.json';
import { useNavigate } from "react-router-dom";
import axios from "axios";


const VistaDatosProfesional = () => {
    const [factoresRiesgoOptions, setFactoresRiesgoOptions] = useState([]);
    const [selectedFactoresRiesgo, setSelectedFactoresRiesgo] = useState([]);
    const [serviciosQueNoCuentan, setServiciosQueNoCuentan] = useState([]);
    const [selectedServiciosQueNoCuentan, setSelectedServiciosQueNoCuentan] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        var_departamentoResidencia: "",
        var_ciudadResidencia: "",
        var_direccionResidencia: "",
        var_estratoVivienda: "",
        var_tipoVivienda: ""

    });
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const porcentajeProgreso = 23;

    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.var_departamentoResidencia && !formData.var_departamentoResidencia) {
            nuevosErrores.var_departamentoResidencia = "El departamento es obligatorio";
        }

        if (touchedFields.var_ciudadResidencia && !formData.var_ciudadResidencia) {
            nuevosErrores.var_ciudadResidencia = "El tipo de documento es obligatorio";
        }

        if (touchedFields.var_estratoVivienda && !formData.var_estratoVivienda) {
            nuevosErrores.var_estratoVivienda = "El tipo de documento es obligatorio";
        }
        if (touchedFields.var_tipoVivienda && !formData.var_tipoVivienda) {
            nuevosErrores.var_tipoVivienda = "El tipo de documento es obligatorio";
        }

        if (touchedFields.selectedServiciosQueNoCuentan && (!selectedServiciosQueNoCuentan || selectedServiciosQueNoCuentan.length === 0)) {
            nuevosErrores.selectedServiciosQueNoCuentan = "Los servicios con los que no cuenta son obligatorios";
        }

        if (touchedFields.selectedFactoresRiesgo && (!selectedFactoresRiesgo || selectedFactoresRiesgo.length === 0)) {
            nuevosErrores.selectedFactoresRiesgo = "Los factores de riesgos son obligatorios.";
        }

        setErrors(nuevosErrores);
    }, [formData, touchedFields]);

    // fectch para los las actividades que realiza en su tiempo libre
    useEffect(() => {
        const fetchServiciosQueNoCuentan = async () => {
            try {
                const response = await axios.get('http://localhost:3001/serviciosQueNoCuentan/');
                setServiciosQueNoCuentan(response.data);
            } catch (error) {
                console.error('Error al obtener los servicios que no cuentan:', error);
            }
        };

        fetchServiciosQueNoCuentan();
    }, []);


    // fectch para los factores de riesgo
    useEffect(() => {
        const fetchFactoresRiesgo = async () => {
            try {
                const response = await axios.get('http://localhost:3001/factoresRiesgo/');
                setFactoresRiesgoOptions(response.data);
            } catch (error) {
                console.error('Error al obtener los factores de riesgo:', error);
            }
        };

        fetchFactoresRiesgo();
    }, []);


    const [departamentos, setDepartamentos] = useState(departamentosCiudades.departamentos);
    const [ciudades, setCiudades] = useState([]);

    //Definicion de campo para el estrato
    const estratos = ["0", "1", "2", "3", "4", "5", "6"];
    //Definicion de campos para los tipos de vivienda
    const tiposVivienda = [
        "Casa",
        "Apartamento",
        "Condominio",
        "Vivienda de interés social",
        "Vivienda familiar"
        
    ];

    //Datos para los campos de la direccion
    const [direccion, setDireccion] = useState({
        tipoVia: "",
        numeroPrincipal: "",
        letraPrincipal: "",
        bisGuion: "",
        letraSecundaria: "",
        orientacion: "",
        numeroSecundario: "",
        letraAdicional: "",
        numeroFinal: "",
        orientacionFinal: "",
        detalle: ""
    });

    // Generar las letras de la A a la Z dinámicamente
    const letras = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    // Generar los números del 1 al 200
    const numeros = Array.from({ length: 300 }, (_, i) => i + 1);

    const manejarCambioInput = (event, campo) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (campo === 'factoresRiesgo') {
            setSelectedFactoresRiesgo(value);
            localStorage.setItem('selectedFactoresRiesgo', JSON.stringify(value));
        }

        // Si se cambia el departamento, actualizar las ciudades
        if (name === "var_departamentoResidencia") {
            localStorage.setItem('departamentoResidencia', value);
            const departamentoSeleccionado = departamentos.find(departamento => departamento.nombre === value);
            setCiudades(departamentoSeleccionado ? departamentoSeleccionado.ciudades : []);
        } else if (name === 'var_ciudadResidencia') {
            localStorage.setItem('ciudadResidencia', value);
        } else if (name === 'var_estratoVivienda') {
            console.log("Guardando estrato en localStorage:", value);
            localStorage.setItem('estratoVivienda', value);
        } else if (name === 'var_tipoVivienda') {
            localStorage.setItem('tipoVivienda', value);
        } else if (campo === 'servicioQueNoCuentan') {
            setSelectedServiciosQueNoCuentan(value);
            localStorage.setItem('selectedServiciosQueNoCuentan', JSON.stringify(value));
        }
    };

    // Marcar un campo como "tocado" cuando pierde el enfoque
    const handleBlur = (event) => {
        const { name } = event.target;
        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });
    };


    // Función para manejar el cambio de los inputs de dirección
    const manejarCambioDireccion = (event) => {
        const { name, value } = event.target;
        setDireccion({ ...direccion, [name]: value });

        // Construir la dirección completa
        const direccionCompleta = `${direccion.tipoVia} ${direccion.numeroPrincipal} ${direccion.letraPrincipal} ${direccion.bisGuion} ${direccion.letraSecundaria} ${direccion.orientacion} No. ${direccion.numeroSecundario} ${direccion.letraAdicional} - ${direccion.numeroFinal} ${direccion.orientacionFinal}${direccion.detalle}`;
        setFormData({ ...formData, var_direccionResidencia: direccionCompleta });

        localStorage.setItem('direccionCompleta', direccionCompleta);

    };

    // Redirigir a la siguiente vista
    const manejarSiguiente = (event) => {
        event.preventDefault();

        const nuevosErrores = {};

        if (!formData.var_departamentoResidencia) {
            nuevosErrores.var_departamentoResidencia = "El departamento es obligatorio.";
        }

        if (!formData.var_ciudadResidencia) {
            nuevosErrores.var_ciudadResidencia = "La ciudad de residencia es obligatorio.";
        }

        if (!formData.var_estratoVivienda) {
            nuevosErrores.var_estratoVivienda = "El estrato de vivienda es obligatorio.";
        }

        if (!formData.var_tipoVivienda) {
            nuevosErrores.var_tipoVivienda = "El tipo de vivienda es obligatorio.";
        }

        if (!selectedServiciosQueNoCuentan || selectedServiciosQueNoCuentan.length === 0) {
            nuevosErrores.selectedServiciosQueNoCuentan = "Los servicios con los que no cuentan son obligatorios.";
        }

        if (!selectedFactoresRiesgo || selectedFactoresRiesgo.length === 0) {
            nuevosErrores.selectedFactoresRiesgo = "Los factores de riesgo son obligatorios.";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }
        // Almacenar todos los datos en localStorage
        localStorage.setItem('datosProfesional', JSON.stringify(formData));
        localStorage.setItem('direccion', JSON.stringify(direccion));

        navigate('/datosProfesional2');
    };

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
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: '#F2F2F2',  borderColor: '#202B52'  }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: 'center', color: '#202B52', fontFamily: 'Roboto Condensed' }}> Datos personales </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: '5%', marginRight: '5%',  borderColor: '#202B52'  }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={manejarSiguiente}>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Departamento:</Typography>
                        <TextField select name="var_departamentoResidencia" variant="outlined" value={formData.var_departamentoResidencia} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} onBlur={handleBlur}
                            error={!!errors.var_departamentoResidencia}
                            helperText={errors.var_departamentoResidencia} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }}
                            InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }}>
                            {departamentos.map(departamento => (<MenuItem key={departamento.nombre} value={departamento.nombre}> {departamento.nombre} </MenuItem>))}
                        </TextField>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Ciudad:</Typography>
                        <TextField select name="var_ciudadResidencia" variant="outlined" value={formData.var_ciudadResidencia} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.var_ciudadResidencia}
                            helperText={errors.var_ciudadResidencia} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }}  >
                            {ciudades.map(ciudad => (<MenuItem key={ciudad} value={ciudad}> {ciudad} </MenuItem>))}
                        </TextField>


                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={3}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Tipo de Vía:</Typography>
                                <TextField select name="tipoVia" value={direccion.tipoVia} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}>
                                    {["Autopista", "Avenida", "Avenida Calle", "Avenida Carrera", "Bulevar", "Calle", "Carrera", "Circular", "Circunvalar", "Cuentas Corridas", "Diagonal", "Pasaje", "Paseo", "Peatonal", "Transversal", "Troncal", "Variante", "Via"].map(via => (
                                        <MenuItem key={via} value={via}>{via}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Número Principal:</Typography>
                                <TextField select name="numeroPrincipal" value={direccion.numeroPrincipal} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}>
                                    {numeros.map(numero => (
                                        <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Letra:</Typography>
                                <TextField select name="letraPrincipal" value={direccion.letraPrincipal} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}>
                                    {["", ...letras].map(letra => (
                                        <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Bis:</Typography>
                                <TextField select name="bisGuion" value={direccion.bisGuion} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}>
                                    {["", "Bis", "-"].map(bis => (
                                        <MenuItem key={bis} value={bis}>{bis}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Letra Secundaria:</Typography>
                                <TextField select name="letraSecundaria" value={direccion.letraSecundaria} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}>
                                    {["", ...letras].map(letra => (
                                        <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Orientación:</Typography>
                                <TextField select name="orientacion" value={direccion.orientacion} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}>
                                    {["", "Norte", "Sur", "Este", "Oeste"].map(orient => (
                                        <MenuItem key={orient} value={orient}>{orient}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Número Secundario:</Typography>
                                <TextField select name="numeroSecundario" value={direccion.numeroSecundario} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}>
                                    {numeros.map(numero => (
                                        <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Letra Adicional:</Typography>
                                <TextField select name="letraAdicional" value={direccion.letraAdicional} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}>
                                    {["", ...letras].map(letra => (
                                        <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Número Final:</Typography>
                                <TextField select name="numeroFinal" value={direccion.numeroFinal} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }} >
                                    {numeros.map(numero => (
                                        <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Orientación Final:</Typography>
                                <TextField select name="orientacionFinal" value={direccion.orientacionFinal} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}>
                                    {["", "Norte", "Sur", "Este", "Oeste"].map(orient => (
                                        <MenuItem key={orient} value={orient}>{orient}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Detalle de la Dirección (Ej. Edificio, Apartamento):</Typography>
                                <TextField name="detalle" value={direccion.detalle} onChange={manejarCambioDireccion} fullWidth InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }} />
                            </Grid>
                        </Grid>
                        

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Tipo de Vivienda:</Typography>
                        <TextField select name="var_tipoVivienda" value={formData.var_tipoVivienda} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.var_tipoVivienda}
                            helperText={errors.var_tipoVivienda} FormHelperTextProps={{
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
                            {tiposVivienda.map(tipo => (
                                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                            ))}
                        </TextField>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed' }}>Estrato de Vivienda:</Typography>
                        <TextField select name="var_estratoVivienda" value={formData.var_estratoVivienda} onChange={manejarCambioInput} sx={{ mb: 2 }} fullWidth onBlur={handleBlur} error={!!errors.var_estratoVivienda}
                            helperText={errors.var_estratoVivienda} FormHelperTextProps={{
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
                            {estratos.map(estrato => (
                                <MenuItem key={estrato} value={estrato}>{estrato}</MenuItem>
                            ))}
                        </TextField>

                        {/* servicios con los que no cuentan */}
                        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.selectedServiciosQueNoCuentan} >
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Seleccione los servicios con los que NO cuenta la vivienda: </Typography>
                            <Select
                                multiple
                                onBlur={handleBlur}
                                name="selectedServiciosQueNoCuentan"
                                value={selectedServiciosQueNoCuentan}
                                onChange={(event) => manejarCambioInput(event, 'servicioQueNoCuentan')}
                                renderValue={(selected) => {
                                    // Obtener los nombres de los servicios que no cuentan
                                    const selectedNames = serviciosQueNoCuentan
                                        .filter(actividad => selected.includes(actividad.id_servicioQueNoCuentaPK))
                                        .map(actividad => {
                                            const name = actividad.var_nombreServicioQueNoCuenta;
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
                                MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }} InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }} >
                                {serviciosQueNoCuentan.map((actividad) => (
                                    <MenuItem key={actividad.id_servicioQueNoCuentaPK} value={actividad.id_servicioQueNoCuentaPK}>
                                        <Checkbox checked={selectedServiciosQueNoCuentan.indexOf(actividad.id_servicioQueNoCuentaPK) > -1} />
                                        <ListItemText primary={actividad.var_nombreServicioQueNoCuenta} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.selectedServiciosQueNoCuentan && (
                                <FormHelperText
                                    sx={{
                                        marginLeft: 0,
                                    }}
                                >{errors.selectedServiciosQueNoCuentan}</FormHelperText>
                            )}
                        </FormControl>


                        <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.selectedFactoresRiesgo}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Seleccione factores de riesgo que tiene la vivienda: </Typography>
                            <Select
                                multiple
                                onBlur={handleBlur}
                                name="selectedFactoresRiesgo"
                                value={selectedFactoresRiesgo}
                                onChange={(event) => manejarCambioInput(event, 'factoresRiesgo')}
                                renderValue={(selected) => {
                                    // Obtener los nombres de los factores de riesgo seleccionados
                                    const selectedNames = factoresRiesgoOptions
                                        .filter(factor => selected.includes(factor.id_factoresRiesgoPK))
                                        .map(factor => {
                                            const name = factor.var_nombreRiesgo;
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
                                InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    },
                                }}
                            >
                                {factoresRiesgoOptions.map((factor) => (
                                    <MenuItem key={factor.id_factoresRiesgoPK} value={factor.id_factoresRiesgoPK}>
                                        <Checkbox checked={selectedFactoresRiesgo.indexOf(factor.id_factoresRiesgoPK) > -1} />
                                        <ListItemText primary={factor.var_nombreRiesgo} />
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.selectedFactoresRiesgo && (
                                <FormHelperText
                                    sx={{ marginLeft: 0 }}
                                >
                                    {errors.selectedFactoresRiesgo}
                                </FormHelperText>
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
        </div >
    );
};

export default VistaDatosProfesional;
