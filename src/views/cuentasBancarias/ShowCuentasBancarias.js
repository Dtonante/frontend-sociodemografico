import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton, TableContainer, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const URI_CUENTAS_BANCARIAS = 'https://evaluacion.esumer.edu.co/api/cuentasBancarias/'

const CompShowCuentasBancarias = () => {
    const [cuentaBancaria, setCuentaBancaria] = useState([])
    useEffect(() => {
        getCuentasBancarias()
    }, [])

    //Procedimiento para mostrar todas las cuentas bancarias
    const getCuentasBancarias = async () => {
        const res = await axios.get(URI_CUENTAS_BANCARIAS)
        setCuentaBancaria(res.data)

    }

    //Procedimiento para eliminar una cuenta bancaria
    const deleteCuentaBancaria = async (id_cuentaBancariaPK) => {
        await axios.delete(`${URI_CUENTAS_BANCARIAS}${id_cuentaBancariaPK}`)
        getCuentasBancarias()

    }

    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Cuentas Bancarias
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Añadir Cuenta Bancaria
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Cuenta Bancaria</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cuentaBancaria.map((cuenta) => (
                                    <TableRow key={cuenta.id_cuentaBancariaPK}>
                                        <TableCell>{cuenta.id_cuentaBancariaPK}</TableCell>
                                        <TableCell>{cuenta.var_nombreCuentaBancaria}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${cuenta.id_cuentaBancariaPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton color="error" onClick={() => deleteCuentaBancaria(cuenta.id_cuentaBancariaPK)}>
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

export default CompShowCuentasBancarias;