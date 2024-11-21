
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, FormHelperText, FormControl, TextField, Button, ListItemText, Checkbox, Select, MenuItem } from "@mui/material";

const VistaDatosProfesional2 = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        var_estadoCivil: "",
        boolean_viveSolo: "",
        set_personasConLasQueVive: '',
        boolean_viveConMascotas: "",
        var_personasDependeciaEconimica: "",
        var_totalIngresosPropiosYGrupoFamiliar: "",
        var_numeroPersonasConLasQueVive: "",
        set_tipoMascotas: []
    });
    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const porcentajeProgreso = 30;


    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.var_estadoCivil && !formData.var_estadoCivil) {
            nuevosErrores.var_estadoCivil = "El nombre completo es obligatorio";
        }

        if (touchedFields.boolean_viveSolo && !formData.boolean_viveSolo) {
            nuevosErrores.boolean_viveSolo = "El tipo de documento es obligatorio";
        }

        if (touchedFields.boolean_viveConMascotas && !formData.boolean_viveConMascotas) {
            nuevosErrores.boolean_viveConMascotas = "El tipo de documento es obligatorio";
        }

        if (touchedFields.var_personasDependeciaEconimica && !formData.var_personasDependeciaEconimica) {
            nuevosErrores.var_personasDependeciaEconimica = "El tipo de documento es obligatorio";
        }

        if (touchedFields.var_totalIngresosPropiosYGrupoFamiliar && !formData.var_totalIngresosPropiosYGrupoFamiliar) {
            nuevosErrores.var_totalIngresosPropiosYGrupoFamiliar = "El tipo de documento es obligatorio";
        }

        if (formData.boolean_viveSolo === "false" && formData.set_personasConLasQueVive.length === 0) {
            nuevosErrores.set_personasConLasQueVive = "Debe seleccionar al menos una persona con la que vive";
        }

        if (formData.boolean_viveSolo === "false" && formData.var_numeroPersonasConLasQueVive.length === 0) {
            nuevosErrores.var_numeroPersonasConLasQueVive = "Debe seleccionar al menos una persona con la que vive";
        }

        if (formData.boolean_viveConMascotas === "true" && formData.set_tipoMascotas.length === 0) {
            nuevosErrores.set_tipoMascotas = "Debe seleccionar al menos una persona con la que vive";
        }

        setErrors(nuevosErrores);
    }, [formData, touchedFields]);

    // Marcar un campo como "tocado" cuando pierde el enfoque
    const handleBlur = (event) => {
        const { name } = event.target;
        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });
    };

    // Manejar el cambio de los campos
    const manejarCambioInput = (event) => {
        const { name, value } = event.target;

        setFormData((prevData) => {
            // Condición para "¿Vive Solo?"
            if (name === "boolean_viveSolo") {
                localStorage.setItem('boolean_viveSolo', value);
                return {
                    ...prevData,
                    [name]: value,
                    set_personasConLasQueVive: value === "true" ? "N/A" : []
                };
            }
            // Manejo para el campo "set_personasConLasQueVive" (Select múltiple con checkboxes)
            if (name === "set_personasConLasQueVive") {
                // Almacena los valores seleccionados en un array
                const selectedValues = typeof value === 'string' ? value.split(',') : value;
                return {
                    ...prevData,
                    [name]: selectedValues
                };
            }
            if (name === "var_estadoCivil") {
                localStorage.setItem('var_estadoCivil', value);
            }

            // Para el campo "set_personasConLasQueVive"
            if (name === "set_personasConLasQueVive" && prevData.boolean_viveSolo === "false") {
                return {
                    ...prevData,
                    [name]: value
                };
            }

            if (name === "var_personasDependeciaEconimica") {
                localStorage.setItem('var_personasDependeciaEconimica', value);
            } else if (name === "boolean_viveConMascotas") {
                localStorage.setItem('boolean_viveConMascotas', value);
            } else if (name === "var_totalIngresosPropiosYGrupoFamiliar") {
                localStorage.setItem('var_totalIngresosPropiosYGrupoFamiliar', value);
            } else if (name === "var_numeroPersonasConLasQueVive") {
                localStorage.setItem('var_numeroPersonasConLasQueVive', value)
            }

            return { ...prevData, [name]: value };
        });
    };

    const manejarSiguiente = () => {
        const nuevosErrores = {};

        if (!formData.var_estadoCivil.trim()) {
            nuevosErrores.var_estadoCivil = "El nombre completo es obligatorio";
        }

        if (!formData.boolean_viveSolo) {
            nuevosErrores.boolean_viveSolo = "El tipo de documento es obligatorio";
        }

        if (!formData.boolean_viveConMascotas) {
            nuevosErrores.boolean_viveConMascotas = "El tipo de documento es obligatorio";
        }

        if (!formData.var_personasDependeciaEconimica) {
            nuevosErrores.var_personasDependeciaEconimica = "El tipo de documento es obligatorio";
        }

        if (!formData.var_totalIngresosPropiosYGrupoFamiliar) {
            nuevosErrores.var_totalIngresosPropiosYGrupoFamiliar = "El tipo de documento es obligatorio";
        }

        if (formData.boolean_viveSolo === "false" && formData.set_personasConLasQueVive.length === 0) {
            nuevosErrores.set_personasConLasQueVive = "Debe seleccionar al menos una persona con la que vive";
        }

        if (formData.boolean_viveSolo === "false" && formData.var_numeroPersonasConLasQueVive.length === 0) {
            nuevosErrores.var_numeroPersonasConLasQueVive = "Debe seleccionar al menos una persona con la que vive";
        }

        if (formData.boolean_viveConMascotas === "true" && formData.set_tipoMascotas.length === 0) {
            nuevosErrores.set_tipoMascotas = "Debe seleccionar al menos una persona con la que vive";
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }

        localStorage.setItem('formDataProfesional', JSON.stringify(formData));
        navigate('/datosProfesional3');
    };

    return (
        <div style={{ backgroundColor: '#F2F2F2', paddingTop: '3%', paddingBottom: '3%', height: '100vh' }}>
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
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: 'center', color: '#202B52', fontFamily: 'Roboto Condensed' }}>Datos adicionales</Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: '5%', marginRight: '5%', borderColor: '#202B52' }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                    }}>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Estado Civil:</Typography>
                        <TextField select name="var_estadoCivil" variant="outlined" value={formData.var_estadoCivil} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} onBlur={handleBlur}
                            error={!!errors.var_estadoCivil}
                            helperText={errors.var_estadoCivil} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }}  >
                            <MenuItem value="Soltero">Soltero</MenuItem>
                            <MenuItem value="Casado">Casado</MenuItem>
                            <MenuItem value="Divorciado">Divorciado</MenuItem>
                            <MenuItem value="Viudo">Viudo</MenuItem>
                            <MenuItem value="Union libre">Unión libre</MenuItem>
                        </TextField>
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>¿Vive Solo?:</Typography>
                        <TextField select name="boolean_viveSolo" variant="outlined" value={formData.boolean_viveSolo} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} onBlur={handleBlur}
                            error={!!errors.boolean_viveSolo}
                            helperText={errors.boolean_viveSolo} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }}  >
                            <MenuItem value="true">Sí</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </TextField>

                        {formData.boolean_viveSolo === "false" && (
                            <>

                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Con cuantas personas vive:</Typography>
                                <TextField select name="var_numeroPersonasConLasQueVive" variant="outlined" value={formData.var_numeroPersonasConLasQueVive} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} onBlur={handleBlur}
                                    error={!!errors.var_numeroPersonasConLasQueVive}
                                    helperText={errors.var_numeroPersonasConLasQueVive} FormHelperTextProps={{
                                        sx: {
                                            marginLeft: 0,
                                        },
                                    }} InputProps={{
                                        sx: {
                                            height: "40px",
                                            fontFamily: "Poppins",
                                            fontSize: "16px"
                                        },
                                    }}  >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5 o mas">5 o mas</MenuItem>
                                </TextField>

                                <FormControl sx={{ mb: 2 }} fullWidth error={!!errors.set_personasConLasQueVive}>
                                    <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>¿Vive con? (Selecciona todas las personas con las que habita):</Typography>
                                    <Select
                                        name="set_personasConLasQueVive"
                                        multiple
                                        value={formData.set_personasConLasQueVive}
                                        onChange={manejarCambioInput}
                                        renderValue={(selected) => selected.join(' - ')} // Opciones seleccionadas concatenadas
                                        fullWidth
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}
                                        sx={{
                                            height: "40px",
                                            fontFamily: "Poppins",
                                            fontSize: "16px"
                                        }}

                                    >
                                        {["Pareja", "Hijos", "Madre", "Padre", "Hermanos", "Abuelos", "Tios", "Amigos", "Otros"].map((persona) => (
                                            <MenuItem key={persona} value={persona}>
                                                <Checkbox checked={formData.set_personasConLasQueVive.indexOf(persona) > -1} />
                                                <ListItemText primary={persona} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.set_personasConLasQueVive && (
                                        <FormHelperText sx={{ marginLeft: 0, }}
                                        >{errors.set_personasConLasQueVive}</FormHelperText>
                                    )}
                                </FormControl>
                            </>
                        )}
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>¿Tiene mascotas? :</Typography>
                        <TextField select name="boolean_viveConMascotas" variant="outlined" value={formData.boolean_viveConMascotas} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} onBlur={handleBlur}
                            error={!!errors.boolean_viveConMascotas}
                            helperText={errors.boolean_viveConMascotas} FormHelperTextProps={{
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
                            <MenuItem value="true">Sí</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </TextField>

                        {formData.boolean_viveConMascotas === "true" && (
                            <>

                                <FormControl sx={{ mb: 2 }} fullWidth error={!!errors.set_tipoMascotas}>
                                    <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Indica qué tipos de mascotas tienes en casa :</Typography>
                                    <Select
                                        name="set_tipoMascotas"
                                        multiple
                                        value={formData.set_tipoMascotas}
                                        onChange={manejarCambioInput}
                                        renderValue={(selected) => selected.join(' - ')} // Opciones seleccionadas concatenadas
                                        fullWidth
                                        onBlur={handleBlur}
                                        variant="outlined"
                                        MenuProps={{ PaperProps: { style: { maxHeight: 224, width: 250 } } }}
                                        sx={{
                                            height: "40px",
                                            fontFamily: "Poppins",
                                            fontSize: "16px"
                                        }}

                                    >
                                        {["Perro", "Gato", "Conejo", "Hamster", "Tortuga", "Huron", "Cobaya", "Chinchilla", "Pajaros", "Cerdo miniatura", "Peces", "Otro tipo"].map((mascotas) => (
                                            <MenuItem key={mascotas} value={mascotas}>
                                                <Checkbox checked={formData.set_tipoMascotas.indexOf(mascotas) > -1} />
                                                <ListItemText primary={mascotas} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.set_tipoMascotas && (
                                        <FormHelperText sx={{ marginLeft: 0, }}
                                        >{errors.set_tipoMascotas}</FormHelperText>
                                    )}
                                </FormControl>
                            </>
                        )}

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Cantidad de personas con las que NO vive pero dependen económicamente de usted :</Typography>
                        <TextField select name="var_personasDependeciaEconimica" variant="outlined" value={formData.var_personasDependeciaEconimica} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} onBlur={handleBlur}
                            error={!!errors.var_personasDependeciaEconimica}
                            helperText={errors.var_personasDependeciaEconimica} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }}  >
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5 o mas</MenuItem>
                            <MenuItem value="N/A">No aplica</MenuItem>
                        </TextField>

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Total ingresos propios y grupo familiar:</Typography>
                        <TextField select name="var_totalIngresosPropiosYGrupoFamiliar" variant="outlined" value={formData.var_totalIngresosPropiosYGrupoFamiliar} onChange={manejarCambioInput} fullWidth sx={{ mb: 2 }} onBlur={handleBlur}
                            error={!!errors.var_totalIngresosPropiosYGrupoFamiliar}
                            helperText={errors.var_totalIngresosPropiosYGrupoFamiliar} FormHelperTextProps={{
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
                            <MenuItem value="Menos de 1'000.000 de pesos">Menos de 1'000.000 de pesos</MenuItem>
                            <MenuItem value="Entre 1'000.000 de pesos y 2'000.000 de pesos">Entre 1'000.000 de pesos y 2'000.000 de pesos</MenuItem>
                            <MenuItem value="Entre 2'000.000 de pesos y 4'000.000 de pesos">Entre 2'000.000 de pesos y 4'000.000 de pesos</MenuItem>
                            <MenuItem value="Entre 4'000.000 de pesos y 8'000.000 de pesos">Entre 4'000.000 de pesos y 8'000.000 de pesos</MenuItem>
                            <MenuItem value="Mas de 8'000.000 de pesos">Mas de 8'000.000 de pesos</MenuItem>
                        </TextField>

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
                            <Button sx={{ backgroundColor: '#202B52' }} onClick={manejarSiguiente} variant="contained" type="submit"> Siguiente </Button>
                        </div>


                    </form>
                </CardContent>
            </Card>
        </div >
    );
};

export default VistaDatosProfesional2;
