import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Card,  CardContent,  Divider, Box, Typography, TextField,  Button,  } from "@mui/material";


const URI_CUENTAS_BANCARIAS = 'http://localhost:3001/cuentasBancarias/'

const CompCrearCuentaBancaria = () => {
    const [var_nombreCuentaBancaria, setVar_nombreCuentaBancaria] = useState('')
    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_CUENTAS_BANCARIAS, { var_nombreCuentaBancaria: var_nombreCuentaBancaria })
        navigate('/app/cuentasBancarias')
    }


    const handleGoBack = () => {
        navigate("/app/cuentasBancarias");
    };

    return (
        <div
            style={{
                backgroundColor: "#F2F2F2",
                paddingTop: "3%",
                paddingBottom: "3%",
            }}
        >
            <div
                style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}
            >
                <img
                    src="public/fondo_form.png"
                    alt="Descripción de la imagen"
                    style={{ width: "20%", height: "auto" }}
                />
            </div>
            <Card
                variant="outlined"
                sx={{
                    p: 0,
                    width: "100%",
                    maxWidth: 800,
                    margin: "auto",
                    backgroundColor: "#F2F2F2",
                    borderColor: "#202B52",
                }}
            >
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography
                            sx={{
                                fontSize: "30px",
                                fontWeight: "500",
                                textAlign: "center",
                                color: "#202B52",
                                fontFamily: "Roboto Condensed",
                            }}
                        >
                            <strong>Crear Cuenta Bancaria</strong>
                        </Typography>
                    </Box>
                </Box>
                <Divider
                    style={{
                        marginLeft: "5%",
                        marginRight: "5%",
                        borderColor: "#202B52",
                    }}
                />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={guardar}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: "Roboto Condensed",
                                color: "#202B52",
                                fontSize: "16px",
                            }}
                        >
                            Nombre de la cuenta bancaria:
                        </Typography>
                        <TextField
                            value={var_nombreCuentaBancaria}
                            onChange={(e) => setVar_nombreCuentaBancaria(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px",
                                },
                            }}
                        />

                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                            <Button
                                sx={{ backgroundColor: "#202B52", fontFamily: "poppins" }}
                                variant="contained"
                                type="submit"
                            >
                                Crear
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

export default CompCrearCuentaBancaria