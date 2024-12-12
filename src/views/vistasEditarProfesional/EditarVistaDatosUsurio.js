import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

const URI_USUARIOS = 'http://localhost:3001/usuarios/';
const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';
const URI_TIPO_DOCUMENTO = 'http://localhost:3001/tipodocumentos/'


const CompEditarUsuario = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [id_rolFK, setId_rolFK] = useState('');
    const [boolean_estado, setBoolean_estado] = useState('');
    const [var_nombreCompleto, setVar_nombreCompleto] = useState('');
    const [int_tipoDocumentoFK, setInt_tipoDocumentoFK] = useState('');
    const [var_numeroDocumento, setVar_numeroDocumento] = useState('');
    const [var_genero, setVar_genero] = useState('');
    const [var_correoElectronicoPersonal, setVar_correoElectronicoPersonal] = useState('');
    const [var_contactoEmergencia, setVar_contactoEmergencia] = useState('');
    const [var_contrasena, setVar_contrasena] = useState('');
    const [var_grupoEtnico, setVar_grupoEtnico] = useState('');
    const [var_rh, setVar_rh] = useState('');
    const [var_telefonoEmergencia, setVar_telefonoEmergencia] = useState('');
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
            var_contactoEmergencia: var_contactoEmergencia,
        });

        

        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            var_grupoEtnico: var_grupoEtnico,
            var_rh: var_rh,
            var_telefonoEmergencia: var_telefonoEmergencia,

        });


        navigate('/app/editarUsuario');
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
        setVar_contactoEmergencia(res.data.var_contactoEmergencia);
    };

    useEffect(() => {
        getProfesional();
    }, []);

    const getProfesional = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setVar_grupoEtnico(res.data.var_grupoEtnico);
        setVar_rh(res.data.var_rh);
        setVar_telefonoEmergencia(res.data.var_telefonoEmergencia);


    };

    const getTiposDocumentos = async () => {
        const res = await axios.get(URI_TIPO_DOCUMENTO);
      
    };
    
    useEffect(() => {
        getTiposDocumentos();
    }, []);

    

    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}>
                <img src="public/fondo_form.png" alt="Descripción de la imagen" style={{ width: "20%", height: "auto" }} />
            </div>
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

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Género:</Typography>
                        <TextField
                            value={var_grupoEtnico}
                            onChange={(e) => setVar_grupoEtnico(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Género:</Typography>
                        <TextField
                            value={var_rh}
                            onChange={(e) => setVar_rh(e.target.value)}
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

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>telefono de contacto de emergencia:</Typography>
                        <TextField
                            value={var_telefonoEmergencia}
                            onChange={(e) => setVar_telefonoEmergencia(e.target.value)}
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

export default CompEditarUsuario
