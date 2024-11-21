import React, { useEffect, useState } from "react";
import { Card, Box, Typography, Divider, CardContent, Button, FormHelperText, TextField, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VistaDatosProfesional5 = () => {
    const [afiliado, setAfiliado] = useState('');
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
    const [var_correoElectronicoInstitucional, setVar_correoElectronicoInstitucional] = useState('')
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const porcentajeProgreso = 52;
     // Calcular la fecha máxima (5 días después de hoy)
     const fechaHoy = new Date();
     const fechaMaxima = new Date();
     fechaMaxima.setDate(fechaHoy.getDate() + 5); // 5 días después de hoy
     const fechaMaximaISO = fechaMaxima.toISOString().split('T')[0];

    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.afiliado && !afiliado) {
            nuevosErrores.afiliado = "El departamento es obligatorio";
        }

        if (afiliado === "si" && touchedFields.var_correoElectronicoInstitucional && !var_correoElectronicoInstitucional) {
            nuevosErrores.var_correoElectronicoInstitucional = "El departamento es obligatorio";
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
    }, [afiliado, tipoContrato, salario, var_correoElectronicoInstitucional, cargo, sede, fechaIngreso, areaSeleccionada, jefeInmediato, turnoTrabajo, touchedFields]);

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
            setTipoContrato('');
            setSalario('');
            setFechaIngreso('');
            setAntiguedadInstitucion('');
            setAreaSeleccionada('');
            setCargo('');
            setJefeInmediato('');
            setSede('');
            setTurnoTrabajo('');
            setVar_correoElectronicoInstitucional('')
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
                setTipoContrato("N/A");
                setSalario("N/A");
                setAntiguedadInstitucion("N/A");
                setJefeInmediato("N/A");
                setSede("N/A");
                setTurnoTrabajo("N/A");
                setVar_correoElectronicoInstitucional("N/A")

                // Almacenar en localStorage
                localStorage.setItem('date_fechaIngresoInstitucion', "2024-11-03T00:00:00.000Z");
                localStorage.setItem('var_tipoContrato', "N/A");
                localStorage.setItem('var_salario', "N/A");
                localStorage.setItem('var_antiguedadInstitucion', "N/A");
                localStorage.setItem('var_jefeInmediato', "N/A");
                localStorage.setItem('var_sede', "N/A");
                localStorage.setItem('setTurnoTrabajo', "N/A");
                localStorage.setItem('var_correoElectronicoInstitucional', "N/A");
            }
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
        } else if (name === "var_correoElectronicoInstitucional") {
            setVar_correoElectronicoInstitucional(value);
            localStorage.setItem('var_correoElectronicoInstitucional', value);
        }
    };

    const manejarSiguiente = () => {
        const nuevosErrores = {};


        if (!afiliado) {
            nuevosErrores.afiliado = "Indicar el tipo de proceso es obligatorio.";
        }

        if (afiliado === "si" && !var_correoElectronicoInstitucional) {
            nuevosErrores.var_correoElectronicoInstitucional = "El correo electronico institucional es obligatorio.";
        }

        if (afiliado === "si" && !tipoContrato) {
            nuevosErrores.tipoContrato = "El tipo de contrato es obligatorio.";
        }

        if (afiliado === "si" && !salario) {
            nuevosErrores.salario = "El salario es obligatorio.";
        }

        if (afiliado === "si" && !fechaIngreso) {
            nuevosErrores.fechaIngreso = "La fecha de ingreso es obligatorio.";
        }

        if (afiliado === "si" && !areaSeleccionada) {
            nuevosErrores.areaSeleccionada = "El área laboral es obligatorio.";
        }

        if (afiliado === "si" && !cargo) {
            nuevosErrores.cargo = "El cargo es obligatorio.";
        }

        if (afiliado === "si" && !jefeInmediato) {
            nuevosErrores.jefeInmediato = "El jefe inmediato es obligatorio.";
        }

        if (afiliado === "si" && !sede) {
            nuevosErrores.sede = "Indicar la sede es obligatorio.";
        }

        if (afiliado === "si" && !turnoTrabajo) {
            nuevosErrores.turnoTrabajo = "El turno de trabajo es obligatorio.";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }

        navigate("/datosProfesional6");
    };

    return (
        <div style={{ backgroundColor: '#F2F2F2', paddingTop: '3%', paddingBottom: '3%', minHeight: '100vh', overflow: 'auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '1%', marginTop: '-1%' }}>
                <img
                    src="public/logo_form.png"
                    alt="Descripción de la imagen"
                    style={{
                        width: '20%',
                        height: 'auto',
                    }}
                />
            </div>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: '#F2F2F2', borderColor: '#202B52' }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: 'center', color: '#202B52', fontFamily: 'Roboto Condensed' }}>Información laboral</Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: '5%', marginRight: '5%', borderColor: '#202B52' }} />
                <CardContent sx={{ padding: "30px" }}>
                    <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.afiliado}>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>¿En proceso de ingreso o vinculado? :</Typography>
                        <Select labelId="afiliado-label" name="afiliado" value={afiliado} onChange={manejarCambio} onBlur={handleBlur}
                            sx={{
                                height: "40px",
                                fontFamily: "Poppins",
                                fontSize: "16px"
                            }}>
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
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }} >Correo Electrónico Institucional:</Typography>
                            <TextField name="var_correoElectronicoInstitucional" type="email" variant="outlined" value={var_correoElectronicoInstitucional} onChange={manejarCambio} fullWidth sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.var_correoElectronicoInstitucional} helperText={errors.var_correoElectronicoInstitucional} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }} />

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.tipoContrato}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Tipo de Contrato:</Typography>
                                <Select labelId="tipo-contrato-label" name="tipoContrato" value={tipoContrato} onChange={manejarCambio} sx={{
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                }}  >
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

                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Salario:</Typography>
                            <TextField variant="outlined" fullWidth name="var_salario" value={salario} onChange={manejarCambio} sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.salario} helperText={errors.salario} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }} />

                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Fecha de Ingreso:</Typography>
                            <TextField name="date_fechaIngresoInstitucion" type="date" variant="outlined" value={fechaIngreso} onChange={manejarCambio} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} onBlur={handleBlur} error={!!errors.fechaIngreso} helperText={errors.fechaIngreso} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} inputProps={{
                                max: fechaMaximaISO, // Deshabilita fechas futuras
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px",
                                },
                            }} />

                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Antigüedad en la Institución (días) :</Typography>
                            <TextField name="var_antiguedadInstitucion" type="text" variant="outlined" value={antiguedadInstitucion} onChange={manejarCambio} fullWidth sx={{ mb: 2 }} disabled
                                InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px",
                                    },
                                }} />

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.areaSeleccionada}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Área laboral a la que pertenece :</Typography>
                                <Select labelId="area-label" name="area" value={areaSeleccionada} onChange={manejarCambio} label="Área"
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    }} >
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

                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Cargo :</Typography>
                            <TextField variant="outlined" fullWidth name="var_cargo" value={cargo} onChange={manejarCambio} sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.cargo} helperText={errors.cargo} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }} />

                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Jefe Inmediato:</Typography>
                            <TextField variant="outlined" fullWidth name="var_jefeInmediato" value={jefeInmediato} onChange={manejarCambio} sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.jefeInmediato} helperText={errors.jefeInmediato} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }} />

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.sede}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Sede:</Typography>
                                <Select labelId="sede-label" name="var_sede" value={sede} onChange={manejarCambio} label="Sede" onBlur={handleBlur}
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    }}>
                                    <MenuItem value="robledo">Robledo</MenuItem>
                                    <MenuItem value="premium_plaza">Premium Plaza</MenuItem>
                                    <MenuItem value="robledo_premium_plaza">Robledo / Premium Plaza</MenuItem>
                                    <MenuItem value="otro">Otro</MenuItem>
                                </Select>
                                {errors.sede && (
                                    <FormHelperText sx={{
                                        marginLeft: 0,
                                    }}
                                    >{errors.sede}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.turnoTrabajo}>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Turno de trabajo:</Typography>
                                <Select labelId="turno-label" name="var_turnoTrabajo" value={turnoTrabajo} onChange={manejarCambio}
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Poppins",
                                        fontSize: "16px"
                                    }}>
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

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#F2F2F2',
                            padding: '10px 15px',
                            borderRadius: '20px',
                            width: '100%',
                        }}
                    >
                        <div
                            style={{
                                height: '10px',
                                width: '90%',
                                backgroundColor: '#F2F2F2',
                                borderRadius: '7px',
                                overflow: 'hidden',
                                border: '2px solid #202B52',
                                marginRight: '10px',
                            }}
                        >
                            <div
                                style={{
                                    width: `${porcentajeProgreso}%`,
                                    height: '100%',
                                    backgroundColor: '#202B52',
                                    borderRadius: '2px 0 0 4px',
                                }}
                            ></div>
                        </div>
                        <span style={{ color: '#202B52', fontWeight: 'bold' }}>{porcentajeProgreso}%</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button sx={{ backgroundColor: '#202B52' }} onClick={manejarSiguiente} variant="contained" type="submit">
                            Siguiente
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
};

export default VistaDatosProfesional5;

