import { Select, Card, CardContent, Divider, Box, Typography, TextField, FormControl, ListItemText, Checkbox, Button, MenuItem, Grid, } from "@mui/material";
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
        id_usuarioFK: localStorage.getItem('usuarioId'),
        boolean_aceptaTratamientoDatos: JSON.parse(localStorage.getItem('aceptaDatos')),
        var_rh: localStorage.getItem('var_rh'),
        date_fechaNacimiento: localStorage.getItem('date_fechaNacimiento'),
        var_grupoEtnico: localStorage.getItem('var_grupoEtnico'),
        var_celular: localStorage.getItem('var_celular'),
        var_telefonoFijo: localStorage.getItem('var_telefonoFijo'),
        var_departamentoResidencia: "",
        var_ciudadResidencia: "",
        var_direccionResidencia: "",
        var_estratoVivienda: "",
        var_tipoVivienda: ""

    });

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

    // Agrega un useEffect para hacer el console.log al montar el componente
    useEffect(() => {
        console.log("Valores iniciales desde localStorage:");
        console.log("ID Usuario:", formData.id_usuarioFK);
        console.log("Grupo etnico:", formData.var_grupoEtnico);
        console.log("Acepta Tratamiento de Datos:", formData.boolean_aceptaTratamientoDatos);
        console.log("fecha nacimiento:", formData.date_fechaNacimiento);
        console.log("rh:", formData.var_rh);
        console.log("var_celular:", formData.var_celular);
        console.log("var_telefonoFijo:", formData.var_telefonoFijo);
    }, []);

    //Definicion de campo para el estrato
    const estratos = ["0", "1", "2", "3", "4", "5", "6"];
    //Definicion de campos para los tipos de vivienda
    const tiposVivienda = [
        "Casa unifamiliar",
        "Apartamento",
        "Condominio",
        "Vivienda de interés social",
        "Vivienda colaborativa",
        "Vivienda sustentable"
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
        }else if (campo === 'servicioQueNoCuentan') {
            setSelectedServiciosQueNoCuentan(value);
            localStorage.setItem('selectedServiciosQueNoCuentan', JSON.stringify(value));
        }
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
        // Almacenar todos los datos en localStorage
        localStorage.setItem('datosProfesional', JSON.stringify(formData));
        localStorage.setItem('direccion', JSON.stringify(direccion));

        navigate('/datosProfesional2');
    };


    return (
        <div>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}> Formulario de Profesional </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={manejarSiguiente}>
                        <Typography variant="h6">Departamento:</Typography>
                        <TextField select name="var_departamentoResidencia" variant="outlined" value={formData.var_departamentoResidencia} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} >
                            {departamentos.map(departamento => (<MenuItem key={departamento.nombre} value={departamento.nombre}> {departamento.nombre} </MenuItem>))}
                        </TextField>
                        <Typography variant="h6">Ciudad:</Typography>
                        <TextField select name="var_ciudadResidencia" variant="outlined" value={formData.var_ciudadResidencia} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} >
                            {ciudades.map(ciudad => (<MenuItem key={ciudad} value={ciudad}> {ciudad} </MenuItem>))}
                        </TextField>


                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={3}>
                                <Typography variant="h6">Tipo de Vía:</Typography>
                                <TextField select name="tipoVia" value={direccion.tipoVia} onChange={manejarCambioDireccion} fullWidth>
                                    {["Autopista", "Avenida", "Avenida Calle", "Avenida Carrera", "Bulevar", "Calle", "Carrera", "Circular", "Circunvalar", "Cuentas Corridas", "Diagonal", "Pasaje", "Paseo", "Peatonal", "Transversal", "Troncal", "Variante", "Via"].map(via => (
                                        <MenuItem key={via} value={via}>{via}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6">Número Principal:</Typography>
                                <TextField select name="numeroPrincipal" value={direccion.numeroPrincipal} onChange={manejarCambioDireccion} fullWidth>
                                    {numeros.map(numero => (
                                        <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">Letra:</Typography>
                                <TextField select name="letraPrincipal" value={direccion.letraPrincipal} onChange={manejarCambioDireccion} fullWidth>
                                    {["", ...letras].map(letra => (
                                        <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">Bis:</Typography>
                                <TextField select name="bisGuion" value={direccion.bisGuion} onChange={manejarCambioDireccion} fullWidth>
                                    {["", "Bis", "-"].map(bis => (
                                        <MenuItem key={bis} value={bis}>{bis}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">Letra Secundaria:</Typography>
                                <TextField select name="letraSecundaria" value={direccion.letraSecundaria} onChange={manejarCambioDireccion} fullWidth>
                                    {["", ...letras].map(letra => (
                                        <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">Orientación:</Typography>
                                <TextField select name="orientacion" value={direccion.orientacion} onChange={manejarCambioDireccion} fullWidth>
                                    {["", "Norte", "Sur", "Este", "Oeste"].map(orient => (
                                        <MenuItem key={orient} value={orient}>{orient}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6">Número Secundario:</Typography>
                                <TextField select name="numeroSecundario" value={direccion.numeroSecundario} onChange={manejarCambioDireccion} fullWidth>
                                    {numeros.map(numero => (
                                        <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">Letra Adicional:</Typography>
                                <TextField select name="letraAdicional" value={direccion.letraAdicional} onChange={manejarCambioDireccion} fullWidth>
                                    {["", ...letras].map(letra => (
                                        <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h6">Número Final:</Typography>
                                <TextField select name="numeroFinal" value={direccion.numeroFinal} onChange={manejarCambioDireccion} fullWidth >
                                    {numeros.map(numero => (
                                        <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography variant="h6">Orientación Final:</Typography>
                                <TextField select name="orientacionFinal" value={direccion.orientacionFinal} onChange={manejarCambioDireccion} fullWidth>
                                    {["", "Norte", "Sur", "Este", "Oeste"].map(orient => (
                                        <MenuItem key={orient} value={orient}>{orient}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6">Detalle de la Dirección (Ej. Edificio, Apartamento):</Typography>
                                <TextField name="detalle" value={direccion.detalle} onChange={manejarCambioDireccion} fullWidth />
                            </Grid>
                        </Grid>
                        <Typography variant="h6">Estrato de Vivienda:</Typography>
                        <TextField select name="var_estratoVivienda" value={formData.var_estratoVivienda} onChange={manejarCambioInput} sx={{ mb: 2 }} fullWidth >
                            {estratos.map(estrato => (
                                <MenuItem key={estrato} value={estrato}>{estrato}</MenuItem>
                            ))}
                        </TextField>

                        <Typography variant="h6">Tipo de Vivienda:</Typography>
                        <TextField select name="var_tipoVivienda" value={formData.var_tipoVivienda} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} >
                            {tiposVivienda.map(tipo => (
                                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                            ))}
                        </TextField>

                        {/* servicios con los que no cuentan */}
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6">Seleccione las actividades que realiza en su tiempo libre: </Typography>
                            <Select
                                multiple
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
                                MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}
                            >
                                {serviciosQueNoCuentan.map((actividad) => (
                                    <MenuItem key={actividad.id_servicioQueNoCuentaPK} value={actividad.id_servicioQueNoCuentaPK}>
                                        <Checkbox checked={selectedServiciosQueNoCuentan.indexOf(actividad.id_servicioQueNoCuentaPK) > -1} />
                                        <ListItemText primary={actividad.var_nombreServicioQueNoCuenta} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>


                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6">Seleccione Factores de Riesgo: </Typography>
                            <Select
                                multiple
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
                            >
                                {factoresRiesgoOptions.map((factor) => (
                                    <MenuItem key={factor.id_factoresRiesgoPK} value={factor.id_factoresRiesgoPK}>
                                        <Checkbox checked={selectedFactoresRiesgo.indexOf(factor.id_factoresRiesgoPK) > -1} />
                                        <ListItemText primary={factor.var_nombreRiesgo} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>





                        <Button variant="contained" color="primary" onClick={manejarSiguiente} type="submit"> Siguiente </Button>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
};

export default VistaDatosProfesional;
