import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Divider, CardContent, Button, FormHelperText, TextField, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
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
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.afiliado && !afiliado) {
            nuevosErrores.afiliado = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.tipoVinculacion && !tipoVinculacion) {
            nuevosErrores.tipoVinculacion = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.tipoContrato && !tipoContrato) {
            nuevosErrores.tipoContrato = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.salario && !salario) {
            nuevosErrores.salario = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.fechaIngreso && !fechaIngreso) {
            nuevosErrores.fechaIngreso = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.areaSeleccionada && !areaSeleccionada) {
            nuevosErrores.areaSeleccionada = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.cargo && !cargo) {
            nuevosErrores.cargo = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.jefeInmediato && !jefeInmediato) {
            nuevosErrores.jefeInmediato = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.sede && !sede) {
            nuevosErrores.sede = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.turnoTrabajo && !turnoTrabajo) {
            nuevosErrores.turnoTrabajo = "El departamento es obligatorio";
        }
        // Validar que la fecha de ingreso no sea futura
        if (afiliado === "si" && touchedFields.fechaIngreso) {
            const fechaHoy = new Date().toISOString().split('T')[0]; // Obtener la fecha de hoy en formato YYYY-MM-DD
            if (!fechaIngreso || fechaIngreso > fechaHoy) {
                nuevosErrores.fechaIngreso = "La fecha de ingreso no puede ser futura";
            }
        }



        setErrors(nuevosErrores)
    }, [afiliado, tipoVinculacion, tipoContrato, salario, cargo, sede, fechaIngreso, areaSeleccionada, jefeInmediato, turnoTrabajo, touchedFields]);

    // Marcar un campo como "tocado" cuando pierde el enfoque
    const handleBlur = (event) => {
        const { name } = event.target;
        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });
    };

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
        const nuevosErrores = {};


        if (!afiliado) {
            nuevosErrores.afiliado = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !tipoVinculacion) {
            nuevosErrores.tipoVinculacion = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !tipoContrato) {
            nuevosErrores.tipoContrato = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !salario) {
            nuevosErrores.salario = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !fechaIngreso) {
            nuevosErrores.fechaIngreso = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !areaSeleccionada) {
            nuevosErrores.areaSeleccionada = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !cargo) {
            nuevosErrores.cargo = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !jefeInmediato) {
            nuevosErrores.jefeInmediato = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !cargo) {
            nuevosErrores.cargo = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !sede) {
            nuevosErrores.sede = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (afiliado === "si" && !turnoTrabajo) {
            nuevosErrores.turnoTrabajo = "El campo servicios con los que no cuentan es obligatorio";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }

        navigate("/datosProfesional6");
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>Información de vinculación</Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.afiliado}>
                        <Typography variant="h6">¿En proceso de ingreso o vinculado? :</Typography>
                        <Select labelId="afiliado-label" name="afiliado" value={afiliado} onChange={manejarCambio} onBlur={handleBlur} >
                            <MenuItem value="si">Vinculado</MenuItem>
                            <MenuItem value="no">Proceso de ingreso</MenuItem>
                        </Select>
                        {errors.afiliado && (
                            <FormHelperText
                                sx={{
                                    marginLeft: 0,
                                }}
                            >
                                {errors.afiliado}
                            </FormHelperText>
                        )}
                    </FormControl>

                    {afiliado === "si" && (
                        <form>
                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.tipoVinculacion}>
                                <Typography variant="h6">Tipo de Vinculación:</Typography>
                                <Select labelId="tipo-vinculacion-label" name="tipoVinculacion" value={tipoVinculacion} onChange={manejarCambio}  >
                                    <MenuItem value="vinculado">Vinculado</MenuItem>
                                    <MenuItem value="temporal">Temporal</MenuItem>
                                </Select>
                                {errors.tipoVinculacion && (
                                    <FormHelperText
                                        sx={{
                                            marginLeft: 0,
                                        }}
                                    >
                                        {errors.tipoVinculacion}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.tipoContrato}>
                                <Typography variant="h6">Tipo de Contrato:</Typography>
                                <Select labelId="tipo-contrato-label" name="tipoContrato" value={tipoContrato} onChange={manejarCambio}  >
                                    <MenuItem value="indefinido">Contrato a término indefinido</MenuItem>
                                    <MenuItem value="fijo">Contrato a término fijo</MenuItem>
                                    <MenuItem value="prestacion_servicios">Contrato por prestación de servicios</MenuItem>
                                    <MenuItem value="medio_tiempo">Medio tiempo</MenuItem>
                                    <MenuItem value="docente_catedra">Docente de cátedra</MenuItem>
                                    <MenuItem value="obra_labor">Obra/Labor</MenuItem>
                                </Select>
                                {errors.tipoContrato && (
                                    <FormHelperText
                                        sx={{
                                            marginLeft: 0,
                                        }}
                                    >
                                        {errors.tipoContrato}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <Typography variant="h6">Salario:</Typography>
                            <TextField variant="outlined" fullWidth name="var_salario" value={salario} onChange={manejarCambio} sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.salario} helperText={errors.salario} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} />

                            <Typography variant="h6">Fecha de Ingreso:</Typography>
                            <TextField name="date_fechaIngresoInstitucion" type="date" variant="outlined" value={fechaIngreso} onChange={manejarCambio} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} onBlur={handleBlur} error={!!errors.fechaIngreso} helperText={errors.fechaIngreso} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} inputProps={{
                                max: new Date().toISOString().split('T')[0] // Deshabilita fechas futuras
                            }} />

                            <Typography variant="h6">Antigüedad en la Institución (días) :</Typography>
                            <TextField name="var_antiguedadInstitucion" type="text" variant="outlined" value={antiguedadInstitucion} onChange={manejarCambio} fullWidth sx={{ mb: 2 }} disabled />

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.areaSeleccionada}>
                                <Typography variant="h6">Área laboral a la que pertenece :</Typography>
                                <Select labelId="area-label" name="area" value={areaSeleccionada} onChange={manejarCambio} label="Área" >
                                    {estructuraOrganizacional.map((area) => (
                                        <MenuItem key={area.id_areaPk} value={area.id_areaPk}>{area.var_nombreArea}</MenuItem>
                                    ))}
                                </Select>
                                {errors.areaSeleccionada && (
                                    <FormHelperText sx={{
                                            marginLeft: 0
                                        }}
                                    >{errors.areaSeleccionada}</FormHelperText>
                                )}
                            </FormControl>

                            <Typography variant="h6">Cargo :</Typography>
                            <TextField variant="outlined" fullWidth name="var_cargo" value={cargo} onChange={manejarCambio} sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.cargo} helperText={errors.cargo} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} />

                            <Typography variant="h6">Jefe Inmediato:</Typography>
                            <TextField variant="outlined" fullWidth name="var_jefeInmediato" value={jefeInmediato} onChange={manejarCambio} sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.jefeInmediato} helperText={errors.jefeInmediato} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} />

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.sede}>
                                <Typography variant="h6">Sede:</Typography>
                                <Select labelId="sede-label" name="var_sede" value={sede} onChange={manejarCambio} label="Sede" onBlur={handleBlur}>
                                    <MenuItem value="robledo">Robledo</MenuItem>
                                    <MenuItem value="premium_plaza">Premium Plaza</MenuItem>
                                    <MenuItem value="robledo_premium_plaza">Robledo / Premium Plaza</MenuItem>
                                </Select>
                                {errors.sede && (
                                    <FormHelperText sx={{
                                            marginLeft: 0,
                                        }}
                                    >{errors.sede}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.turnoTrabajo}>
                                <Typography variant="h6">Turno de trabajo:</Typography>
                                <Select labelId="turno-label" name="var_turnoTrabajo" value={turnoTrabajo} onChange={manejarCambio}>
                                    <MenuItem value="diurno">Diurno</MenuItem>
                                    <MenuItem value="jornada_Extendida">jornada extendida </MenuItem>
                                </Select>
                                {errors.turnoTrabajo && (
                                    <FormHelperText sx={{
                                            marginLeft: 0,
                                        }}
                                    >{errors.turnoTrabajo}</FormHelperText>
                                )}
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

