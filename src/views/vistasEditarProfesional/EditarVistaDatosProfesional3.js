
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, MenuItem, Checkbox, ListItemText, FormControl, Select, Box, Typography, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const EditarDatosProfesional3 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [id_epsFK, setId_epsFK] = useState()
    const [id_fondoPensionFK, setId_fondoPensionFK] = useState('');
    const [boolean_cambioEpsOArl, setBoolean_cambioEpsOArl] = useState('');
    const [epsOptions, setEpsOptions] = useState([]);
    const [selectedEps, setSelectedEps] = useState('');
    const [fondoPensionOptions, setFondoPensionOptions] = useState([]);
    const [selectedFondoPension, setSelectedFondoPension] = useState("");
    const [serviciosSaludAdicionalOptions, setServiciosSaludAdicionalOptions] = useState([]);
    const [selectedServiciosSaludAdicional, setSelectedServiciosSaludAdicional] = useState([]);
    const [prevSelectedServiciosSaludAdicional, setPrevSelectedServiciosSaludAdicional] = useState([]);
    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            id_epsFK: id_epsFK,
            id_fondoPensionFK: id_fondoPensionFK,
            boolean_cambioEpsOArl: boolean_cambioEpsOArl,

        });
        navigate('/app/editarDatosProfesional3');
    };

    // Hacer la solicitud para obtener las EPS al cargar el componente
    useEffect(() => {
        // Cargar las opciones de EPS al montar el componente
        const fetchEps = async () => {
            try {
                const response = await axios.get('https://evaluacion.esumer.edu.co/api/eps/');
                setEpsOptions(response.data);
            } catch (error) {
                console.error('Error al obtener las EPS:', error);
            }
        };

        fetchEps();
    }, []);

    // Hacer la solicitud para obtener los fondos de pensión
    useEffect(() => {
        const fetchFondosPension = async () => {
            try {
                const response = await axios.get('https://evaluacion.esumer.edu.co/api/fondoPension/');
                setFondoPensionOptions(response.data); // Guardamos las opciones en el estado
            } catch (error) {
                console.error('Error al obtener los fondos de pensión:', error);
            }
        };
        fetchFondosPension();
    }, []);
    // Hacer la solicitud para obtener los servicios de salud adicional
    useEffect(() => {
        const fetchServiciosSaludAdicional = async () => {
            try {
                const response = await axios.get('https://evaluacion.esumer.edu.co/api/servicioSaludAdicional/');
                setServiciosSaludAdicionalOptions(response.data);
            } catch (error) {
                console.error('Error al obtener los servicios de salud adicional:', error);
            }
        };
        fetchServiciosSaludAdicional();
    }, []);


    const manejarCambioServicios = async (event) => {
        const { value } = event.target; // Nuevas opciones seleccionadas
        setSelectedServiciosSaludAdicional(value);

        // Eliminar servicios deseleccionados
        const serviciosParaEliminar = prevSelectedServiciosSaludAdicional.filter(
            (id_servicio) => !value.includes(id_servicio)
        );

        for (let id_servicio of serviciosParaEliminar) {
            // Agregar log para revisar el valor de id_servicio
            console.log("Eliminando servicio con id:", id_servicio);
            try {
                await axios.delete(`https://evaluacion.esumer.edu.co/api/profesionalServicioSaludAdicional/${id_profesionalPK}/${id_servicio}`);
                console.log(`Relación eliminada: Profesional ID ${id_profesionalPK}, Servicio ID ${id_servicio}`);
            } catch (error) {
                console.error('Error al eliminar servicio:', error);
            }
        }

        // Agregar nuevos servicios seleccionados
        const serviciosParaAgregar = value.filter(
            (id_servicio) => !prevSelectedServiciosSaludAdicional.includes(id_servicio)
        );

        for (let id_servicio of serviciosParaAgregar) {
            // Agregar log para revisar el valor de id_servicio
            console.log("Agregando servicio con id:", id_servicio);
            console.log("Agregando servicio con id_profesional:", id_profesionalPK);
            try {
                await axios.post(`http://localhost:3001/profesionalServicioSaludAdicional/`, {
                    id_profesionalFK: id_profesionalPK,
                    id_ServicioDeSaludAdicionalFK: id_servicio
                });
                console.log(`Relación creada: Profesional ID ${id_profesionalPK}, Servicio ID ${id_servicio}`);
            } catch (error) {
                console.error('Error al agregar servicio:', error);
            }
        }

        // Actualizar el estado previo
        setPrevSelectedServiciosSaludAdicional(value);
    };


    useEffect(() => {
        // Inicializar el estado previo con los servicios ya asociados al profesional
        if (id_profesionalPK) {
            fetchServiciosProfesional();
        }
    }, [id_profesionalPK]);

    // Cuando los servicios asociados al profesional se obtienen correctamente
    const fetchServiciosProfesional = async () => {
        try {
            // Obtener los servicios asociados al profesional
            const response = await axios.get(
                `https://evaluacion.esumer.edu.co/api/profesionalServicioSaludAdicional/${id_profesionalPK}`
            );
                
            // Extraer los IDs de los servicios asociados
            const serviciosIds = response.data.map(
                (servicio) => servicio.id_ServicioDeSaludAdicionalFK
            );
    
            console.log("Servicios IDs extraídos:", serviciosIds); 
    
            // Sincronizar el estado de los servicios seleccionados
            setSelectedServiciosSaludAdicional(serviciosIds);
            setPrevSelectedServiciosSaludAdicional(serviciosIds);
    
            // Sincronizar los nombres con los IDs
            const selectedNames = serviciosSaludAdicionalOptions
                .filter((servicio) => serviciosIds.includes(servicio.id_servicioDeSaludAdicionalPK))
                .map((servicio) => servicio.var_nombreServicioDeSaludAdicional);
    
            console.log('Servicios seleccionados por nombre:', selectedNames); // Verifica los nombres
    
        } catch (error) {
            console.error('Error al obtener los servicios de salud adicional del profesional:', error);
        }
    };
    



    useEffect(() => {
        // Esperar a que las opciones de EPS estén cargadas y luego obtener el usuario
        if (epsOptions.length > 0) {
            getUsuarios();
        }

        // Esperar a que las opciones de fondo de pension estén cargadas y luego obtener el usuario
        if (fondoPensionOptions.length > 0) {
            getUsuarios();
        }
    }, [epsOptions, fondoPensionOptions]);



    const getUsuarios = async () => {
        try {
            const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
            setId_profesionalPK(res.data.id_profesionalPK);
            setId_epsFK(res.data.id_epsFK);
            setId_fondoPensionFK(res.data.id_fondoPensionFK);
            setBoolean_cambioEpsOArl(res.data.boolean_cambioEpsOArl);

            // Buscar la EPS por id_epsFK y sincronizar el valor inicial
            const selected = epsOptions.find((eps) => eps.id_epsPK === res.data.id_epsFK);
            if (selected) {
                setSelectedEps(selected.id_epsPK); // Ajustar `selectedEps` al valor inicial
            }

            // Buscar el fondo de pensión por id_fondoPensionFK y sincronizar el valor inicial
            const selectedFondo = fondoPensionOptions.find(
                (fondo) => fondo.id_fondoPensionPK === res.data.id_fondoPensionFK
            );
            if (selectedFondo) {
                setSelectedFondoPension(selectedFondo.id_fondoPensionPK);
            }
        } catch (error) {
            console.error('Error al obtener los datos del profesional:', error);
        }
    };



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

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>¿Ha cambiado de EPS o AFP?:</Typography>
                        <TextField
                            value={boolean_cambioEpsOArl}
                            onChange={(e) => setBoolean_cambioEpsOArl(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography
                            variant="h6"
                            sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                        >
                            Seleccione EPS <strong>ACTUAL</strong>:
                        </Typography>
                        <TextField
                            select
                            value={selectedEps} // Sincronizado con el estado
                            name="selectedEps"
                            onChange={(e) => {
                                setSelectedEps(e.target.value);
                                setId_epsFK(e.target.value); // También actualiza el id_epsFK
                            }}
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                            InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px",
                                },
                            }}
                        >
                            {epsOptions.map((eps) => (
                                <MenuItem key={eps.id_epsPK} value={eps.id_epsPK}>
                                    {eps.var_nombreEps}
                                </MenuItem>
                            ))}
                        </TextField>

                        <FormControl
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                            >
                                Seleccione Fondo de Pensión:
                            </Typography>
                            <Select
                                name="selectedFondoPension"
                                value={selectedFondoPension}
                                onChange={(e) => {
                                    setSelectedFondoPension(e.target.value);
                                    setId_fondoPensionFK(e.target.value);
                                }}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px",
                                }}
                            >
                                {fondoPensionOptions.map((fondo) => (
                                    <MenuItem
                                        key={fondo.id_fondoPensionPK}
                                        value={fondo.id_fondoPensionPK}
                                    >
                                        {fondo.var_nombreFondoPension}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>

                        <FormControl
                            sx={{ mb: 2 }}
                            fullWidth
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                            >
                                Seleccione los servicios de salud adicional (se pueden seleccionar varias opciones):
                            </Typography>
                            <Select
                                name="selectedServiciosSaludAdicional"
                                multiple
                                value={selectedServiciosSaludAdicional}
                                onChange={(event) =>
                                    manejarCambioServicios(event, "serviciosSaludAdicional")
                                }
                                renderValue={(selected) => {
                                    const selectedNames = serviciosSaludAdicionalOptions
                                        .filter((servicio) =>
                                            selected.includes(servicio.id_servicioDeSaludAdicionalPK)
                                        )
                                        .map(
                                            (servicio) => servicio.var_nombreServicioDeSaludAdicional
                                        );
                                    return selectedNames.join(" - ");
                                }}
                                fullWidth
                                variant="outlined"
                                MenuProps={{
                                    PaperProps: { style: { maxHeight: 224, width: 250 } },
                                }}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px",
                                }}
                            >
                                {serviciosSaludAdicionalOptions.map((servicio) => (
                                    <MenuItem
                                        key={servicio.id_servicioDeSaludAdicionalPK}
                                        value={servicio.id_servicioDeSaludAdicionalPK}
                                    >
                                        <Checkbox
                                            checked={
                                                selectedServiciosSaludAdicional.indexOf(
                                                    servicio.id_servicioDeSaludAdicionalPK
                                                ) > -1
                                            }
                                        />
                                        <ListItemText
                                            primary={servicio.var_nombreServicioDeSaludAdicional}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>

                           
                        </FormControl>

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );


}

export default EditarDatosProfesional3



























