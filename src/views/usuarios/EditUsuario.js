import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

const URI_USUARIOS = 'http://localhost:3001/usuarios/';

const CompEditarUsuario = () => {
    const [id_rolFK, setId_rolFK] = useState('');
    const [boolean_estado, setBoolean_estado] = useState('');
    const [var_nombreCompleto, setVar_nombreCompleto] = useState('');
    const [int_tipoDocumentoFK, setInt_tipoDocumentoFK] = useState('');
    const [var_numeroDocumento, setVar_numeroDocumento] = useState('');
    const [var_genero, setVar_genero] = useState('');
    const [var_correoElectronicoPersonal, setVar_correoElectronicoPersonal] = useState('');
    const [var_contactoEmergencia, setVar_contactoEmergencia] = useState('');
    const [var_contrasena, setVar_contrasena] = useState('');
    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_USUARIOS + id_usuarioPK, {
            id_rolFK: id_rolFK,
            boolean_estado: boolean_estado,
            var_nombreCompleto: var_nombreCompleto,
            int_tipoDocumentoFK: int_tipoDocumentoFK,
            var_numeroDocumento: var_numeroDocumento,
            var_genero: var_genero,
            var_correoElectronicoPersonal: var_correoElectronicoPersonal,
            var_contrasena: var_contrasena,
            var_contactoEmergencia: var_contactoEmergencia,
        });
        navigate('/app/usuarios');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_USUARIOS + id_usuarioPK);
        setId_rolFK(res.data.id_rolFK);
        setBoolean_estado(res.data.boolean_estado);
        setVar_nombreCompleto(res.data.var_nombreCompleto);
        setInt_tipoDocumentoFK(res.data.int_tipoDocumentoFK);
        setVar_numeroDocumento(res.data.var_numeroDocumento);
        setVar_genero(res.data.var_genero);
        setVar_correoElectronicoPersonal(res.data.var_correoElectronicoPersonal);
        setVar_contrasena(res.data.var_contrasena);
        setVar_contactoEmergencia(res.data.var_contactoEmergencia);
    };

    const handleGoBack = () => {
        navigate("/app/usuarios");
    };
    
    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center", color: "#202B52", fontFamily: "Roboto Condensed" }}>
                            <strong>Editar Usuario</strong>
                        </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: "5%", marginRight: "5%", borderColor: "#202B52" }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={actualizar}>
                    
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Nombre Usuario:</Typography>
                        <TextField
                            value={var_nombreCompleto}
                            onChange={(e) => setVar_nombreCompleto(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Tipo Documento:</Typography>
                        <TextField
                            value={int_tipoDocumentoFK}
                            onChange={(e) => setInt_tipoDocumentoFK(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Número Documento:</Typography>
                        <TextField
                            value={var_numeroDocumento}
                            onChange={(e) => setVar_numeroDocumento(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Género:</Typography>
                        <TextField
                            value={var_genero}
                            onChange={(e) => setVar_genero(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Correo Electrónico Personal:</Typography>
                        <TextField
                            value={var_correoElectronicoPersonal}
                            onChange={(e) => setVar_correoElectronicoPersonal(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Contacto de Emergencia:</Typography>
                        <TextField
                            value={var_contactoEmergencia}
                            onChange={(e) => setVar_contactoEmergencia(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <div style={{ display: "flex", justifyContent: "flex-end", gap:"10px" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit">
                                Actualizar
                            </Button>
                            <Button
                                sx={{ backgroundColor: "#ff0000", fontFamily: "poppins" }}
                                variant="contained"
                                onClick={handleGoBack}
                            >
                                Volver
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );


}

export default CompEditarUsuario