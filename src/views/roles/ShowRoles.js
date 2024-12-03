import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const URI_ROL = 'http://localhost:3001/roles/'

const CompShowrol = () => {
    const [rol, setRol] = useState([])
    useEffect(() => {
        getRol()
    }, [])

    //Procedimiento para mostrar todas las eps
    const getRol = async () => {
        const res = await axios.get(URI_ROL)
        setRol(res.data)

    }

    //Procedimiento para eliminar una eps
    const deleteRol = async (id_rolPK) => {
        await axios.delete(`${URI_ROL}${id_rolPK}`)
        getRol()

    }

    

return (
    <Box sx={{ padding: "20px" }}>
        <Card variant="outlined">
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                <Typography variant="h6" fontWeight="500">
                    Lista de Roles
                </Typography>
                <Link to="/crear">
                    <Button variant="contained" startIcon={<AddIcon />} color="primary">
                        Añadir Rol
                    </Button>
                </Link>
            </Box>
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID Rol</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rol.map((rol) => (
                                <TableRow key={rol.id_rolPK}>
                                    <TableCell>{rol.id_rolPK}</TableCell>
                                    <TableCell>{rol.var_nombreRol}</TableCell>
                                    <TableCell>
                                        <Link to={`/editar/${rol.id_rolPK}`}>
                                            <IconButton color="info">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            color="error"
                                            onClick={() => deleteRol(rol.id_rolPK)}
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

export default CompShowrol;