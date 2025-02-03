import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import departamentosCiudades from "../vistas formulario/departamentosCiudades.json";

import {
  Card,
  CardContent,
  Divider,
  Box,
  FormControl,
  Checkbox,
  ListItemText,
  Select,
  MenuItem,
  Typography,
  TextField,
  Button,
  FormHelperText, Grid,
} from "@mui/material";
import { showAlert, show_alert } from "../../components/showAlert/alertFuntion"; // Asegúrate de importar las funciones

const URI_PROFESIONAL = "https://evaluacion.esumer.edu.co/api/profesional/";
const URI_PROFESIONAL_POR_ID_USUARIO = "https://evaluacion.esumer.edu.co/api/profesional/porUsuario/";

const EditarDatosProfesional = () => {
  const [id_profesionalPK, setId_profesionalPK] = useState();
  const [var_departamentoResidencia, setVar_departamentoResidencia] =
    useState("");
  const [var_ciudadResidencia, setVar_ciudadResidencia] = useState("");
  const [var_direccionResidencia, setVar_direccionResidencia] = useState("");
  const [var_estratoVivienda, setVar_estratoVivienda] = useState("");
  const [var_tipoVivienda, setVar_tipoVivienda] = useState("");
  const [var_zonaVivienda, setVar_zonaVivienda] = useState("");
  const [departamentos, setDepartamentos] = useState(
    departamentosCiudades.departamentos
  );
  const [ciudades, setCiudades] = useState([]);
  const [serviciosQueNoCuentan, setServiciosQueNoCuentan] = useState([]);
  const [selectedServiciosQueNoCuentan, setSelectedServiciosQueNoCuentan] =
    useState([]);
  const [serviciosProfesional, setServiciosProfesional] = useState([]);
  const [prevSelectedServicios, setPrevSelectedServicios] = useState([]);
  const [prevSelectedFactoresRiesgo, setPrevSelectedFactoresRiesgo] = useState(
    []
  );
  const [factoresRiesgoOptions, setFactoresRiesgoOptions] = useState([]);
  const [selectedFactoresRiesgo, setSelectedFactoresRiesgo] = useState([]);

  //Datos para los campos de la direccion
  const [direccion, setDireccion] = useState({
    tipoVia: "",
    numeroPrincipal: "",
    letraPrincipal: "",
    bisGuion: "",
    letraSecundaria: "",
    orientacion: "",
    numeroSecundario: "",
    letraAdicional: "",
    numeroFinal: "",
    orientacionFinal: "",
    detalle: "",
  });

  const [formData, setFormData] = useState({
    var_departamentoResidencia: "",
    var_ciudadResidencia: "",
    var_direccionResidencia: "",
    var_estratoVivienda: "",
    var_tipoVivienda: "",
    var_zonaVivienda: "",

  });

  // Generar las letras de la A a la Z dinámicamente
  const letras = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  // Generar los números del 1 al 200
  const numeros = Array.from({ length: 999 }, (_, i) => i + 1);

  // Función para manejar el cambio de los inputs de dirección
  const manejarCambioDireccion = async (event) => {
    const { name, value } = event.target;
    setDireccion({ ...direccion, [name]: value });

    // Construir la dirección completa
    const direccionCompleta = `${direccion.tipoVia} ${direccion.numeroPrincipal} ${direccion.letraPrincipal} ${direccion.bisGuion} ${direccion.letraSecundaria} ${direccion.orientacion} No. ${direccion.numeroSecundario} ${direccion.letraAdicional} - ${direccion.numeroFinal} ${direccion.orientacionFinal} ${direccion.detalle}`;
    setVar_direccionResidencia(direccionCompleta);

    console.log("direccionCompleta", direccionCompleta);
  };

 

  const [errorDireccionResidencia, setErrorDireccionResidencia] =
    useState(false);
  const [errorFactoresRiesgo, setErrorFactoresRiesgo] = useState(false);
  const [errorServiciosQueNoCuentan, setErrorServiciosQueNoCuentan] =
    useState(false);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // Obtener el ID desde localStorage
  const id_usuarioPK = localStorage.getItem("id_usuario");

  const actualizar = async (e) => {
    e.preventDefault();

    // Definimos los campos obligatorios a validar, incluyendo arrays
    const camposObligatorios = [
      { nombre: "direccionResidencia", valor: var_direccionResidencia },
      { nombre: "factoresRiesgo", valor: selectedFactoresRiesgo }, // Array de factores de riesgo
      { nombre: "serviciosQueNoCuentan", valor: selectedServiciosQueNoCuentan }, // Array de servicios
    ];

    // Recorremos los campos para validar que no estén vacíos
    let camposValidos = true;
    camposObligatorios.forEach((campo) => {
      // Si el campo es un array, validamos que no esté vacío
      if (Array.isArray(campo.valor)) {
        if (campo.valor.length === 0) {
          setError((prevState) => ({
            ...prevState,
            [campo.nombre]: true, // Marcamos el error para el campo específico
          }));
          camposValidos = false;
        } else {
          setError((prevState) => ({
            ...prevState,
            [campo.nombre]: false, // Eliminamos el error si el campo es válido
          }));
        }
      }
      // Si el campo es una cadena, validamos que no esté vacío o tenga solo espacios
      else if (typeof campo.valor === "string" && campo.valor.trim() === "") {
        setError((prevState) => ({
          ...prevState,
          [campo.nombre]: true, // Marcamos el error para el campo específico
        }));
        camposValidos = false;
      } else if (
        campo.valor === null ||
        campo.valor === undefined ||
        campo.valor === ""
      ) {
        setError((prevState) => ({
          ...prevState,
          [campo.nombre]: true, // Marcamos el error para el campo específico
        }));
        camposValidos = false;
      } else {
        setError((prevState) => ({
          ...prevState,
          [campo.nombre]: false, // Si el campo tiene valor, eliminamos el error
        }));
      }
    });

    if (!camposValidos) {
      // Si algún campo es inválido, mostramos la alerta y detenemos el proceso
      show_alert("Por favor, completa todos los campos obligatorios.", "info");
      return; // Detenemos el proceso si algún campo requerido está vacío
    }

    // Si todos los campos son válidos, mostramos la alerta de confirmación
    showAlert(
      {
        title: "¿Estás seguro?",
        text: "¿Deseas guardar los cambios realizados?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, guardar",
        cancelButtonText: "Cancelar",
      },
      async () => {
        try {
          // Operaciones de actualización
          await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            var_departamentoResidencia: var_departamentoResidencia,
            var_ciudadResidencia: var_ciudadResidencia,
            var_direccionResidencia: var_direccionResidencia,
            var_estratoVivienda: var_estratoVivienda,
            var_tipoVivienda: var_tipoVivienda,
            selectedFactoresRiesgo: selectedFactoresRiesgo, // Enviar los factores de riesgo seleccionados
            selectedServiciosQueNoCuentan: selectedServiciosQueNoCuentan, // Enviar los servicios seleccionados
          });
          actualizarServiciosQueNoCuentan();
          actualizarFactoresRiesgo();
          show_alert("Cambios guardados exitosamente", "success");
          navigate("/app/editarDatosProfesional");

          setTimeout(() => {
            navigate("/app/editarDatosProfesional");
          }, 1500);
        } catch (error) {
          show_alert("Error al guardar los cambios", "error");
        }
      },
      () => {
        show_alert("Cambios cancelados", "info");
      }
    );
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = async () => {
    const res = await axios.get(URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK);
    setId_profesionalPK(res.data.id_profesionalPK);
    setVar_departamentoResidencia(res.data.var_departamentoResidencia);
    setVar_ciudadResidencia(res.data.var_ciudadResidencia);
    setVar_direccionResidencia(res.data.var_direccionResidencia);
    setVar_estratoVivienda(res.data.var_estratoVivienda);
    setVar_tipoVivienda(res.data.var_tipoVivienda);
    setVar_zonaVivienda(res.data.var_zonaVivienda);
  };

  useEffect(() => {
    const departamentoSeleccionado = departamentos.find(
      (dep) => dep.nombre === var_departamentoResidencia
    );
    if (departamentoSeleccionado) {
      setCiudades(departamentoSeleccionado.ciudades);
    } else {
      setCiudades([]);
    }
  }, [var_departamentoResidencia]);

  //Definicion de las zonas de vivienda
  const zonas = ["Urbana", "Rural"];
  //Definicion de campo para el estrato
  const estratos = ["0", "1", "2", "3", "4", "5", "6"];
  //Definicion de campos para los tipos de vivienda
  const tiposVivienda = [
    "Casa",
    "Apartamento",
    "Condominio",
    "Vivienda de interés social",
    "Vivienda familiar",
  ];

  // Fetch para los servicios que no cuenta un profesional
  useEffect(() => {
    const fetchServiciosProfesional = async () => {
      if (!id_profesionalPK) return; // No se hace la solicitud si no se proporciona un id_profesionalPK

      try {
        console.log("veremos", id_profesionalPK);
        const response = await axios.get(
          `https://evaluacion.esumer.edu.co/api/profesionalServiciosQueNoCuentan/${id_profesionalPK}`
        );
        setServiciosProfesional(response.data);

        // Después de obtener los servicios, extraemos los id_servicioQueNoCuentaPK y los almacenamos en el estado de los servicios seleccionados
        const serviciosSeleccionados = response.data.map(
          (servicio) => servicio.id_servicioQueNoCuentaFK
        );
        setSelectedServiciosQueNoCuentan(serviciosSeleccionados); // Actualizamos el estado de los servicios seleccionados
      } catch (error) {
        console.error(
          "Error al obtener los servicios del profesional que no cuentan:",
          error
        );
      }
    };

    fetchServiciosProfesional();
  }, [id_profesionalPK]);

  // Fetch para los factores de riesgo de un profesional
  useEffect(() => {
    const fetchFactoresRiesgoProfesional = async () => {
      if (!id_profesionalPK) return; // No se hace la solicitud si no se proporciona un id_profesionalPK

      try {
        const response = await axios.get(
          `https://evaluacion.esumer.edu.co/api/profesionalFactoresRiesgo/${id_profesionalPK}`
        );

        console.log("esto trae es ", response.data);

        // Extraer los IDs de los factores de riesgo asociados
        const FactoresIds = response.data.map(
          (factores) => factores.id_factoresRiesgoFK
        );

        console.log("factores IDs extraídos:", FactoresIds);

        // Sincronizar el estado de los servicios seleccionados
        setSelectedFactoresRiesgo(FactoresIds);
        setPrevSelectedFactoresRiesgo(FactoresIds);

        // Sincronizar los nombres con los IDs
        const selectedNames = factoresRiesgoOptions
          .filter((factores) =>
            FactoresIds.includes(factores.id_factoresRiesgoPK)
          )
          .map((factores) => factores.var_nombreRiesgo);

        console.log("factores seleccionados por nombre:", selectedNames);
      } catch (error) {
        console.error(
          "Error al obtener los factores de riesgo del profesional:",
          error
        );
      }
    };

    fetchFactoresRiesgoProfesional();
  }, [id_profesionalPK]);

  // Fetch para los servicios que no cuentan
  useEffect(() => {
    const fetchServiciosQueNoCuentan = async () => {
      try {
        const response = await axios.get(
          "https://evaluacion.esumer.edu.co/api/serviciosQueNoCuentan/"
        );
        setServiciosQueNoCuentan(response.data);
      } catch (error) {
        console.error("Error al obtener los servicios que no cuentan:", error);
      }
    };

    fetchServiciosQueNoCuentan();
  }, []);

  

  const actualizarServiciosQueNoCuentan = async () => {
    try {
      // Eliminar servicios deseleccionados
      const serviciosParaEliminar = prevSelectedServicios.filter(
        (id_servicio) => !selectedServiciosQueNoCuentan.includes(id_servicio)
      );

      for (let id_servicio of serviciosParaEliminar) {
        await axios.delete(
          `https://evaluacion.esumer.edu.co/api/profesionalServiciosQueNoCuentan/${id_profesionalPK}/${id_servicio}`
        );
        console.log(
          `Relación eliminada: Profesional ID ${id_profesionalPK}, Servicio Que No Cuentan ID ${id_servicio}`
        );
      }

      // Agregar nuevos servicios seleccionados
      const serviciosParaAgregar = selectedServiciosQueNoCuentan.filter(
        (id_servicio) => !prevSelectedServicios.includes(id_servicio)
      );

      for (let id_servicio of serviciosParaAgregar) {
        await axios.post(
          `https://evaluacion.esumer.edu.co/api/profesionalServiciosQueNoCuentan/`,
          {
            id_profesionalFK: id_profesionalPK,
            id_servicioQueNoCuentaFK: id_servicio,
          }
        );
        console.log(
          `Relación creada: Profesional ID ${id_profesionalPK}, Servicio Que No Cuentan ID ${id_servicio}`
        );
      }

      // Actualizar el estado previo
      setPrevSelectedServicios([...selectedServiciosQueNoCuentan]);
    } catch (error) {
      console.error("Error al actualizar los servicios:", error);
    }
  };

  // fectch para los factores de riesgo
  useEffect(() => {
    const fetchFactoresRiesgo = async () => {
      try {
        const response = await axios.get(
          "https://evaluacion.esumer.edu.co/api/factoresRiesgo/"
        );
        setFactoresRiesgoOptions(response.data);
      } catch (error) {
        console.error("Error al obtener los factores de riesgo:", error);
      }
    };

    fetchFactoresRiesgo();
  }, []);

  useEffect(() => {
    if (serviciosProfesional.length > 0) {
      const serviciosSeleccionados = serviciosProfesional.map(
        (servicio) => servicio.id_servicioQueNoCuentaFK
      );
      setSelectedServiciosQueNoCuentan(serviciosSeleccionados);
      setPrevSelectedServicios(serviciosSeleccionados);
    }
  }, [serviciosProfesional]);

  const actualizarFactoresRiesgo = async () => {
    const factoresParaEliminar = prevSelectedFactoresRiesgo.filter(
      (id_factor) => !selectedFactoresRiesgo.includes(id_factor)
    );
    const factoresParaAgregar = selectedFactoresRiesgo.filter(
      (id_factor) => !prevSelectedFactoresRiesgo.includes(id_factor)
    );

    try {
      // Eliminar servicios deseleccionados
      for (let id_factor of factoresParaEliminar) {
        await axios.delete(
          `https://evaluacion.esumer.edu.co/api/profesionalFactoresRiesgo/${id_profesionalPK}/${id_factor}`
        );
        console.log(`factor eliminado: ${id_factor}`);
      }

      // Agregar nuevos servicios seleccionados
      for (let id_factor of factoresParaAgregar) {
        await axios.post("https://evaluacion.esumer.edu.co/api/profesionalFactoresRiesgo/", {
          id_profesionalFK: id_profesionalPK,
          id_factoresRiesgoFK: id_factor,
        });
        console.log(`factor agregado: ${id_factor}`);
      }

      // Actualizar el estado previo
      setPrevSelectedFactoresRiesgo(selectedFactoresRiesgo);
      console.log("Cambios guardados con éxito");
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  const validarCampoRequerido = (valor, setError) => {
    // Si el valor es un array, verificamos si tiene elementos
    if (Array.isArray(valor)) {
      if (valor.length === 0) {
        setError(true); // Marca el error si el array está vacío
        return false; // Retorna false si el array está vacío
      } else {
        setError(false); // El array tiene elementos, no hay error
        return true; // Retorna true si la validación pasa
      }
    }

    // Si el valor es un string, validamos que no esté vacío o contenga solo espacios
    if (!valor || valor.trim() === "") {
      setError(true); // Establece el error si el campo está vacío
      return false; // Retorna false si la validación falla
    } else {
      setError(false); // Si el campo tiene valor, quita el error
      return true; // Retorna true si la validación pasa
    }
  };

  return (
    <div style={{ backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%" }}>
      <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-3%" }}>
        <p> Edita la información necesaria y al final del formulario pulsa el botón GUARDAR para conservar los cambios.</p>
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

            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Departamento:</Typography>
            <TextField select name="var_departamentoResidencia" variant="outlined" value={var_departamentoResidencia} onChange={(e) => setVar_departamentoResidencia(e.target.value)}
              fullWidth sx={{ mb: 2 }}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px"
                },
              }}>
              {departamentos.map(departamento => (<MenuItem key={departamento.nombre} value={departamento.nombre}> {departamento.nombre} </MenuItem>))}
            </TextField>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Ciudad:
            </Typography>
            <TextField
              select
              name="var_ciudadResidencia"
              variant="outlined"
              value={var_ciudadResidencia}
              onChange={(e) => setVar_ciudadResidencia(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            >
              {ciudades.map((ciudad) => (
                <MenuItem key={ciudad} value={ciudad}>
                  {" "}
                  {ciudad}{" "}
                </MenuItem>
              ))}
            </TextField>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              direccion residencia:
            </Typography>
            <TextField
              value={var_direccionResidencia}
              // onChange={(e) => setVar_direccionResidencia(e.target.value)}
              onChange={(e) => {
                const valor = e.target.value;
                setVar_direccionResidencia(valor);
                // Validar si el campo está vacío al cambiar el valor
                validarCampoRequerido(valor, setErrorDireccionResidencia);
              }}
              error={errorDireccionResidencia} // Mostrar borde rojo si hay error
              helperText={
                errorDireccionResidencia ? "Este campo es obligatorio" : "" // Mensaje de error
              }
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

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Tipo de Vía:</Typography>
                <TextField select name="tipoVia" value={direccion.tipoVia} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }}>
                  {["Autopista", "Avenida", "Avenida Calle", "Avenida Carrera", "Bulevar", "Calle", "Carrera", "Circular", "Circunvalar", "Cuentas Corridas", "Diagonal", "Pasaje", "Paseo", "Peatonal", "Transversal", "Troncal", "Variante", "Via"].map(via => (
                    <MenuItem key={via} value={via}>{via}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Número Principal:</Typography>
                <TextField select name="numeroPrincipal" value={direccion.numeroPrincipal} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }}>
                  {numeros.map(numero => (
                    <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Letra:</Typography>
                <TextField select name="letraPrincipal" value={direccion.letraPrincipal} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }}>
                  {["", ...letras].map(letra => (
                    <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Bis:</Typography>
                <TextField select name="bisGuion" value={direccion.bisGuion} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }}>
                  {["", "Bis", "-"].map(bis => (
                    <MenuItem key={bis} value={bis}>{bis}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Letra Secundaria:</Typography>
                <TextField select name="letraSecundaria" value={direccion.letraSecundaria} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }}>
                  {["", ...letras].map(letra => (
                    <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Orientación:</Typography>
                <TextField select name="orientacion" value={direccion.orientacion} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }}>
                  {["", "Norte", "Sur", "Este", "Oeste"].map(orient => (
                    <MenuItem key={orient} value={orient}>{orient}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Número Secundario:</Typography>
                <TextField select name="numeroSecundario" value={direccion.numeroSecundario} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }}>
                  {numeros.map(numero => (
                    <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Letra Adicional:</Typography>
                <TextField select name="letraAdicional" value={direccion.letraAdicional} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }}>
                  {["", ...letras].map(letra => (
                    <MenuItem key={letra} value={letra}>{letra}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Número Final:</Typography>
                <TextField select name="numeroFinal" value={direccion.numeroFinal} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }} >
                  {numeros.map(numero => (
                    <MenuItem key={numero} value={numero}>{numero}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Orientación Final:</Typography>
                <TextField select name="orientacionFinal" value={direccion.orientacionFinal} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }}>
                  {["", "Norte", "Sur", "Este", "Oeste"].map(orient => (
                    <MenuItem key={orient} value={orient}>{orient}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}>Detalle de la Dirección (Ej. Edificio, Apartamento):</Typography>
                <TextField name="detalle" value={direccion.detalle} onChange={manejarCambioDireccion} fullWidth InputProps={{
                  sx: {
                    height: "40px",
                    fontFamily: "Roboto Condensed",
                    fontSize: "16px"
                  },
                }} />
              </Grid>
            </Grid>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Zona de la vivienda:
            </Typography>
            <TextField
              select
              name="var_zonaVivienda"
              value={var_zonaVivienda}
              onChange={(e) => setVar_zonaVivienda(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            >
              {zonas.map((zona) => (
                <MenuItem key={zona} value={zona}>
                  {zona}
                </MenuItem>
              ))}
            </TextField>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Tipo de Vivienda:
            </Typography>
            <TextField
              select
              name="var_tipoVivienda"
              value={var_tipoVivienda}
              onChange={(e) => setVar_tipoVivienda(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            >
              {tiposVivienda.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </TextField>
            <Typography variant="h6" sx={{ fontFamily: "Roboto Condensed" }}>
              Estrato de Vivienda:
            </Typography>
            <TextField
              select
              name="var_estratoVivienda"
              value={var_estratoVivienda}
              onChange={(e) => setVar_estratoVivienda(e.target.value)}
              sx={{ mb: 2 }}
              fullWidth
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0,
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            >
              {estratos.map((estrato) => (
                <MenuItem key={estrato} value={estrato}>
                  {estrato}
                </MenuItem>
              ))}
            </TextField>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Roboto Condensed",
                  color: "#202B52",
                  fontSize: "16px",
                }}
              >
                Seleccione los servicios con los que <strong>NO</strong> cuenta
                la vivienda (se pueden seleccionar varias opciones):
              </Typography>
              <Select
                multiple
                name="selectedServiciosQueNoCuentan"
                value={selectedServiciosQueNoCuentan}
                // onChange={(event) =>
                //   manejarCambioInput(event, "serviciosQueNoCuentan")
                // } // Pasar 'serviciosQueNoCuentan'
                onChange={(e) => {
                  const newValue = e.target.value;
                  setSelectedServiciosQueNoCuentan(newValue);
                  // Validar si el campo está vacío al cambiar el valor
                  validarCampoRequerido(
                    newValue,
                    setErrorServiciosQueNoCuentan
                  ); // Asegúrate de tener un setErrorFactoresRiesgo para manejar el estado de error
                }}
                renderValue={(selected) => {
                  const selectedNames = serviciosQueNoCuentan
                    .filter((actividad) =>
                      selected.includes(actividad.id_servicioQueNoCuentaPK)
                    )
                    .map((actividad) => {
                      const name = actividad.var_nombreServicioQueNoCuenta;
                      const index = name.indexOf("(");
                      if (index !== -1) {
                        return name.substring(0, index).trim();
                      }
                      return name;
                    });

                  return selectedNames.join(" - ");
                }}
                fullWidth
                variant="outlined"
                MenuProps={{
                  PaperProps: { style: { maxHeight: 224, width: 250 } },
                }}
                sx={{
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                }}
              >
                {serviciosQueNoCuentan.map((actividad) => (
                  <MenuItem
                    key={actividad.id_servicioQueNoCuentaPK}
                    value={actividad.id_servicioQueNoCuentaPK}
                  >
                    <Checkbox
                      checked={
                        selectedServiciosQueNoCuentan.indexOf(
                          actividad.id_servicioQueNoCuentaPK
                        ) > -1
                      }
                    />
                    <ListItemText
                      primary={actividad.var_nombreServicioQueNoCuenta}
                    />
                  </MenuItem>
                ))}
              </Select>
              {errorServiciosQueNoCuentan && (
                <FormHelperText error>Este campo es obligatorio</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Roboto Condensed",
                  color: "#202B52",
                  fontSize: "16px",
                }}
              >
                Seleccione los factores de riesgo de la vivienda (se pueden
                seleccionar varias opciones):
              </Typography>
              <Select
                multiple
                name="selectedFactoresRiesgo"
                value={selectedFactoresRiesgo}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setSelectedFactoresRiesgo(newValue);
                  // Validar si el campo está vacío al cambiar el valor
                  validarCampoRequerido(newValue, setErrorFactoresRiesgo); // Asegúrate de tener un setErrorFactoresRiesgo para manejar el estado de error
                }}
                renderValue={(selected) => {
                  const selectedNames = factoresRiesgoOptions
                    .filter((factor) =>
                      selected.includes(factor.id_factoresRiesgoPK)
                    )
                    .map((factor) => {
                      const name = factor.var_nombreRiesgo;
                      const index = name.indexOf("(");
                      if (index !== -1) {
                        return name.substring(0, index).trim();
                      }
                      return name;
                    });

                  return selectedNames.join(" - ");
                }}
                fullWidth
                variant="outlined"
                MenuProps={{
                  PaperProps: { style: { maxHeight: 224, width: 250 } },
                }}
                sx={{
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                }}
              >
                {factoresRiesgoOptions.map((factor, index) => (
                  <MenuItem key={index} value={factor.id_factoresRiesgoPK}>
                    <Checkbox
                      checked={
                        selectedFactoresRiesgo.indexOf(
                          factor.id_factoresRiesgoPK
                        ) > -1
                      }
                    />
                    <ListItemText primary={factor.var_nombreRiesgo} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{ backgroundColor: "#202B52", fontFamily: "poppins" }}
                variant="contained"
                type="submit"
              >
                Guardar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditarDatosProfesional;
