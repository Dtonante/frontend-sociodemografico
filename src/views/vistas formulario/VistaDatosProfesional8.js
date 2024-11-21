import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Typography, Button, Card, CardContent, Box, Divider, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VistaDatosProfesional8 = () => {
    // Estado para almacenar los medios de transporte público seleccionados
    const [mediosTransportePublico, setMediosTransportePublico] = useState([]);
    const [selectedTransporte, setSelectedTransporte] = useState('');  // Transporte propio seleccionado
    const [placa, setPlaca] = useState('');  // Placa del vehículo
    const [transportes, setTransportes] = useState([]);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});

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
    }, [ selectedTransporte, touchedFields]);

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
                const response = await axios.get('http://localhost:3001/transportePropio/');
                setTransportes(response.data);  // Actualiza el estado con los transportes obtenidos
            } catch (error) {
                console.error('Error al obtener los transportes:', error);  // Manejo de errores
            }
        };

        fetchTransportes();
    }, []);

    // Manejar el cambio del transporte propio seleccionado
    const manejarCambioTransporte = (event) => {
        setSelectedTransporte(event.target.value);
    };

    // Manejar el cambio de la placa
    const manejarCambioPlaca = (event) => {
        setPlaca(event.target.value);
    };

    // Manejar el cambio de selección de medios de transporte
    const manejarCambio = (event) => {
        const { name, value } = event.target;
        if (name === "set_mediosTransportePublico") {
            setMediosTransportePublico(value);
            localStorage.setItem('set_mediosTransportePublico', value);

        }
    };

    const manejarSiguiente = () => {

        const nuevosErrores = {};

        if (!selectedTransporte) {
            nuevosErrores.selectedTransporte = "Indicar si tienes medio de transporte es obligatorio.";
        }

        if (!mediosTransportePublico || mediosTransportePublico.length === 0) {
            nuevosErrores.mediosTransportePublico = "Indicar el medio de transporte para desplazarte a la universidad es obligatorio.";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }

        navigate("/agradecimientos");
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}> Medios de transporte utilizado :</Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>

                    <Typography variant="h6">¿Con cuál medio de transporte propio cuenta? :</Typography>
                    <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.selectedTransporte}>
                        <TextField select name="set_transportePropio" value={selectedTransporte} onChange={manejarCambioTransporte} fullWidth variant="outlined" onBlur={handleBlur}
                            error={!!errors.selectedTransporte}
                            helperText={errors.selectedTransporte} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} >
                            <MenuItem value="">
                                <em>Selecciona un transporte propio</em>
                            </MenuItem>
                            {transportes.map((transporte) => (
                                <MenuItem key={transporte.id_transportePropioPK} value={transporte.id_transportePropioPK}>
                                    {transporte.var_nombreTransporte}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6" >¿En cuál medio de transporte te desplazas a la universidad? :</Typography>
                        <TextField select name="set_mediosTransportePublico" value={mediosTransportePublico} onChange={manejarCambio} fullWidth variant="outlined" SelectProps={{ multiple: true }} onBlur={handleBlur}
                            error={!!errors.mediosTransportePublico}
                            helperText={errors.mediosTransportePublico} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }}  >
                            <MenuItem value="transporte propio">Transporte propio</MenuItem>
                            <MenuItem value="bus">Bus</MenuItem>
                            <MenuItem value="metro">Metro</MenuItem>
                            <MenuItem value="bici">Bicicleta</MenuItem>
                            <MenuItem value="caminando">Caminando</MenuItem>
                            <MenuItem value="taxi">Taxi</MenuItem>
                            <MenuItem value="mototaxi">Plataformas</MenuItem>
                        </TextField>
                        
                    </FormControl>

                    <Typography variant="h6">Número de placa:</Typography>
                    <TextField value={placa} onChange={manejarCambioPlaca} fullWidth variant="outlined" sx={{ mb: 2 }} />

                    <Button variant="contained" color="primary" onClick={(manejarSiguiente)}>
                        Mostrar Selección
                    </Button>
                </CardContent>
            </Card>
        </div>

    );
};

export default VistaDatosProfesional8;

