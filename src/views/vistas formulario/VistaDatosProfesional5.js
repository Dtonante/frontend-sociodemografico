import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Divider, CardContent, Button, TextField, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VistaDatosProfesional5 = () => {
    const [afiliado, setAfiliado] = useState('');
    const [tipoVinculacion, setTipoVinculacion] = useState('');
    const [tipoContrato, setTipoContrato] = useState('');
    const [salario, setSalario] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');
    const [antiguedadInstitucion, setAntiguedadInstitucion] = useState('');
    const [estructuraOrganizacional, setEstructuraOrganizacional] = useState([]);
    const [areaSeleccionada, setAreaSeleccionada] = useState('');
    const [cargo, setCargo] = useState('');
    const [jefeInmediato, setJefeInmediato] = useState('');
    const [sede, setSede] = useState('');
    const [turnoTrabajo, setTurnoTrabajo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEstructuraOrganizacional = async () => {
            try {
                const response = await axios.get('http://localhost:3001/estructuraOrganizacional');
                setEstructuraOrganizacional(response.data);
            } catch (error) {
                console.error('Error al obtener las áreas:', error);
            }
        };

        if (afiliado === "si") {
            fetchEstructuraOrganizacional();
        }
    }, [afiliado]);


    useEffect(() => {
        if (afiliado === "no") {
            // Si el usuario selecciona "no", se resetean los valores
            setTipoVinculacion('');
            setTipoContrato('');
            setSalario('');
            setFechaIngreso('');
            setAntiguedadInstitucion('');
            setAreaSeleccionada('');
            setCargo('');
            setJefeInmediato('');
            setSede('');
            setTurnoTrabajo('');
        }
    }, [afiliado]);

    const manejarCambio = (event) => {
        const { name, value } = event.target;

        if (name === "afiliado") {
            setAfiliado(value);

            if (value === "no") {
                // Establecer todos los campos como "N/A" si la respuesta es "no"
                const areaNA = estructuraOrganizacional.find(area => area.var_nombreArea === "N/A");
                if (areaNA) {
                    const areaId = Number(areaNA.id_areaPk); // Convertir el id a un número
                    setAreaSeleccionada(areaId);
                    localStorage.setItem('area', areaId.toString()); // Guardar como string pero asegurándonos que es un número
                }
                setFechaIngreso("2024-11-03T00:00:00.000Z");
                setTipoVinculacion("N/A");
                setTipoContrato("N/A");
                setSalario("N/A");
                setAntiguedadInstitucion("N/A");
                setJefeInmediato("N/A");
                setSede("N/A");
                setTurnoTrabajo("N/A");

                // Almacenar en localStorage
                localStorage.setItem('var_tipoVinculacion', "N/A");
                localStorage.setItem('date_fechaIngresoInstitucion', "2024-11-03T00:00:00.000Z");
                localStorage.setItem('var_tipoContrato', "N/A");
                localStorage.setItem('var_salario', "N/A");
                localStorage.setItem('var_antiguedadInstitucion', "N/A");
                localStorage.setItem('var_jefeInmediato', "N/A");
                localStorage.setItem('var_sede', "N/A");
                localStorage.setItem('setTurnoTrabajo', "N/A");
            }
        } else if (name === "tipoVinculacion") {
            setTipoVinculacion(value);
            localStorage.setItem('var_tipoVinculacion', value);
        } else if (name === "tipoContrato") {
            setTipoContrato(value);
            localStorage.setItem('var_tipoContrato', value);
        } else if (name === "var_salario") {
            setSalario(value);
            localStorage.setItem('var_salario', value);
        } else if (name === "date_fechaIngresoInstitucion") {
            setFechaIngreso(value);
            localStorage.setItem('date_fechaIngresoInstitucion', value);

            const fechaIngresoDate = new Date(value);
            const fechaActual = new Date();

            if (fechaIngresoDate > fechaActual) {
                setAntiguedadInstitucion("N/A");
                localStorage.setItem('var_antiguedadInstitucion', "N/A");
            } else {
                const diferenciaTiempo = fechaActual - fechaIngresoDate;
                const diasAntiguedad = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
                setAntiguedadInstitucion(diasAntiguedad);
                localStorage.setItem('var_antiguedadInstitucion', diasAntiguedad.toString());
            }
        } else if (name === "area") {
            setAreaSeleccionada(value);
            localStorage.setItem('area', value);
        } else if (name === "var_cargo") {
            setCargo(value);
            localStorage.setItem('var_cargo', value);
        } else if (name === "var_jefeInmediato") {
            setJefeInmediato(value);
            localStorage.setItem('var_jefeInmediato', value);
        } else if (name === "var_sede") {
            setSede(value);
            localStorage.setItem('var_sede', value);
        } else if (name === "var_turnoTrabajo") {
            setTurnoTrabajo(value);
            localStorage.setItem('var_turnoTrabajo', value);
        }
    };

    const manejarSiguiente = () => {

        navigate("/datosProfesional6");
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>¿Ya estás afiliado?</Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6">¿Ya estás afiliado?:</Typography>
                        <Select labelId="afiliado-label" name="afiliado" value={afiliado} onChange={manejarCambio}  >
                            <MenuItem value="si">Sí</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>

                    {afiliado === "si" && (
                        <form>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6">Tipo de Vinculación:</Typography>
                                <Select labelId="tipo-vinculacion-label" name="tipoVinculacion" value={tipoVinculacion} onChange={manejarCambio}  >
                                    <MenuItem value="vinculado">Vinculado</MenuItem>
                                    <MenuItem value="temporal">Temporal</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6">Tipo de Contrato:</Typography>
                                <Select labelId="tipo-contrato-label" name="tipoContrato" value={tipoContrato} onChange={manejarCambio}  >
                                    <MenuItem value="indefinido">Contrato a término indefinido</MenuItem>
                                    <MenuItem value="fijo">Contrato a término fijo</MenuItem>
                                    <MenuItem value="prestacion_servicios">Contrato por prestación de servicios</MenuItem>
                                    <MenuItem value="medio_tiempo">Medio tiempo</MenuItem>
                                    <MenuItem value="docente_catedra">Docente de cátedra</MenuItem>
                                    <MenuItem value="obra_labor">Obra/Labor</MenuItem>
                                </Select>
                            </FormControl>

                            <Typography variant="h6">Salario:</Typography>
                            <TextField variant="outlined" fullWidth name="var_salario" value={salario} onChange={manejarCambio} sx={{ mb: 2 }} />

                            <Typography variant="h6">Fecha de Ingreso:</Typography>
                            <TextField name="date_fechaIngresoInstitucion" type="date" variant="outlined" value={fechaIngreso} onChange={manejarCambio} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />

                            <Typography variant="h6">Antigüedad en la Institución (días):</Typography>
                            <TextField name="var_antiguedadInstitucion" type="text" variant="outlined" value={antiguedadInstitucion} onChange={manejarCambio} fullWidth sx={{ mb: 2 }} disabled />
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="area-label">Área</InputLabel>
                                <Select labelId="area-label" name="area" value={areaSeleccionada} onChange={manejarCambio} label="Área" >
                                    {estructuraOrganizacional.map((area) => (
                                        <MenuItem key={area.id_areaPk} value={area.id_areaPk}>{area.var_nombreArea}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Typography variant="h6">Cargo:</Typography>
                            <TextField variant="outlined" fullWidth name="var_cargo" value={cargo} onChange={manejarCambio} sx={{ mb: 2 }} />

                            <Typography variant="h6">Jefe Inmediato:</Typography>
                            <TextField variant="outlined" fullWidth name="var_jefeInmediato" value={jefeInmediato} onChange={manejarCambio} sx={{ mb: 2 }} />

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6">Sede:</Typography>
                                <Select labelId="sede-label" name="var_sede" value={sede} onChange={manejarCambio} label="Sede">
                                    <MenuItem value="robledo">Robledo</MenuItem>
                                    <MenuItem value="premium_plaza">Premium Plaza</MenuItem>
                                    <MenuItem value="robledo_premium_plaza">Robledo / Premium Plaza</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <Typography variant="h6">Turno de trabajo:</Typography>
                                <Select labelId="turno-label" name="var_turnoTrabajo" value={turnoTrabajo} onChange={manejarCambio}>
                                    <MenuItem value="diurno">Diurno</MenuItem>
                                    <MenuItem value="jornada_Extendida">jornada extendida </MenuItem>
                                </Select>
                            </FormControl>

                        </form>
                    )}

                    <Button variant="contained" onClick={manejarSiguiente} color="primary" sx={{ mt: 2 }}> Siguiente </Button>
                </CardContent>
            </Card>
        </div>

    );
};

export default VistaDatosProfesional5;

