import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const VistaProvisional = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                bgcolor: "#F2F2F2",
                p: 2,
                marginTop: "-20%"
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    maxWidth: "600px",
                    textAlign: "center",
                    bgcolor: "#202B53",
                    color: "#F2F2F2",
                    borderRadius: 2,
                }}
            >
                <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: "bold", fontFamily: 'Roboto Condensed' }}>
                    Importante
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Roboto Condensed' }}>
                    Por el momento, para el rol de **Administrativo de Esumer**, no está habilitada la opción para poder editar los campos de la información ya solicitada. 
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, fontFamily: 'Roboto Condensed' }}>
                    En próximos días, esta opción se habilitará. 
                </Typography>
                <Typography variant="body1" sx={{  fontFamily: 'Roboto Condensed' }}>
                    Muchas gracias y mil disculpas. Gracias por ser Esumer.
                </Typography>
            </Paper>
        </Box>
    );
};

export default VistaProvisional;
