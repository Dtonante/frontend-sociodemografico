import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const URI_SERVICIO_QUE_NO_CUENTAN = 'https://evaluacion.esumer.edu.co/api/serviciosQueNoCuentan/'

const CompShowServiciosQueNoCuentan = () => {
    const [servicioQueNoCuentan, setServicioQueNoCuentan] = useState([])
    useEffect(() => {
        getServicioQueNoCuentan()
    }, [])

    //Procedimiento para mostrar todas las eps
    const getServicioQueNoCuentan = async () => {
        const res = await axios.get(URI_SERVICIO_QUE_NO_CUENTAN)
        setServicioQueNoCuentan(res.data)

    }

    //Procedimiento para eliminar una eps
    const deleteServicioQueNoCuentan = async (id_servicioQueNoCuentaPK) => {
        await axios.delete(`${URI_SERVICIO_QUE_NO_CUENTAN}${id_servicioQueNoCuentaPK}`)
        getServicioQueNoCuentan();

    }



    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Servicios que No Cuentan
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Añadir Servicio
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Servicio</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {servicioQueNoCuentan.map((servicio) => (
                                    <TableRow key={servicio.id_servicioQueNoCuentaPK}>
                                        <TableCell>{servicio.id_servicioQueNoCuentaPK}</TableCell>
                                        <TableCell>{servicio.var_nombreServicioQueNoCuenta}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${servicio.id_servicioQueNoCuentaPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton
                                                color="error"
                                                onClick={() => deleteServicioQueNoCuentan(servicio.id_servicioQueNoCuentaPK)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );


}

export default CompShowServiciosQueNoCuentan;