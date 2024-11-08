import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, MenuItem, FormControl, InputLabel, Select, Card, Box, Typography, Button, Divider, CardContent, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VistaDatosProfesional4 = () => {
    const [bancos, setBancos] = useState([]);
    const [selectedBanco, setSelectedBanco] = useState("");
    const [tipoCuenta, setTipoCuenta] = useState("");
    const [numeroCuenta, setNumeroCuenta] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        // Recuperamos todos los datos guardados en localStorage
        const formDataProfesional = JSON.parse(localStorage.getItem('formDataProfesional'));
        const datosProfesional = JSON.parse(localStorage.getItem('datosProfesional'));
        const direccion = JSON.parse(localStorage.getItem('direccion'));
        const selectedServiciosSaludAdicional = JSON.parse(localStorage.getItem('selectedServiciosSaludAdicional'));

        // Mostramos los datos en la consola
        console.log("Datos del Profesional en VistaDatosProfesional4:");
        console.log("formDataProfesional:", formDataProfesional);
        console.log("datosProfesional:", datosProfesional);
        console.log("Dirección:", direccion);
        console.log("Servicios de Salud Adicional:", selectedServiciosSaludAdicional);

        // Verificamos si los datos están disponibles o no
        if (!formDataProfesional) {
            console.log("No hay datos guardados para 'formDataProfesional'.");
        }
        if (!datosProfesional) {
            console.log("No hay datos guardados para 'datosProfesional'.");
        }
        if (!direccion) {
            console.log("No hay datos guardados para 'direccion'.");
        }
        if (!selectedServiciosSaludAdicional) {
            console.log("No hay datos guardados para 'selectedServiciosSaludAdicional'.");
        }
    }, []);

    // useEffect para obtener los bancos desde el servidor
    useEffect(() => {
        const fetchBancos = async () => {
            try {
                const response = await axios.get("http://localhost:3001/cuentasBancarias");
                setBancos(response.data);
            } catch (error) {
                console.error("Error al obtener los bancos:", error);
            }
        };

        fetchBancos();
    }, []);

    const manejarCambio = (event) => {
        const { name, value } = event.target;
        if (name === "banco") {
            setSelectedBanco(value);
        } else if (name === "tipoCuenta") {
            setTipoCuenta(value);
        } else if (name === "numeroCuenta") {
            setNumeroCuenta(value);
        }
    };

    // Función para guardar los datos en localStorage y navegar
    const manejarSiguiente = () => {
        localStorage.setItem('selectedBanco', selectedBanco);
        localStorage.setItem('tipoCuenta', tipoCuenta);
        localStorage.setItem('numeroCuenta', numeroCuenta);

        
        navigate("/datosProfesional5");
    };


    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{ p: 0, mt: 2 }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}> <Typography sx={{ fontSize: "18px", fontWeight: "500" }}> Selección de Banco </Typography> </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel id="banco-select-label">Seleccione Banco</InputLabel>
                            <Select labelId="banco-select-label" name="banco" value={selectedBanco} onChange={manejarCambio} label="Seleccione Banco" >
                                {bancos.map((banco) => (
                                    <MenuItem key={banco.id_cuentaBancariaPK} value={banco.id_cuentaBancariaPK}> {banco.var_nombreCuentaBancaria} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl component="fieldset" sx={{ mb: 2 }}>
                            <Typography variant="h6">Tipo de Cuenta</Typography>
                            <RadioGroup name="tipoCuenta" value={tipoCuenta} onChange={manejarCambio} row>
                                <FormControlLabel value="ahorro" control={<Radio />} label="Ahorro" />
                                <FormControlLabel value="corriente" control={<Radio />} label="Corriente" />
                            </RadioGroup>
                        </FormControl>

                        <TextField label="Número de Cuenta" variant="outlined" fullWidth sx={{ mb: 2 }} name="numeroCuenta" value={numeroCuenta} onChange={manejarCambio} />

                        <Button variant="contained" onClick={manejarSiguiente} color="primary" sx={{ mt: 2 }} > Siguiente </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional4;
