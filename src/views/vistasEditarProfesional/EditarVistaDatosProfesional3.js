import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Divider,
  MenuItem,
  Checkbox,
  RadioGroup,
  Radio,
  FormControlLabel,
  ListItemText,
  FormControl,
  Select,
  Box,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { showAlert, show_alert } from "../../components/showAlert/alertFuntion"; // Asegúrate de importar las funciones

const URI_PROFESIONAL = "https://evaluacion.esumer.edu.co/api/profesional/";
const URI_PROFESIONAL_POR_ID_USUARIO =
  "https://evaluacion.esumer.edu.co/api/profesional/porUsuario/";

const EditarDatosProfesional3 = () => {
  const [id_profesionalPK, setId_profesionalPK] = useState();
  const [id_epsFK, setId_epsFK] = useState();
  const [id_fondoPensionFK, setId_fondoPensionFK] = useState("");
  const [boolean_cambioEpsOArl, setBoolean_cambioEpsOArl] = useState("");
  const [epsOptions, setEpsOptions] = useState([]);
  const [selectedEps, setSelectedEps] = useState("");
  const [fondoPensionOptions, setFondoPensionOptions] = useState([]);
  const [selectedFondoPension, setSelectedFondoPension] = useState("");
  const [serviciosSaludAdicionalOptions, setServiciosSaludAdicionalOptions] =
    useState([]);
  const [selectedServiciosSaludAdicional, setSelectedServiciosSaludAdicional] =
    useState([]);
  const [
    prevSelectedServiciosSaludAdicional,
    setPrevSelectedServiciosSaludAdicional,
  ] = useState([]);
  const [antecedentesOptions, setAntecedentesOptions] = useState([]);
  const [selectedAntecedentes, setSelectedAntecedentes] = useState([]);
  const [prevSelectedAntecedentesMedicos, setPrevSelectedAntecedentesMedicos] =
    useState([]);

  const navigate = useNavigate();

  // Obtener el ID desde localStorage
  const id_usuarioPK = localStorage.getItem("id_usuario");
  const [error, setError] = useState(false);
  const [errorServiciosSaludAdicional, setErrorServiciosSaludAdicional] =
    useState(false);
  const [errorAntecedenteMedico, setErrorAntecedenteMedico] = useState(false);

  // Procedimiento para actualizar
  const actualizar = async (e) => {
    e.preventDefault();

    // Definimos los campos obligatorios a validar, incluyendo arrays
    const camposObligatorios = [
      {
        nombre: "selectedServiciosSaludAdicional",valor: selectedServiciosSaludAdicional,},
      { nombre: "selectedAntecedentes", valor: selectedAntecedentes }
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
          await axios.put(URI_PROFESIONAL + id_profesionalPK, {
            id_epsFK: id_epsFK,
            id_fondoPensionFK: id_fondoPensionFK,
            boolean_cambioEpsOArl: boolean_cambioEpsOArl,
          });
          serviciosDeSalud();
          //   actualizarFactoresRiesgo();
          show_alert("Cambios guardados exitosamente", "success");
          navigate("/app/editarDatosProfesional3");
        } catch (error) {
          show_alert("Error al guardar los cambios", "error");
        }
      },
      () => {
        show_alert("Cambios cancelados", "info");
      }
    );
  };

  // Hacer la solicitud para obtener las EPS al cargar el componente
  useEffect(() => {
    // Cargar las opciones de EPS al montar el componente
    const fetchEps = async () => {
      try {
        const response = await axios.get(
          "https://evaluacion.esumer.edu.co/api/eps/"
        );
        setEpsOptions(response.data);
      } catch (error) {
        console.error("Error al obtener las EPS:", error);
      }
    };

    fetchEps();
  }, []);

  // Hacer la solicitud para obtener los fondos de pensión
  useEffect(() => {
    const fetchFondosPension = async () => {
      try {
        const response = await axios.get(
          "https://evaluacion.esumer.edu.co/api/fondoPension/"
        );
        setFondoPensionOptions(response.data); // Guardamos las opciones en el estado
      } catch (error) {
        console.error("Error al obtener los fondos de pensión:", error);
      }
    };
    fetchFondosPension();
  }, []);
  // Hacer la solicitud para obtener los servicios de salud adicional
  useEffect(() => {
    const fetchServiciosSaludAdicional = async () => {
      try {
        const response = await axios.get(
          "https://evaluacion.esumer.edu.co/api/servicioSaludAdicional/"
        );
        setServiciosSaludAdicionalOptions(response.data);
      } catch (error) {
        console.error(
          "Error al obtener los servicios de salud adicional:",
          error
        );
      }
    };
    fetchServiciosSaludAdicional();
  }, []);

  // Hacer la solicitud para obtener los antecedentes médicos
  useEffect(() => {
    const fetchAntecedentes = async () => {
      try {
        const response = await axios.get(
          "https://evaluacion.esumer.edu.co/api/antecedentesMedicos/"
        );
        setAntecedentesOptions(response.data);
      } catch (error) {
        console.error("Error al obtener los antecedentes médicos:", error);
      }
    };

    fetchAntecedentes();
  }, []);

  // Manejar cambios de selección en el estado local
  const manejarCambioServicios = (event) => {
    const { value } = event.target;
    setSelectedServiciosSaludAdicional(value);
  };

  const manejarCambioAntecedentes = (event) => {
    const { value } = event.target;
    setSelectedAntecedentes(value);
  };

  // Cuando los servicios asociados al profesional se obtienen correctamente
  const fetchServiciosProfesional = async () => {
    try {
      // Obtener los servicios asociados al profesional
      const response = await axios.get(
        `https://evaluacion.esumer.edu.co/api/profesionalServicioSaludAdicional/${id_profesionalPK}`
      );

      // Extraer los IDs de los servicios asociados
      const serviciosIds = response.data.map(
        (servicio) => servicio.id_ServicioDeSaludAdicionalFK
      );

      console.log("Servicios IDs extraídos:", serviciosIds);

      // Sincronizar el estado de los servicios seleccionados
      setSelectedServiciosSaludAdicional(serviciosIds);
      setPrevSelectedServiciosSaludAdicional(serviciosIds);

      // Sincronizar los nombres con los IDs
      const selectedNames = serviciosSaludAdicionalOptions
        .filter((servicio) =>
          serviciosIds.includes(servicio.id_servicioDeSaludAdicionalPK)
        )
        .map((servicio) => servicio.var_nombreServicioDeSaludAdicional);

      console.log("Servicios seleccionados por nombre:", selectedNames); // Verifica los nombres
    } catch (error) {
      console.error(
        "Error al obtener los servicios de salud adicional del profesional:",
        error
      );
    }
  };

  // Cuando los antecedes asociados al profesional se obtienen correctamente
  const fetchAntecedentesMedicos = async () => {
    try {
      // Obtener los servicios asociados al profesional
      const response = await axios.get(
        `https://evaluacion.esumer.edu.co/api/profesionalAntecedenteMedico/${id_profesionalPK}`
      );

      // Extraer los IDs de los servicios asociados
      const antecedentesIds = response.data.map(
        (antecedente) => antecedente.id_antecedenteMedicoFK
      );

      console.log("antecedentes IDs extraídos:", antecedentesIds);

      // Sincronizar el estado de los servicios seleccionados
      setSelectedAntecedentes(antecedentesIds);
      setPrevSelectedAntecedentesMedicos(antecedentesIds);

      // Sincronizar los nombres con los IDs
      const selectedNames = antecedentesOptions
        .filter((antecedente) =>
          antecedentesIds.includes(antecedente.id_antecedenteMedicoPK)
        )
        .map((antecedente) => antecedente.var_nombreAntecedenteMedico);

      console.log("antecedentes seleccionados por nombre:", selectedNames); // Verifica los nombres
    } catch (error) {
      console.error(
        "Error al obtener los antecedentes medicos del profesional:",
        error
      );
    }
  };

  useEffect(() => {
    // Esperar a que las opciones de EPS estén cargadas y luego obtener el usuario
    if (epsOptions.length > 0) {
      getUsuarios();
    }

    // Esperar a que las opciones de fondo de pension estén cargadas y luego obtener el usuario
    if (fondoPensionOptions.length > 0) {
      getUsuarios();
    }

    // Inicializar el estado previo con los servicios ya asociados al profesional
    if (id_profesionalPK) {
      fetchServiciosProfesional();
    }

    if (antecedentesOptions.length > 0 && id_profesionalPK) {
      fetchAntecedentesMedicos();
    }
  }, [epsOptions, fondoPensionOptions, id_profesionalPK, antecedentesOptions]);

  useEffect(() => {
    // Asegúrate de que el valor inicial sea un array vacío
    setSelectedAntecedentes([]);
  }, []);

  const getUsuarios = async () => {
    try {
      const res = await axios.get(
        URI_PROFESIONAL_POR_ID_USUARIO + id_usuarioPK
      );
      setId_profesionalPK(res.data.id_profesionalPK);
      setId_epsFK(res.data.id_epsFK);
      setId_fondoPensionFK(res.data.id_fondoPensionFK);
      setBoolean_cambioEpsOArl(res.data.boolean_cambioEpsOArl);

      // Buscar la EPS por id_epsFK y sincronizar el valor inicial
      const selected = epsOptions.find(
        (eps) => eps.id_epsPK === res.data.id_epsFK
      );
      if (selected) {
        setSelectedEps(selected.id_epsPK); // Ajustar `selectedEps` al valor inicial
      }

      // Buscar el fondo de pensión por id_fondoPensionFK y sincronizar el valor inicial
      const selectedFondo = fondoPensionOptions.find(
        (fondo) => fondo.id_fondoPensionPK === res.data.id_fondoPensionFK
      );
      if (selectedFondo) {
        setSelectedFondoPension(selectedFondo.id_fondoPensionPK);
      }
    } catch (error) {
      console.error("Error al obtener los datos del profesional:", error);
    }
  };

  // Guardar cambios en el servidor
  const serviciosDeSalud = async () => {
    const serviciosParaEliminar = prevSelectedServiciosSaludAdicional.filter(
      (id_servicio) => !selectedServiciosSaludAdicional.includes(id_servicio)
    );
    const serviciosParaAgregar = selectedServiciosSaludAdicional.filter(
      (id_servicio) =>
        !prevSelectedServiciosSaludAdicional.includes(id_servicio)
    );

    const antecedenteParaEliminar = prevSelectedAntecedentesMedicos.filter(
      (id_antecedente) => !selectedAntecedentes.includes(id_antecedente)
    );
    const antecedenteParaAgregar = selectedAntecedentes.filter(
      (id_antecedente) =>
        !prevSelectedAntecedentesMedicos.includes(id_antecedente)
    );

    try {
      // Eliminar servicios deseleccionados
      for (let id_servicio of serviciosParaEliminar) {
        await axios.delete(
          `https://evaluacion.esumer.edu.co/api/profesionalServicioSaludAdicional/${id_profesionalPK}/${id_servicio}`
        );
        console.log(`Servicio eliminado: ${id_servicio}`);
      }

      // Agregar nuevos servicios seleccionados
      for (let id_servicio of serviciosParaAgregar) {
        await axios.post(
          "https://evaluacion.esumer.edu.co/api/profesionalServicioSaludAdicional/",
          {
            id_profesionalFK: id_profesionalPK,
            id_ServicioDeSaludAdicionalFK: id_servicio,
          }
        );
        console.log(`Servicio agregado: ${id_servicio}`);
      }

      // Actualizar el estado previo
      setPrevSelectedServiciosSaludAdicional(selectedServiciosSaludAdicional);
      console.log("Cambios guardados con éxito");

      //-----------------

      // Eliminar antecedentes deseleccionados
      for (let id_antecedente of antecedenteParaEliminar) {
        await axios.delete(
          `https://evaluacion.esumer.edu.co/api/profesionalAntecedenteMedico/${id_profesionalPK}/${id_antecedente}`
        );
        console.log(`antecedente eliminado: ${id_antecedente}`);
      }

      // Agregar nuevos servicios seleccionados
      for (let id_antecedente of antecedenteParaAgregar) {
        await axios.post(
          "https://evaluacion.esumer.edu.co/api/profesionalAntecedenteMedico/",
          {
            id_profesionalFK: id_profesionalPK,
            id_antecedenteMedicoFK: id_antecedente,
          }
        );
        console.log(`antecedente agregado: ${id_antecedente}`);
      }

      // Actualizar el estado previo
      setPrevSelectedAntecedentesMedicos(selectedAntecedentes);
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

                        <FormControl sx={{ mb: 2 }} >
                            <Typography
                                variant="h6"
                                sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
                            >
                                ¿Ha cambiado de EPS o AFP?:
                            </Typography>
                            <RadioGroup
                                row
                                value={boolean_cambioEpsOArl}
                                onChange={(e) => setBoolean_cambioEpsOArl(e.target.value)}

                                sx={{
                                    height: "40px",
                                    fontFamily: "Roboto Condensed",
                                    fontSize: "16px",
                                }}
                            >
                                <FormControlLabel value={true} control={<Radio />} label="Sí" />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="No"
                                />
                            </RadioGroup>

                           
                        </FormControl>

            <Typography
              variant="h6"
              sx={{
                fontFamily: "Roboto Condensed",
                color: "#202B52",
                fontSize: "16px",
              }}
            >
              Seleccione EPS <strong>ACTUAL</strong>:
            </Typography>
            <TextField
              select
              value={selectedEps} // Sincronizado con el estado
              name="selectedEps"
              onChange={(e) => {
                setSelectedEps(e.target.value);
                setId_epsFK(e.target.value); // También actualiza el id_epsFK
              }}
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            >
              {epsOptions.map((eps) => (
                <MenuItem key={eps.id_epsPK} value={eps.id_epsPK}>
                  {eps.var_nombreEps}
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
                Seleccione Fondo de Pensión:
              </Typography>
              <Select
                name="selectedFondoPension"
                value={selectedFondoPension}
                onChange={(e) => {
                  setSelectedFondoPension(e.target.value);
                  setId_fondoPensionFK(e.target.value);
                }}
                sx={{
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                }}
              >
                {fondoPensionOptions.map((fondo) => (
                  <MenuItem
                    key={fondo.id_fondoPensionPK}
                    value={fondo.id_fondoPensionPK}
                  >
                    {fondo.var_nombreFondoPension}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ mb: 2 }} fullWidth>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Roboto Condensed",
                  color: "#202B52",
                  fontSize: "16px",
                }}
              >
                Seleccione los servicios de salud adicional (se pueden
                seleccionar varias opciones):
              </Typography>
              <Select
                name="selectedServiciosSaludAdicional"
                multiple
                value={selectedServiciosSaludAdicional}
                onChang={manejarCambioServicios}
                onChange={(e) => {
                  const valor = e.target.value;
                  setSelectedServiciosSaludAdicional(valor);
                  // Validar si el campo está vacío al cambiar el valor
                  validarCampoRequerido(valor, setErrorServiciosSaludAdicional);
                }}
                renderValue={(selected) => {
                  const selectedNames = serviciosSaludAdicionalOptions
                    .filter((servicio) =>
                      selected.includes(servicio.id_servicioDeSaludAdicionalPK)
                    )
                    .map(
                      (servicio) => servicio.var_nombreServicioDeSaludAdicional
                    );
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
                {serviciosSaludAdicionalOptions.map((servicio) => (
                  <MenuItem
                    key={servicio.id_servicioDeSaludAdicionalPK}
                    value={servicio.id_servicioDeSaludAdicionalPK}
                  >
                    <Checkbox
                      checked={
                        selectedServiciosSaludAdicional.indexOf(
                          servicio.id_servicioDeSaludAdicionalPK
                        ) > -1
                      }
                    />
                    <ListItemText
                      primary={servicio.var_nombreServicioDeSaludAdicional}
                    />
                  </MenuItem>
                ))}
              </Select>
              {errorServiciosSaludAdicional && (
                <FormHelperText error>Este campo es obligatorio</FormHelperText>
              )}
            </FormControl>

            <FormControl sx={{ mb: 2 }} fullWidth>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "Roboto Condensed",
                  color: "#202B52",
                  fontSize: "16px",
                }}
              >
                Seleccione Antecedentes Médicos (se pueden seleccionar varias
                opciones):
              </Typography>

              <Select
                name="antecedentes"
                multiple
                value={selectedAntecedentes}
                onChang={manejarCambioAntecedentes}
                onChange={(e) => {
                  const valor = e.target.value;
                  setSelectedAntecedentes(valor);
                  // Validar si el campo está vacío al cambiar el valor
                  validarCampoRequerido(valor, setErrorAntecedenteMedico);
                }}
                renderValue={(selected) => {
                  const selectedNames = antecedentesOptions
                    .filter((antecedente) =>
                      selected.includes(antecedente.id_antecedenteMedicoPK)
                    )
                    .map(
                      (antecedente) => antecedente.var_nombreAntecedenteMedico
                    );

                  return selectedNames.join(" - "); // Unir los nombres con un guion
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
                {antecedentesOptions.map((antecedente) => (
                  <MenuItem
                    key={antecedente.id_antecedenteMedicoPK}
                    value={antecedente.id_antecedenteMedicoPK}
                  >
                    <Checkbox
                      checked={
                        selectedAntecedentes.indexOf(
                          antecedente.id_antecedenteMedicoPK
                        ) > -1
                      }
                    />

                    <ListItemText
                      primary={antecedente.var_nombreAntecedenteMedico}
                    />
                  </MenuItem>
                ))}
              </Select>
              {errorAntecedenteMedico && (
                <FormHelperText error>Este campo es obligatorio</FormHelperText>
              )}
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

export default EditarDatosProfesional3;
