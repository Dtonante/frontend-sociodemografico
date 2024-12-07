import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton, TableContainer, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const URI_ESTRUCTURA_ORGANIZACIONAL = 'https://evaluacion.esumer.edu.co/api/estructuraOrganizacional/'

const CompShowEstructuraOrganizacional = () => {
    const [estructuraOrganizacional, setEstructuraOrganizacional] = useState([])
    useEffect(() => {
        getEstructuraOrganizacional()
    }, [])

    //Procedimiento para mostrar todas las eps
    const getEstructuraOrganizacional = async () => {
        const res = await axios.get(URI_ESTRUCTURA_ORGANIZACIONAL)
        setEstructuraOrganizacional(res.data)

    }

    //Procedimiento para eliminar una eps
    const deleteEstructuraOrganizacional = async (id_areaPk) => {
        await axios.delete(`${URI_ESTRUCTURA_ORGANIZACIONAL}${id_areaPk}`)
        getEstructuraOrganizacional()

    }

    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Estructura Organizacional
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Add Estructura
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Area</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {estructuraOrganizacional.map((estructura) => (
                                    <TableRow key={estructura.id_areaPk}>
                                        <TableCell>{estructura.id_areaPk}</TableCell>
                                        <TableCell>{estructura.var_nombreArea}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${estructura.id_areaPk}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton color="error" onClick={() => deleteEstructuraOrganizacional(estructura.id_areaPk)}>
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

export default CompShowEstructuraOrganizacional;