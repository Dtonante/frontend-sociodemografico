import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";


const URI_ROL = 'http://localhost:3001/roles/'

const CompEditarRol = () => {
    const [var_nombreRol, setVar_nombreRol] = useState('')
    const navigate = useNavigate()
    const {id_rolPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_ROL+id_rolPK, {
            var_nombreRol: var_nombreRol
        })
        navigate('/app/roles')
    }

    useEffect( ()=>{
        getRol()
    }, [])


    const handleGoBack = () => {
        navigate("/app/roles");
    };

    const getRol = async ()=> {
        const res = await axios.get(URI_ROL+id_rolPK)
        setVar_nombreRol(res.data.var_nombreRol)
    }
    return (
        <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
            <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }}>
                <img src="public/fondo_form.png" alt="Descripción de la imagen" style={{ width: "20%", height: "auto" }} />
            </div>
            <Card variant="outlined" sx={{ p: 0, width: "100%", maxWidth: 800, margin: "auto", backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "30px", fontWeight: "500", textAlign: "center", color: "#202B52", fontFamily: "poppins" }}>
                            <strong>Editar Rol</strong>
                        </Typography>
                    </Box>
                </Box>
                <Divider style={{ marginLeft: "5%", marginRight: "5%", borderColor: "#202B52" }} />
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={actualizar}>
    
                        <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Nombre del Rol:</Typography>
                        <TextField
                            value={var_nombreRol}
                            onChange={(e) => setVar_nombreRol(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                            InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" } }}
                        />
    
                        <div style={{ display: "flex", justifyContent: "flex-end", gap:"10px" }}>
                            <Button sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }} variant="contained" type="submit">
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
    )
    

}

export default CompEditarRol