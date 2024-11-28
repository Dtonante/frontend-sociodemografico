import React, { useState, useEffect } from 'react';
import { Checkbox, TextField, ListItemText, MenuItem, Typography, Button, Card, CardContent, Box, Divider, FormControl, Select, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VistaDatosProfesional8 = () => {
    // Estado para almacenar los medios de transporte público seleccionados
    const [mediosTransportePublico, setMediosTransportePublico] = useState([]);
    const [selectedTransporte, setSelectedTransporte] = useState([]);
    const [placa, setPlaca] = useState('');
    const [transportes, setTransportes] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const [habilitarPlaca, setHabilitarPlaca] = useState(false);
    const [habilitarPlacaExtra, setHabilitarPlacaExtra] = useState(false);
    const [placaExtra, setPlacaExtra] = useState("N/A");
    const porcentajeProgreso = 100;

    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.selectedTransporte && !selectedTransporte) {
            nuevosErrores.selectedTransporte = "El nombre completo es obligatorio";
        }


        if (touchedFields.mediosTransportePublico && (!mediosTransportePublico || mediosTransportePublico.length === 0)) {
            nuevosErrores.mediosTransportePublico = "El nombre completo es obligatorio";
        }

        setErrors(nuevosErrores);
    }, [selectedTransporte, touchedFields]);

    // Marcar un campo como "tocado" cuando pierde el enfoque
    const handleBlur = (event) => {
        const { name } = event.target;
        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });
    };

    // Obtener transportes propios desde la base de datos
    useEffect(() => {
        const fetchTransportes = async () => {
            try {
                const response = await axios.get('https://evaluacion.esumer.edu.co/api/transportePropio/');
                setTransportes(response.data);
            } catch (error) {
                console.error('Error al obtener los transportes:', error);
            }
        };

        fetchTransportes();
    }, []);

    // Manejar el cambio en el campo de selección
    const manejarCambioTransporte = (event) => {
        // Obtener los valores seleccionados
        const value = event.target.value;
        const idTransporteSeleccionado = event.target.value;

        // Si es un select múltiple, idTransporteSeleccionado será un array, por eso lo convertimos a un array si no lo es.
        const seleccionados = Array.isArray(idTransporteSeleccionado) ? idTransporteSeleccionado : [idTransporteSeleccionado];

        // Verificar si al menos uno de los valores seleccionados está en la lista de opciones válidas (1, 2, 3, 4)
        const transportesValidos = seleccionados.filter(id => [1, 2, 3, 4].includes(Number(id)));

        // Si hay al menos uno de los valores seleccionados que es válido (1, 2, 3 o 4), habilitar el primer campo de placa
        if (transportesValidos.length > 0) {
            setHabilitarPlaca(true);
        } else {
            setHabilitarPlaca(false);
            setPlaca("N/A");
            // Guardar el array actualizado en localStorage
            localStorage.setItem("selectedTransporte", JSON.stringify(value));
        }

        // Si se seleccionan más de uno de los valores válidos, habilitar el campo de placa extra
        if (transportesValidos.length > 1) {
            setHabilitarPlacaExtra(true);
        } else {
            setHabilitarPlacaExtra(false);
            setPlacaExtra("");
            localStorage.setItem("selectedTransporte", JSON.stringify(value));
        }

        // Actualizar el estado con los valores seleccionados (valor ya es un array)
        setSelectedTransporte(value);

        // Guardar el array actualizado en localStorage
        localStorage.setItem("selectedTransporte", JSON.stringify(value));
    };


    // // Manejar el cambio de la placa
    // const manejarCambioPlaca = (event) => {
    //     const nuevaPlaca = event.target.value;

    //     if (habilitarPlaca) {
    //         setPlaca(nuevaPlaca);
    //         localStorage.setItem('placa', nuevaPlaca);
    //     }
    // };


    // const manejarCambioPlaca = (event) => {
    //     let nuevaPlaca = event.target.value.toUpperCase();

    //     // Permite solo letras, números y el guion, eliminando caracteres no válidos
    //     nuevaPlaca = nuevaPlaca.replace(/[^A-Z0-9-]/g, "");

    //     // Asegura que los tres primeros caracteres sean letras
    //     if (nuevaPlaca.length <= 3) {
    //         nuevaPlaca = nuevaPlaca.replace(/[^A-Z]/g, ""); // Solo letras al inicio
    //     }

    //     // Inserta automáticamente el guion después de las 3 letras
    //     if (nuevaPlaca.length === 4 && nuevaPlaca[3] !== "-") {
    //         nuevaPlaca = nuevaPlaca.slice(0, 3) + "-" + nuevaPlaca.slice(3);
    //     }

    //     // Asegura que los caracteres después del guion cumplan las reglas
    //     if (nuevaPlaca.length > 4 && nuevaPlaca[3] === "-") {
    //         const partePosterior = nuevaPlaca.slice(4);

    //         // Validación progresiva para que:
    //         // - Primer carácter después del guion sea un número
    //         // - Segundo carácter después del guion sea un número
    //         // - Tercer carácter después del guion pueda ser un número o una letra
    //         if (partePosterior.length === 1 && !/^\d$/.test(partePosterior)) {
    //             nuevaPlaca = nuevaPlaca.slice(0, 4); // Elimina el carácter no numérico
    //         } else if (partePosterior.length === 2 && !/^\d{2}$/.test(partePosterior)) {
    //             nuevaPlaca = nuevaPlaca.slice(0, 5); // Elimina caracteres adicionales
    //         } else if (partePosterior.length === 3 && !/^\d{2}[A-Z]$/.test(partePosterior)) {
    //             nuevaPlaca = nuevaPlaca.slice(0, 6); // Solo permite dos números seguidos de una letra
    //         }
    //     }

    //     // Validación estricta de los formatos de placas
    //     if (/^[A-Z]{3}-\d{3}$/.test(nuevaPlaca) || /^[A-Z]{3}-\d{2}[A-Z]{1}$/.test(nuevaPlaca)) {
    //         if (habilitarPlaca) {
    //             setPlaca(nuevaPlaca); // Actualiza el estado
    //             localStorage.setItem("placa", nuevaPlaca); // Guarda en localStorage
    //         }
    //     } else if (!/^([A-Z]{0,3}-?\d{0,2}[A-Z]?)?$/.test(nuevaPlaca)) {
    //         // Bloquea cualquier formato que no sea progresivamente válido
    //         return;
    //     } else {
    //         setPlaca(nuevaPlaca); // Permite la entrada progresiva
    //     }
    // };






    // /// Manejar el cambio de la placa extra
    // const manejarCambioPlacaExtra = (event) => {
    //     const nuevaPlacaExtra = event.target.value;
    //     setPlacaExtra(nuevaPlacaExtra);
    //     actualizarPlacaEnLocalStorage(placa, nuevaPlacaExtra); 
    // };



    // Función de validación común para placas
