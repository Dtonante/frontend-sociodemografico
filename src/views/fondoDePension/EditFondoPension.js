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

const URI_FONDO_PENSION = 'http://localhost:3001/fondoPension/'

const CompEditarFondoPension = () => {
  const [var_nombreFondoPension, setVar_nombreFondoPension] = useState('')
  const navigate = useNavigate()
  const { id_fondoPensionPK } = useParams()

  //procedimiento para actualizar
  const actualizar = async (e) => {
    e.preventDefault()
    await axios.put(URI_FONDO_PENSION + id_fondoPensionPK, {
      var_nombreFondoPension: var_nombreFondoPension
    })
    navigate('/app/fondoPension')
  }

  useEffect(() => {
    getFondoPensionPorId()
  }, [])

  const getFondoPensionPorId = async () => {
    const res = await axios.get(URI_FONDO_PENSION + id_fondoPensionPK)
    setVar_nombreFondoPension(res.data.var_nombreFondoPension)
  }

  const handleGoBack = () => {
    navigate("/app/fondoPension");
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
              <strong>Editar fondo de pension</strong>
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
              Nombre del fondo de pension:
            </Typography>
            <TextField
              value={var_nombreFondoPension}
              onChange={(e) => setVar_nombreFondoPension(e.target.value)}
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

export default CompEditarFondoPension