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

const URI_FACTORES_RIESGO = 'http://localhost:3001/factoresRiesgo/'

const CompEditarFactorRiesgo = () => {
    const [var_nombreRiesgo, setvVar_nombreRiesgo] = useState('')
    const navigate = useNavigate()
    const {id_factoresRiesgoPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_FACTORES_RIESGO+id_factoresRiesgoPK, {
            var_nombreRiesgo: var_nombreRiesgo
        })
        navigate('/app/factoresRiesgo')
    }

    useEffect( ()=>{
        getFactorRiesgoPorId()
    }, [])

    const getFactorRiesgoPorId = async ()=> {
        const res = await axios.get(URI_FACTORES_RIESGO+id_factoresRiesgoPK)
        setvVar_nombreRiesgo(res.data.var_nombreRiesgo)
    }

    const handleGoBack = () => {
        navigate('/app/factoresRiesgo')
      };

    return (
        <div
          style={{
            backgroundColor: "#F2F2F2",
            paddingTop: "3%",
            paddingBottom: "3%",
          }}
        >
          <div
            style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}
          >
            <img
              src="public/fondo_form.png"
              alt="Descripción de la imagen"
              style={{ width: "20%", height: "auto" }}
            />
          </div>
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
                  <strong>Editar factor de riesgo</strong>
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
                  Nombre factor de riesgo:
                </Typography>
                <TextField
                  value={var_nombreRiesgo}
                  onChange={ (e)=> setvVar_nombreRiesgo(e.target.value)}
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
    
                <div style={{ display: "flex", justifyContent: "flex-end" , gap: "10px" }}>
                  <Button
                    sx={{ backgroundColor: "#202B52", fontFamily: "poppins" }}
                    variant="contained"
                    type="submit"
                  >
                    Guardar
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

export default CompEditarFactorRiesgo