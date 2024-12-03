import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton, TableContainer, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const URI_FACTORES_RIESGO = 'http://localhost:3001/factoresRiesgo/'

const CompShowFactoresDeRiesgo = () => {
    const [factoresDeRiesgo, setFactoresDeRiesgo] = useState([])
    useEffect(() => {
        getFactoresDeRiesgo()
    }, [])

    //Procedimiento para mostrar todas las FactoresDeRiesgo
    const getFactoresDeRiesgo = async () => {
        const res = await axios.get(URI_FACTORES_RIESGO)
        setFactoresDeRiesgo(res.data)

    }

    //Procedimiento para eliminar una FactoresDeRiesgo
    const deleteFactoresDeRiesgo = async (id_factoresRiesgoPK) => {
        await axios.delete(`${URI_FACTORES_RIESGO}${id_factoresRiesgoPK}`)
        getFactoresDeRiesgo()


    }

    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Factores de Riesgo
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Add Factores de Riesgo
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Factor de Riesgo</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {factoresDeRiesgo.map((factorRiesgo) => (
                                    <TableRow key={factorRiesgo.id_factoresRiesgoPK}>
                                        <TableCell>{factorRiesgo.id_factoresRiesgoPK}</TableCell>
                                        <TableCell>{factorRiesgo.var_nombreRiesgo}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${factorRiesgo.id_factoresRiesgoPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton color="error" onClick={() => deleteFactoresDeRiesgo(factorRiesgo.id_factoresRiesgoPK)}>
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

export default CompShowFactoresDeRiesgo;