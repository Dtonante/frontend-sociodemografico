import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, ListItemText, Checkbox, FormControl, Select, MenuItem, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const editarDatosProfesional8 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [set_mediosTransportePublico, setSet_mediosTransportePublico] = useState()
    const [transportes, setTransportes] = useState([])
    const [selectedTransporte, setSelectedTransporte] = useState([]);
    const [prevSelectedTransporte, setPrevSelectedTransporte] = useState([]);

    //convertir medios de transporte de string a array
    const [medioTransporteArray, setMedioTransporteArray] = useState();

    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    const valorInicial = set_mediosTransportePublico;












    // `valorInicial` es la cadena con los valores seleccionados, por ejemplo: "metro,bus,taxi,mototaxi"
    const [mediosTransportePublico, setMediosTransportePublico] = useState([]);

    // Convertir la cadena inicial en un array al montar el componente
    useEffect(() => {
        if (valorInicial) {
            setMediosTransportePublico(valorInicial.split(',')); // Divide la cadena por comas
        }
    }, [valorInicial]);

    // Manejar el cambio de selección
    const manejarCambio = (event) => {
        const { target: { value }, } = event;
        setMediosTransportePublico(typeof value === 'string' ? value.split(',') : value);
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

    useEffect(() => {
        const fetchTransportePropio = async () => {
            if (id_profesionalPK) {
                console.log("id_profesionalPK:", id_profesionalPK);
                try {
                    const response = await axios.get(`https://evaluacion.esumer.edu.co/api/profesionalTransportePropio/${id_profesionalPK}`);

                    //Extraer los ids de los tiempos libres
                    const TransporteIds = response.data.map(
                        (transporte) => transporte.id_transportePropioFK
                    );

                    console.log("transportes ids", TransporteIds)

                    //sincronizar el estado de los tiempos seleccionados

                    setSelectedTransporte(TransporteIds)
                    setPrevSelectedTransporte(TransporteIds)

                    console.log("Datos obtenidos:", response.data);
                } catch (error) {
                    console.error('Error al obtener los transportes del profesional:', error);
                }
            } else {
                console.log("No hay id_profesionalPK");
            }
        };

        fetchTransportePropio();
    }, [id_profesionalPK]);

    // Guardar cambios en el servidor
    const guardarCambios = async () => {
        const transporteParaEliminar = prevSelectedTransporte.filter(
            (transporte) => !selectedTransporte.includes(transporte)
        );
        const transporteParaAgregar = selectedTransporte.filter(
            (transporte) => !prevSelectedTransporte.includes(transporte)
        );

        try {
            // Eliminar servicios deseleccionados
            for (let id_transportePropio of transporteParaEliminar) {
                await axios.delete(
                    `https://evaluacion.esumer.edu.co/api/profesionalTransportePropio/${id_profesionalPK}/${id_transportePropio}`
                );
                console.log(`transporte eliminado: ${id_transportePropio}`);
            }

            // Agregar nuevos servicios seleccionados
            for (let id_transportePropio of transporteParaAgregar) {
                await axios.post("http://localhost:3001/profesionalTransportePropio/", {
                    id_profesionalFK: id_profesionalPK,
                    id_transportePropioFK: id_transportePropio,
                });
                console.log(`transporte agregado: ${id_transportePropio}`);
            }

            // Actualizar el estado previo
            setPrevSelectedTransporte(selectedTransporte);
            console.log("Cambios guardados con éxito de tiempo");

            const valoresComoString = mediosTransportePublico.join(','); // Convierte 
            setSet_mediosTransportePublico(valoresComoString)

        } catch (error) {
            console.error("Error al guardar cambios de tiempo:", error);
        }
    };


    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            set_mediosTransportePublico: set_mediosTransportePublico,


        });
        navigate('/app/editarDatosProfesional8');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setSet_mediosTransportePublico(res.data.set_mediosTransportePublico);

        console.log("vamos a ver que es esto", res.data)

    };

    // Manejar cambio de selección
    const manejarCambioTransporte = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedTransporte(
            typeof value === 'string' ? value.split(',') : value
        );
    };

    // // Función para guardar los cambios
    // const guardarCambiosTransporte = () => {
    //     const valoresComoString = mediosTransportePublico.join(','); // Convierte el array en una cadena separada por comas
    //     if (onGuardar) {
    //         onGuardar(valoresComoString); // Llama a la función de guardado pasada como prop
    //     }
    // };

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


                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>
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
                                    fontFamily: "Roboto Condensed",
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
                        </FormControl>

                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>¿Ha cambiado de EPS o AFP?:</Typography>
                        <TextField
                            value={set_mediosTransportePublico}
                            onChange={(e) => setSet_mediosTransportePublico(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />











                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontFamily: 'Roboto Condensed',
                                    color: '#202B52',
                                    fontSize: '16px',
                                }}
                            >
                                ¿En cuál medio de transporte te desplazas a la universidad? (se
                                pueden seleccionar varias opciones):
                            </Typography>
                            <Select
                                multiple
                                value={mediosTransportePublico}
                                onChange={manejarCambio}
                                name="set_mediosTransportePublico"
                                fullWidth
                                variant="outlined"
                                renderValue={(selected) => selected.join(' - ')} // Mostrar valores seleccionados unidos por guiones
                                MenuProps={{
                                    PaperProps: { style: { maxHeight: 224, width: 250 } },
                                }}
                                sx={{
                                    height: '40px',
                                    fontFamily: 'Roboto Condensed',
                                    fontSize: '16px',
                                }}
                            >
                                <MenuItem value="transporte propio">
                                    <Checkbox
                                        checked={mediosTransportePublico.includes(
                                            'transporte propio'
                                        )}
                                    />
                                    <ListItemText primary="Transporte propio" />
                                </MenuItem>
                                <MenuItem value="bus">
                                    <Checkbox
                                        checked={mediosTransportePublico.includes('bus')}
                                    />
                                    <ListItemText primary="Bus" />
                                </MenuItem>
                                <MenuItem value="metro">
                                    <Checkbox
                                        checked={mediosTransportePublico.includes('metro')}
                                    />
                                    <ListItemText primary="Metro" />
                                </MenuItem>
                                <MenuItem value="bici">
                                    <Checkbox
                                        checked={mediosTransportePublico.includes('bici')}
                                    />
                                    <ListItemText primary="Bicicleta" />
                                </MenuItem>
                                <MenuItem value="caminando">
                                    <Checkbox
                                        checked={mediosTransportePublico.includes('caminando')}
                                    />
                                    <ListItemText primary="Caminando" />
                                </MenuItem>
                                <MenuItem value="taxi">
                                    <Checkbox
                                        checked={mediosTransportePublico.includes('taxi')}
                                    />
                                    <ListItemText primary="Taxi" />
                                </MenuItem>
                                <MenuItem value="mototaxi">
                                    <Checkbox
                                        checked={mediosTransportePublico.includes('mototaxi')}
                                    />
                                    <ListItemText primary="Plataformas" />
                                </MenuItem>
                            </Select>
                        </FormControl>






























                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit" onClick={guardarCambios}>
                                Guardar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );


}

export default editarDatosProfesional8