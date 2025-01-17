
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import departamentosCiudades from '../vistas formulario/departamentosCiudades.json';

import { Card, CardContent, Divider, Box, FormControl, Checkbox, ListItemText, Select, MenuItem, Typography, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const EditarDatosProfesional = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [var_departamentoResidencia, setVar_departamentoResidencia] = useState('');
    const [var_ciudadResidencia, setVar_ciudadResidencia] = useState('');
    const [var_direccionResidencia, setVar_direccionResidencia] = useState('');
    const [var_estratoVivienda, setVar_estratoVivienda] = useState('');
    const [var_tipoVivienda, setVar_tipoVivienda] = useState('');
    const [var_zonaVivienda, setVar_zonaVivienda] = useState('');
    const [departamentos, setDepartamentos] = useState(departamentosCiudades.departamentos);
    const [ciudades, setCiudades] = useState([]);
    const [serviciosQueNoCuentan, setServiciosQueNoCuentan] = useState([]);
    const [selectedServiciosQueNoCuentan, setSelectedServiciosQueNoCuentan] = useState([]);
    const [serviciosProfesional, setServiciosProfesional] = useState([]);
    const [prevSelectedServicios, setPrevSelectedServicios] = useState([]);
    const [prevSelectedFactoresRiesgo, setPrevSelectedFactoresRiesgo] = useState([]);
    const [factoresRiesgoOptions, setFactoresRiesgoOptions] = useState([]);
    const [selectedFactoresRiesgo, setSelectedFactoresRiesgo] = useState([]);




    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            var_departamentoResidencia: var_departamentoResidencia,
            var_ciudadResidencia: var_ciudadResidencia,
            var_direccionResidencia: var_direccionResidencia,
            var_estratoVivienda: var_estratoVivienda,
            var_tipoVivienda: var_tipoVivienda,

        });
        navigate('/app/editarDatosProfesional');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setVar_departamentoResidencia(res.data.var_departamentoResidencia);
        setVar_ciudadResidencia(res.data.var_ciudadResidencia);
        setVar_direccionResidencia(res.data.var_direccionResidencia);
        setVar_estratoVivienda(res.data.var_estratoVivienda);
        setVar_tipoVivienda(res.data.var_tipoVivienda);
        setVar_zonaVivienda(res.data.var_zonaVivienda);
    };

    useEffect(() => {
        const departamentoSeleccionado = departamentos.find(dep => dep.nombre === var_departamentoResidencia);
        if (departamentoSeleccionado) {
            setCiudades(departamentoSeleccionado.ciudades);
        } else {
            setCiudades([]);
        }
    }, [var_departamentoResidencia]);

    //Definicion de las zonas de vivienda
    const zonas = ["Urbana", "Rural"];
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



    // Fetch para los servicios que no cuenta un profesional
    useEffect(() => {
        const fetchServiciosProfesional = async () => {
            if (!id_profesionalPK) return; // No se hace la solicitud si no se proporciona un id_profesionalPK

            try {

                console.log('veremos', id_profesionalPK)
                const response = await axios.get(`http://localhost:3001/profesionalServiciosQueNoCuentan/${id_profesionalPK}`);
                setServiciosProfesional(response.data);

                // Después de obtener los servicios, extraemos los id_servicioQueNoCuentaPK y los almacenamos en el estado de los servicios seleccionados
                const serviciosSeleccionados = response.data.map(servicio => servicio.id_servicioQueNoCuentaFK);
                setSelectedServiciosQueNoCuentan(serviciosSeleccionados); // Actualizamos el estado de los servicios seleccionados
            } catch (error) {
                console.error('Error al obtener los servicios del profesional que no cuentan:', error);
            }
        };

        fetchServiciosProfesional();
    }, [id_profesionalPK]);

    // Fetch para los factores de riesgo de un profesional
    useEffect(() => {
        const fetchFactoresRiesgoProfesional = async () => {
            if (!id_profesionalPK) return; // No se hace la solicitud si no se proporciona un id_profesionalPK

            try {
                console.log('veremos', id_profesionalPK);
                const response = await axios.get(`http://localhost:3001/profesionalFactoresRiesgo/${id_profesionalPK}`);
                setFactoresRiesgoOptions(response.data); // Almacena los factores de riesgo del profesional

                // Después de obtener los factores de riesgo, extraemos los id_factoresRiesgoFK y los almacenamos en el estado de los factores seleccionados
                const factoresRiesgoSeleccionados = response.data.map(factor => factor.id_factoresRiesgoFK);
                setSelectedFactoresRiesgo(factoresRiesgoSeleccionados); // Actualiza el estado de los factores de riesgo seleccionados
            } catch (error) {
                console.error('Error al obtener los factores de riesgo del profesional:', error);
            }
        };

        fetchFactoresRiesgoProfesional();
    }, [id_profesionalPK]);


    // Fetch para los servicios que no cuentan
    useEffect(() => {
        const fetchServiciosQueNoCuentan = async () => {
            try {
                const response = await axios.get('https://evaluacion.esumer.edu.co/api/serviciosQueNoCuentan/');
                setServiciosQueNoCuentan(response.data);
            } catch (error) {
                console.error('Error al obtener los servicios que no cuentan:', error);
            }
        };

        fetchServiciosQueNoCuentan();
    }, []);

    // Manejador de cambio de selección
    const manejarCambioInput = (event, campo) => {
        const {
            target: { value },
        } = event;

        if (campo === 'factoresRiesgo') {
            setSelectedFactoresRiesgo(value); // Actualiza los factores de riesgo seleccionados
        } else if (campo === 'serviciosQueNoCuentan') {
            setSelectedServiciosQueNoCuentan(value); // Actualiza los servicios seleccionados
        }
    };


    // Función para manejar la actualización de los servicios que el profesional no cuenta
    const actualizarServiciosQueNoCuentan = async () => {
        try {
            // Eliminar servicios deseleccionados
            const serviciosParaEliminar = prevSelectedServicios.filter(
                (id_servicio) => !selectedServiciosQueNoCuentan.includes(id_servicio)
            );

            for (let id_servicio of serviciosParaEliminar) {
                await axios.delete(`http://localhost:3001/profesionalServiciosQueNoCuentan/${id_profesionalPK}/${id_servicio}`);
                console.log(`Relación eliminada: Profesional ID ${id_profesionalPK}, Servicio Que No Cuentan ID ${id_servicio}`);
            }

            // Agregar nuevos servicios seleccionados
            const serviciosParaAgregar = selectedServiciosQueNoCuentan.filter(
                (id_servicio) => !prevSelectedServicios.includes(id_servicio)
            );

            for (let id_servicio of serviciosParaAgregar) {
                await axios.post(`http://localhost:3001/profesionalServiciosQueNoCuentan/`, {
                    id_profesionalFK: id_profesionalPK,
                    id_servicioQueNoCuentaFK: id_servicio,
                });
                console.log(`Relación creada: Profesional ID ${id_profesionalPK}, Servicio Que No Cuentan ID ${id_servicio}`);
            }

            // Actualizar el estado previo
            setPrevSelectedServicios([...selectedServiciosQueNoCuentan]);
        } catch (error) {
            console.error('Error al actualizar los servicios:', error);
        }
    };

    const actualizarFactoresDeRiesgo = async () => {
        try {
            // Eliminar factores de riesgo deseleccionados
            const factoresParaEliminar = prevSelectedFactoresRiesgo.filter(
                (id_factor) => !selectedFactoresRiesgo.includes(id_factor)
            );

            for (let id_factor of factoresParaEliminar) {
                await axios.delete(`http://localhost:3001/profesionalFactoresRiesgo/${id_profesionalPK}/${id_factor}`);
                console.log(`Relación eliminada: Profesional ID ${id_profesionalPK}, Factor de Riesgo ID ${id_factor}`);
            }

            // Agregar nuevos factores seleccionados
            const factoresParaAgregar = selectedFactoresRiesgo.filter(
                (id_factor) => !prevSelectedFactoresRiesgo.includes(id_factor)
            );

            for (let id_factor of factoresParaAgregar) {
                await axios.post(`http://localhost:3001/profesionalFactoresRiesgo/`, {
                    id_profesionalFK: id_profesionalPK,
                    id_factoresRiesgoFK: id_factor,
                });
                console.log(`Relación creada: Profesional ID ${id_profesionalPK}, Factor de Riesgo ID ${id_factor}`);
            }

            // Actualizar el estado previo
            setPrevSelectedFactoresRiesgo([...selectedFactoresRiesgo]);
        } catch (error) {
            console.error('Error al actualizar los factores de riesgo:', error);
        }
    };



    // fectch para los factores de riesgo
    useEffect(() => {
        const fetchFactoresRiesgo = async () => {
            try {
                const response = await axios.get('https://evaluacion.esumer.edu.co/api/factoresRiesgo/');
                setFactoresRiesgoOptions(response.data);
            } catch (error) {
                console.error('Error al obtener los factores de riesgo:', error);
            }
        };

        fetchFactoresRiesgo();
    }, []);

    useEffect(() => {
        if (serviciosProfesional.length > 0) {
            const serviciosSeleccionados = serviciosProfesional.map(servicio => servicio.id_servicioQueNoCuentaFK);
            setSelectedServiciosQueNoCuentan(serviciosSeleccionados);
            setPrevSelectedServicios(serviciosSeleccionados);
        }
    }, [serviciosProfesional]);

    useEffect(() => {
        if (JSON.stringify(prevSelectedFactoresRiesgo) !== JSON.stringify(selectedFactoresRiesgo)) {
            actualizarFactoresDeRiesgo(); // Actualiza la relación entre el profesional y los factores de riesgo seleccionados/deseleccionados
            setPrevSelectedFactoresRiesgo(selectedFactoresRiesgo); // Actualiza el valor previo
        }
    }, [selectedFactoresRiesgo]);

    const guardar = () => {

        // actualizarFactoresDeRiesgo();
        actualizarServiciosQueNoCuentan();

    }



    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}>
                <img src="public/fondo_form.png" alt="Descripción de la imagen" style={{ width: "20%", height: "auto" }} />
            </div>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center", color: "#202B52", fontFamily: "Roboto Condensed" }}>
                            <strong>Datos personales</strong>
                        </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: "5%", marginRight: "5%", borderColor: "#202B52" }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={actualizar}>

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Departamento:</Typography>
                        <TextField select name="var_departamentoResidencia" variant="outlined" value={var_departamentoResidencia} onChange={(e) => setVar_departamentoResidencia(e.target.value)}
                            fullWidth sx={{ mb: 2 }}
                            FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }}
                            InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                },
                            }}>
                            {departamentos.map(departamento => (<MenuItem key={departamento.nombre} value={departamento.nombre}> {departamento.nombre} </MenuItem>))}
                        </TextField>


                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Ciudad:</Typography>
                        <TextField select name="var_ciudadResidencia" variant="outlined" value={var_ciudadResidencia} onChange={(e) => setVar_ciudadResidencia(e.target.value)}
                            fullWidth sx={{ mb: 2 }} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                },
                            }}  >
                            {ciudades.map(ciudad => (<MenuItem key={ciudad} value={ciudad}> {ciudad} </MenuItem>))}
                        </TextField>

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>direccion residencia:</Typography>
                        <TextField
                            value={var_direccionResidencia}
                            onChange={(e) => setVar_direccionResidencia(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />
                        
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Zona de la vivienda:</Typography>
                        <TextField select name="var_zonaVivienda" value={var_zonaVivienda} onChange={(e) => setVar_zonaVivienda(e.target.value)} fullWidth sx={{ mb: 2 }} FormHelperTextProps={{
                            sx: {
                                marginLeft: 0,
                            },
                        }} InputProps={{
                            sx: {
                                height: "40px",
                                fontFamily: "Roboto Condensed",
                                fontSize: "16px"
                            },
                        }} >
                            {zonas.map(zona => (
                                <MenuItem key={zona} value={zona}>{zona}</MenuItem>
                            ))}
                        </TextField>


                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Tipo de Vivienda:</Typography>
                        <TextField select name="var_tipoVivienda" value={var_tipoVivienda} onChange={(e) => setVar_tipoVivienda(e.target.value)} fullWidth sx={{ mb: 2 }} FormHelperTextProps={{
                            sx: {
                                marginLeft: 0,
                            },
                        }} InputProps={{
                            sx: {
                                height: "40px",
                                fontFamily: "Roboto Condensed",
                                fontSize: "16px"
                            },
                        }} >
                            {tiposVivienda.map(tipo => (
                                <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                            ))}
                        </TextField>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed' }}>Estrato de Vivienda:</Typography>
                        <TextField select name="var_estratoVivienda" value={var_estratoVivienda} onChange={(e) => setVar_estratoVivienda(e.target.value)} sx={{ mb: 2 }} fullWidth FormHelperTextProps={{
                            sx: {
                                marginLeft: 0,
                            },
                        }} InputProps={{
                            sx: {
                                height: "40px",
                                fontFamily: "Roboto Condensed",
                                fontSize: "16px"
                            },
                        }} >
                            {estratos.map(estrato => (
                                <MenuItem key={estrato} value={estrato}>{estrato}</MenuItem>
                            ))}
                        </TextField>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>
                                Seleccione los servicios con los que <strong>NO</strong> cuenta la vivienda (se pueden seleccionar varias opciones):
                            </Typography>
                            <Select
                                multiple
                                name="selectedServiciosQueNoCuentan"
                                value={selectedServiciosQueNoCuentan}
                                onChange={(event) => manejarCambioInput(event, 'serviciosQueNoCuentan')} // Pasar 'serviciosQueNoCuentan'
                                renderValue={(selected) => {
                                    const selectedNames = serviciosQueNoCuentan
                                        .filter(actividad => selected.includes(actividad.id_servicioQueNoCuentaPK))
                                        .map(actividad => {
                                            const name = actividad.var_nombreServicioQueNoCuenta;
                                            const index = name.indexOf('(');
                                            if (index !== -1) {
                                                return name.substring(0, index).trim();
                                            }
                                            return name;
                                        });

                                    return selectedNames.join(' - ');
                                }}
                                fullWidth
                                variant="outlined"
                                MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px",
                                }}
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
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>
                                Seleccione los factores de riesgo de la vivienda (se pueden seleccionar varias opciones):
                            </Typography>
                            <Select
                                multiple
                                name="selectedFactoresRiesgo"
                                value={selectedFactoresRiesgo}
                                onChange={(event) => manejarCambioInput(event, 'factoresRiesgo')}
                                renderValue={(selected) => {
                                    const selectedNames = factoresRiesgoOptions
                                        .filter(factor => selected.includes(factor.id_factoresRiesgoPK))
                                        .map(factor => {
                                            const name = factor.var_nombreRiesgo;
                                            const index = name.indexOf('(');
                                            if (index !== -1) {
                                                return name.substring(0, index).trim();
                                            }
                                            return name;
                                        });

                                    return selectedNames.join(' - ');
                                }}
                                fullWidth
                                variant="outlined"
                                MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px",
                                }}
                            >
                                {factoresRiesgoOptions.map((factor, index) => (
                                    <MenuItem key={index} value={factor.id_factoresRiesgoPK}>
                                        <Checkbox checked={selectedFactoresRiesgo.indexOf(factor.id_factoresRiesgoPK) > -1} />
                                        <ListItemText primary={factor.var_nombreRiesgo} />
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>




                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} onClick={guardar} variant="contained" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );


}

export default EditarDatosProfesional