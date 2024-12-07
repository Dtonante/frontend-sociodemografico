import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton, TableContainer, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const URI_ANTECEDENTE_MEDICO = 'https://evaluacion.esumer.edu.co/api/antecedentesMedicos/'

const CompShowAntecedentesMedicos = () => {
    const [antecedenteMedico, setAntecedentesMedicos] = useState([])
    useEffect(() => {
        getAntecedentesMedicos()
    }, [])

    //Procedimiento para mostrar todas los antecedentes medicos
    const getAntecedentesMedicos = async () => {
        const res = await axios.get(URI_ANTECEDENTE_MEDICO)
        setAntecedentesMedicos(res.data)

    }

    //Procedimiento para eliminar una eps
    const deleteAntecedenteMedico = async (id_antecedenteMedicoPK) => {
        await axios.delete(`${URI_ANTECEDENTE_MEDICO}${id_antecedenteMedicoPK}`)
        getAntecedentesMedicos()

    }

    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Antecedentes Médicos
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Add Antecedente
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Antecedente Médico</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {antecedenteMedico.map((antecedente) => (
                                    <TableRow key={antecedente.id_antecedenteMedicoPK}>
                                        <TableCell>{antecedente.id_antecedenteMedicoPK}</TableCell>
                                        <TableCell>{antecedente.var_nombreAntecedenteMedico}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${antecedente.id_antecedenteMedicoPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton color="error" onClick={() => deleteAntecedenteMedico(antecedente.id_antecedenteMedicoPK)}>
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

export default CompShowAntecedentesMedicos;