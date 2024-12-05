// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CambiarContrasena = () => {
//   const [formData, setFormData] = useState({
//     var_contrasenaNueva: "",
//     var_contrasenaConfirmada: "",
//   });
//   const [error, setError] = useState("");
//   const [mensaje, setMensaje] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCambiarContrasena = async (event) => {
//     event.preventDefault();
//     setError("");
//     setMensaje("");

//     if (formData.var_contrasenaNueva !== formData.var_contrasenaConfirmada) {
//       setError("Las contraseñas no coinciden.");
//       return;
//     }

//     try {
//       // Enviar datos de cambio de contraseña al backend
//       const response = await axios.post("http://localhost:3001/cambiarContrasena", formData);

//       if (response.data.success) {
//         setMensaje("Contraseña cambiada exitosamente.");
//         // Redirigir a la página de login o donde sea necesario
//         navigate("/login");
//       } else {
//         setError("Error al cambiar la contraseña.");
//       }
//     } catch (error) {
//       setError("Error al cambiar la contraseña.");
//     }
//   };

//   const atras = () => {
//     navigate("/login"); // O la ruta que sea necesaria
//   };

//   return (
//     <Grid container direction="column" style={{ minHeight: "100vh", backgroundColor: "#F2F2F2" }}>
//       {/* Encabezado con imagen y título */}
//       <Grid item xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
//         <Box
//           style={{
//             backgroundImage: `url('public/fondo_login.jpg')`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             width: "60%",
//             height: "34.5vh",
//             margin: "0 auto",
//             borderRadius: "10px",
//           }}
//         />
//         <Box mt={3}>
//           <img
//             src="public/logo_form.png"
//             alt="Descripción de la imagen"
//             style={{
//               width: "20%",
//               height: "auto",
//             }}
//           />
//         </Box>
//       </Grid>

//       {/* Formulario */}
//       <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
//         <Grid item xs={10} sm={8} md={4}>
//           <Card variant="outlined" style={{ backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
//             <CardContent>
//               <form onSubmit={handleCambiarContrasena}>
//                 <Typography variant="h5" align="center" color="primary" gutterBottom>
//                   Cambiar Contraseña
//                 </Typography>
//                 <TextField
//                   label="Contraseña Nueva"
//                   name="var_contrasenaNueva"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={formData.var_contrasenaNueva}
//                   onChange={handleChange}
//                   style={{ backgroundColor: "#F2F2F2" }}
//                 />
//                 <TextField
//                   label="Confirmar Contraseña"
//                   name="var_contrasenaConfirmada"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={formData.var_contrasenaConfirmada}
//                   onChange={handleChange}
//                   style={{ backgroundColor: "#F2F2F2" }}
//                 />
//                 {error && (
//                   <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
//                     {error}
//                   </Typography>
//                 )}
//                 {mensaje && (
//                   <Typography color="primary" variant="body2" align="center" sx={{ mt: 1 }}>
//                     {mensaje}
//                   </Typography>
//                 )}
//                 <Box mt={2}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     style={{ backgroundColor: "#202B52" }}
//                     fullWidth
//                   >
//                     Cambiar Contraseña
//                   </Button>
//                 </Box>
//                 <Box mt={2}>
//                   <Button
//                     variant="contained"
//                     style={{ backgroundColor: "#00A5CE" }}
//                     fullWidth
//                     onClick={atras}
//                   >
//                     Atrás
//                   </Button>
//                 </Box>
//               </form>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default CambiarContrasena;




// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Box,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";  // Importa useLocation
// import axios from "axios";

// const CambiarContrasena = () => {
//   const [formData, setFormData] = useState({
//     var_contrasenaNueva: "",
//     var_contrasenaConfirmada: "",
//   });
//   const [error, setError] = useState("");
//   const [mensaje, setMensaje] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation(); // Usar useLocation para acceder a la URL
//   const [userId, setUserId] = useState(null); // Estado para almacenar el id del usuario

//   useEffect(() => {
//     // Recuperar el id del usuario de la URL
//     const queryParams = new URLSearchParams(location.search); // Obtener los parámetros de consulta
//     const id = queryParams.get("id"); // Extraer el id
//     if (id) {
//       setUserId(id); // Establecer el id en el estado
//       console.log("ID del usuario:", id); // Mostrar el id en la consola
//     }
//   }, [location]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleCambiarContrasena = async (event) => {
//     event.preventDefault();
//     setError("");
//     setMensaje("");

