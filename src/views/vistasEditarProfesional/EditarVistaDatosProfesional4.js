import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Select, MenuItem, FormControl, Box, Typography, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const EditarDatosProfesional4 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [id_cuentaBancariaFK, setId_cuentaBancariaFK] = useState()
    const [var_tipoCuenta, setVar_tipoCuenta] = useState()
    const [var_numeroCuenta, setVar_numeroCuenta] = useState('');
    const [selectedBanco, setSelectedBanco] = useState("");
    const [bancos, setBancos] = useState([]);



    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            id_cuentaBancariaFK: selectedBanco,
            var_tipoCuenta: var_tipoCuenta,
            var_numeroCuenta: var_numeroCuenta,

        });
        navigate('/app/editarDatosProfesional4');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setId_cuentaBancariaFK(res.data.id_cuentaBancariaFK);
        setVar_tipoCuenta(res.data.var_tipoCuenta);
        setVar_numeroCuenta(res.data.var_numeroCuenta);


    };

    const manejarCambio = (event) => {
        const { value } = event.target;
        setSelectedBanco(value);  // Esto actualiza el estado de selectedBanco
    };
    

    // useEffect para obtener los bancos desde el servidor
    useEffect(() => {
        const fetchBancos = async () => {
            try {
                const response = await axios.get("https://evaluacion.esumer.edu.co/api/cuentasBancarias");
                setBancos(response.data);
                // Establecer el banco seleccionado si ya tienes el id_cuentaBancariaFK
                if (id_cuentaBancariaFK) {
                    setSelectedBanco(id_cuentaBancariaFK); // Esto hará que se seleccione el banco correcto en el Select
                    
                }
            } catch (error) {
                console.error("Error al obtener los bancos:", error);
            }
        };

        fetchBancos();
    }, [id_cuentaBancariaFK]);

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

                        <FormControl
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                            >
                                Seleccione Banco:
                            </Typography>

                            <Select
                                name="banco"
                                value={selectedBanco}
                                onChange={manejarCambio}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px",
                                }}
                            >
                                {bancos.map((banco) => (
                                    <MenuItem
                                        key={banco.id_cuentaBancariaPK}
                                        value={banco.id_cuentaBancariaPK}
                                    >
                                        {" "}
                                        {banco.var_nombreCuentaBancaria}{" "}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>tipo cuenta:</Typography>
                        <TextField
                            value={var_tipoCuenta}
                            onChange={(e) => setVar_tipoCuenta(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>numero cuenta:</Typography>
                        <TextField
                            value={var_numeroCuenta}
                            onChange={(e) => setVar_numeroCuenta(e.target.value)}
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

export default EditarDatosProfesional4