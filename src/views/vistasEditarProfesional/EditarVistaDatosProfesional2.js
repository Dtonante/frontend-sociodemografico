import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Checkbox, ListItemText, Select, MenuItem, Typography, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const EditarDatosProfesional2 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState('')
    const [var_estadoCivil, setVar_estadoCivil] = useState('')
    const [boolean_viveSolo, setBoolean_viveSolo] = useState('')
    const [var_personasDependeciaEconimica, setVar_personasDependeciaEconimica] = useState('')
    const [var_totalIngresosPropiosYGrupoFamiliar, setVar_totalIngresosPropiosYGrupoFamiliar] = useState('')
    const [var_numeroPersonasConLasQueVive, setVar_numeroPersonasConLasQueVive] = useState('')
    const [set_tipoMascotas, setSet_tipoMascotas] = useState('')
    const [boolean_viveConMascotas, setBoolean_viveConMascotas] = useState('')
    const [set_personasConLasQueVive, setSet_personasConLasQueVive] = useState('')
    const navigate = useNavigate();

    // Convertir string a array al cargar el componente
    const [mascotasArray, setMascotasArray] = useState([]);
    // Convertir persolanas con las que vive de string a array
    const [personasArray, setPersonasArray] = useState([]);

    useEffect(() => {
        if (set_tipoMascotas) {
            //limpiar los ( [" "] ) de los animales
            // const cleanedMascotas = set_tipoMascotas.replace(/[\[\]"]/g, '');
            const cleanedMascotas = set_tipoMascotas.replace(/[\[\]"]/g, '') // Elimina corchetes y comillas


            // Convertimos el string en array, manejando valores vacíos
            setMascotasArray(cleanedMascotas.split(',').filter((item) => item.trim() !== '').filter(item => item !== 'N/A' && item !== ''));
            //convertimos el string que entra a array
            setPersonasArray(set_personasConLasQueVive.split(',').filter((item) => item.trim() !== '').filter(item => item !== 'N/A' && item !== ''));


        } else {
            setMascotasArray([]);
            setPersonasArray([]);
        }

        
    }, [set_tipoMascotas]);

    useEffect(() => {
        if (boolean_viveSolo == "true") {
            setVar_numeroPersonasConLasQueVive();
            setSet_personasConLasQueVive("N/A");
        }
    }, [boolean_viveSolo]);

    useEffect(() => {
        if (boolean_viveConMascotas == "false") {
            setSet_tipoMascotas("N/A");
        }
    }, [boolean_viveConMascotas]);

    const handleChange = (event) => {
        const { value } = event.target;
        // Actualizar tanto el array como el string original
        setMascotasArray(typeof value === 'string' ? value.split(',') : value);
        setSet_tipoMascotas(Array.isArray(value) ? value.join(',') : value);


    };

    const handleChangePersons = (event) => {
        const { value } = event.target;

        // Actualizar tanto el array como el string original
        setPersonasArray(typeof value === 'string' ? value.split(',') : value);
        setSet_personasConLasQueVive(Array.isArray(value) ? value.join(',') : value);
    }

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            var_estadoCivil: var_estadoCivil,
            boolean_viveSolo: boolean_viveSolo,
            var_numeroPersonasConLasQueVive: var_numeroPersonasConLasQueVive,
            set_personasConLasQueVive: set_personasConLasQueVive,
            boolean_viveConMascotas: boolean_viveConMascotas,
            set_tipoMascotas: set_tipoMascotas,
            var_personasDependeciaEconimica: var_personasDependeciaEconimica,
            var_totalIngresosPropiosYGrupoFamiliar: var_totalIngresosPropiosYGrupoFamiliar,
        });
        navigate('/app/editarDatosProfesional2');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setVar_estadoCivil(res.data.var_estadoCivil);
        setBoolean_viveSolo(res.data.boolean_viveSolo ? "true" : "false");
        setVar_personasDependeciaEconimica(res.data.var_personasDependeciaEconimica);
        setVar_totalIngresosPropiosYGrupoFamiliar(res.data.var_totalIngresosPropiosYGrupoFamiliar);
        setVar_numeroPersonasConLasQueVive(res.data.var_numeroPersonasConLasQueVive);
        setSet_tipoMascotas(res.data.set_tipoMascotas);
        setBoolean_viveConMascotas(res.data.boolean_viveConMascotas ? "true" : "false");
        setSet_personasConLasQueVive(res.data.set_personasConLasQueVive);

    };

    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}>
                <img src="public/fondo_form.png" alt="Descripción de la imagen" style={{ width: "20%", height: "auto" }} />
            </div>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center", color: "#202B52", fontFamily: "Roboto Condensed" }}>
                            <strong>Datos personales</strong>
                        </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: "5%", marginRight: "5%", borderColor: "#202B52" }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={actualizar}>

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Estado Civil:</Typography>
                        <TextField select name="var_estadoCivil" variant="outlined" value={var_estadoCivil} onChange={(e) => setVar_estadoCivil(e.target.value)} fullWidth sx={{ mb: 2 }} FormHelperTextProps={{
                            sx: {
                                marginLeft: 0,
                            },
                        }} InputProps={{
                            sx: {
                                height: "40px",
                                fontFamily: "Roboto Condensed",
                                fontSize: "16px"
                            },
                        }}  >
                            <MenuItem value="Soltero">Soltero</MenuItem>
                            <MenuItem value="Casado">Casado</MenuItem>
                            <MenuItem value="Divorciado">Divorciado</MenuItem>
                            <MenuItem value="Viudo">Viudo</MenuItem>
                            <MenuItem value="Union libre">Unión libre</MenuItem>
                        </TextField>

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>¿Vive Solo?:</Typography>
                        <TextField select name="boolean_viveSolo" variant="outlined" value={boolean_viveSolo} onChange={(e) => setBoolean_viveSolo(e.target.value)}
                            fullWidth sx={{ mb: 2 }} FormHelperTextProps={{
                                sx: {
                                    marginLeft: 0,
                                },
                            }} InputProps={{
                                sx: {
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px"
                                },
                            }}  >
                            <MenuItem value="true">Sí</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </TextField>

                        {boolean_viveSolo == "false" && (
                            <>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Con cuantas personas vive:</Typography>
                                <TextField select name="var_numeroPersonasConLasQueVive" variant="outlined" value={var_numeroPersonasConLasQueVive} onChange={(e) => setVar_numeroPersonasConLasQueVive(e.target.value)}
                                    fullWidth sx={{ mb: 2 }} FormHelperTextProps={{
                                        sx: {
                                            marginLeft: 0,
                                        },
                                    }} InputProps={{
                                        sx: {
                                            height: "40px",
                                            fontFamily: "Roboto Condensed",
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

                                
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>¿Vive con? (Selecciona todas las personas con las que habita):</Typography>
                                <Select
                                    name="set_personasConLasQueVive"
                                    multiple
                                    value={personasArray}
                                    onChange={handleChangePersons}
                                    renderValue={(selected) => Array.isArray(selected) ? selected.join(' - ') : ''}
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
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


                            </>
                        )}

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>¿Tiene mascotas?:</Typography>
                        <TextField
                            select
                            value={boolean_viveConMascotas}
                            onChange={(e) => setBoolean_viveConMascotas(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}>
                            <MenuItem value="true">Sí</MenuItem>
                            <MenuItem value="false">No</MenuItem>
                        </TextField>

                        {boolean_viveConMascotas == "true" && (
                            <>

                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Indica qué tipos de mascotas tienes en casa (se pueden seleccionar varias opciones):</Typography>
                                <Select
                                    name="set_tipoMascotas"
                                    multiple
                                    value={mascotasArray} // Usamos el array convertido
                                    onChange={handleChange}
                                    renderValue={(selected) => Array.isArray(selected) ? selected.join(' - ') : ''}
                                    fullWidth
                                    variant="outlined"
                                    sx={{
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
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



                            </>
                        )}


                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Cantidad de personas con las que NO vive pero dependen económicamente de usted:</Typography>
                        <TextField
                            select
                            value={var_personasDependeciaEconimica}
                            onChange={(e) => setVar_personasDependeciaEconimica(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}>
                            <MenuItem value="0">0</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5 o mas</MenuItem>
                            <MenuItem value="N/A">No aplica</MenuItem>
                        </TextField>




                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Total ingresos propios y grupo familiar:</Typography>
                        <TextField
                            select
                            value={var_totalIngresosPropiosYGrupoFamiliar}
                            onChange={(e) => setVar_totalIngresosPropiosYGrupoFamiliar(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}>
                            <MenuItem value="Menos de 1'000.000 de pesos">Menos de 1'000.000 de pesos</MenuItem>
                            <MenuItem value="Entre 1'000.000 de pesos y 2'000.000 de pesos">Entre 1'000.000 de pesos y 2'000.000 de pesos</MenuItem>
                            <MenuItem value="Entre 2'000.000 de pesos y 4'000.000 de pesos">Entre 2'000.000 de pesos y 4'000.000 de pesos</MenuItem>
                            <MenuItem value="Entre 4'000.000 de pesos y 8'000.000 de pesos">Entre 4'000.000 de pesos y 8'000.000 de pesos</MenuItem>
                            <MenuItem value="Mas de 8'000.000 de pesos">Mas de 8'000.000 de pesos</MenuItem>
                        </TextField>


                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );


}

export default EditarDatosProfesional2