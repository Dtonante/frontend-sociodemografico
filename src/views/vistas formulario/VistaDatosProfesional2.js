
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, FormHelperText, FormControl, TextField, Button, ListItemText, Checkbox, Select, MenuItem } from "@mui/material";
import { set } from "lodash";

const VistaDatosProfesional2 = () => {
    const navigate = useNavigate();

    const [var_estadoCivil, setVar_estadoCivil] = useState('')
    const [boolean_viveSolo, setBoolean_viveSolo] = useState(null)
    const [var_personasDependeciaEconimica, setVar_personasDependeciaEconimica] = useState('')
    const [var_totalIngresosPropiosYGrupoFamiliar, setVar_totalIngresosPropiosYGrupoFamiliar] = useState('')
    const [var_numeroPersonasConLasQueVive, setVar_numeroPersonasConLasQueVive] = useState('')
    const [set_tipoMascotas, setSet_tipoMascotas] = useState([])
    const [boolean_viveConMascotas, setBoolean_viveConMascotas] = useState(null)
    const [set_personasConLasQueVive, setSet_personasConLasQueVive] = useState(["N/A"])
    const [errors, setErrors] = useState({});
    const [touchedFields, setTouchedFields] = useState({});
    const porcentajeProgreso = 30;

    // Validaciones basadas en los campos tocados
    useEffect(() => {
        const nuevosErrores = {};

        if (touchedFields.var_estadoCivil && !var_estadoCivil) {
            nuevosErrores.var_estadoCivil = "El nombre completo es";
        }

        if (touchedFields.boolean_viveSolo && boolean_viveSolo == null) {
            nuevosErrores.boolean_viveSolo = "El nombre completo es";
        }
        if (boolean_viveSolo == true && var_numeroPersonasConLasQueVive == null) {
            nuevosErrores.var_numeroPersonasConLasQueVive = "El nombre completo es";
        }

        if (touchedFields.var_personasDependeciaEconimica && !var_personasDependeciaEconimica) {
            nuevosErrores.var_personasDependeciaEconimica = "El nombre completo es";
        }

        if (touchedFields.var_totalIngresosPropiosYGrupoFamiliar && !var_totalIngresosPropiosYGrupoFamiliar) {
            nuevosErrores.var_totalIngresosPropiosYGrupoFamiliar = "El nombre completo es";
        }

        if (touchedFields.boolean_viveConMascotas && boolean_viveConMascotas == null) {
            nuevosErrores.boolean_viveConMascotas = "El nombre completo es";
        }

        if (touchedFields.set_tipoMascotas && (!set_tipoMascotas || set_tipoMascotas.length === 0)) {
            nuevosErrores.set_tipoMascotas = "El nombre completo es obligatorio";
        }
        if (touchedFields.set_personasConLasQueVive && (!set_personasConLasQueVive || set_personasConLasQueVive.length === 0)) {
            nuevosErrores.set_personasConLasQueVive = "El nombre completo es obligatorio";
        }



        setErrors(nuevosErrores);
    }, [var_estadoCivil, boolean_viveConMascotas, set_tipoMascotas, var_totalIngresosPropiosYGrupoFamiliar, var_personasDependeciaEconimica, boolean_viveSolo, touchedFields]);

    // Marcar un campo como "tocado" cuando pierde el enfoque
    const handleBlur = (event) => {
        const { name } = event.target;
        setTouchedFields({
            ...touchedFields,
            [name]: true,
        });
    };

    const manejoCambiosInputs = (event) => {
        const { name, value } = event.target;



        if (name === "boolean_viveSolo") {
            const newValue = value === "true";
            setBoolean_viveSolo(newValue);
            localStorage.setItem(name, newValue);

            if (newValue) {
                // Vive solo
                setVar_numeroPersonasConLasQueVive("N/A");
                setSet_personasConLasQueVive(["N/A"]);
                localStorage.setItem("var_numeroPersonasConLasQueVive", "N/A");
                localStorage.setItem(
                    "set_personasConLasQueVive",
                    JSON.stringify(["N/A"])
                );
            } else {
                // Deja los campos en blanco o valores predeterminados
                setVar_numeroPersonasConLasQueVive("");
                setSet_personasConLasQueVive([]);
                localStorage.removeItem("var_numeroPersonasConLasQueVive");
                localStorage.removeItem("set_personasConLasQueVive");
            }
        } else if (name === "boolean_viveConMascotas") {
            const newValue = value === "true";
            setBoolean_viveConMascotas(newValue);
            // Guardar en localStorage
            localStorage.setItem(name, newValue);
            // Si vive con mascotas, establecer un array vacío o "N/A" en el estado de tipoMascotas
            if (newValue) {
                setSet_tipoMascotas([]);
                localStorage.setItem("set_tipoMascotas", JSON.stringify([]));
            } else {
                setSet_tipoMascotas("N/A");
                localStorage.setItem("set_tipoMascotas", "N/A");
            }
        } else if (name === "set_tipoMascotas") {
            const selected = typeof value === "string" ? value.split(",") : value;
            setSet_tipoMascotas(selected);
            // Guardar en localStorage
            localStorage.setItem(name, JSON.stringify(selected));
        } else {
            // Para el resto de los campos, actualiza el valor normalmente
            switch (name) {
                case "var_estadoCivil":
                    setVar_estadoCivil(value);
                    localStorage.setItem(name, value);
                    break;
                case "var_personasDependeciaEconimica":
                    setVar_personasDependeciaEconimica(value);
                    localStorage.setItem(name, value);
                    break;
                case "var_totalIngresosPropiosYGrupoFamiliar":
                    setVar_totalIngresosPropiosYGrupoFamiliar(value);
                    localStorage.setItem(name, value);
                    break;
                case "var_numeroPersonasConLasQueVive":
                    setVar_numeroPersonasConLasQueVive(value);
                    localStorage.setItem(name, value);
                    break;
                case "set_personasConLasQueVive":
                    setSet_personasConLasQueVive(value);
                    localStorage.setItem(name, value);
                    break;
                case "set_tipoMascotas":
                    setSet_tipoMascotas(value);
                    localStorage.setItem(name, value);
                    break;
                default:
                    break;
            }
        }
    };





    const manejarSiguiente = () => {

        const nuevosErrores = {};

        if (!var_estadoCivil) {
            nuevosErrores.var_estadoCivil = "Selecionar una eps es obligatorio.";
        }

        if (boolean_viveSolo == null) {
            nuevosErrores.boolean_viveSolo = "Selecionar una eps es obligatorio.";
        }

        if (!var_personasDependeciaEconimica) {
            nuevosErrores.var_personasDependeciaEconimica = "Selecionar una eps es obligatorio.";
        }

        if (!var_totalIngresosPropiosYGrupoFamiliar) {
            nuevosErrores.var_totalIngresosPropiosYGrupoFamiliar = "Selecionar una eps es obligatorio.";
        }

        if (boolean_viveConMascotas == null) {
            nuevosErrores.boolean_viveConMascotas = "Selecionar una eps es obligatorio.";
        }

        if (boolean_viveSolo === false && !var_numeroPersonasConLasQueVive) {
            nuevosErrores.var_numeroPersonasConLasQueVive = "Selecionar una eps es obligatorio.";
        }

        if (!set_tipoMascotas || set_tipoMascotas.length === 0) {
            nuevosErrores.set_tipoMascotas = "Seleccionar los antecedentes médicos es obligatorio.";
        } set_personasConLasQueVive

        if (!set_personasConLasQueVive || set_personasConLasQueVive.length === 0) {
            nuevosErrores.set_personasConLasQueVive = "Seleccionar los antecedentes médicos es obligatorio.";
        }





        if (Object.keys(nuevosErrores).length > 0) {
            setErrors(nuevosErrores);
            return;
        }



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
            <Card variant="outlined" className="contenedor-borde" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: '#F2F2F2', borderColor: '#202B52' }}>
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
                        <TextField select name="var_estadoCivil" variant="outlined" value={var_estadoCivil} onChange={manejoCambiosInputs} fullWidth sx={{ mb: 2 }} onBlur={handleBlur}
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
                        <TextField select name="boolean_viveSolo" variant="outlined" value={boolean_viveSolo} onChange={manejoCambiosInputs} fullWidth sx={{ mb: 2 }} onBlur={handleBlur}
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

                        {boolean_viveSolo === false && (
                            <>

                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Con cuantas personas vive:</Typography>
                                <TextField select name="var_numeroPersonasConLasQueVive" variant="outlined" value={var_numeroPersonasConLasQueVive} onChange={manejoCambiosInputs} fullWidth sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.var_numeroPersonasConLasQueVive}
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
                                    }}

                                >
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
                                        value={set_personasConLasQueVive}
                                        onChange={manejoCambiosInputs}
                                        onBlur={handleBlur}
                                        renderValue={(selected) => Array.isArray(selected) ? selected.join(' - ') : ''}
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            height: "40px",
                                            fontFamily: "Poppins",
                                            fontSize: "16px"
                                        }}


                                    >
                                        {["Pareja", "Hijos", "Madre", "Padre", "Hermanos", "Abuelos", "Tios", "Amigos", "Otros"].map((persona) => (
                                            <MenuItem key={persona} value={persona}>
                                                <Checkbox checked={set_personasConLasQueVive.indexOf(persona) > -1} />
                                                <ListItemText primary={persona} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.set_personasConLasQueVive && (
                                        <FormHelperText
                                            sx={{
                                                marginLeft: 0,
                                            }}
                                        >
                                            {errors.set_personasConLasQueVive}
                                        </FormHelperText>
                                    )}

                                </FormControl>
                            </>
                        )}
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>¿Tiene mascotas? :</Typography>
                        <TextField select name="boolean_viveConMascotas" variant="outlined" value={boolean_viveConMascotas} onChange={manejoCambiosInputs} fullWidth sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.boolean_viveConMascotas}
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
                            }}
                        >
                            <MenuItem value="true">Sí</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </TextField>

                        {boolean_viveConMascotas === true && (
                            <>

                                <FormControl sx={{ mb: 2 }} fullWidth error={!!errors.set_tipoMascotas} >
                                    <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Indica qué tipos de mascotas tienes en casa :</Typography>
                                    <Select
                                        name="set_tipoMascotas"
                                        multiple
                                        onBlur={handleBlur}
                                        value={set_tipoMascotas}
                                        onChange={manejoCambiosInputs}
                                        renderValue={(selected) => Array.isArray(selected) ? selected.join(' - ') : ''}
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            height: "40px",
                                            fontFamily: "Poppins",
                                            fontSize: "16px"
                                        }}


                                    >
                                        {["Perro", "Gato", "Conejo", "Hamster", "Tortuga", "Huron", "Cobaya", "Chinchilla", "Pajaros", "Cerdo miniatura", "Peces", "Otro tipo"].map((mascotas) => (
                                            <MenuItem key={mascotas} value={mascotas}>
                                                <Checkbox checked={set_tipoMascotas.indexOf(mascotas) > -1} />
                                                <ListItemText primary={mascotas} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.set_tipoMascotas && (
                                        <FormHelperText
                                            sx={{
                                                marginLeft: 0,
                                            }}
                                        >
                                            {errors.set_tipoMascotas}
                                        </FormHelperText>
                                    )}

                                </FormControl>
                            </>
                        )}

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Cantidad de personas con las que NO vive pero dependen económicamente de usted :</Typography>
                        <TextField select name="var_personasDependeciaEconimica" variant="outlined" value={var_personasDependeciaEconimica} onChange={manejoCambiosInputs} onBlur={handleBlur} error={!!errors.var_personasDependeciaEconimica}
                            helperText={errors.var_personasDependeciaEconimica} fullWidth sx={{ mb: 2 }} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Poppins",
                                    fontSize: "16px"
                                },
                            }}
                        >
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5 o mas</MenuItem>
                            <MenuItem value="N/A">No aplica</MenuItem>
                        </TextField>

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52' }}>Total ingresos propios y grupo familiar:</Typography>
                        <TextField select name="var_totalIngresosPropiosYGrupoFamiliar" variant="outlined" value={var_totalIngresosPropiosYGrupoFamiliar} onChange={manejoCambiosInputs} fullWidth sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.var_totalIngresosPropiosYGrupoFamiliar}
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
                            }}
                        >
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







