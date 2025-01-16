import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, MenuItem, FormControl, Select, Typography, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const EditarDatosProfesional5 = () => {
    const [afiliado, setAfiliado] = useState("si");
    const [id_profesionalPK, setId_profesionalPK] = useState()
    const [var_correoElectronicoInstitucional, setVar_correoElectronicoInstitucional] = useState()
    const [var_tipoContrato, setVar_tipoContrato] = useState()
    const [var_salario, setVar_salario] = useState('');
    const [date_fechaIngresoInstitucion, setDate_fechaIngresoInstitucion] = useState('');
    const [var_antiguedadInstitucion, setVar_antiguedadInstitucion] = useState('');
    const [id_areaFK, setId_areaFK] = useState('');
    const [var_cargo, setVar_cargo] = useState('');
    const [var_jefeInmediato, setVar_jefeInmediato] = useState('');
    const [var_sede, setVar_sede] = useState('');
    const [estructuraOrganizacional, setEstructuraOrganizacional] = useState([]);
    // Calcular la fecha máxima (5 días después de hoy)
    const fechaHoy = new Date();
    const fechaMaxima = new Date();
    fechaMaxima.setDate(fechaHoy.getDate() + 5); // 5 días después de hoy
    const fechaMaximaISO = fechaMaxima.toISOString().split("T")[0];



    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    //trae el objeto json con todas las posibles elecciones para estructura organizacional
    useEffect(() => {
        const fetchEstructuraOrganizacional = async () => {
            try {
                const response = await axios.get('https://evaluacion.esumer.edu.co/api/estructuraOrganizacional');
                setEstructuraOrganizacional(response.data);
                console.log("respuesta estructura", response)


            } catch (error) {
                console.error('Error al obtener las áreas:', error);
            }
        };

        if (afiliado === "si") {
            fetchEstructuraOrganizacional();
        }
    }, []);

    //funcion para calcular los dias de ingreso a la fecha actual
    const calcularDias = (fechaIngreso) => {
        if (!fechaIngreso) return ""; // Retorna vacío si no hay fecha seleccionada
        const fechaInicio = new Date(fechaIngreso);
        const fechaActual = new Date();
        const diferencia = fechaActual - fechaInicio; // Diferencia en milisegundos
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24)); // Convertir a días
        return dias >= 0 ? dias : 0; // Evita valores negativos
    };

    useEffect(() => {
        setVar_antiguedadInstitucion(calcularDias(date_fechaIngresoInstitucion));
    }, [date_fechaIngresoInstitucion]);
    
    

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            var_tipoContrato: var_tipoContrato,
            var_salario: var_salario,
            date_fechaIngresoInstitucion: date_fechaIngresoInstitucion,
            var_antiguedadInstitucion: var_antiguedadInstitucion,
            id_areaFK: id_areaFK,
            var_cargo: var_cargo,
            var_jefeInmediato: var_jefeInmediato,
            var_sede: var_sede,
            var_correoElectronicoInstitucional: var_correoElectronicoInstitucional,

        });
        navigate('/app/editarDatosProfesional5');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setVar_correoElectronicoInstitucional(res.data.var_correoElectronicoInstitucional);
        setVar_tipoContrato(res.data.var_tipoContrato);
        setVar_salario(res.data.var_salario);
        setDate_fechaIngresoInstitucion(res.data.date_fechaIngresoInstitucion
            ? res.data.date_fechaIngresoInstitucion.split("T")[0] // Formato YYYY-MM-DD
            : ""
        );
        setVar_antiguedadInstitucion(res.data.var_antiguedadInstitucion);
        setId_areaFK(res.data.id_areaFK);
        setVar_cargo(res.data.var_cargo);
        setVar_jefeInmediato(res.data.var_jefeInmediato);
        setVar_sede(res.data.var_sede);

    };

    const manejarCambio = (event) => {
        const { name, value } = event.target;

        if (name === "afiliado") {
            setAfiliado(value);

            if (value === "no") {
                setVar_correoElectronicoInstitucional("N/A")
                setVar_salario("N/A")
                setVar_cargo("N/A")
                setVar_jefeInmediato("N/A")
                setVar_sede("N/A")
                setVar_tipoContrato("N/A")



            }
        }


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

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <Typography
                                variant="h6"
                                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                            >
                                ¿En proceso de ingreso o vinculado?:
                            </Typography>
                            <Select
                                labelId="afiliado-label"
                                name="afiliado"
                                value={afiliado}
                                onChange={manejarCambio}
                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px",
                                }}
                            >
                                <MenuItem value="si">Vinculado</MenuItem>
                                <MenuItem value="no">Proceso de ingreso</MenuItem>
                            </Select>

                        </FormControl>

                        {afiliado === "si" && (
                            <form>

                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>¿Ha cambiado de EPS o AFP?:</Typography>
                                <TextField
                                    value={var_correoElectronicoInstitucional}
                                    onChange={(e) => setVar_correoElectronicoInstitucional(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                                />

                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione EPS ACTUAL:</Typography>
                                <TextField
                                    value={var_tipoContrato}
                                    onChange={(e) => setVar_tipoContrato(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                                />

                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Seleccione Fondo de Pensión:</Typography>
                                <TextField
                                    value={var_salario}
                                    onChange={(e) => setVar_salario(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                                />

                                
                                <Typography
                                    variant="h6"
                                    sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                                >
                                    Fecha de Ingreso:
                                </Typography>
                                <TextField
                                    name="date_fechaIngresoInstitucion"
                                    type="date"
                                    variant="outlined"
                                    value={date_fechaIngresoInstitucion}
                                    onChange={(e) => setDate_fechaIngresoInstitucion(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    InputLabelProps={{ shrink: true }}
                                    FormHelperTextProps={{
                                        sx: {
                                            marginLeft: 0,
                                        },
                                    }}
                                    InputProps={{
                                        sx: {
                                            height: "40px",
                                            fontFamily: "Roboto Condensed",
                                            fontSize: "16px",
                                        },
                                    }}
                                />

                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Antigüedad en la Institución (días):</Typography>
                                <TextField
                                    value={var_antiguedadInstitucion}
                                    onChange={(e) => setVar_antiguedadInstitucion(e.target.value)}
                                    fullWidth
                                    disabled
                                    sx={{ mb: 2 }}
                                    InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                                />

                                <FormControl
                                    fullWidth
                                    sx={{ mb: 2 }}

                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                                    >
                                        Área laboral a la que pertenece:
                                    </Typography>
                                    <Select
                                        labelId="area-label"
                                        name="area"
                                        value={id_areaFK}
                                        onChange={(e) => setId_areaFK(e.target.value)}
                                        sx={{
                                            height: "40px",
                                            fontFamily: "Roboto Condensed",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {estructuraOrganizacional.map((area) => (
                                            <MenuItem key={area.id_areaPk} value={area.id_areaPk}>
                                                {area.var_nombreArea}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>

                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Cargo:</Typography>
                                <TextField
                                    value={var_cargo}
                                    onChange={(e) => setVar_cargo(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                                />

                                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Jefe Inmediato:</Typography>
                                <TextField
                                    value={var_jefeInmediato}
                                    onChange={(e) => setVar_jefeInmediato(e.target.value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                                />

                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                                    >
                                        Sede:
                                    </Typography>
                                    <Select
                                        labelId="sede-label"
                                        name="var_sede"
                                        value={var_sede}
                                        onChange={(e) => setVar_sede(e.target.value)}
                                        sx={{
                                            height: "40px",
                                            fontFamily: "Roboto Condensed",
                                            fontSize: "16px",
                                        }}
                                    >
                                        <MenuItem value="robledo">Robledo</MenuItem>
                                        <MenuItem value="premium_plaza">Premium Plaza</MenuItem>
                                        <MenuItem value="robledo_premium_plaza">
                                            Robledo / Premium Plaza
                                        </MenuItem>
                                        <MenuItem value="otro">Otro</MenuItem>
                                    </Select>

                                </FormControl>
                            </form>
                        )}





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

export default EditarDatosProfesional5