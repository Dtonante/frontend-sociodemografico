import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const URI_TRANSPORTE_PROPIO = 'http://localhost:3001/transportePropio/'

const CompShowTransportePropio = () => {
    const [transportePropio, setTransportePropio] = useState([])
    useEffect(() => {
        getTransportePropio()
    }, [])

    //Procedimiento para mostrar todas las eps
    const getTransportePropio = async () => {
        const res = await axios.get(URI_TRANSPORTE_PROPIO)
        setTransportePropio(res.data)

    }

    //Procedimiento para eliminar una eps
    const deleteTransportePropio = async (id_transportePropioPK) => {
        await axios.delete(`${URI_TRANSPORTE_PROPIO}${id_transportePropioPK}`)
        getTransportePropio()

    }



    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Transportes Propios
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Añadir Transporte
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Transporte</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transportePropio.map((transporte) => (
                                    <TableRow key={transporte.id_transportePropioPK}>
                                        <TableCell>{transporte.id_transportePropioPK}</TableCell>
                                        <TableCell>{transporte.var_nombreTransporte}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${transporte.id_transportePropioPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton
                                                color="error"
                                                onClick={() => deleteTransportePropio(transporte.id_transportePropioPK)}
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

export default CompShowTransportePropio;