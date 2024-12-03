import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const URI_SERVICIO_SALUD_ADICIONAL = 'http://localhost:3001/servicioSaludAdicional/'

const CompShowServicioDeSaludAdicional = () => {
    const [servicioSaludAdicional, setServicioSaludAdicional] = useState([])
    useEffect(() => {
        getServicioSaludAdicional()
    }, [])

    //Procedimiento para mostrar todas las ServicioSaludAdicional
    const getServicioSaludAdicional = async () => {
        const res = await axios.get(URI_SERVICIO_SALUD_ADICIONAL)
        setServicioSaludAdicional(res.data)

    }

    //Procedimiento para eliminar una eps
    const deleteServicioSaludAdicional = async (id_servicioDeSaludAdicionalPK) => {
        await axios.delete(`${URI_SERVICIO_SALUD_ADICIONAL}${id_servicioDeSaludAdicionalPK}`)
        getServicioSaludAdicional()

    }



    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Servicios de Salud Adicional
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Añadir Servicio de Salud
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Servicio de Salud Adicional</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {servicioSaludAdicional.map((servicio) => (
                                    <TableRow key={servicio.id_servicioDeSaludAdicionalPK}>
                                        <TableCell>{servicio.id_servicioDeSaludAdicionalPK}</TableCell>
                                        <TableCell>{servicio.var_nombreServicioDeSaludAdicional}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${servicio.id_servicioDeSaludAdicionalPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton
                                                color="error"
                                                onClick={() => deleteServicioSaludAdicional(servicio.id_servicioDeSaludAdicionalPK)}
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

export default CompShowServicioDeSaludAdicional;