import { Card, CardContent, Divider, Box, Typography, TextField, FormControlLabel, Checkbox, Button, MenuItem, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import departamentosCiudades from './departamentosCiudades.json';
import { useNavigate } from "react-router-dom";


const VistaDatosProfesional = () => {
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
        "Casa adosada",
        "Cabaña",
        "Chalet",
        "Mobile home",
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

    // Función para manejar el cambio de los inputs
    const manejarCambioInput = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });

        // Si se cambia el departamento, actualizar las ciudades
        if (name === "var_departamentoResidencia") {
            const departamentoSeleccionado = departamentos.find(departamento => departamento.nombre === value);
            setCiudades(departamentoSeleccionado ? departamentoSeleccionado.ciudades : []);
        }
    };

    // Función para manejar el cambio de los inputs de dirección
    const manejarCambioDireccion = (event) => {
        const { name, value } = event.target;
        setDireccion({ ...direccion, [name]: value });

        // Construir la dirección completa
        const direccionCompleta = `${direccion.tipoVia} ${direccion.numeroPrincipal} ${direccion.letraPrincipal} ${direccion.bisGuion} ${direccion.letraSecundaria} ${direccion.orientacion} No. ${direccion.numeroSecundario} ${direccion.letraAdicional} - ${direccion.numeroFinal} ${direccion.orientacionFinal}${direccion.detalle}`;
        setFormData({ ...formData, var_direccionResidencia: direccionCompleta });
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
            <Card variant="outlined" sx={{  p: 0,  width: "100%",   maxWidth: 800,  margin: "50px auto" }}>
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


                        <Button variant="contained" color="primary" onClick={manejarSiguiente} type="submit"> Siguiente </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional;
