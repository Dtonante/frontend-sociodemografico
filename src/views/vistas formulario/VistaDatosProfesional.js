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
            <Card variant="outlined" sx={{ p: 0 }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}> Formulario de Profesional </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={manejarSiguiente}>
                        {/* campos de departamento y ciudad */}
                        <TextField select name="var_departamentoResidencia" label="Departamento" variant="outlined" value={formData.var_departamentoResidencia} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} >
                            {departamentos.map(departamento => (<MenuItem key={departamento.nombre} value={departamento.nombre}> {departamento.nombre} </MenuItem>))}
                        </TextField>
                        <TextField select name="var_ciudadResidencia" label="Ciudad" variant="outlined" value={formData.var_ciudadResidencia} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} >
                            {ciudades.map(ciudad => (<MenuItem key={ciudad} value={ciudad}> {ciudad} </MenuItem>))}
                        </TextField>

                        {/* Campos de Dirección en varias columnas */}
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={3}>
                                <TextField select name="tipoVia" label="Tipo de Vía" value={direccion.tipoVia} onChange={manejarCambioDireccion} fullWidth>
                                    {["Autopista", "Avenida", "Avenida Calle", "Avenida Carrera", "Bulevar", "Calle", "Carrera", "Circular", "Circunvalar", "Cuentas Corridas", "Diagonal", "Pasaje", "Paseo", "Peatonal", "Transversal", "Troncal", "Variante", "Via"].map(via => (
                                        <MenuItem key={via} value={via}>{via}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField select name="numeroPrincipal" label="Número Principal" value={direccion.numeroPrincipal} onChange={manejarCambioDireccion} fullWidth>
                                    {numeros.map(numero => (
                                        <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField select name="letraPrincipal" label="Letra" value={direccion.letraPrincipal} onChange={manejarCambioDireccion} fullWidth>
                                    {["", ...letras].map(letra => (
                                        <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField select name="bisGuion" label="Bis o -" value={direccion.bisGuion} onChange={manejarCambioDireccion} fullWidth>
                                    {["", "Bis", "-"].map(bis => (
                                        <MenuItem key={bis} value={bis}>{bis}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField select name="letraSecundaria" label="Letra Secundaria" value={direccion.letraSecundaria} onChange={manejarCambioDireccion} fullWidth>
                                    {["", ...letras].map(letra => (
                                        <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField select name="orientacion" label="Orientación" value={direccion.orientacion} onChange={manejarCambioDireccion} fullWidth>
                                    {["", "Norte", "Sur", "Este", "Oeste"].map(orient => (
                                        <MenuItem key={orient} value={orient}>{orient}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField select name="numeroSecundario" label="Número Secundario" value={direccion.numeroSecundario} onChange={manejarCambioDireccion} fullWidth>
                                    {numeros.map(numero => (
                                        <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField select name="letraAdicional" label="Letra Adicional" value={direccion.letraAdicional} onChange={manejarCambioDireccion} fullWidth>
                                    {["", ...letras].map(letra => (
                                        <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField select name="numeroFinal" label="Número Final" value={direccion.numeroFinal} onChange={manejarCambioDireccion} fullWidth >
                                    {numeros.map(numero => (
                                        <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField select name="orientacionFinal" label="Orientación Final" value={direccion.orientacionFinal} onChange={manejarCambioDireccion} fullWidth>
                                    {["", "Norte", "Sur", "Este", "Oeste"].map(orient => (
                                        <MenuItem key={orient} value={orient}>{orient}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField name="detalle" label="Detalle de la Dirección (Ej. Edificio, Apartamento)" value={direccion.detalle} onChange={manejarCambioDireccion} fullWidth />
                            </Grid>
                        </Grid>

                        <TextField select name="var_estratoVivienda" label="Estrato de Vivienda" value={formData.var_estratoVivienda} onChange={manejarCambioInput} sx={{ mb: 2 }} fullWidth >
                            {estratos.map(estrato => (
                                <MenuItem key={estrato} value={estrato}>{estrato}</MenuItem>
                            ))}
                        </TextField>


                        <TextField select name="var_tipoVivienda" label="Tipo de Vivienda" value={formData.var_tipoVivienda} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} >
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
