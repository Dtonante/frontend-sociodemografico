import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

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
        navigate('/app/editarDatosProfesional6');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setSet_pasoMayorTiempoLibre(res.data.set_pasoMayorTiempoLibre);
        setBoolean_usaLentes(res.data.boolean_usaLentes);
        setVar_altura(res.data.var_altura);
        setVar_peso(res.data.var_peso);
        setBoolean_bebidasEnergizantes(res.data.boolean_bebidasEnergizantes);
        setVar_frecuenciaBebidasEnergeticas(res.data.var_frecuenciaBebidasEnergeticas);
        setBoolean_actividadFisica(res.data.boolean_actividadFisica);
        setVar_frecuenciaActividadFisica(res.data.var_frecuenciaActividadFisica);
        setBoolean_fuma(res.data.boolean_fuma);
        setVar_frecuenciaFuma(res.data.var_frecuenciaFuma);
        setBoolean_toma(res.data.boolean_toma);
        setVar_frecuenciaToma(res.data.var_frecuenciaToma);
        setBoolean_sustanciasPsicoactivas(res.data.boolean_sustanciasPsicoactivas);
        setVar_frecuenciaSustanciasPsicoactivas(res.data.var_frecuenciaSustanciasPsicoactivas);




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

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_peso}
                            onChange={(e) => setVar_peso(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={boolean_bebidasEnergizantes}
                            onChange={(e) => setBoolean_bebidasEnergizantes(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_frecuenciaBebidasEnergeticas}
                            onChange={(e) => setVar_frecuenciaBebidasEnergeticas(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={boolean_actividadFisica}
                            onChange={(e) => setBoolean_actividadFisica(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_frecuenciaActividadFisica}
                            onChange={(e) => setVar_frecuenciaActividadFisica(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={boolean_fuma}
                            onChange={(e) => setBoolean_fuma(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_frecuenciaFuma}
                            onChange={(e) => setVar_frecuenciaFuma(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={boolean_toma}
                            onChange={(e) => setBoolean_toma(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_frecuenciaToma}
                            onChange={(e) => setVar_frecuenciaToma(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={boolean_sustanciasPsicoactivas}
                            onChange={(e) => setBoolean_sustanciasPsicoactivas(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_frecuenciaSustanciasPsicoactivas}
                            onChange={(e) => setVar_frecuenciaSustanciasPsicoactivas(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />





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