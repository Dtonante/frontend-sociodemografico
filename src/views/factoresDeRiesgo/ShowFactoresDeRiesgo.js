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

const URI_FACTORES_RIESGO =
  "https://evaluacion.esumer.edu.co/api/factoresRiesgo/";

const CompShowFactoresDeRiesgo = () => {
  const [factoresDeRiesgo, setFactoresDeRiesgo] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getFactoresDeRiesgo();
  }, []);

  //Procedimiento para mostrar todas las FactoresDeRiesgo
  const getFactoresDeRiesgo = async () => {
    const res = await axios.get(URI_FACTORES_RIESGO);
    setFactoresDeRiesgo(res.data);
  };

  //Procedimiento para eliminar una FactoresDeRiesgo
  const deleteFactoresDeRiesgo = async (id_factoresRiesgoPK) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Esto eliminará el factor de riesgo de forma permanente!",
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
          await axios.delete(`${URI_FACTORES_RIESGO}${id_factoresRiesgoPK}`);
          getFactoresDeRiesgo();

          // Mostrar alerta de éxito
          Swal.fire({
            title: "Factor de riesgo eliminado",
            text: "El factor de riesgo ha sido eliminado exitosamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            customClass: {
              popup: "swal-custom-popup",
              confirmButton: "swal-button-confirm",
              icon: "swal-custom-icon",
            },
          });
        } catch (error) {
          console.error("Error al eliminar el factor de riesgo:", error);

          // Mostrar alerta de error
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el factor de riesgo. Intenta de nuevo.",
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

  const filteredData = factoresDeRiesgo.filter((factorRiesgo) => {
    const nombreFactorRiesgo =
      factorRiesgo.var_nombreCuentaBancaria?.toLowerCase() || ""; // Predeterminar a ""
    const id_factoresRiesgo = factorRiesgo.id_factoresRiesgoPK;

    const searchTermLower = searchTerm.toLowerCase();

    // Intentar convertir searchTerm a un número
    const searchTermAsNumber = parseInt(searchTerm, 10);

    return (
      nombreFactorRiesgo.includes(searchTermLower) || // Coincidencia en nombre
      (!isNaN(searchTermAsNumber) && id_factoresRiesgo === searchTermAsNumber) // Coincidencia exacta con id_rolPK
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
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontFamily: "Roboto Condensed",
              fontSize: "20px",
            }}
          >
            Lista de factores de riesgo
          </Typography>
          <Box display="flex" alignItems="center">
            <Link
              to="/app/crearFactoresRiesgo"
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
                Añadir cuenta bancaria
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
                    ID Factor de Riesgo
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
                {currentData.map((factorRiesgo) => (
                  <TableRow key={factorRiesgo.id_factoresRiesgoPK}>
                    <TableCell align="center" sx={cellStyle}>
                      {factorRiesgo.id_factoresRiesgoPK}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      {factorRiesgo.var_nombreRiesgo}
                    </TableCell>
                    <TableCell align="center" sx={cellStyle}>
                      <Link to={`/app/editarFactorRiesgo/${factorRiesgo.id_factoresRiesgoPK}`}>
                        <IconButton color="info">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        color="error"
                        onClick={() =>
                          deleteFactoresDeRiesgo(
                            factorRiesgo.id_factoresRiesgoPK
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

export default CompShowFactoresDeRiesgo;