//     if (formData.var_contrasenaNueva !== formData.var_contrasenaConfirmada) {
//       setError("Las contraseñas no coinciden.");
//       return;
//     }

//     try {
//       // Incluir el id del usuario en los datos al enviarlos al backend
//       const response = await axios.post("http://localhost:3001/cambiarContrasena", {
//         ...formData,
//         userId, // Enviar el id junto con las contraseñas
//       });

//       if (response.data.success) {
//         setMensaje("Contraseña cambiada exitosamente.");
//         // Redirigir a la página de login o donde sea necesario
//         navigate("/login");
//       } else {
//         setError("Error al cambiar la contraseña.");
//       }
//     } catch (error) {
//       setError("Error al cambiar la contraseña.");
//     }
//   };

//   const atras = () => {
//     navigate("/login"); // O la ruta que sea necesaria
//   };

//   return (
//     <Grid container direction="column" style={{ minHeight: "100vh", backgroundColor: "#F2F2F2" }}>
//       {/* Encabezado con imagen y título */}
//       <Grid item xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
//         <Box
//           style={{
//             backgroundImage: `url('public/fondo_login.jpg')`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             width: "60%",
//             height: "34.5vh",
//             margin: "0 auto",
//             borderRadius: "10px",
//           }}
//         />
//         <Box mt={3}>
//           <img
//             src="public/logo_form.png"
//             alt="Descripción de la imagen"
//             style={{
//               width: "20%",
//               height: "auto",
//             }}
//           />
//         </Box>
//       </Grid>

//       {/* Formulario */}
//       <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
//         <Grid item xs={10} sm={8} md={4}>
//           <Card variant="outlined" style={{ backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
//             <CardContent>
//               <form onSubmit={handleCambiarContrasena}>
//                 <Typography variant="h5" align="center" color="primary" gutterBottom>
//                   Cambiar Contraseña
//                 </Typography>
//                 <TextField
//                   label="Contraseña Nueva"
//                   name="var_contrasenaNueva"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={formData.var_contrasenaNueva}
//                   onChange={handleChange}
//                   style={{ backgroundColor: "#F2F2F2" }}
//                 />
//                 <TextField
//                   label="Confirmar Contraseña"
//                   name="var_contrasenaConfirmada"
//                   type="password"
//                   variant="outlined"
//                   fullWidth
//                   margin="normal"
//                   value={formData.var_contrasenaConfirmada}
//                   onChange={handleChange}
//                   style={{ backgroundColor: "#F2F2F2" }}
//                 />
//                 {error && (
//                   <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
//                     {error}
//                   </Typography>
//                 )}
//                 {mensaje && (
//                   <Typography color="primary" variant="body2" align="center" sx={{ mt: 1 }}>
//                     {mensaje}
//                   </Typography>
//                 )}
//                 <Box mt={2}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     style={{ backgroundColor: "#202B52" }}
//                     fullWidth
//                   >
//                     Cambiar Contraseña
//                   </Button>
//                 </Box>
//                 <Box mt={2}>
//                   <Button
//                     variant="contained"
//                     style={{ backgroundColor: "#00A5CE" }}
//                     fullWidth
//                     onClick={atras}
//                   >
//                     Atrás
//                   </Button>
//                 </Box>
//               </form>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default CambiarContrasena;




// import React, { useState, useEffect } from "react";
// import {
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     TextField,
//     Button,
//     Box,
// } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom"; // Importa useLocation
// import axios from "axios";

// const CambiarContrasena = () => {
//     const [formData, setFormData] = useState({
//         var_contrasenaNueva: "",
//         var_contrasenaConfirmada: "",
//     });
//     const [error, setError] = useState("");
//     const [mensaje, setMensaje] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation(); // Usar useLocation para acceder a la URL
//     const [userId, setUserId] = useState(null); // Estado para almacenar el id del usuario

//     useEffect(() => {
//         // Recuperar el id del usuario de la URL
//         const queryParams = new URLSearchParams(location.search); // Obtener los parámetros de consulta
//         const id = queryParams.get("id"); // Extraer el id
//         if (id) {
//             setUserId(id); // Establecer el id en el estado
//             console.log("ID del usuario:", id); // Mostrar el id en la consola
//         }
//     }, [location]);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleCambiarContrasena = async (event) => {
//         event.preventDefault();
//         setError("");
//         setMensaje("");

