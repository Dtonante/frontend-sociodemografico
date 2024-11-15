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

    // // Función genérica para manejar los cambios
    // const manejarCambio = (event) => {
    //     const { name, value } = event.target;

    //     if (name === "transportePropio") {
    //         setSelectedTransporte(event.target.value);
    //         localStorage.setItem('transportePropio', value);
    //     } else if (name === "placa") {
    //         setPlaca(event.target.value);
    //         localStorage.setItem('placa', value);
    //     } else if (name === "set_mediosTransportePublico") {
    //         setMediosTransportePublico(value);
    //         localStorage.setItem('set_mediosTransportePublico', value);
    //     }
    // };

    const manejarSiguiente = () => {

        navigate("/agradecimientos");
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}> Medios de Transporte Público </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Typography variant="h6" > Medios de Transporte Público </Typography>
                        <TextField select name="set_mediosTransportePublico" value={mediosTransportePublico} onChange={manejarCambio} fullWidth variant="outlined" SelectProps={{ multiple: true }} >
                            <MenuItem value="">
                                <em>Selecciona un medio de transporte</em>
                            </MenuItem>
                            <MenuItem value="bus">Bus</MenuItem>
                            <MenuItem value="metro">Metro</MenuItem>
                            <MenuItem value="transmilenio">Transmilenio</MenuItem>
                            <MenuItem value="bici">Bicicleta</MenuItem>
                            <MenuItem value="caminando">Caminando</MenuItem>
                            <MenuItem value="taxi">Taxi</MenuItem>
                            <MenuItem value="mototaxi">Mototaxi</MenuItem>
                        </TextField>
                    </FormControl>

                    <Typography variant="h6"> Selecciona un Transporte Propio </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField select name="set_transportePropio" value={selectedTransporte} onChange={manejarCambioTransporte} fullWidth variant="outlined" >
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

