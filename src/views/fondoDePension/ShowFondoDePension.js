import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton, TableContainer, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const URI_FONDO_PENSION = 'https://evaluacion.esumer.edu.co/api/fondoPension/'

const CompShowFondoDePension = () => {
    const [fondoDePension, setFondoDePension] = useState([])
    useEffect(() => {
        getFondoDePension()
    }, [])

    //Procedimiento para mostrar todas las eps
    const getFondoDePension = async () => {
        const res = await axios.get(URI_FONDO_PENSION)
        setFondoDePension(res.data)

    }

    //Procedimiento para eliminar una eps
    const deleteFondoDePension = async (id_fondoPensionPK) => {
        await axios.delete(`${URI_FONDO_PENSION}${id_fondoPensionPK}`)
        getFondoDePension()

    }

    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Fondos de Pensión
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Añadir Fondo de Pensión
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Fondo de Pensión</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fondoDePension.map((fondo) => (
                                    <TableRow key={fondo.id_fondoPensionPK}>
                                        <TableCell>{fondo.id_fondoPensionPK}</TableCell>
                                        <TableCell>{fondo.var_nombreFondoPension}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${fondo.id_fondoPensionPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton color="error" onClick={() => deleteFondoDePension(fondo.id_fondoPensionPK)}>
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

export default CompShowFondoDePension;