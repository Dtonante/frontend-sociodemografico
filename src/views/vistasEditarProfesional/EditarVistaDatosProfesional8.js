

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, ListItemText, Checkbox, FormControl, Select, MenuItem, Button } from "@mui/material";

const URI_PROFESIONAL = 'https://evaluacion.esumer.edu.co/api/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'https://evaluacion.esumer.edu.co/api/profesional/porUsuario/';

const editarDatosProfesional8 = () => {
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [set_mediosTransportePublico, setSet_mediosTransportePublico] = useState()
    const [transportes, setTransportes] = useState([])
    const [selectedTransporte, setSelectedTransporte] = useState([]);
    const [prevSelectedTransporte, setPrevSelectedTransporte] = useState([]);
    const [habilitarPlaca, setHabilitarPlaca] = useState();
    const [habilitarPlacaExtra, setHabilitarPlacaExtra] = useState();
    const [placas, setPlacas] = useState();
    const [placaExtra, setPlacaExtra] = useState("");


    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    const valorInicial = set_mediosTransportePublico;

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

                    //Extraer los ids de los transportes propios
                    const TransporteIds = response.data.map(
                        (transporte) => transporte.id_transportePropioFK
                    );


                    // Obtener el dato completo de las placas
                    const placasCompletas = response.data[0]?.var_numeroPlaca || null;

                    if (placasCompletas) {
                        // Dividir las placas usando el separador "--"
                        const [placa1, placa2] = placasCompletas.split("--");

                        // Asignar cada placa a las variables correspondientes
                        setPlacas(placa1 || null);
                        const segundaPlaca = placa2 || null;
                        setPlacaExtra(segundaPlaca)

                        console.log("Número de Placa 1:", placa1);
                        console.log("Número de Placa 2:", segundaPlaca);
                    } else {
                        // Manejar el caso en el que no haya dato de placas
                        setPlacas(null);
                        console.log("No se encontraron placas.");
                    }






                    // // Obtener solo la primera placa
                    // const primeraPlaca = response.data[0]?.var_numeroPlaca || null;

                    // // Asignar la placa obtenida al estado
                    // setPlacas(primeraPlaca);

                    // console.log("Número de Placa 1:", primeraPlaca);

                    // const placas = response.data.map((transporte) => transporte.var_numeroPlaca);
                    // setPlacas(placas)
                    // console.log("Números de Placa:", placas);

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
                await axios.post("https://evaluacion.esumer.edu.co/api/profesionalTransportePropio/", {
                    id_profesionalFK: id_profesionalPK,
                    id_transportePropioFK: id_transportePropio,
                });
                console.log(`transporte agregado: ${id_transportePropio}`);
            }

            // Actualizar las placas
            const nuevasPlacas =  `${placas}--${placaExtra}`; 
            await axios.put(
                `https://evaluacion.esumer.edu.co/api/profesionalTransportePropio/editarprofesionalTransportePropio/${id_profesionalPK}`,
                {
                    var_numeroPlaca: nuevasPlacas,
                }
            );

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
                setPlacas(nuevaPlaca); // Actualiza el estado
            }
        } else if (!/^([A-Z]{0,3}-?\d{0,2}[A-Z]?)?$/.test(nuevaPlaca)) {
            // Bloquea cualquier formato que no sea progresivamente válido
            return;
        } else {
            setPlacas(nuevaPlaca); // Permite la entrada progresiva
        }
    };

    // Manejar el cambio de la placa extra
    const manejarCambioPlacaExtra = (event) => {
        let nuevaPlacaExtra = event.target.value;

        // Usar la función de validación común
        nuevaPlacaExtra = validarPlaca(nuevaPlacaExtra);

        // Actualizar el estado con la nueva placa extra
        setPlacaExtra(nuevaPlacaExtra);

    };

    useEffect(() => {
        const idsQueHabilitanPlaca = [1, 2, 3, 4]; // IDs que habilitan la placa
        const transportesSeleccionados = selectedTransporte.filter(id =>
            idsQueHabilitanPlaca.includes(id)
        );

        // Si hay al menos un transporte que habilite la placa
        setHabilitarPlaca(transportesSeleccionados.length > 0);

        // Si hay más de un transporte que habilite la placa
        setHabilitarPlacaExtra(transportesSeleccionados.length > 1);
    }, [selectedTransporte]);


    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-3%" }}>
            <p> Edita la información necesaria y al final del formulario pulsa el botón GUARDAR para conservar los cambios.</p>
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
                                    <Checkbox checked={mediosTransportePublico.includes('transporte propio')} />  <ListItemText primary="Transporte propio" />
                                </MenuItem>
                                <MenuItem value="bus">
                                    <Checkbox checked={mediosTransportePublico.includes('bus')} /> <ListItemText primary="Bus" />
                                </MenuItem>
                                <MenuItem value="metro">
                                    <Checkbox checked={mediosTransportePublico.includes('metro')} /> <ListItemText primary="Metro" />
                                </MenuItem>
                                <MenuItem value="bici">
                                    <Checkbox checked={mediosTransportePublico.includes('bici')} /> <ListItemText primary="Bicicleta" />
                                </MenuItem>
                                <MenuItem value="caminando">
                                    <Checkbox checked={mediosTransportePublico.includes('caminando')} /><ListItemText primary="Caminando" />
                                </MenuItem>
                                <MenuItem value="taxi">
                                    <Checkbox checked={mediosTransportePublico.includes('taxi')} /><ListItemText primary="Taxi" />
                                </MenuItem>
                                <MenuItem value="mototaxi">
                                    <Checkbox checked={mediosTransportePublico.includes('mototaxi')} /><ListItemText primary="Plataformas" />
                                </MenuItem>
                            </Select>
                        </FormControl>

                        {(habilitarPlaca) && (
                            <>
                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Número de placa:</Typography>
                                <TextField value={placas} onChange={manejarCambioPlaca} fullWidth variant="outlined" sx={{
                                    mb: 2, input: {
                                        textTransform: "uppercase", // Fuerza las letras a mostrarse en mayúsculas
                                    },
                                }} InputProps={{
                                    sx: {
                                        height: "40px",
                                        fontFamily: "Roboto Condensed",
                                        fontSize: "16px",
                                    }, inputProps: { maxLength: 7 }
                                }} />


                                {/* Mostrar el segundo campo de placa si se seleccionaron más de uno de los IDs válidos */}
                                {habilitarPlacaExtra && (
                                    <>
                                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Número de placa extra:</Typography>

                                        <TextField
                                            sx={{ input: { textTransform: "uppercase" } }}
                                            value={placaExtra}
                                            onChange={manejarCambioPlacaExtra}
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                                sx: {
                                                    height: "40px",
                                                    fontFamily: "Roboto Condensed",
                                                    fontSize: "16px",
                                                }, inputProps: { maxLength: 7 }
                                            }}
                                        />
                                    </>
                                )}

                            </>
                        )}

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

