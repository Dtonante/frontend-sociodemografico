import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, Select, RadioGroup, FormControlLabel, Radio, FormControl, MenuItem, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const EditarDatosProfesional7 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [set_pasoMayorTiempoLibre, setSet_pasoMayorTiempoLibre] = useState()
    const [boolean_usaLentes, setBoolean_usaLentes] = useState()
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


    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setSet_pasoMayorTiempoLibre(res.data.set_pasoMayorTiempoLibre);
        setBoolean_usaLentes(res.data.boolean_usaLentes);
        setVar_altura(res.data.var_altura);
        setVar_peso(res.data.var_peso);
        setBoolean_bebidasEnergizantes(res.data.boolean_bebidasEnergizantes);
        setVar_frecuenciaBebidasEnergeticas(res.data.var_frecuenciaBebidasEnergeticas ? "true" : "false");
        setBoolean_actividadFisica(res.data.boolean_actividadFisica ? "true" : "false");
        setVar_frecuenciaActividadFisica(res.data.var_frecuenciaActividadFisica);
        setBoolean_fuma(res.data.boolean_fuma ? "true" : "false");
        setVar_frecuenciaFuma(res.data.var_frecuenciaFuma);
        setBoolean_toma(res.data.boolean_toma ? "true" : "false");
        setVar_frecuenciaToma(res.data.var_frecuenciaToma);
        setBoolean_sustanciasPsicoactivas(res.data.boolean_sustanciasPsicoactivas ? "true" : "false");
        setVar_frecuenciaSustanciasPsicoactivas(res.data.var_frecuenciaSustanciasPsicoactivas);




    };

    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}>
                <img src="public/fondo_form.png" alt="Edita la información necesaria y al final del formulario pulsa el botón GUARDAR para conservar los cambios." style={{ width: "20%", height: "auto" }} />
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
                            value={set_pasoMayorTiempoLibre}
                            onChange={(e) => setSet_pasoMayorTiempoLibre(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione EPS ACTUAL:</Typography>
                        <TextField
                            value={boolean_usaLentes}
                            onChange={(e) => setBoolean_usaLentes(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_altura}
                            onChange={(e) => setVar_altura(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >Altura (cm): </Typography>
                            <TextField name="var_altura" placeholder="Ingrese su altura en cm" fullWidth  FormHelperTextProps={{
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

export default EditarDatosProfesional7