import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Card,  CardContent,  Divider, Box, Typography, TextField,  Button,  } from "@mui/material";
import { soloLetras } from "../../components/validaciones/ValidacionesCrear.js";
import show_alert from "../../components/showAlert/alertFuntion.jsx"; 

const URI_TRANSPORTE_PROPIO = 'https://evaluacion.esumer.edu.co/api/transportePropio'


const CompCrearTransportePropio = () => {
    const [var_nombreTransporte, setVar_nombreTransporte] = useState('')

    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()

        if (!var_nombreTransporte.trim()) {
            show_alert("El campo no puede estar vacío", "error");
            return;
        }

        try {
            await axios.post(URI_TRANSPORTE_PROPIO, { var_nombreTransporte })
            show_alert("Transporte propio creado correctamente", "success");
            setTimeout(() => navigate("/app/transportePropio"), 1500); // Redirige después de 1.5s
        } catch (error) {
            show_alert("Hubo un error al crear el transporte propio", "error");
            console.error(error);
        }
        
    }


    const handleGoBack = () => {
        navigate("/app/transportePropio");
    };

    return (
        <div
            style={{
                backgroundColor: "#F2F2F2",
                paddingTop: "3%",
                paddingBottom: "3%",
            }}
        >
           
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
                            <strong>Crear Transporte Propio</strong>
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
                            Nombre del transporte propio:
                        </Typography>
                        <TextField
                            value={var_nombreTransporte}
                            onChange={(e) => {
                                const valor = e.target.value;
                                if (soloLetras(valor) || valor === "") {
                                    setVar_nombreTransporte(valor);
                                }
                            }}
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

export default CompCrearTransportePropio