//         if (formData.var_contrasenaNueva !== formData.var_contrasenaConfirmada) {
//             setError("Las contraseñas no coinciden.");
//             return;
//         }

//         try {
//             // Verificar que el id esté disponible
//             if (!userId) {
//                 setError("ID de usuario no encontrado.");
//                 return;
//             }

//             // Realizar la solicitud PUT para actualizar la contraseña
//             const response = await axios.put(`http://localhost:3001/usuarios/${userId}`, {
//                 var_contrasena: formData.var_contrasenaNueva // Enviar solo la nueva contraseña
//             });

//             if (response.data.success) {
//                 setMensaje("Contraseña cambiada exitosamente.");
//                 // Redirigir a la página de login o donde sea necesario
//                 navigate("/login");
//             } else {
//                 setError("Error al cambiar la contraseña.");
//             }
//         } catch (error) {
//             setError("Error al cambiar la contraseña.");
//         }
//     };

//     const atras = () => {
//         navigate("/login"); // O la ruta que sea necesaria
//     };

//     return (
//         <Grid container direction="column" style={{ minHeight: "100vh", backgroundColor: "#F2F2F2" }}>
//             {/* Encabezado con imagen y título */}
//             <Grid item xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
//                 <Box
//                     style={{
//                         backgroundImage: `url('public/fondo_login.jpg')`,
//                         backgroundSize: "cover",
//                         backgroundPosition: "center",
//                         width: "60%",
//                         height: "34.5vh",
//                         margin: "0 auto",
//                         borderRadius: "10px",
//                     }}
//                 />
//                 <Box mt={3}>
//                     <img
//                         src="public/logo_form.png"
//                         alt="Descripción de la imagen"
//                         style={{
//                             width: "20%",
//                             height: "auto",
//                         }}
//                     />
//                 </Box>
//             </Grid>

//             {/* Formulario */}
//             <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
//                 <Grid item xs={10} sm={8} md={4}>
//                     <Card variant="outlined" style={{ backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
//                         <CardContent>
//                             <form onSubmit={handleCambiarContrasena}>
//                                 <Typography variant="h5" align="center" color="primary" gutterBottom>
//                                     Cambiar Contraseña
//                                 </Typography>
//                                 <TextField
//                                     label="Contraseña Nueva"
//                                     name="var_contrasenaNueva"
//                                     type="password"
//                                     variant="outlined"
//                                     fullWidth
//                                     margin="normal"
//                                     value={formData.var_contrasenaNueva}
//                                     onChange={handleChange}
//                                     style={{ backgroundColor: "#F2F2F2" }}
//                                 />
//                                 <TextField
//                                     label="Confirmar Contraseña"
//                                     name="var_contrasenaConfirmada"
//                                     type="password"
//                                     variant="outlined"
//                                     fullWidth
//                                     margin="normal"
//                                     value={formData.var_contrasenaConfirmada}
//                                     onChange={handleChange}
//                                     style={{ backgroundColor: "#F2F2F2" }}
//                                 />
//                                 {error && (
//                                     <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
//                                         {error}
//                                     </Typography>
//                                 )}
//                                 {mensaje && (
//                                     <Typography color="primary" variant="body2" align="center" sx={{ mt: 1 }}>
//                                         {mensaje}
//                                     </Typography>
//                                 )}
//                                 <Box mt={2}>
//                                     <Button
//                                         type="submit"
//                                         variant="contained"
//                                         style={{ backgroundColor: "#202B52" }}
//                                         fullWidth
//                                     >
//                                         Cambiar Contraseña
//                                     </Button>
//                                 </Box>
//                                 <Box mt={2}>
//                                     <Button
//                                         variant="contained"
//                                         style={{ backgroundColor: "#00A5CE" }}
//                                         fullWidth
//                                         onClick={atras}
//                                     >
//                                         Atrás
//                                     </Button>
//                                 </Box>
//                             </form>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Grid>
//     );
// };

// export default CambiarContrasena;




import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; // Importa useLocation
import axios from "axios";

