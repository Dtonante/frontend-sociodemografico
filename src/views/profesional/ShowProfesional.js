
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button, IconButton, TablePagination, TextField, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CompVisualizarProfesional from './VisualizarProfesional';

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';

const CompShowProfesional = () => {
    const [profesional, setProfesional] = useState([]);
    const [selectedProfesional, setSelectedProfesional] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Estado para la paginación
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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
        setSelectedProfesional(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Filtrar profesionales según el término de búsqueda
    const filteredData = profesional.filter((prof) => {
        const nombreCompleto = prof.Usuario.var_nombreCompleto.toLowerCase();
        const numeroDocumento = prof.Usuario.var_numeroDocumento.toLowerCase();
        const estado = prof.Usuario.boolean_estado ? "activo" : "inactivo";
        const correoPersonal = prof.Usuario.var_correoElectronicoPersonal.toLowerCase();
        const correoInstitucional = prof.var_correoElectronicoInstitucional.toLowerCase();
        const celular = prof.var_celular.toLowerCase();

        const searchTermLower = searchTerm.toLowerCase();

        return (
            nombreCompleto.includes(searchTermLower) ||
            numeroDocumento.includes(searchTermLower) ||
            estado.includes(searchTermLower) ||
            correoPersonal.includes(searchTermLower) ||
            correoInstitucional.includes(searchTermLower) ||
            celular.includes(searchTermLower)
        );
    });

    const currentData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Box sx={{ padding: "20px", backgroundColor: "#F2F2F2" }}>
            <Card variant="outlined" sx={{ borderColor: '#202B53', backgroundColor: "#F2F2F2"  }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
                    {/* Espacio para centrar el título */}
                    <Box flex="1" display="flex">
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Lista de Profesionales
                        </Typography>
                    </Box>

                    {/* Búsqueda y botón alineados a la derecha */}
                    <Box display="flex" alignItems="center">
                        <TextField
                            label="Buscar"
                            variant="outlined"
                            size="small"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            sx={{ marginRight: "16px" }}
                        />
                    </Box>
                </Box>


                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#202B53" }}>
                                    <TableCell sx={{ color: "#F2F2F2", fontWeight: "bold" }}>Nombre Completo</TableCell>
                                    <TableCell sx={{ color: "#F2F2F2", fontWeight: "bold" }}>Número Documento</TableCell>
                                    <TableCell sx={{ color: "#F2F2F2", fontWeight: "bold" }}>Estado</TableCell>
                                    <TableCell sx={{ color: "#F2F2F2", fontWeight: "bold" }}>Correo Personal</TableCell>
                                    <TableCell sx={{ color: "#F2F2F2", fontWeight: "bold" }}>Correo Institucional</TableCell>
                                    <TableCell sx={{ color: "#F2F2F2", fontWeight: "bold" }}>Celular</TableCell>
                                    <TableCell sx={{ color: "#F2F2F2", fontWeight: "bold" }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {currentData.map((prof) => (
                                    <TableRow key={prof.id_profesionalPK}>
                                        <TableCell>{prof.Usuario.var_nombreCompleto}</TableCell>
                                        <TableCell>{prof.Usuario.var_numeroDocumento}</TableCell>
                                        <TableCell>{prof.Usuario.boolean_estado ? "Activo" : "Inactivo"}</TableCell>
                                        <TableCell>{prof.Usuario.var_correoElectronicoPersonal}</TableCell>
                                        <TableCell>{prof.var_correoElectronicoInstitucional}</TableCell>
                                        <TableCell>{prof.var_celular}</TableCell>
                                        <TableCell>
                                            {/* <Link to={`/editar/${prof.id_profesionalPK}`}>
                                                <IconButton color="info">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link> */}
                                            <IconButton color="black" onClick={() => visualizar(prof)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Paginación */}
                    <TablePagination
                        component="div"
                        count={filteredData.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 15]}
                        labelRowsPerPage="Filas por página"
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
                        }
                        sx={{
                            "& .MuiTablePagination-root": { color: "black" },
                            "& .MuiTablePagination-actions button": {
                                color: "black",
                            },
                            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-caption": {
                                fontWeight: "bold",
                                color: "black",
                            },
                            "& .MuiIconButton-root": {
                                color: "black",
                            },
                            "& .MuiTablePagination-toolbar": {
                                color: "black",
                                fontWeight: "bold",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "black",
                            },
                        }}
                    />
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