const validarPlaca = (placa) => {
    let nuevaPlaca = placa.toUpperCase();

    // Permite solo letras, números y el guion, eliminando caracteres no válidos
    nuevaPlaca = nuevaPlaca.replace(/[^A-Z0-9-]/g, "");

    // Asegura que los tres primeros caracteres sean letras
    if (nuevaPlaca.length <= 3) {
        nuevaPlaca = nuevaPlaca.replace(/[^A-Z]/g, ""); // Solo letras al inicio
    }

    // Inserta automáticamente el guion después de las 3 letras
    if (nuevaPlaca.length === 4 && nuevaPlaca[3] !== "-") {
        nuevaPlaca = nuevaPlaca.slice(0, 3) + "-" + nuevaPlaca.slice(3);
    }

    // Asegura que los caracteres después del guion cumplan las reglas
    if (nuevaPlaca.length > 4 && nuevaPlaca[3] === "-") {
        const partePosterior = nuevaPlaca.slice(4);

        // Validación progresiva para que:
        // - Primer carácter después del guion sea un número
        // - Segundo carácter después del guion sea un número
        // - Tercer carácter después del guion pueda ser un número o una letra
        if (partePosterior.length === 1 && !/^\d$/.test(partePosterior)) {
            nuevaPlaca = nuevaPlaca.slice(0, 4); // Elimina el carácter no numérico
        } else if (partePosterior.length === 2 && !/^\d{2}$/.test(partePosterior)) {
            nuevaPlaca = nuevaPlaca.slice(0, 5); // Elimina caracteres adicionales
        } else if (partePosterior.length === 3 && !/^\d{2}[A-Z0-9]$/.test(partePosterior)) {
            nuevaPlaca = nuevaPlaca.slice(0, 6); // Solo permite dos números seguidos de una letra o número
        }
    }

    return nuevaPlaca;
};


    // Manejar el cambio de la placa principal
    const manejarCambioPlaca = (event) => {
        let nuevaPlaca = event.target.value;

        // Usar la función de validación común
        nuevaPlaca = validarPlaca(nuevaPlaca);

        // Validación estricta de los formatos de placas
        if (/^[A-Z]{3}-\d{3}$/.test(nuevaPlaca) || /^[A-Z]{3}-\d{2}[A-Z]{1}$/.test(nuevaPlaca)) {
            if (habilitarPlaca) {
                setPlaca(nuevaPlaca); // Actualiza el estado
                localStorage.setItem("placa", nuevaPlaca); // Guarda en localStorage
            }
        } else if (!/^([A-Z]{0,3}-?\d{0,2}[A-Z]?)?$/.test(nuevaPlaca)) {
            // Bloquea cualquier formato que no sea progresivamente válido
            return;
        } else {
            setPlaca(nuevaPlaca); // Permite la entrada progresiva
        }
    };

    // Manejar el cambio de la placa extra
    const manejarCambioPlacaExtra = (event) => {
        let nuevaPlacaExtra = event.target.value;

        // Usar la función de validación común
        nuevaPlacaExtra = validarPlaca(nuevaPlacaExtra);

        // Actualizar el estado con la nueva placa extra
        setPlacaExtra(nuevaPlacaExtra);

        // Actualizar el localStorage con los valores de placa
        actualizarPlacaEnLocalStorage(placa, nuevaPlacaExtra);
    };





    // Función para actualizar el valor de la placa en localStorage
    const actualizarPlacaEnLocalStorage = (placaPrincipal, placaExtraValor) => {
        const placaFinal = placaExtraValor
            ? `${placaPrincipal !== "N/A" ? placaPrincipal : ""}--${placaExtraValor}`
            : placaPrincipal;
        localStorage.setItem("placa", placaFinal);
    };





    // Manejar el cambio de selección de medios de transporte
    const manejarCambio = (event) => {
        const { name, value } = event.target;
        if (name === "set_mediosTransportePublico") {
            setMediosTransportePublico(value);
            localStorage.setItem('set_mediosTransportePublico', value);

        }
    };



    const manejarSiguiente = (event) => {
        event.preventDefault();

        const nuevosErrores = {};

        if (!selectedTransporte) {
            nuevosErrores.selectedTransporte = "Indicar si tienes medio de transporte es obligatorio.";
        }

        if (habilitarPlaca && (!mediosTransportePublico || mediosTransportePublico.length === 0)) {
            nuevosErrores.mediosTransportePublico = "Indicar el medio de transporte para desplazarte a la universidad es obligatorio.";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }

        console.log('reputos', selectedTransporte, placa)

        navigate("/Agradecimiento");
    };

    return (
        <div style={{ backgroundColor: '#F2F2F2', paddingTop: '3%', paddingBottom: '3%', height: '100vh', overflow: 'auto' }}>
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
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: 'center', color: '#202B52', fontFamily: 'Roboto Condensed' }}> Medios de transporte utilizado</Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: '5%', marginRight: '5%', borderColor: '#202B52' }} />

                <CardContent sx={{ padding: "30px" }}>
                    <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.selectedTransporte}>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>
                            ¿Con cuál medio de transporte propio cuenta? (se pueden seleccionar varias opciones):
                        </Typography>
                        <Select
                            multiple
                            value={selectedTransporte}
                            onChange={manejarCambioTransporte}
                            name="set_transportePropio"
                            renderValue={(selected) => {
                                // Obtener los nombres de los transportes seleccionados
                                const selectedNames = transportes
                                    .filter(transporte => selected.includes(transporte.id_transportePropioPK))
                                    .map(transporte => transporte.var_nombreTransporte);
                                return selectedNames.join(' - '); // Unir los nombres con un guion
                            }}
                            fullWidth
                            variant="outlined"
                            MenuProps={{
                                PaperProps: { style: { maxHeight: 224, width: 250 } }
                            }}
                            sx={{
                                height: "40px",
                                fontFamily: "Poppins",
                                fontSize: "16px"
                            }}
                        >
                            {transportes.map((transporte) => (
                                <MenuItem key={transporte.id_transportePropioPK} value={transporte.id_transportePropioPK}>
                                    <Checkbox checked={selectedTransporte.indexOf(transporte.id_transportePropioPK) > -1} />
                                    <ListItemText primary={transporte.var_nombreTransporte} />
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.selectedTransporte && (
                            <FormHelperText sx={{ marginLeft: 0 }}>
                                {errors.selectedTransporte}
                            </FormHelperText>
                        )}
                    </FormControl>


                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }} >¿En cuál medio de transporte te desplazas a la universidad? (se pueden seleccionar varias opciones):</Typography>
                        <TextField select name="set_mediosTransportePublico" value={mediosTransportePublico} onChange={manejarCambio} fullWidth variant="outlined" SelectProps={{ multiple: true }} onBlur={handleBlur}
                            error={!!errors.mediosTransportePublico}
                            helperText={errors.mediosTransportePublico} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }} >
                            <MenuItem value="transporte propio">Transporte propio</MenuItem>
                            <MenuItem value="bus">Bus</MenuItem>
                            <MenuItem value="metro">Metro</MenuItem>
                            <MenuItem value="bici">Bicicleta</MenuItem>
                            <MenuItem value="caminando">Caminando</MenuItem>
                            <MenuItem value="taxi">Taxi</MenuItem>
                            <MenuItem value="mototaxi">Plataformas</MenuItem>
                        </TextField>

                    </FormControl>


                    {habilitarPlaca && (
                        <>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Número de placa:</Typography>
                            <TextField value={placa} onChange={manejarCambioPlaca} fullWidth variant="outlined" sx={{
                                mb: 2, input: {
                                    textTransform: "uppercase", // Fuerza las letras a mostrarse en mayúsculas
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px",
                                }, inputProps: { maxLength: 7 }
                            }} />


                            {/* Mostrar el segundo campo de placa si se seleccionaron más de uno de los IDs válidos */}
                            {habilitarPlacaExtra && (
                                <>
                                    <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Número de placa extra:</Typography>

                                    <TextField
                                        sx={{ input: { textTransform: "uppercase" } }}
                                        value={placaExtra}
                                        onChange={manejarCambioPlacaExtra}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                height: "40px",
                                                fontFamily: "Poppins",
                                                fontSize: "16px",
                                            }, inputProps: { maxLength: 7 }
                                        }}
                                    />
                                </>
                            )}

                        </>
                    )}


                    <div
                        style={{
                            fontFamily: 'Poppins',
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
                                fontFamily: 'Poppins',
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
                                    fontFamily: 'Poppins',
                                    width: `${porcentajeProgreso}%`,
                                    height: '100%',
                                    backgroundColor: '#202B52',
                                    borderRadius: '5px 0 0 5px',
                                }}
                            ></div>
                        </div>
                        <span style={{ color: '#202B52', fontWeight: 'bold' }}>{porcentajeProgreso}%</span>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button sx={{ backgroundColor: '#202B52' }} onClick={manejarSiguiente} variant="contained" type="button">
                            Siguiente
                        </Button>
                    </div>


                </CardContent>
            </Card>
        </div>

    );
};

export default VistaDatosProfesional8;

