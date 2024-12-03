import React from "react";
import { Box, Modal, Typography, Button, Grid, Paper } from "@mui/material";

const CompVisualizarProfesional = ({ open, handleClose, profesional }) => {
    console.log(profesional); 
    console.log(profesional?.Usuario); 


    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    Detalles del Profesional
                </Typography>

                {/* Grupo 1: Datos personales */}
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Datos Personales
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Nombre Completo:</strong> {profesional?.Usuario?.var_nombreCompleto}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Tipo de Documento:</strong> {profesional?.Usuario?.TipoDocumento?.var_nombreDocumento}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Documento:</strong> {profesional?.Usuario?.var_numeroDocumento}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Género:</strong> {profesional?.Usuario?.var_genero}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Correo Electrónico:</strong> {profesional?.Usuario?.var_correoElectronicoPersonal}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>RH:</strong> {profesional?.var_rh}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Grupo Étnico:</strong> {profesional?.var_grupoEtnico}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Fecha de Nacimiento:</strong> {profesional?.date_fechaNacimiento}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Célular:</strong> {profesional?.var_celular}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Teléfono de Emergencia:</strong> {profesional?.var_telefonoEmergencia}</Typography>
                        </Grid>
                    </Grid>
                </Paper>


                {/* Grupo 2: Información de residencia */}
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Información de Residencia
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Departamento:</strong> {profesional?.var_departamentoResidencia}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Ciudad:</strong> {profesional?.var_ciudadResidencia}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Dirección:</strong> {profesional?.var_direccionResidencia}</Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Grupo 3: Datos laborales */}
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Datos Laborales
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Cargo:</strong> {profesional?.var_cargo}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Sede:</strong> {profesional?.var_sede}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Antigüedad en la institución:</strong> {profesional?.var_antiguedadInstitucion}</Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Grupo 4: Contacto */}
                <Paper sx={{ p: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Información de Contacto
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Correo Electrónico Personal:</strong> {profesional?.Usuario?.var_correoElectronicoPersonal}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Celular:</strong> {profesional?.var_celular}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography><strong>Teléfono de Emergencia:</strong> {profesional?.var_telefonoEmergencia}</Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Button sx={{ mt: 3 }} variant="contained" color="primary" onClick={handleClose}>
                    Cerrar
                </Button>
            </Box>
        </Modal>
    );
};

export default CompVisualizarProfesional;
