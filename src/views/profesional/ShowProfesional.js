
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CompVisualizarProfesional from './VisualizarProfesional'; 

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';

const CompShowProfesional = () => {
    const [profesional, setProfesional] = useState([]);
    const [selectedProfesional, setSelectedProfesional] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        getProfesional();
    }, []);

    const getProfesional = async () => {
        const res = await axios.get(URI_PROFESIONAL);
        setProfesional(res.data);
    };

    const visualizar = (prof) => {
        setSelectedProfesional(prof);
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedProfesional(null); // Limpia el estado seleccionado
    };

    return (
        <Box sx={{ padding: "20px" }}>
            <Card variant="outlined">
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    <Typography variant="h6" fontWeight="500">
                        Lista de Profesionales
                    </Typography>
                    <Link to="/crear">
                        <Button variant="contained" startIcon={<AddIcon />} color="primary">
                            Añadir Profesional
                        </Button>
                    </Link>
                </Box>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nombre Completo</TableCell>
                                    <TableCell>Numero documento</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Correo personal</TableCell>
                                    <TableCell>Correo institucional</TableCell>
                                    <TableCell>Celular</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {profesional.map((prof) => (
                                    <TableRow key={prof.id_profesionalPK}>
                                        <TableCell>{prof.Usuario.var_nombreCompleto}</TableCell>
                                        <TableCell>{prof.Usuario.var_numeroDocumento}</TableCell>
                                        <TableCell>{prof.Usuario.boolean_estado ? "Activo" : "Inactivo"}</TableCell>
                                        <TableCell>{prof.Usuario.var_correoElectronicoPersonal}</TableCell>
                                        <TableCell>{prof.var_correoElectronicoInstitucional}</TableCell>
                                        <TableCell>{prof.var_celular}</TableCell>
                                        <TableCell>
                                            <Link to={`/editar/${prof.id_profesionalPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                            <IconButton
                                                color="black"
                                                onClick={() => visualizar(prof)}
                                            >
                                                <VisibilityIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Modal */}
            <CompVisualizarProfesional
                open={modalOpen}
                handleClose={handleClose}
                profesional={selectedProfesional}
            />
        </Box>
    );
};

export default CompShowProfesional;
