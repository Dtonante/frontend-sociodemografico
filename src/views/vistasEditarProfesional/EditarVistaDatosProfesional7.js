import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, Select, Checkbox, ListItemText, RadioGroup, FormControlLabel, Radio, FormControl, MenuItem, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'https://evaluacion.esumer.edu.co/api/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'https://evaluacion.esumer.edu.co/api/profesional/porUsuario/';

const EditarDatosProfesional7 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [set_pasoMayorTiempoLibre, setSet_pasoMayorTiempoLibre] = useState("")
    const [boolean_usaLentes, setBoolean_usaLentes] = useState("")
    const [var_altura, setVar_altura] = useState('');
    const [var_peso, setVar_peso] = useState('');
    const [boolean_bebidasEnergizantes, setBoolean_bebidasEnergizantes] = useState('');
    const [var_frecuenciaBebidasEnergeticas, setVar_frecuenciaBebidasEnergeticas] = useState('');
    const [boolean_actividadFisica, setBoolean_actividadFisica] = useState('');
    const [var_frecuenciaActividadFisica, setVar_frecuenciaActividadFisica] = useState('');
    const [boolean_fuma, setBoolean_fuma] = useState('');
    const [var_frecuenciaFuma, setVar_frecuenciaFuma] = useState('');
    const [boolean_toma, setBoolean_toma] = useState('');
    const [var_frecuenciaToma, setVar_frecuenciaToma] = useState('');
    const [boolean_sustanciasPsicoactivas, setBoolean_sustanciasPsicoactivas] = useState('');
    const [var_frecuenciaSustanciasPsicoactivas, setVar_frecuenciaSustanciasPsicoactivas] = useState('');
    const [actividadTiempoLibreOptions, setActividadTiempoLibre] = useState([]);
    const [selectedActividadTiempoLibre, setSelectedActividadTiempoLibre] = useState([]);
    const [prevSelectedActividadTiempoLibre, setPrevSelectedActividadTiempoLibre] = useState([]);
    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            boolean_actividadFisica: boolean_actividadFisica,
            var_frecuenciaActividadFisica: var_frecuenciaActividadFisica,
            boolean_fuma: boolean_fuma,
            var_frecuenciaFuma: var_frecuenciaFuma,
            boolean_toma: boolean_toma,
            var_frecuenciaToma: var_frecuenciaToma,
            boolean_sustanciasPsicoactivas: boolean_sustanciasPsicoactivas,
            var_frecuenciaSustanciasPsicoactivas: var_frecuenciaSustanciasPsicoactivas,
            set_pasoMayorTiempoLibre: set_pasoMayorTiempoLibre,
            var_peso: var_peso,
            var_altura: var_altura,
            boolean_usaLentes: boolean_usaLentes,
            boolean_bebidasEnergizantes: boolean_bebidasEnergizantes,
            var_frecuenciaBebidasEnergeticas: var_frecuenciaBebidasEnergeticas,

        });
        navigate('/app/editarDatosProfesional7');
    };

    useEffect(() => {
        getUsuarios();

    }, []);

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

    useEffect(() => {
        const fetchActividadTiempoLibreProfesional = async () => {
            if (id_profesionalPK) {
                console.log("id_profesionalPK:", id_profesionalPK);
                try {
                    const response = await axios.get(`https://evaluacion.esumer.edu.co/api/profesionalTiempoLibre/${id_profesionalPK}`);

                    //Extraer los ids de los tiempos libres
                    const tiempoLibreIds = response.data.map(
                        (tiempo) => tiempo.id_tiempoLibreFK
                    );

                    console.log("libre ids", tiempoLibreIds)

                    //sincronizar el estado de los tiempos seleccionados

                    setSelectedActividadTiempoLibre(tiempoLibreIds)
                    setPrevSelectedActividadTiempoLibre(tiempoLibreIds)

                    console.log("Datos obtenidos:", response.data);
                } catch (error) {
                    console.error('Error al obtener las actividades de tiempo libre del profesional:', error);
                }
            } else {
                console.log("No hay id_profesionalPK");
            }
        };

        fetchActividadTiempoLibreProfesional();
    }, [id_profesionalPK]);

    // Guardar cambios en el servidor
    const guardarCambios = async () => {
        const tiempoParaEliminar = prevSelectedActividadTiempoLibre.filter(
            (tiempo) => !selectedActividadTiempoLibre.includes(tiempo)
        );
        const tiempoParaAgregar = selectedActividadTiempoLibre.filter(
            (tiempo) => !prevSelectedActividadTiempoLibre.includes(tiempo)
        );

        try {
            // Eliminar servicios deseleccionados
            for (let id_tiempo of tiempoParaEliminar) {
                await axios.delete(
                    `https://evaluacion.esumer.edu.co/api/profesionalTiempoLibre/${id_profesionalPK}/${id_tiempo}`
                );
                console.log(`Servicio eliminado: ${id_tiempo}`);
            }

            // Agregar nuevos servicios seleccionados
            for (let id_tiempo of tiempoParaAgregar) {
                await axios.post("https://evaluacion.esumer.edu.co/api/profesionalTiempoLibre/", {
                    id_profesionalFK: id_profesionalPK,
                    id_tiempoLibreFK: id_tiempo,
                });
                console.log(`Servicio agregado: ${id_tiempo}`);
            }

            // Actualizar el estado previo
            setPrevSelectedActividadTiempoLibre(selectedActividadTiempoLibre);
            console.log("Cambios guardados con éxito de tiempo");


        } catch (error) {
            console.error("Error al guardar cambios de tiempo:", error);
        }
    };



    const validarRadius = () => {
        if (var_frecuenciaSustanciasPsicoactivas === "N/A") {
            setBoolean_sustanciasPsicoactivas("false")
        } else {
            setBoolean_sustanciasPsicoactivas("true")
        }
        if (var_frecuenciaToma === "N/A") {
            setBoolean_toma("false")
        } else {
            setBoolean_toma("true")
        }
        if (var_frecuenciaFuma === "N/A") {
            setBoolean_fuma("false")
        } else {
            setBoolean_fuma("true")
        }
        if (var_frecuenciaActividadFisica === "N/A") {
            setBoolean_actividadFisica("false")
        } else {
            setBoolean_actividadFisica("true")
        }
        if (var_frecuenciaBebidasEnergeticas === "N/A") {
            setBoolean_bebidasEnergizantes("false")
        } else {
            setBoolean_bebidasEnergizantes("true")
        }

    }

    useEffect(() => {
        validarRadius();
    }, []);

    const cambiarValoresCuandoSeaFalse = () => {
        if (boolean_sustanciasPsicoactivas == "false") {
            setVar_frecuenciaSustanciasPsicoactivas("N/A")
        }
        if (boolean_toma == "false") {
            setVar_frecuenciaToma("N/A")
        }
        if (boolean_fuma == "false") {
            setVar_frecuenciaFuma("N/A")
        }
        if (boolean_actividadFisica == "false") {
            setVar_frecuenciaActividadFisica("N/A")
        }
        if (boolean_bebidasEnergizantes == "false") {
            setVar_frecuenciaBebidasEnergeticas("N/A")
        }
    }

    useEffect(() => {
        cambiarValoresCuandoSeaFalse();
    }, [boolean_sustanciasPsicoactivas, boolean_toma, boolean_fuma, boolean_actividadFisica, boolean_bebidasEnergizantes]);

    useEffect(() => {
        if (set_pasoMayorTiempoLibre) { // Asegúrate de que tenga un valor
            const resultado = set_pasoMayorTiempoLibre.replace(/"/g, '');
            setSet_pasoMayorTiempoLibre(resultado)
            console.log("lo tenemos", set_pasoMayorTiempoLibre)
        } else {
            console.log("set_pasoMayorTiempoLibre está indefinido o vacío");
        }
    }, [set_pasoMayorTiempoLibre]);


    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setSet_pasoMayorTiempoLibre(res.data.set_pasoMayorTiempoLibre);
        setBoolean_usaLentes(res.data.boolean_usaLentes ? "true" : "false");
        setVar_altura(res.data.var_altura);
        setVar_peso(res.data.var_peso);
        setBoolean_bebidasEnergizantes(res.data.boolean_bebidasEnergizantes ? "true" : "false");
        setVar_frecuenciaBebidasEnergeticas(res.data.var_frecuenciaBebidasEnergeticas);
        setBoolean_actividadFisica(res.data.boolean_actividadFisica ? "true" : "false");
        setVar_frecuenciaActividadFisica(res.data.var_frecuenciaActividadFisica);
        setBoolean_fuma(res.data.boolean_fuma ? "true" : "false");
        setVar_frecuenciaFuma(res.data.var_frecuenciaFuma);
        setBoolean_toma(res.data.boolean_toma ? "true" : "false");
        setVar_frecuenciaToma(res.data.var_frecuenciaToma);
        setBoolean_sustanciasPsicoactivas(res.data.boolean_sustanciasPsicoactivas ? "true" : "false");
        setVar_frecuenciaSustanciasPsicoactivas(res.data.var_frecuenciaSustanciasPsicoactivas);


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
    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-3%", fontFamily: "Poppins", fontSize: "14.8px" }}>
                <p>Edita la información necesaria y al final del formulario pulsa el botón <b>GUARDAR</b> para conservar los cambios.</p>
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

                        <FormControl fullWidth sx={{ mb: 2 }} >
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione las actividades que realiza en su tiempo libre (se pueden seleccionar varias opciones):</Typography>
                            <Select name='actividadTiempoLibre'
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}
                                multiple value={selectedActividadTiempoLibre} onChange={(e) => setSelectedActividadTiempoLibre(e.target.value)} renderValue={(selected) => {
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

                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }} >
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
                                value={set_pasoMayorTiempoLibre}
                                onChange={(e) => setSet_pasoMayorTiempoLibre(e.target.value)}
                                fullWidth
                                variant="outlined"
                                displayEmpty
                            >
                                {generarOpciones()}
                            </Select>

                        </FormControl>

                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} >
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} > ¿Usa Lentes?:</Typography>
                            <RadioGroup name="boolean_usaLentes" value={boolean_usaLentes}
                                onChange={(e) => setBoolean_usaLentes(e.target.value)} row
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}  >
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>

                        </FormControl>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Altura (cm): </Typography>
                            <TextField name="var_altura" value={var_altura}
                                onChange={(e) => setVar_altura(e.target.value)} placeholder="Ingrese su altura en cm" fullWidth FormHelperTextProps={{
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
                            <TextField name="var_peso" placeholder="Ingrese su peso en kg" fullWidth value={var_peso}
                                onChange={(e) => setVar_peso(e.target.value)} FormHelperTextProps={{
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

                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Consume bebidas energizantes?:</Typography>
                            <RadioGroup name="boolean_bebidasEnergizantes" value={boolean_bebidasEnergizantes}
                                onChange={(e) => setBoolean_bebidasEnergizantes(e.target.value)} row
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }} >
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>

                        {(boolean_bebidasEnergizantes == "true") && (
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaBebidasEnergeticas" value={var_frecuenciaBebidasEnergeticas}
                                    onChange={(e) => setVar_frecuenciaBebidasEnergeticas(e.target.value)} displayEmpty
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }}  >
                                    <MenuItem value="N/A">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Mensualmente">Mensualmente</MenuItem>
                                </Select>

                            </FormControl>
                        )}

                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} >
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Realiza actividad física?: </Typography>
                            <RadioGroup name="boolean_actividadFisica" value={boolean_actividadFisica}
                                onChange={(e) => setBoolean_actividadFisica(e.target.value)} row
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }} >
                                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>

                        </FormControl>

                        {(boolean_actividadFisica == "true") && (
                            <FormControl fullWidth sx={{ mb: 2 }} >
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaActividadFisica" value={var_frecuenciaActividadFisica}
                                    onChange={(e) => setVar_frecuenciaActividadFisica(e.target.value)} displayEmpty
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }}  >
                                    <MenuItem value="N/A">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Mensualmente">Mensualmente</MenuItem>
                                </Select>

                            </FormControl>
                        )}

                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Fuma o vapea?:</Typography>
                            <RadioGroup name="boolean_fuma" value={boolean_fuma}
                                onChange={(e) => setBoolean_fuma(e.target.value)} row
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}  >
                                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>

                        </FormControl>

                        {(boolean_fuma == "true") && (
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaFuma" value={var_frecuenciaFuma}
                                    onChange={(e) => setVar_frecuenciaFuma(e.target.value)} displayEmpty
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }}  >
                                    <MenuItem value="N/A">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Socialmente">Socialmente</MenuItem>
                                </Select>

                            </FormControl>
                        )}

                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Consume bebidas alcohólicas?:</Typography>
                            <RadioGroup name="boolean_toma" value={boolean_toma}
                                onChange={(e) => setBoolean_toma(e.target.value)} row
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }}  >
                                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                                <FormControlLabel value={false} control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>

                        {(boolean_toma == "true") && (
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaToma" value={var_frecuenciaToma}
                                    onChange={(e) => setVar_frecuenciaToma(e.target.value)} displayEmpty
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }} >
                                    <MenuItem value="N/A">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Socialmente">Socialmente</MenuItem>
                                </Select>
                            </FormControl>
                        )}



                        <FormControl component="fieldset" fullWidth sx={{ mb: 2 }} >
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >¿Consume sustancias psicoactivas?:</Typography>
                            <RadioGroup name="boolean_sustanciasPsicoactivas" value={boolean_sustanciasPsicoactivas}
                                onChange={(e) => setBoolean_sustanciasPsicoactivas(e.target.value)} row
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                }} >
                                <FormControlLabel value="true" control={<Radio />} label="Sí" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>

                        </FormControl>

                        {(boolean_sustanciasPsicoactivas == "true") && (
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Frecuencia:</Typography>
                                <Select name="var_frecuenciaSustanciasPsicoactivas" value={var_frecuenciaSustanciasPsicoactivas}
                                    onChange={(e) => setVar_frecuenciaSustanciasPsicoactivas(e.target.value)} displayEmpty
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px"
                                    }}  >
                                    <MenuItem value="N/A">Seleccione una frecuencia</MenuItem>
                                    <MenuItem value="diariamente">Diariamente</MenuItem>
                                    <MenuItem value="Ocasionalmente">Ocasionalmente</MenuItem>
                                    <MenuItem value="Socialmente">Socialmente</MenuItem>
                                </Select>
                            </FormControl>
                        )}

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit" onClick={guardarCambios}>
                                Guardar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );


}

export default EditarDatosProfesional7