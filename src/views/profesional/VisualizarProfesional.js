import React, { useEffect, useState } from "react";
import { Box, Modal, Typography, Button, Divider, Paper, Grid, Chip } from "@mui/material";
import axios from "axios";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_SERVICIOS_QUE_NO_CUENTAN = 'http://localhost:3001/profesionalServiciosQueNoCuentan/';
const URI_PROFESIONAL_FACTORES_RIESGO = 'http://localhost:3001/profesionalFactoresRiesgo/';

const CompVisualizarProfesional = ({ open, handleClose, profesional }) => {
    const [datosProfesional, setDatosProfesional] = useState(null);
    const [serviciosNoContados, setServiciosNoContados] = useState(null);
    const [factoresRiesgo, setFactoresRiesgo] = useState(null);


    useEffect(() => {
        if (open && profesional?.id_profesionalPK) {
            const fetchDatosProfesional = async () => {
                try {
                    const res = await axios.get(`${URI_PROFESIONAL}${profesional.id_profesionalPK}`);
                    setDatosProfesional(res.data);
                } catch (error) {
                    console.error("Error al obtener los datos del profesional:", error);
                }
            };
            fetchDatosProfesional();
        }
    }, [open, profesional]);

    // Fetch Servicios que no cuenta el Profesional
    useEffect(() => {
        if (open && profesional?.id_profesionalPK) {
            const fetchServiciosNoContados = async () => {
                try {
                    const res = await axios.get(`${URI_PROFESIONAL_SERVICIOS_QUE_NO_CUENTAN}${profesional.id_profesionalPK}`);
                    setServiciosNoContados(res.data);
                } catch (error) {
                    console.error("Error al obtener los servicios faltantes:", error);
                }
            };
            fetchServiciosNoContados();
        }
    }, [open, profesional]);

    // Fetch factores de riesgo del Profesional
    useEffect(() => {
        if (open && profesional?.id_profesionalPK) {
            const fetchFactoresRiesgo = async () => {
                try {
                    const res = await axios.get(`${URI_PROFESIONAL_FACTORES_RIESGO}${profesional.id_profesionalPK}`);
                    setFactoresRiesgo(res.data);
                } catch (error) {
                    console.error("Error al obtener los factores de riesgo:", error);
                }
            };
            fetchFactoresRiesgo();
        }
    }, [open, profesional]);




    if (!datosProfesional) return null; // Evitar renderizar si los datos no están listos

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    bgcolor: "#F2F2F2",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Paper sx={{ p: 3, mb: 2, textAlign: 'center', bgcolor: "#202B53", color: '#F2F2F2' }}>
                    <Typography id="modal-title" variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                        Detalles del Profesional
                    </Typography>
                </Paper>

                {/* Grupo 1: Datos personales */}
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#F2F2F2", borderRadius: 2, border: "1px solid #202B53", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                        Datos Personales
                    </Typography>

                    {/* Divider estilizado */}
                    <Divider sx={{ mb: 3, borderBottomWidth: 2, borderRadius: 2, borderColor: "#202B53" }} />

                    <Grid container spacing={3}>
                        {[
                            { label: 'Nombre Completo', value: datosProfesional?.Usuario?.var_nombreCompleto },
                            { label: 'Tipo de Documento', value: datosProfesional?.Usuario?.TipoDocumento?.var_nombreDocumento },
                            { label: 'Documento', value: datosProfesional?.Usuario?.var_numeroDocumento },
                            { label: 'Género', value: datosProfesional?.Usuario?.var_genero },
                            { label: 'Correo Electrónico', value: datosProfesional?.Usuario?.var_correoElectronicoPersonal },
                            { label: 'RH', value: datosProfesional?.var_rh },
                            { label: 'Grupo Étnico', value: datosProfesional?.var_grupoEtnico },
                            { label: 'Fecha de Nacimiento', value: datosProfesional?.date_fechaNacimiento },
                            { label: 'Célular', value: datosProfesional?.var_celular },
                            { label: 'Contacto de Emergencia', value: datosProfesional?.Usuario?.var_contactoEmergencia },
                            { label: 'Teléfono de Emergencia', value: datosProfesional?.var_telefonoEmergencia },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: "#F2F2F2",
                                    borderRadius: 2,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}>
                                    <Typography><strong>{item.label}:</strong> {item.value || 'No disponible'}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>


                {/* Grupo 2: Datos personales */}



                <Paper sx={{ p: 3, mb: 2, bgcolor: "#F2F2F2", borderRadius: 2, border: "1px solid #202B53", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                        Datos Personales
                    </Typography>

                    {/* Divider estilizado */}
                    <Divider sx={{ mb: 3, borderBottomWidth: 2, borderRadius: 2, borderColor: "#202B53" }} />

                    <Grid container spacing={3}>
                        {[
                            { label: 'Departamento', value: datosProfesional?.var_departamentoResidencia },
                            { label: 'Ciudad', value: datosProfesional?.var_ciudadResidencia },
                            { label: 'Dirección', value: datosProfesional?.var_direccionResidencia },
                            { label: 'Estrato', value: datosProfesional?.var_estratoVivienda },
                            { label: 'Tipo de Vivienda', value: datosProfesional?.var_tipoVivienda },
                            { label: 'Zona de la vivienda', value: datosProfesional?.var_zonaVivienda },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: "#F2F2F2",
                                    borderRadius: 2,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}>
                                    <Typography><strong>{item.label}:</strong></Typography>
                                    {item.value || 'No disponible'}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Campo de "Servicios con los que no cuentan" fuera del map principal */}
                    <Grid container spacing={3} sx={{ mt: 2, justifyContent: "center" }}>
                        <Grid item xs={12}>
                            <Paper sx={{
                                p: 3,
                                bgcolor: "#F2F2F2",
                                borderRadius: 2,
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '96.3%', 
                            }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    <strong>Servicios con los que no cuentan:</strong>
                                </Typography>
                                <Grid container spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {serviciosNoContados?.map((servicio, idx) => (
                                        <Grid item key={idx}>
                                            <Chip
                                                icon={<CheckCircleOutlineIcon sx={{ color: "#4CAF50" }} />}
                                                label={servicio.serviciosQueNoCuenta?.var_nombreServicioQueNoCuenta || 'Sin nombre'}
                                                sx={{
                                                    bgcolor: "#F2F2F2",
                                                    color: "#000",
                                                    fontWeight: "bold",
                                                    borderRadius: 2,
                                                    padding: 0.5,
                                                    minWidth: '250px', 
                                                    maxWidth: '100%', 
                                                    whiteSpace: "normal", 
                                                    wordWrap: "break-word", 
                                                    display: 'inline-flex', 
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>

                    {/* Campo de "factores de riesgo" fuera del map principal */}
                    <Grid container spacing={3} sx={{ mt: 2, justifyContent: "center" }}>
                        <Grid item xs={12}>
                            <Paper sx={{
                                p: 3,
                                bgcolor: "#F2F2F2",
                                borderRadius: 2,
                                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '96.3%', 
                            }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    <strong>Factores de riesgo:</strong>
                                </Typography>
                                <Grid container spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {factoresRiesgo?.map((factor, idx) => (
                                        <Grid item key={idx}>
                                            <Chip
                                                icon={<CheckCircleOutlineIcon sx={{ color: "#4CAF50" }} />}
                                                label={factor.factorRiesgo?.var_nombreRiesgo || 'Sin nombre'}
                                                sx={{
                                                    bgcolor: "#F2F2F2",
                                                    color: "#000",
                                                    fontWeight: "bold",
                                                    borderRadius: 2,
                                                    padding: 0.5,
                                                    minWidth: '250px', 
                                                    maxWidth: '100%', 
                                                    whiteSpace: "normal", 
                                                    wordWrap: "break-word", 
                                                    display: 'inline-flex', 
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>

                </Paper>





                {/* Grupo 3: Datos adicionales*/}
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#F2F2F2", borderRadius: 2, border: "1px solid #202B53", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                        Datos adicionales
                    </Typography>

                    {/* Divider estilizado */}
                    <Divider sx={{ mb: 3, borderBottomWidth: 2, borderRadius: 2, borderColor: "#202B53" }} />

                    <Grid container spacing={3}>
                        {[
                            { label: 'Estado civil', value: datosProfesional?.var_estadoCivil },
                            { label: 'Vive solo', value: datosProfesional?.boolean_viveSolo ? "Si" : "No" },
                            { label: 'Numero de personas con las que vive', value: datosProfesional?.var_numeroPersonasConLasQueVive },
                            { label: 'Personas con las que vive', value: datosProfesional?.set_personasConLasQueVive },
                            { label: 'Tiene mascotas', value: datosProfesional?.boolean_viveConMascotas ? "Si" : "No" },
                            { label: 'Tipos de mascotas', value: datosProfesional?.set_tipoMascotas },
                            { label: 'Personas que dependen de ti', value: datosProfesional?.var_personasDependeciaEconimica },
                            { label: 'Total ingresos familiares', value: datosProfesional?.var_totalIngresosPropiosYGrupoFamiliar },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: "#F2F2F2",
                                    borderRadius: 2,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}>
                                    <Typography><strong>{item.label}:</strong> {item.value || 'No disponible'}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>


                {/* Grupo 4: Seguridad social */}
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#F2F2F2", borderRadius: 2, border: "1px solid #202B53", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                        Seguridad social
                    </Typography>

                    {/* Divider estilizado */}
                    <Divider sx={{ mb: 3, borderBottomWidth: 2, borderRadius: 2, borderColor: "#202B53" }} />

                    <Grid container spacing={3}>
                        {[
                            { label: 'cambio de EPS o AFP', value: datosProfesional?.boolean_cambioEpsOArl ? "Si" : "No" },
                            { label: 'EPS actual', value: datosProfesional?.Eps?.var_nombreEps },
                            { label: 'Fonde de pension', value: datosProfesional?.FondoDePension?.var_nombreFondoPension },
                            { label: 'Estrato', value: datosProfesional?.var_estratoVivienda },
                            { label: 'Tipo de Vivienda', value: datosProfesional?.var_tipoVivienda },
                            { label: 'Tipos de mascotas', value: datosProfesional?.set_tipoMascotas },
                            { label: 'Zona de la vivienda', value: datosProfesional?.var_zonaVivienda },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: "#F2F2F2",
                                    borderRadius: 2,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}>
                                    <Typography><strong>{item.label}:</strong> {item.value || 'No disponible'}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* Grupo 5:Información bancaria */}
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#F2F2F2", borderRadius: 2, border: "1px solid #202B53", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                        Información bancaria
                    </Typography>

                    {/* Divider estilizado */}
                    <Divider sx={{ mb: 3, borderBottomWidth: 2, borderRadius: 2, borderColor: "#202B53" }} />

                    <Grid container spacing={3}>
                        {[
                            { label: 'Banco', value: datosProfesional?.CuentaBancaria?.var_nombreCuentaBancaria },
                            { label: 'Tipo de cuenta', value: datosProfesional?.var_tipoCuenta },
                            { label: 'Numero de cuenta', value: datosProfesional?.var_numeroCuenta },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: "#F2F2F2",
                                    borderRadius: 2,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}>
                                    <Typography><strong>{item.label}:</strong> {item.value || 'No disponible'}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>


                {/* Grupo 6: Información laboral */}
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#F2F2F2", borderRadius: 2, border: "1px solid #202B53", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                        Información laboral
                    </Typography>

                    {/* Divider estilizado */}
                    <Divider sx={{ mb: 3, borderBottomWidth: 2, borderRadius: 2, borderColor: "#202B53" }} />

                    <Grid container spacing={3}>
                        {[
                            { label: 'Correo institucional', value: datosProfesional?.var_correoElectronicoInstitucional },
                            { label: 'Tipo de contrato', value: datosProfesional?.var_tipoContrato },
                            { label: 'Salario', value: datosProfesional?.var_salario },
                            { label: 'Estrato', value: datosProfesional?.var_estratoVivienda },
                            { label: 'Fecha de Ingreso', value: datosProfesional?.date_fechaIngresoInstitucion },
                            { label: 'Antigüedad en la Institución (días)', value: datosProfesional?.var_antiguedadInstitucion },
                            { label: 'Área laboral a la que pertenece', value: datosProfesional?.EstructuraOrganizacional?.var_nombreArea },
                            { label: 'Cargo', value: datosProfesional?.var_cargo },
                            { label: 'Jefe Inmediato', value: datosProfesional?.var_jefeInmediato },
                            { label: 'Sede', value: datosProfesional?.var_sede },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: "#F2F2F2",
                                    borderRadius: 2,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}>
                                    <Typography><strong>{item.label}:</strong> {item.value || 'No disponible'}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* Grupo 7: Formación académica */}
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#F2F2F2", borderRadius: 2, border: "1px solid #202B53", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                        Formación académica
                    </Typography>

                    {/* Divider estilizado */}
                    <Divider sx={{ mb: 3, borderBottomWidth: 2, borderRadius: 2, borderColor: "#202B53" }} />

                    <Grid container spacing={3}>
                        {[
                            { label: 'Nivel de Escolaridad', value: datosProfesional?.var_nivelEscolaridad },
                            { label: 'Nombre de la carrera', value: datosProfesional?.var_nombreCarrera },
                            { label: 'pdf', value: datosProfesional?.var_urlDatosAdjuntos },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: "#F2F2F2",
                                    borderRadius: 2,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}>
                                    <Typography><strong>{item.label}:</strong> {item.value || 'No disponible'}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>


                {/* Grupo 8: Salud física */}
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#F2F2F2", borderRadius: 2, border: "1px solid #202B53", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                        Salud física
                    </Typography>

                    {/* Divider estilizado */}
                    <Divider sx={{ mb: 3, borderBottomWidth: 2, borderRadius: 2, borderColor: "#202B53" }} />

                    <Grid container spacing={3}>
                        {[
                            { label: 'Con quien pasa la mayor parte de su tiempo libre', value: datosProfesional?.set_pasoMayorTiempoLibre },
                            { label: 'Usa lentes', value: datosProfesional?.boolean_usaLentes ? "Si" : "No" },
                            { label: 'Altura', value: datosProfesional?.var_altura },
                            { label: 'Peso', value: datosProfesional?.var_peso },
                            { label: 'Consume bebidas energizantes', value: datosProfesional?.boolean_bebidasEnergizantes ? "Si" : "No" },
                            { label: 'Frecuencia del consumo de bebida energizante', value: datosProfesional?.var_frecuenciaBebidasEnergeticas },
                            { label: 'Realiza actividad fisica', value: datosProfesional?.boolean_actividadFisica ? "Si" : "No" },
                            { label: 'Frecuencia de la actividad fisica', value: datosProfesional?.var_frecuenciaActividadFisica },
                            { label: 'Fuma o vapea', value: datosProfesional?.boolean_fuma ? "Si" : "No" },
                            { label: 'Frecuencia de consumo', value: datosProfesional?.var_frecuenciaFuma },
                            { label: 'Consume bebidas alcoholicas', value: datosProfesional?.boolean_toma ? "Si" : "No" },
                            { label: 'Frecuencia de consumo de bebidas alcoholicas', value: datosProfesional?.var_frecuenciaToma },
                            { label: 'Consume sustancias Psicoactivas', value: datosProfesional?.boolean_sustanciasPsicoactivas ? "Si" : "No" },
                            { label: 'Frecuencia de consumo de sustancias psicoactivas', value: datosProfesional?.var_frecuenciaSustanciasPsicoactivas },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: "#F2F2F2",
                                    borderRadius: 2,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}>
                                    <Typography><strong>{item.label}:</strong> {item.value || 'No disponible'}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* Grupo 9: Medios de transporte utilizado */}
                <Paper sx={{ p: 3, mb: 2, bgcolor: "#F2F2F2", borderRadius: 2, border: "1px solid #202B53", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)" }}>
                    <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
                        Medios de transporte utilizado
                    </Typography>

                    {/* Divider estilizado */}
                    <Divider sx={{ mb: 3, borderBottomWidth: 2, borderRadius: 2, borderColor: "#202B53" }} />

                    <Grid container spacing={3}>
                        {[
                            { label: 'medio de transporte con el que se desplaza a la u', value: datosProfesional?.set_mediosTransportePublico },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index}>
                                <Paper sx={{
                                    p: 2,
                                    bgcolor: "#F2F2F2",
                                    borderRadius: 2,
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "flex-start",
                                }}>
                                    <Typography><strong>{item.label}:</strong> {item.value || 'No disponible'}</Typography>
                                </Paper>
                            </Grid>
                        ))}
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