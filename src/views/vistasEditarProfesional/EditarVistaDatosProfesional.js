import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import departamentosCiudades from '../vistas formulario/departamentosCiudades.json';

import { Card, CardContent, Divider, Box, MenuItem, Typography, TextField, Button } from "@mui/material";

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

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>zona vivienda:</Typography>
                        <TextField
                            value={var_zonaVivienda}
                            onChange={(e) => setVar_zonaVivienda(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>estrato vivienda:</Typography>
                        <TextField
                            value={var_estratoVivienda}
                            onChange={(e) => setVar_estratoVivienda(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>tipo de vivienda:</Typography>
                        <TextField
                            value={var_tipoVivienda}
                            onChange={(e) => setVar_tipoVivienda(e.target.value)}
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
                        <TextField select name="var_tipoVivienda" value={var_tipoVivienda} onChange={(e) => setVar_tipoVivienda(e.target.value)} fullWidth sx={{ mb: 2 }}  FormHelperTextProps={{
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
                        <TextField select name="var_estratoVivienda" value={var_estratoVivienda} onChange={(e) => setVar_estratoVivienda(e.target.value)} sx={{ mb: 2 }} fullWidth  FormHelperTextProps={{
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

export default EditarDatosProfesional