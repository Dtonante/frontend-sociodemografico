import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  IconButton,
  TablePagination,
  TextField,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import '../../css/alertStyles.css';

const URI_ROL = "https://evaluacion.esumer.edu.co/api/roles/";

const CompShowrol = () => {
  const [rol, setRol] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para la paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    getRol();
  }, []);

  //Procedimiento para mostrar todas las eps
  const getRol = async () => {
    const res = await axios.get(URI_ROL);
    setRol(res.data);
  };

  //Procedimiento para eliminar una eps
  const deleteRol = async (id_rolPK) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esto eliminará al Rol de forma permanente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-custom-popup",
        title: "swal-custom-title",
        icon: "swal-custom-icon",
        confirmButton: "swal-button-confirm",
        cancelButton: "swal-button-cancel",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Eliminar usuario
          await axios.delete(`${URI_ROL}${id_rolPK}`);
          getRol();

          // Mostrar alerta de éxito
          Swal.fire({
            title: "Rol eliminado",
            text: "El Rol ha sido eliminado exitosamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            customClass: {
              popup: "swal-custom-popup",
              confirmButton: "swal-button-confirm",
              icon: "swal-custom-icon",
            },
          });
        } catch (error) {
          console.error("Error al eliminar Rol:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el Rol. Intenta de nuevo.",
            icon: "error",
            confirmButtonText: "Aceptar",
            customClass: {
              popup: "swal-custom-popup",
              confirmButton: "swal-button-confirm",
              icon: "swal-custom-icon-error",
            },
          });
        }
      }
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredData = rol.filter((rol) => {
    const nombreRol = rol.var_nombreRol.toLowerCase();
    const idRol = rol.id_rolPK;

    const searchTermLower = searchTerm.toLowerCase();

    // Intentar convertir searchTerm a un número
    const searchTermAsNumber = parseInt(searchTerm, 10);

    return (
      nombreRol.includes(searchTermLower) ||
      (!isNaN(searchTermAsNumber) && idRol === searchTermAsNumber)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ backgroundColor: "#F2F2F2" }}>
      <Card
        variant="outlined"
        sx={{ borderColor: "#202B52", backgroundColor: "#F2F2F2" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="16px 24px"
        >
          <Box flex="1" display="flex">
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "Roboto Condensed",
                fontSize: "20px",
              }}
            >
              Lista de Roles
            </Typography>
          </Box>

          {/* Búsqueda y botón alineados a la derecha */}
          <Box display="flex" alignItems="center">
            <Box flex="1" display="flex">
              <Link
                to="/crear"
                style={{ textDecoration: "none", marginRight: "10px" }}
              >
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: "#F2F2F2", // Fondo inicial
                    color: "#202B52", // Color del texto
                    border: "2px solid rgba(0, 0, 0, 0.12)", // Borde inicial
                    borderRadius: "7px", // Bordes redondeados
                    "&:hover": {
                      borderColor: "#000000", // Cambiar solo el color del borde
                      backgroundColor: "#F2F2F2", // Mantener el fondo igual
                      boxShadow: "none", // Eliminar cualquier sombra predeterminada
                    },
                  }}
                >
                  Añadir Rol
                </Button>
              </Link>
            </Box>
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "20px",
          }}
        ></div>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#202B53" }}>
                  <TableCell align="center" sx={headerStyle}>
                    ID Rol
                  </TableCell>
                  <TableCell align="center" sx={headerStyle}>
                    Nombre
                  </TableCell>
                  <TableCell align="center" sx={headerStyle}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((rol) => (
                  <TableRow key={rol.id_rolPK}>
                    <TableCell align="center" sx={cellStyle}>
                      {rol.id_rolPK}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {rol.var_nombreRol}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
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
                fontFamily: "Roboto Condensed",
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-caption":
                {
                  fontWeight: "bold",
                  color: "black",
                  fontFamily: "Roboto Condensed",
                },
              "& .MuiIconButton-root": {
                color: "black",
                fontFamily: "Roboto Condensed",
              },
              "& .MuiTablePagination-toolbar": {
                color: "black",
                fontWeight: "bold",
                fontFamily: "Roboto Condensed",
              },
              "& .MuiSvgIcon-root": {
                color: "black",
                fontFamily: "Roboto Condensed",
              },
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

const headerStyle = {
  color: "#F2F2F2",
  fontWeight: "bold",
  fontFamily: "Roboto Condensed",
  fontSize: "18px",
};

const cellStyle = {
  fontFamily: "Roboto Condensed",
  fontSize: "17px",
};

export default CompShowrol;
