import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const URI_USUARIOS = 'http://localhost:3001/usuarios/'

const CompShowUsuarios = () => {
    const [usuarios, setUsuarios] = useState([])
    useEffect(() => {
        getUsuarios()
    }, [])

    //Procedimiento para mostrar todas las eps
    const getUsuarios = async () => {
        const res = await axios.get(URI_USUARIOS)
        console.log("Datos recibidos:", res.data);
        setUsuarios(res.data)

    }

    //Procedimiento para eliminar una eps
    const deleteUsuario = async (id_usuarioPK) => {
        await axios.delete(`${URI_USUARIOS}${id_usuarioPK}`)
        getUsuarios()

    }

  

return (
    <Box sx={{ padding: "20px" }}>
        <Card variant="outlined">
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                <Typography variant="h6" fontWeight="500">
                    Lista de Usuarios
                </Typography>
                <Link to="/crear">
                    <Button variant="contained" startIcon={<AddIcon />} color="primary">
                        Añadir Usuario
                    </Button>
                </Link>
            </Box>
            <CardContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID Usuario</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Nombre Completo</TableCell>
                                <TableCell>Tipo Documento</TableCell>
                                <TableCell>Número Documento</TableCell>
                                <TableCell>Género</TableCell>
                                <TableCell>Correo Personal</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarios.map((usuario) => (
                                <TableRow key={usuario.id_usuarioPK}>
                                    <TableCell>{usuario.id_usuarioPK}</TableCell>
                                    <TableCell>{usuario.id_rolFK}</TableCell>
                                    <TableCell>{usuario.boolean_estado ? "Activo" : "Inactivo"}</TableCell>
                                    <TableCell>{usuario.var_nombreCompleto}</TableCell>
                                    <TableCell>{usuario.int_tipoDocumentoFK}</TableCell>
                                    <TableCell>{usuario.var_numeroDocumento}</TableCell>
                                    <TableCell>{usuario.var_genero}</TableCell>
                                    <TableCell>{usuario.var_correoElectronicoPersonal}</TableCell>
                                    <TableCell>
                                        <Link to={`/editar/${usuario.id_usuarioPK}`}>
                                            <IconButton color="info">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton
                                            color="error"
                                            onClick={() => deleteUsuario(usuario.id_usuarioPK)}
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

export default CompShowUsuarios;