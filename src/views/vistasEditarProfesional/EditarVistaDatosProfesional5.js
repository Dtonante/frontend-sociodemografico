import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const EditarDatosProfesional5 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [var_correoElectronicoInstitucional, setVar_correoElectronicoInstitucional] = useState()
    const [var_tipoContrato, setVar_tipoContrato] = useState()
    const [var_salario, setVar_salario] = useState('');
    const [date_fechaIngresoInstitucion, setDate_fechaIngresoInstitucion] = useState('');
    const [var_antiguedadInstitucion, setVar_antiguedadInstitucion] = useState('');
    const [id_areaFK, setId_areaFK] = useState('');
    const [var_cargo, setVar_cargo] = useState('');
    const [var_jefeInmediato, setVar_jefeInmediato] = useState('');
    const [var_sede, setVar_sede] = useState('');

    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            var_tipoContrato: var_tipoContrato,
            var_salario: var_salario,
            date_fechaIngresoInstitucion: date_fechaIngresoInstitucion,
            var_antiguedadInstitucion: var_antiguedadInstitucion,
            id_areaFK: id_areaFK,
            var_cargo: var_cargo,
            var_jefeInmediato: var_jefeInmediato,
            var_sede: var_sede,
            var_correoElectronicoInstitucional: var_correoElectronicoInstitucional,

        });
        navigate('/app/editarDatosProfesional5');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setVar_correoElectronicoInstitucional(res.data.var_correoElectronicoInstitucional);
        setVar_tipoContrato(res.data.var_tipoContrato);
        setVar_salario(res.data.var_salario);
        setDate_fechaIngresoInstitucion(res.data.date_fechaIngresoInstitucion);
        setVar_antiguedadInstitucion(res.data.var_antiguedadInstitucion);
        setId_areaFK(res.data.id_areaFK);
        setVar_cargo(res.data.var_cargo);
        setVar_jefeInmediato(res.data.var_jefeInmediato);
        setVar_sede(res.data.var_sede);

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
                            value={var_correoElectronicoInstitucional}
                            onChange={(e) => setVar_correoElectronicoInstitucional(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione EPS ACTUAL:</Typography>
                        <TextField
                            value={var_tipoContrato}
                            onChange={(e) => setVar_tipoContrato(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_salario}
                            onChange={(e) => setVar_salario(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={date_fechaIngresoInstitucion}
                            onChange={(e) => setDate_fechaIngresoInstitucion(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_antiguedadInstitucion}
                            onChange={(e) => setVar_antiguedadInstitucion(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_cargo}
                            onChange={(e) => setVar_cargo(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_jefeInmediato}
                            onChange={(e) => setVar_jefeInmediato(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                        <TextField
                            value={var_sede}
                            onChange={(e) => setVar_sede(e.target.value)}
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

export default EditarDatosProfesional5