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
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.numeroCuenta && !numeroCuenta) {
            nuevosErrores.numeroCuenta = "El departamento es obligatorio";
        }

        setErrors(nuevosErrores);
    }, [numeroCuenta, touchedFields]);

    // Marcar un campo como "tocado" cuando pierde el enfoque
    const handleBlur = (event) => {
        const { name } = event.target;
        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });
    };

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

        const nuevosErrores = {};


        if (!numeroCuenta) {
            nuevosErrores.numeroCuenta = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }


        navigate("/datosProfesional5");
    };


    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{  p: 0,  width: "100%",   maxWidth: 800,  margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}> <Typography sx={{ fontSize: "18px", fontWeight: "500" }}> Selección de Banco </Typography> </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6">Seleccione Banco:</Typography>
                            <Select labelId="banco-select-label" name="banco" value={selectedBanco} onChange={manejarCambio} >
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

                        <Typography variant="h6">Número de Cuenta:</Typography>
                        <TextField variant="outlined" fullWidth sx={{ mb: 2 }} name="numeroCuenta" value={numeroCuenta} onChange={manejarCambio}onBlur={handleBlur} error={!!errors.numeroCuenta}
                            helperText={errors.numeroCuenta} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }}  />

                        <Button variant="contained" onClick={manejarSiguiente} color="primary" sx={{ mt: 2 }} > Siguiente </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional4;
