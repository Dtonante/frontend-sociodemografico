import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableHead,
  TextField,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TablePagination,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import "../../css/alertStyles.css";

const URI_SERVICIO_SALUD_ADICIONAL =
  "https://evaluacion.esumer.edu.co/api/servicioSaludAdicional/";

const CompShowServicioDeSaludAdicional = () => {
  const [servicioSaludAdicional, setServicioSaludAdicional] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getServicioSaludAdicional();
  }, []);

  //Procedimiento para mostrar todas las ServicioSaludAdicional
  const getServicioSaludAdicional = async () => {
    const res = await axios.get(URI_SERVICIO_SALUD_ADICIONAL);
    setServicioSaludAdicional(res.data);
  };

  //Procedimiento para eliminar una eps
  const deleteServicioSaludAdicional = async (
    id_servicioDeSaludAdicionalPK
  ) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esto eliminará al servicio de salud adicional de forma permanente!",
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
          await axios.delete(
            `${URI_SERVICIO_SALUD_ADICIONAL}${id_servicioDeSaludAdicionalPK}`
          );
          getServicioSaludAdicional(); // Actualiza la lista de usuarios

          // Mostrar alerta de éxito
          Swal.fire({
            title: "Servicio adicional eliminado",
            text: "El servicio ha sido eliminado exitosamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            customClass: {
              popup: "swal-custom-popup",
              confirmButton: "swal-button-confirm",
              icon: "swal-custom-icon",
            },
          });
        } catch (error) {
          console.error("Error al eliminar el servicio:", error);

          // Mostrar alerta de error
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el servicio adicional. Intenta de nuevo.",
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

  const filteredData = servicioSaludAdicional.filter((servicio) => {
    const nombreServicio =
      servicio.var_nombreServicioDeSaludAdicional?.toLowerCase() || ""; // Predeterminar a ""
    const idServicio = servicio.id_servicioDeSaludAdicionalPK;

    const searchTermLower = searchTerm.toLowerCase();

    // Intentar convertir searchTerm a un número
    const searchTermAsNumber = parseInt(searchTerm, 10);

    return (
      nombreServicio.includes(searchTermLower) || // Coincidencia en nombre
      (!isNaN(searchTermAsNumber) && idServicio === searchTermAsNumber) // Coincidencia exacta con id_rolPK
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
              Lista de servicios adicionales
            </Typography>
          </Box>

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
                  Añadir servicio adicional
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
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#202B53" }}>
                  <TableCell align="center" sx={headerStyle}>
                    ID Servicio de Salud Adicional
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
                {currentData.map((servicio) => (
                  <TableRow key={servicio.id_servicioDeSaludAdicionalPK}>
                    <TableCell align="center" sx={cellStyle}>
                      {servicio.id_servicioDeSaludAdicionalPK}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {servicio.var_nombreServicioDeSaludAdicional}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/editar/${servicio.id_servicioDeSaludAdicionalPK}`}
                      >
                        <IconButton color="info">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        color="error"
                        onClick={() =>
                          deleteServicioSaludAdicional(
                            servicio.id_servicioDeSaludAdicionalPK
                          )
                        }
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

export default CompShowServicioDeSaludAdicional;
