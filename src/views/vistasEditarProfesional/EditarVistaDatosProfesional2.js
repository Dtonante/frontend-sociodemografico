import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const EditarDatosProfesional2 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState('')
    const [var_estadoCivil, setVar_estadoCivil] = useState('')
    const [boolean_viveSolo, setBoolean_viveSolo] = useState('')
    const [var_personasDependeciaEconimica, setVar_personasDependeciaEconimica] = useState('')
    const [var_totalIngresosPropiosYGrupoFamiliar, setVar_totalIngresosPropiosYGrupoFamiliar] = useState('')
    const [var_numeroPersonasConLasQueVive, setVar_numeroPersonasConLasQueVive] = useState('')
    const [set_tipoMascotas, setSet_tipoMascotas] = useState('')
    const [boolean_viveConMascotas, setBoolean_viveConMascotas] = useState('')
    const [set_personasConLasQueVive, setSet_personasConLasQueVive] = useState('')
    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            var_estadoCivil: var_estadoCivil,
            boolean_viveSolo: boolean_viveSolo,
            var_numeroPersonasConLasQueVive: var_numeroPersonasConLasQueVive,
            set_personasConLasQueVive: set_personasConLasQueVive,
            boolean_viveConMascotas: boolean_viveConMascotas,
            set_tipoMascotas: set_tipoMascotas,
            var_personasDependeciaEconimica: var_personasDependeciaEconimica,
            var_totalIngresosPropiosYGrupoFamiliar: var_totalIngresosPropiosYGrupoFamiliar,
        });
        navigate('/app/editarDatosProfesional2');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setVar_estadoCivil(res.data.var_estadoCivil);
        setBoolean_viveSolo(res.data.boolean_viveSolo);
        setVar_personasDependeciaEconimica(res.data.var_personasDependeciaEconimica);
        setVar_totalIngresosPropiosYGrupoFamiliar(res.data.var_totalIngresosPropiosYGrupoFamiliar);
        setVar_numeroPersonasConLasQueVive(res.data.var_numeroPersonasConLasQueVive);
        setSet_tipoMascotas(res.data.set_tipoMascotas);
        setBoolean_viveConMascotas(res.data.boolean_viveConMascotas);
        setSet_personasConLasQueVive(res.data.set_personasConLasQueVive);

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

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Departamento:</Typography>
                        <TextField
                            value={var_estadoCivil}
                            onChange={(e) => setVar_estadoCivil(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Ciudad:</Typography>
                        <TextField
                            value={boolean_viveSolo}
                            onChange={(e) => setBoolean_viveSolo(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>direccion residencia:</Typography>
                        <TextField
                            value={var_personasDependeciaEconimica}
                            onChange={(e) => setVar_personasDependeciaEconimica(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>estrato vivienda:</Typography>
                        <TextField
                            value={var_totalIngresosPropiosYGrupoFamiliar}
                            onChange={(e) => setVar_totalIngresosPropiosYGrupoFamiliar(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>tipo de vivienda:</Typography>
                        <TextField
                            value={var_numeroPersonasConLasQueVive}
                            onChange={(e) => setVar_numeroPersonasConLasQueVive(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>tipo de vivienda:</Typography>
                        <TextField
                            value={set_tipoMascotas}
                            onChange={(e) => setSet_tipoMascotas(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>tipo de vivienda:</Typography>
                        <TextField
                            value={boolean_viveConMascotas}
                            onChange={(e) => setBoolean_viveConMascotas(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>tipo de vivienda:</Typography>
                        <TextField
                            value={set_personasConLasQueVive}
                            onChange={(e) => setSet_personasConLasQueVive(e.target.value)}
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

export default EditarDatosProfesional2