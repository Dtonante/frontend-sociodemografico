import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const URI_TIPO_DOCUMENTO = 'http://localhost:3001/tipodocumentos/'

const CompShowTipoDocumento = () => {
    const [tipoDocumento, setTipoDocumento] = useState([])
    useEffect(() => {
        getTipoDocumento()
    }, [])

    //Procedimiento para mostrar todas las eps
    const getTipoDocumento = async () => {
        const res = await axios.get(URI_TIPO_DOCUMENTO)
        setTipoDocumento(res.data)

    }

    //Procedimiento para eliminar una eps
    const deleteTipoDocumento = async (id_tipoDocumentoPK) => {
        await axios.delete(`${URI_TIPO_DOCUMENTO}${id_tipoDocumentoPK}`)
        getTipoDocumento();

    }



    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Tipos de Documento
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Añadir Tipo de Documento
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID Tipo Documento</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tipoDocumento.map((tipo) => (
                                    <TableRow key={tipo.id_tipoDocumentoPK}>
                                        <TableCell>{tipo.id_tipoDocumentoPK}</TableCell>
                                        <TableCell>{tipo.var_nombreDocumento}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${tipo.id_tipoDocumentoPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton color="error" onClick={() => deleteTipoDocumento(tipo.id_tipoDocumentoPK)}>
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

export default CompShowTipoDocumento;