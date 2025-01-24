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
import "../../css/alertStyles.css";

const URI_USUARIOS = "https://evaluacion.esumer.edu.co/api/usuarios/";

const CompShowUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getUsuarios();
  }, []);

  //Procedimiento para mostrar todas las eps
  const getUsuarios = async () => {
    const res = await axios.get(URI_USUARIOS);
    console.log("Datos recibidos:", res.data);
    setUsuarios(res.data);
  };

  //Procedimiento para eliminar una eps
  const deleteUsuario = async (id_usuarioPK) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esto eliminará al usuario de forma permanente!",
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
          await axios.delete(`${URI_USUARIOS}${id_usuarioPK}`);
          getUsuarios(); // Actualiza la lista de usuarios

          // Mostrar alerta de éxito
          Swal.fire({
            title: "Usuario eliminado",
            text: "El usuario ha sido eliminado exitosamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            customClass: {
              popup: "swal-custom-popup",
              confirmButton: "swal-button-confirm",
              icon: "swal-custom-icon",
            },
          });
        } catch (error) {
          console.error("Error al eliminar usuario:", error);

          // Mostrar alerta de error
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el usuario. Intenta de nuevo.",
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

  const filteredData = usuarios.filter((usuario) => {
    const nombreUsuario = usuario.var_nombreCompleto?.toLowerCase() || ""; // Predeterminar a ""
    const correo = usuario.var_correoElectronicoPersonal?.toLowerCase() || "";
    const documento = usuario.var_numeroDocumento || ""; // Predeterminar a ""
    // Predeterminar a ""
    const genero = usuario.var_genero?.toLowerCase() || ""; // Predeterminar a ""
    const estado = usuario.var_estado?.toLowerCase() || ""; // Predeterminar a ""
    const idRol = usuario.id_rolPK;

    const searchTermLower = searchTerm.toLowerCase();

    // Intentar convertir searchTerm a un número
    const searchTermAsNumber = parseInt(searchTerm, 10);

    return (
      nombreUsuario.includes(searchTermLower) || // Coincidencia en nombre
      correo.includes(searchTermLower) || // Coincidencia en correo
      genero.includes(searchTermLower) || // Coincidencia en género
      estado.includes(searchTermLower) ||
      documento.includes(searchTerm) || // Coincidencia en estado
      (!isNaN(searchTermAsNumber) && idRol === searchTermAsNumber) // Coincidencia exacta con id_rolPK
    );
  });

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

  const currentData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ backgroundColor: "#F2F2F2" }}>
      <Card
        variant="outlined"
        sx={{ borderColor: "#202B53", backgroundColor: "#F2F2F2" }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="16px 24px"
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "Roboto Condensed",
              fontSize: "20px",
            }}
          >
            Lista de Usuarios
          </Typography>
          <Box display="flex" alignItems="center">
            <Link
              to="/crear"
              style={{ textDecoration: "none", marginRight: "10px" }}
            >
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#F2F2F2",
                  color: "#202B52",
                  border: "2px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: "7px",
                  "&:hover": {
                    borderColor: "#000000",
                    backgroundColor: "#F2F2F2",
                    boxShadow: "none",
                  },
                }}
              >
                Registrar usuario
              </Button>
            </Link>
            <TextField
              label="Buscar"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ marginLeft: "16px" }}
            />
          </Box>
        </Box>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#202B53" }}>
                  <TableCell align="center" sx={headerStyle}>
                    Número de documento
                  </TableCell>
                  <TableCell align="center" sx={headerStyle}>
                    Nombre Completo
                  </TableCell>
                  <TableCell align="center" sx={headerStyle}>
                    Género
                  </TableCell>
                  <TableCell align="center" sx={headerStyle}>
                    Correo Personal
                  </TableCell>
                  <TableCell align="center" sx={headerStyle}>
                    Estado
                  </TableCell>
                  <TableCell align="center" sx={headerStyle}>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((usuario) => (
                  <TableRow key={usuario.id_usuarioPK}>
                    <TableCell align="center" sx={cellStyle}>
                      {usuario.var_numeroDocumento}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {usuario.var_nombreCompleto}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {usuario.var_genero}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {usuario.var_correoElectronicoPersonal}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {usuario.boolean_estado ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/app/editarUsuarioAdmin/${usuario.id_usuarioPK}`}>
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

export default CompShowUsuarios;
