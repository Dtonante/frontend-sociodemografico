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
    const porcentajeProgreso = 95;

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
            nuevosErrores.selectedTransporte = "El nombre completo es obligatorio";
        }

        if (!mediosTransportePublico || mediosTransportePublico.length === 0) {
            nuevosErrores.mediosTransportePublico = "El nombre completo es obligatorio";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }

        navigate("/agradecimientos");
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
            <Card variant="outlined"sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: '#F2F2F2',  borderColor: '#202B52'  }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: 'center', color: '#202B52', fontFamily: 'Roboto Condensed' }}> Medios de transporte utilizado :</Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: '5%', marginRight: '5%', borderColor: '#202B52' }} />

                <CardContent sx={{ padding: "30px" }}>

                    <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>¿Con cuál medio de transporte propio cuenta? :</Typography>
                    <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.selectedTransporte}>
                        <TextField select name="set_transportePropio" value={selectedTransporte} onChange={manejarCambioTransporte} fullWidth variant="outlined" onBlur={handleBlur}
                            error={!!errors.selectedTransporte}
                            helperText={errors.selectedTransporte} FormHelperTextProps={{
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
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }} >¿En cuál medio de transporte te desplazas a la universidad? :</Typography>
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



                    <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Número de placa:</Typography>
                    <TextField value={placa} onChange={manejarCambioPlaca} fullWidth variant="outlined" sx={{ mb: 2 }} InputProps={{
                        sx: {
                            height: "40px",
                            fontFamily: "Poppins",
                            fontSize: "16px"
                        },
                    }} />

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
                                        borderRadius: '5px 0 0 5px',
                                    }}
                                ></div>
                            </div>
                            <span style={{ color: '#202B52', fontWeight: 'bold' }}>{porcentajeProgreso}%</span>
                        </div>


                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button sx={{ backgroundColor: '#202B52' }}  onClick={(manejarSiguiente)} variant="contained"  type="submit">
                            Siguiente
                        </Button>
                    </div>

                    
                </CardContent>
            </Card>
        </div>

    );
};

export default VistaDatosProfesional8;

