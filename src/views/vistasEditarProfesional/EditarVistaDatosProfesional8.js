import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

const URI_PROFESIONAL = 'http://localhost:3001/profesional/';
const URI_PROFESIONAL_POR_ID_USUARIO = 'http://localhost:3001/profesional/porUsuario/';

const editarDatosProfesional8 = () => {
    const [id_profesionalPK, setId_profesionalPK]= useState()
    const [set_mediosTransportePublico, setSet_mediosTransportePublico]= useState()
   
    const navigate = useNavigate();

    // Obtener el ID desde localStorage
    const id_usuarioPK = localStorage.getItem('id_usuario');

    // Procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault();
        await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            set_mediosTransportePublico: set_mediosTransportePublico,
         

        });
        navigate('/app/editarDatosProfesional8');
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    const getUsuarios = async () => {
        const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
        setId_profesionalPK(res.data.id_profesionalPK);
        setSet_mediosTransportePublico(res.data.set_mediosTransportePublico);
      
       

    };
    
    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}>
                <img src="public/fondo_form.png" alt="Descripción de la imagen" style={{ width: "20%", height: "auto" }} />
            </div>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center", color: "#202B52", fontFamily: "Roboto Condensed" }}>
                            <strong>Datos personales</strong>
                        </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: "5%", marginRight: "5%", borderColor: "#202B52" }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={actualizar}>

                    <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>¿Ha cambiado de EPS o AFP?:</Typography>
                        <TextField
                            value={set_mediosTransportePublico}
                            onChange={(e) => setSet_mediosTransportePublico(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />
                    

                        


                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );


}

export default editarDatosProfesional8