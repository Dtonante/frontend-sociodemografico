import React, { useState } from 'react';
import { Card, Box, Typography, Divider, CardContent, FormControl, RadioGroup, Radio, FormControlLabel, Select, MenuItem } from '@mui/material';


const VistaDatosProfesional7 = () => {
    const [actividadFisica, setActividadFisica] = useState(null);
    const [frecuenciaActividadFisica, setFrecuenciaActividadFisica] = useState("");
    const [fuma, setFuma] = useState(null);
    const [frecuenciaFuma, setFrecuenciaFuma] = useState("");
    const [toma, setToma] = useState(null);
    const [frecuenciaToma, setFrecuenciaToma] = useState("");


    const manejarCambio = (event) => {
        const { name, value } = event.target;

        if (name === "boolean_actividadFisica") {
            setActividadFisica(value === "true");
        } else if (name === "var_frecuenciaActividadFisica") {
            setFrecuenciaActividadFisica(value);
        } else if (name === "boolean_fuma") {
            setFuma(value === "true");
        } else if (name === "var_frecuenciaFuma") {
            setFrecuenciaFuma(value);
        } else if (name === "boolean_toma") {
            setToma(value === "true");
          } else if (name === "var_frecuenciaToma") {
            setFrecuenciaToma(value);
          }
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{  p: 0,  width: "100%",   maxWidth: 800,  margin: "50px auto" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>
                            Actividad Física
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: "500" }}>
                            ¿Realiza actividad física?
                        </Typography>
                        <RadioGroup
                            name="boolean_actividadFisica"
                            value={actividadFisica ? "true" : "false"}
                            onChange={manejarCambio}
                            row
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {actividadFisica && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: "500" }}>
                                Frecuencia de actividad física
                            </Typography>
                            <Select
                                name="var_frecuenciaActividadFisica"
                                value={frecuenciaActividadFisica}
                                onChange={manejarCambio}
                                displayEmpty
                            >
                                <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                <MenuItem value="diariamente">Diariamente</MenuItem>
                                <MenuItem value="semanalmente">Semanalmente</MenuItem>
                                <MenuItem value="quincenalmente">Quincenalmente</MenuItem>
                                <MenuItem value="mensualmente">Mensualmente</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <FormControl component="fieldset" fullWidth sx={{ mb: 2 }}>
                        <Typography variant="body1" sx={{ fontWeight: "500" }}>
                            ¿Fuma?
                        </Typography>
                        <RadioGroup
                            name="boolean_fuma"
                            value={fuma ? "true" : "false"}
                            onChange={manejarCambio}
                            row
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Sí" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>

                    {fuma && (
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: "500" }}>
                                Frecuencia de fumar
                            </Typography>
                            <Select
                                name="var_frecuenciaFuma"
                                value={frecuenciaFuma}
                                onChange={manejarCambio}
                                displayEmpty
                            >
                                <MenuItem value="">Seleccione una frecuencia</MenuItem>
                                <MenuItem value="diariamente">Diariamente</MenuItem>
                                <MenuItem value="semanalmente">Semanalmente</MenuItem>
                                <MenuItem value="quincenalmente">Quincenalmente</MenuItem>
                                <MenuItem value="mensualmente">Mensualmente</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaDatosProfesional7;
