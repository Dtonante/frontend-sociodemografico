import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const URI_ANTECEDENTE_MEDICO = "http://localhost:3001/antecedentesMedicos/";

const CompEditarAntecedentesMedicos = () => {
  const [var_nombreAntecedenteMedico, setVar_nombreAntecedenteMedico] =
    useState("");
  const navigate = useNavigate();
  const { id_antecedenteMedicoPK } = useParams();

  //procedimiento para actualizar
  const actualizar = async (e) => {
    e.preventDefault();
    await axios.put(URI_ANTECEDENTE_MEDICO + id_antecedenteMedicoPK, {
      var_nombreAntecedenteMedico: var_nombreAntecedenteMedico,
    });
    navigate("/app/antecedentesMedicos");
  };

  useEffect(() => {
    getAntecedenteMedicoPorId();
  }, []);

  const getAntecedenteMedicoPorId = async () => {
    const res = await axios.get(
      URI_ANTECEDENTE_MEDICO + id_antecedenteMedicoPK
    );
    setVar_nombreAntecedenteMedico(res.data.var_nombreAntecedenteMedico);
  };


  const handleGoBack = () => {
    navigate("/app/antecedentesMedicos");
  };

  return (
    <div
      style={{
        backgroundColor: "#F2F2F2",
        paddingTop: "3%",
        paddingBottom: "3%",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          p: 0,
          width: "100%",
          maxWidth: 800,
          margin: "auto",
          backgroundColor: "#F2F2F2",
          borderColor: "#202B52",
        }}
      >
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "500",
                textAlign: "center",
                color: "#202B52",
                fontFamily: "Roboto Condensed",
              }}
            >
              <strong>Editar antecedente medico</strong>
            </Typography>
          </Box>
        </Box>
        <Divider
          style={{
            marginLeft: "5%",
            marginRight: "5%",
            borderColor: "#202B52",
          }}
        />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={actualizar}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Nombre antecedente medico:
            </Typography>
            <TextField
              value={var_nombreAntecedenteMedico}
              onChange={(e) => setVar_nombreAntecedenteMedico(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                sx={{ backgroundColor: "#202B52", fontFamily: "poppins" }}
                variant="contained"
                type="submit"
              >
                Actualizar
              </Button>
              <Button
                sx={{ backgroundColor: "#ff0000", fontFamily: "poppins" }}
                variant="contained"
                onClick={handleGoBack}
              >
                Volver
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompEditarAntecedentesMedicos;
