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

const URI_TRANSPORTE_PROPIO = 'http://localhost:3001/transportePropio/'

const CompEditarTransportePropio = () => {
  const [var_nombreTransporte, setVar_nombreTransporte] = useState('')
  const navigate = useNavigate()
  const { id_transportePropioPK } = useParams()

  //procedimiento para actualizar
  const actualizar = async (e) => {
    e.preventDefault()
    await axios.put(URI_TRANSPORTE_PROPIO + id_transportePropioPK, {
      var_nombreTransporte: var_nombreTransporte
    })
    navigate('/app/transportePropio')
  }

  useEffect(() => {
    getTransportePropio()
  }, [])

  const getTransportePropio = async () => {
    const res = await axios.get(URI_TRANSPORTE_PROPIO + id_transportePropioPK)
    setVar_nombreTransporte(res.data.var_nombreTransporte)
  }

  const handleGoBack = () => {
    navigate("/app/transportePropio");
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
              <strong>Editar transporte propio</strong>
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
              Nombre del transporte propio:
            </Typography>
            <TextField
              value={var_nombreTransporte}
              onChange={(e) => setVar_nombreTransporte(e.target.value)}
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

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
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



}

export default CompEditarTransportePropio