const CambiarContrasena = () => {
  const [formData, setFormData] = useState({
    var_contrasenaNueva: "",
    var_contrasenaConfirmada: "",
  });
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // Usar useLocation para acceder a la URL
  const [userId, setUserId] = useState(null); // Estado para almacenar el id del usuario

  useEffect(() => {
    // Recuperar el id del usuario de la URL
    const queryParams = new URLSearchParams(location.search); // Obtener los parámetros de consulta
    const id = queryParams.get("id"); // Extraer el id
    console.log("URL queryParams:", queryParams.toString()); // Mostrar los parámetros de la URL
    console.log("ID extraído de la URL:", id); // Ver el id que obtenemos de la URL
    if (id) {
      setUserId(id); // Establecer el id en el estado
      console.log("ID del usuario establecido:", id); // Verificar que el id ha sido establecido
    }
  }, [location]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log("Datos del formulario:", formData); // Ver los datos del formulario cada vez que cambian
  };

  const handleCambiarContrasena = async (event) => {
    event.preventDefault();
    setError("");
    setMensaje("");

    if (formData.var_contrasenaNueva !== formData.var_contrasenaConfirmada) {
      setError("Las contraseñas no coinciden.");
      console.log("Las contraseñas no coinciden");
      return;
    }

    // Verificar que el id esté disponible
    if (!userId) {
      setError("ID de usuario no encontrado.");
      console.log("ID de usuario no encontrado.");
      return;
    }

    console.log("Realizando solicitud PUT a la URL:", `http://localhost:3001/usuarios/${userId}`);
    console.log("Datos que se enviarán:", { var_contrasena: formData.var_contrasenaNueva });

    try {
      // Realizar la solicitud PUT para actualizar la contraseña
      const response = await axios.put(`http://localhost:3001/usuarios/${userId}`, {
        var_contrasena: formData.var_contrasenaNueva, // Enviar solo la nueva contraseña
      });

      console.log("Respuesta del servidor:", response); // Ver la respuesta del servidor

      if (response.data.success) {
        setMensaje("Contraseña cambiada exitosamente.");
        console.log("Contraseña cambiada exitosamente");
        // Redirigir a la página de login o donde sea necesario
        navigate("/login");
      } else {
        setError("Error al cambiar la contraseña.");
        console.log("Error al cambiar la contraseña:", response.data.message); // Si el servidor devuelve un mensaje de error
      }
    } catch (error) {
      setError("Error al cambiar la contraseña.");
      console.error("Error al realizar la solicitud PUT:", error); // Ver el error de la solicitud
    }
  };

  const atras = () => {
    navigate("/login"); // O la ruta que sea necesaria
  };

  return (
    <Grid container direction="column" style={{ minHeight: "100vh", backgroundColor: "#F2F2F2" }}>
      {/* Encabezado con imagen y título */}
      <Grid item xs={12} style={{ textAlign: "center", marginBottom: "20px" }}>
        <Box
          style={{
            backgroundImage: `url('public/fondo_login.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "60%",
            height: "34.5vh",
            margin: "0 auto",
            borderRadius: "10px",
          }}
        />
        <Box mt={3}>
          <img
            src="public/logo_form.png"
            alt="Descripción de la imagen"
            style={{
              width: "20%",
              height: "auto",
            }}
          />
        </Box>
      </Grid>

      {/* Formulario */}
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        <Grid item xs={10} sm={8} md={4}>
          <Card variant="outlined" style={{ backgroundColor: "#F2F2F2", borderColor: "#202B52" }}>
            <CardContent>
              <form onSubmit={handleCambiarContrasena}>
                <Typography variant="h5" align="center" color="primary" gutterBottom>
                  Cambiar Contraseña
                </Typography>
                <TextField
                  label="Contraseña Nueva"
                  name="var_contrasenaNueva"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.var_contrasenaNueva}
                  onChange={handleChange}
                  style={{ backgroundColor: "#F2F2F2" }}
                />
                <TextField
                  label="Confirmar Contraseña"
                  name="var_contrasenaConfirmada"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.var_contrasenaConfirmada}
                  onChange={handleChange}
                  style={{ backgroundColor: "#F2F2F2" }}
                />
                {error && (
                  <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                    {error}
                  </Typography>
                )}
                {mensaje && (
                  <Typography color="primary" variant="body2" align="center" sx={{ mt: 1 }}>
                    {mensaje}
                  </Typography>
                )}
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#202B52" }}
                    fullWidth
                  >
                    Cambiar Contraseña
                  </Button>
                </Box>
                <Box mt={2}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#00A5CE" }}
                    fullWidth
                    onClick={atras}
                  >
                    Atrás
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CambiarContrasena;
