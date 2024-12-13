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
  TableBody,
  TextField,
  TableRow,
  TableCell,
  Typography,
  Button,
  IconButton,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import "../../css/alertStyles.css";

const URI_TIPO_DOCUMENTO =
  "https://evaluacion.esumer.edu.co/api/tipodocumentos/";

const CompShowTipoDocumento = () => {
  const [tipoDocumento, setTipoDocumento] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getTipoDocumento();
  }, []);

  //Procedimiento para mostrar todas las eps
  const getTipoDocumento = async () => {
    const res = await axios.get(URI_TIPO_DOCUMENTO);
    setTipoDocumento(res.data);
  };

  //Procedimiento para eliminar una eps
  const deleteTipoDocumento = async (id_tipoDocumentoPK) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esto eliminará el tipo de documento de forma permanente!",
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
          await axios.delete(`${URI_TIPO_DOCUMENTO}${id_tipoDocumentoPK}`);
          getTipoDocumento();

          // Mostrar alerta de éxito
          Swal.fire({
            title: "El tipo de documento eliminado",
            text: "El tipo de documento ha sido eliminado exitosamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            customClass: {
              popup: "swal-custom-popup",
              confirmButton: "swal-button-confirm",
              icon: "swal-custom-icon",
            },
          });
        } catch (error) {
          console.error("Error al eliminar el tipo de documento:", error);

          // Mostrar alerta de error
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el tipo de documento . Intenta de nuevo.",
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

  const filteredData = tipoDocumento.filter((tipo) => {
    const nombreDocumento = tipo.var_nombreDocumento?.toLowerCase() || ""; // Predeterminar a ""
    const id_tipoDocumento = tipo.id_tipoDocumentoPK;

    const searchTermLower = searchTerm.toLowerCase();

    // Intentar convertir searchTerm a un número
    const searchTermAsNumber = parseInt(searchTerm, 10);

    return (
      nombreDocumento.includes(searchTermLower) || // Coincidencia en nombre
      (!isNaN(searchTermAsNumber) && id_tipoDocumento === searchTermAsNumber) // Coincidencia exacta con id_rolPK
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
              Lista de tipos de documentos
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
                  Añadir tipo de documento
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
                    ID Tipo Documento
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
                {currentData.map((tipo) => (
                  <TableRow key={tipo.id_tipoDocumentoPK}>
                    <TableCell align="center" sx={cellStyle}>
                      {tipo.id_tipoDocumentoPK}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {tipo.var_nombreDocumento}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      <Link to={`/editar/${tipo.id_tipoDocumentoPK}`}>
                        <IconButton color="info">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        color="error"
                        onClick={() =>
                          deleteTipoDocumento(tipo.id_tipoDocumentoPK)
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

export default CompShowTipoDocumento;
