import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  RadioGroup,
  Radio,
  FormControl,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VistaDatosUsuario = () => {
  const [formData, setFormData] = React.useState({
    id_rolFK: 2,
    boolean_estado: true,
    var_nombreCompleto: "",
    int_tipoDocumentoFK: "",
    var_numeroDocumento: "",
    var_genero: "",
    var_correoElectronicoPersonal: "",
    var_rh: "",
    var_grupoEtnico: "",
    date_fechaNacimiento: "",
    var_celular: "",
    var_telefonoFijo: "",
    var_contrasena: "",
    confirmar_contrasena: "",
  });
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const porcentajeProgreso = 15;

  // Validaciones basadas en los campos tocados
  useEffect(() => {
    const nuevosErrores = {};

    // Validación nombre completo
    if (
      touchedFields.var_nombreCompleto &&
      !formData.var_nombreCompleto.trim()
    ) {
      nuevosErrores.var_nombreCompleto = "El nombre completo es obligatorio";
    } else if (
      formData.var_nombreCompleto &&
      !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.var_nombreCompleto)
    ) {
      nuevosErrores.var_nombreCompleto =
        "El nombre completo solo puede contener letras y espacios";
    }

    // Validación tipo de documento
    if (touchedFields.int_tipoDocumentoFK && !formData.int_tipoDocumentoFK) {
      nuevosErrores.int_tipoDocumentoFK = "El tipo de documento es obligatorio";
    }

    // Validación número de documento
    if (touchedFields.var_numeroDocumento) {
      if (!formData.var_numeroDocumento.trim()) {
        nuevosErrores.var_numeroDocumento =
          "El número de documento es obligatorio";
      } else if (!/^\d+$/.test(formData.var_numeroDocumento)) {
        nuevosErrores.var_numeroDocumento =
          "El número de documento solo puede contener números";
      } else if (formData.var_numeroDocumento.length < 5) {
        nuevosErrores.var_numeroDocumento =
          "El número de documento debe tener al menos 5 caracteres";
      } else if (formData.var_numeroDocumento.length > 50) {
        nuevosErrores.var_numeroDocumento =
          "El número de documento no puede exceder los 50 caracteres";
      }
    }

    // Validación género
    if (touchedFields.var_genero && !formData.var_genero) {
      nuevosErrores.var_genero = "El género es obligatorio";
    }

    // Validación correo electrónico
    if (
      touchedFields.var_correoElectronicoPersonal &&
      !formData.var_correoElectronicoPersonal.trim()
    ) {
      nuevosErrores.var_correoElectronicoPersonal =
        "El correo electrónico personal es obligatorio";
    } else if (
      formData.var_correoElectronicoPersonal &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.var_correoElectronicoPersonal)
    ) {
      nuevosErrores.var_correoElectronicoPersonal =
        "El correo electrónico no es válido";
    }

    // Validación grupo sanguíneo (RH)
    if (touchedFields.var_rh && !formData.var_rh) {
      nuevosErrores.var_rh = "El grupo sanguíneo (RH) es obligatorio";
    }

    // Validación grupo étnico
    if (touchedFields.var_grupoEtnico && !formData.var_grupoEtnico) {
      nuevosErrores.var_grupoEtnico = "El grupo étnico es obligatorio";
    }

    // Validación fecha de nacimiento
    if (touchedFields.date_fechaNacimiento && !formData.date_fechaNacimiento) {
      nuevosErrores.date_fechaNacimiento =
        "La fecha de nacimiento es obligatoria";
    } else if (
      formData.date_fechaNacimiento &&
      !/^\d{4}-\d{2}-\d{2}$/.test(formData.date_fechaNacimiento)
    ) {
      nuevosErrores.date_fechaNacimiento =
        "La fecha de nacimiento debe tener el formato AAAA-MM-DD";
    }

    // Validación celular (campo tipo String)
    if (touchedFields.var_celular) {
      if (!formData.var_celular.trim()) {
        nuevosErrores.var_celular = "El celular es obligatorio";
      } else if (!/^\d+$/.test(formData.var_celular)) {
        nuevosErrores.var_celular = "El celular solo puede contener números";
      } else if (formData.var_celular.length < 10) {
        nuevosErrores.var_celular = "El celular debe tener al menos 10 dígitos";
      } else if (formData.var_celular.length > 15) {
        nuevosErrores.var_celular =
          "El celular no puede tener más de 15 dígitos";
      }
    }

    // Validación teléfono fijo (campo tipo String)
    if (touchedFields.var_telefonoFijo) {
      if (!formData.var_telefonoFijo.trim()) {
        nuevosErrores.var_telefonoFijo = "El teléfono fijo es obligatorio";
      } else if (!/^\d+$/.test(formData.var_telefonoFijo)) {
        nuevosErrores.var_telefonoFijo =
          "El teléfono fijo solo puede contener números";
      } else if (formData.var_telefonoFijo.length < 7) {
        nuevosErrores.var_telefonoFijo =
          "El teléfono fijo debe tener al menos 7 dígitos";
      } else if (formData.var_telefonoFijo.length > 10) {
        nuevosErrores.var_telefonoFijo =
          "El teléfono fijo no puede exceder los 10 dígitos";
      }
    }

    // Validación contraseña
    if (touchedFields.var_contrasena && !formData.var_contrasena.trim()) {
      nuevosErrores.var_contrasena = "La contraseña es obligatoria";
    } else if (formData.var_contrasena && formData.var_contrasena.length < 6) {
      nuevosErrores.var_contrasena =
        "La contraseña debe tener al menos 6 caracteres";
    }

    // Validación confirmar contraseña
    if (
      touchedFields.confirmar_contrasena &&
      !formData.confirmar_contrasena.trim()
    ) {
      nuevosErrores.confirmar_contrasena = "Debe confirmar la contraseña";
    } else if (formData.confirmar_contrasena !== formData.var_contrasena) {
      nuevosErrores.confirmar_contrasena = "Las contraseñas no coinciden";
    }

    setErrors(nuevosErrores);
  }, [formData, touchedFields]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Solo modificamos el valor de var_nombreCompleto a mayúsculas
    if (name === "var_nombreCompleto") {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(), // Convertimos el valor a mayúsculas solo en este campo
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Para otros campos, no modificamos el valor
      });
    }
  };

  const handleKeyPress = (event, fieldName) => {
    let regex;

    // Condicional según el name del campo
    if (
      fieldName === "var_numeroDocumento" ||
      fieldName === "var_telefonoFijo" ||
      fieldName === "var_celular"
    ) {
      // Solo permitimos números
      regex = /^[0-9]*$/;
    } else if (fieldName === "var_nombreCompleto") {
      // Solo permitimos letras (incluyendo acentos y ñ) y espacios
      regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    }

    if (regex && !regex.test(event.key)) {
      event.preventDefault(); // Evita la entrada de caracteres no válidos
    }
  };

  // Marcar un campo como "tocado" cuando pierde el enfoque
  const handleBlur = (event) => {
    const { name } = event.target;
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });
  };

  // Función para obtener los tipos de documentos desde el servidor
  useEffect(() => {
    const fetchTiposDocumento = async () => {
      try {
        const response = await axios.get(
          "https://evaluacion.esumer.edu.co/tipodocumentos/"
        );
        setTiposDocumento(response.data);
      } catch (error) {
        console.error("Error al obtener los tipos de documentos:", error);
      }
    };

    fetchTiposDocumento();
  }, []);

  // Definición de los grupos étnicos
  const gruposEtnicos = [
    "Indígena",
    "Afrocolombiano",
    "Raizal del Archipiélago de San Andrés",
    "Palenquero",
    "Rom",
    "Mestizo",
    "Ninguno",
  ];

  const manejarEnvio = async (event) => {
    event.preventDefault();

    // Validación de contraseñas
    if (formData.var_contrasena !== formData.confirmar_contrasena) {
      console.error("Las contraseñas no coinciden.");
      return;
    }
    const nuevosErrores = {};

    if (!formData.var_nombreCompleto.trim()) {
      nuevosErrores.var_nombreCompleto = "El nombre completo es obligatorio";
    }

    if (!formData.int_tipoDocumentoFK) {
      nuevosErrores.int_tipoDocumentoFK = "El tipo de documento es obligatorio";
    }

    if (!formData.var_numeroDocumento.trim()) {
      nuevosErrores.var_numeroDocumento =
        "El número de documento es obligatorio";
    }

    if (!formData.var_genero) {
      nuevosErrores.var_genero = "El género es obligatorio";
    }

    if (!formData.var_correoElectronicoPersonal.trim()) {
      nuevosErrores.var_correoElectronicoPersonal =
        "El correo electrónico personal es obligatorio";
    }

    if (!formData.var_rh) {
      nuevosErrores.var_rh = "El grupo sanguíneo (RH) es obligatorio";
    }

    if (!formData.var_grupoEtnico) {
      nuevosErrores.var_grupoEtnico = "El grupo étnico es obligatorio";
    }

    if (!formData.date_fechaNacimiento) {
      nuevosErrores.date_fechaNacimiento =
        "La fecha de nacimiento es obligatoria";
    }

    if (!formData.var_celular.trim()) {
      nuevosErrores.var_celular = "El celular es obligatorio";
    }

    if (!formData.var_telefonoFijo.trim()) {
      nuevosErrores.var_telefonoFijo = "El teléfono fijo es obligatorio";
    }

    if (!formData.var_contrasena.trim()) {
      nuevosErrores.var_contrasena = "La contraseña es obligatoria";
    }

    if (!formData.confirmar_contrasena.trim()) {
      nuevosErrores.confirmar_contrasena = "Debe confirmar la contraseña";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }

    try {
      const response = await axios.post(
        "https://evaluacion.esumer.edu.co/usuarios/",
        formData
      );
      console.log("Usuario creado:", response.data);

      // Obtén el ID del nuevo usuario de la respuesta
      const nuevoUsuarioId = response.data.id_usuarioPK;

      // Almacena el ID en localStorage
      localStorage.setItem("usuarioId", nuevoUsuarioId);
      localStorage.setItem("var_rh", formData.var_rh);
      localStorage.setItem("var_grupoEtnico", formData.var_grupoEtnico);
      localStorage.setItem(
        "date_fechaNacimiento",
        formData.date_fechaNacimiento
      );
      localStorage.setItem("var_celular", formData.var_celular);
      localStorage.setItem("var_telefonoFijo", formData.var_telefonoFijo);

      navigate("/datosProfesional");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
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
          src="public/logo_form.png"
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
                fontSize: "18px",
                fontWeight: "500",
                textAlign: "center",
                color: "#202B52",
                fontFamily: "Roboto Condensed",
              }}
            >
              {" "}
              Datos personales{" "}
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
          <form onSubmit={manejarEnvio}>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Nombre Completo:
            </Typography>
            <TextField
              name="var_nombreCompleto"
              variant="outlined"
              value={formData.var_nombreCompleto}
              onChange={handleInputChange}
              onKeyPress={(event) =>
                handleKeyPress(event, "var_nombreCompleto")
              } // Condicional basado en el nombre del campo
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_nombreCompleto}
              helperText={errors.var_nombreCompleto}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: { height: "40px", fontFamily: "Poppins", fontSize: "16px" },
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Tipo de Documento:
            </Typography>
            <TextField
              select
              name="int_tipoDocumentoFK"
              label=""
              variant="outlined"
              value={formData.int_tipoDocumentoFK}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.int_tipoDocumentoFK}
              helperText={errors.int_tipoDocumentoFK}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: { height: "40px", fontFamily: "Poppins", fontSize: "16px" },
              }}
            >
              {tiposDocumento.map((option) => (
                <MenuItem
                  key={option.id_tipoDocumentoPK}
                  value={option.id_tipoDocumentoPK}
                >
                  {" "}
                  {option.var_nombreDocumento}{" "}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Número de Documento:
            </Typography>
            <TextField
              name="var_numeroDocumento"
              variant="outlined"
              value={formData.var_numeroDocumento}
              onChange={handleInputChange}
              onKeyPress={(event) =>
                handleKeyPress(event, "var_numeroDocumento")
              } // Condicional basado en el nombre del campo
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_numeroDocumento}
              helperText={errors.var_numeroDocumento}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: { height: "40px", fontFamily: "Poppins", fontSize: "16px" },
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Fecha de Nacimiento:
            </Typography>
            <TextField
              name="date_fechaNacimiento"
              type="date"
              variant="outlined"
              value={formData.date_fechaNacimiento}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
              onBlur={handleBlur}
              error={!!errors.date_fechaNacimiento}
              helperText={errors.date_fechaNacimiento}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                },
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Género:
            </Typography>
            <FormControl
              component="fieldset"
              sx={{ mb: 2 }}
              error={!!errors.var_genero}
            >
              <RadioGroup
                name="var_genero"
                value={formData.var_genero}
                onChange={handleInputChange}
                row
                onBlur={handleBlur}
                sx={{
                  height: "40px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                }}
              >
                <FormControlLabel
                  value="Masculino"
                  control={<Radio />}
                  label="Masculino"
                />
                <FormControlLabel
                  value="Femenino"
                  control={<Radio />}
                  label="Femenino"
                />
                <FormControlLabel
                  value="Otro"
                  control={<Radio />}
                  label="Otro"
                />
                <FormControlLabel
                  value="Prefiero no decirlo"
                  control={<Radio />}
                  label="Prefiero no decirlo"
                />
              </RadioGroup>
              {errors.var_genero && (
                <Typography variant="caption" color="error">
                  {errors.var_genero}
                </Typography>
              )}
            </FormControl>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Grupo Sanguíneo:
            </Typography>
            <TextField
              select
              name="var_rh"
              variant="outlined"
              value={formData.var_rh}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_rh}
              helperText={errors.var_rh}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                },
              }}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
              <MenuItem value="AB-">AB-</MenuItem>
            </TextField>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Grupo Étnico:
            </Typography>
            <TextField
              select
              name="var_grupoEtnico"
              value={formData.var_grupoEtnico}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_grupoEtnico}
              helperText={errors.var_grupoEtnico}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                },
              }}
            >
              {gruposEtnicos.map((grupo) => (
                <MenuItem key={grupo} value={grupo}>
                  {grupo}
                </MenuItem>
              ))}
            </TextField>
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Correo Electrónico Personal:
            </Typography>
            <TextField
              name="var_correoElectronicoPersonal"
              type="email"
              variant="outlined"
              value={formData.var_correoElectronicoPersonal}
              onChange={handleInputChange}
              onBlur={handleBlur}
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.var_correoElectronicoPersonal}
              helperText={errors.var_correoElectronicoPersonal}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                },
              }}
            />

            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Celular:
            </Typography>
            <TextField
              name="var_celular"
              variant="outlined"
              value={formData.var_celular}
              onChange={handleInputChange}
              onKeyPress={(event) => handleKeyPress(event, "var_celular")} // Condicional basado en el nombre del campo
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_celular}
              helperText={errors.var_celular}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: { height: "40px", fontFamily: "Poppins", fontSize: "16px" },
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Telefono fijo:
            </Typography>
            <TextField
              name="var_telefonoFijo"
              variant="outlined"
              value={formData.var_telefonoFijo}
              onChange={handleInputChange}
              onKeyPress={(event) => handleKeyPress(event, "var_telefonoFijo")} // Condicional basado en el nombre del campo
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_telefonoFijo}
              helperText={errors.var_telefonoFijo}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: { height: "40px", fontFamily: "Poppins", fontSize: "16px" },
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Crear contraseña:
            </Typography>
            <TextField
              name="var_contrasena"
              type="password"
              variant="outlined"
              value={formData.var_contrasena}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_contrasena}
              helperText={errors.var_contrasena}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                },
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
            >
              Confirmar creacion de contraseña:
            </Typography>
            <TextField
              name="confirmar_contrasena"
              type="password"
              variant="outlined"
              value={formData.confirmar_contrasena}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.confirmar_contrasena}
              helperText={errors.confirmar_contrasena}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                },
              }}
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F2F2F2",
                padding: "10px 15px",
                borderRadius: "20px",
                width: "100%",
              }}
            >
              <div
                style={{
                  height: "10px",
                  width: "90%",
                  backgroundColor: "#F2F2F2",
                  borderRadius: "7px",
                  overflow: "hidden",
                  border: "2px solid #202B52",
                  marginRight: "10px",
                }}
              >
                <div
                  style={{
                    width: `${porcentajeProgreso}%`,
                    height: "100%",
                    backgroundColor: "#202B52",
                    borderRadius: "5px 0 0 5px",
                  }}
                ></div>
              </div>
              <span style={{ color: "#202B52", fontWeight: "bold" }}>
                {porcentajeProgreso}%
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                sx={{ backgroundColor: "#202B52" }}
                variant="contained"
                type="submit"
              >
                Siguiente
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VistaDatosUsuario;
