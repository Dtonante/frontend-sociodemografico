import { Card, CardContent, Divider, Box, Typography, TextField, FormControlLabel,  Checkbox, Button, Grid, RadioGroup, Radio, FormControl, MenuItem} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon"; // Para manejar y validar fechas
import show_alert from "../../components/showAlert/alertFuntion";
import '../../css/VistaHomeNuevoUsuario.css'

const URI_TIPO_DOCUMENTO = 'https://evaluacion.esumer.edu.co/api/tipodocumentos/'
const URI_CREAR_USUARIO = 'https://evaluacion.esumer.edu.co/api/usuarios/'


const VistaDatosUsuario = () => {
  const minDate = DateTime.now().minus({ years: 18 }).toISODate(); // Fecha mínima: 18 años atrás
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
    date_fechaNacimiento: minDate,
    var_celular: "",
    var_telefonoEmergencia: "",
    var_contrasena: "",
    var_contactoEmergencia: "",
    confirmar_contrasena: ""

  });
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    date_fechaNacimiento: "",
  });
  const [touchedFields, setTouchedFields] = useState({});
  const porcentajeProgreso = 20;

  // Validaciones basadas en los campos tocados
  useEffect(() => {
    const nuevosErrores = {};

    if (touchedFields.var_contactoEmergencia && !formData.var_contactoEmergencia) {
      nuevosErrores.var_contactoEmergencia = "El nombre del contacto de emergencia es obligatorio";
    } else if (
      formData.var_contactoEmergencia &&
      !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.var_contactoEmergencia)
    )

      // Establecemos el valor mínimo de la fecha si es necesario
      if (!formData.date_fechaNacimiento) {
        setFormData((prevState) => ({
          ...prevState,
          date_fechaNacimiento: minDate, // Solo si no hay valor de fecha
        }));
      }

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
      const tipoDocumento = tiposDocumento.find(
        (option) => option.id_tipoDocumentoPK === formData.int_tipoDocumentoFK
      )?.var_nombreDocumento;

      if (!tipoDocumento) {
        nuevosErrores.var_numeroDocumento =
          "Debe seleccionar un tipo de documento antes de ingresar el número";
      } else if (!formData.var_numeroDocumento.trim()) {
        nuevosErrores.var_numeroDocumento =
          "El número de documento es obligatorio";
      } else if (formData.var_numeroDocumento.length < 5) {
        nuevosErrores.var_numeroDocumento =
          "El número de documento debe tener al menos 5 caracteres";
      } else if (formData.var_numeroDocumento.length > 50) {
        nuevosErrores.var_numeroDocumento =
          "El número de documento no puede exceder los 50 caracteres";
      } else {
        const validationRules = {
          "Cédula de Ciudadanía (CC)": /^[0-9]*$/, // Solo números
          "Tarjeta de Identidad (TI)": /^[0-9]*$/, // Solo números
          "Cédula de Extranjería (CE)": /^[A-Z0-9]*$/, // Letras mayúsculas y números
          "Registro Civil de Nacimiento (RCN)": /^[A-Z0-9]*$/, // Letras mayúsculas y números
          Pasaporte: /^[A-Z0-9]*$/, // Letras mayúsculas y números
          "Permiso Especial de Permanencia (PEP)": /^[A-Z0-9]*$/, // Letras mayúsculas y números
          "Permiso por Protección Temporal (PPT)": /^[A-Z0-9]*$/, // Letras mayúsculas y números
          "Documento Nacional de Identificación de otro país (DNI)":
            /^[A-Z0-9]*$/, // Letras mayúsculas y números
          "Licencia de Conducción": /^[A-Z0-9]*$/, // Letras mayúsculas y números
          "Carné Diplomatico": /^[A-Z0-9]*$/, // Letras mayúsculas y números
          "Permiso Especial de Trabajo (PET)": /^[A-Z0-9]*$/, // Letras mayúsculas y números
          "Carné de Migración o Carné de Extranjería Temporal": /^[A-Z0-9]*$/, // Letras mayúsculas y números
        };

        const regex = validationRules[tipoDocumento];
        if (regex && !regex.test(formData.var_numeroDocumento)) {
          nuevosErrores.var_numeroDocumento =
            "El número de documento no tiene un formato válido para el tipo de documento seleccionado";
        }
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
    // Validación de la fecha solo cuando el campo ha sido tocado
    if (touchedFields.date_fechaNacimiento) {
      if (!formData.date_fechaNacimiento) {
        nuevosErrores.date_fechaNacimiento =
          "La fecha de nacimiento es obligatoria";
      } else if (
        formData.date_fechaNacimiento &&
        !/^\d{4}-\d{2}-\d{2}$/.test(formData.date_fechaNacimiento)
      ) {
        nuevosErrores.date_fechaNacimiento =
          "La fecha de nacimiento debe tener el formato AAAA-MM-DD";
      }
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
    if (touchedFields.var_telefonoEmergencia) {
      if (!formData.var_telefonoEmergencia.trim()) {
        nuevosErrores.var_telefonoEmergencia = "El numero del contacto de emergencia es obligatorio";
      } else if (!/^\d+$/.test(formData.var_telefonoEmergencia)) {
        nuevosErrores.var_telefonoEmergencia =
          "El numero del contacto de emergencia solo puede contener números";
      } else if (formData.var_telefonoEmergencia.length < 10) {
        nuevosErrores.var_telefonoEmergencia =
          "El numero del contacto de emergencia debe tener al menos 10 dígitos";
      } else if (formData.var_telefonoEmergencia.length > 12) {
        nuevosErrores.var_telefonoEmergencia =
          "El numero del contacto de emergencia no puede exceder los 12 dígitos";
      }
    }

    if (touchedFields.var_contrasena && !formData.var_contrasena.trim()) {
      nuevosErrores.var_contrasena = "La contraseña es obligatoria";
    } else if (formData.var_contrasena && formData.var_contrasena.length < 8) {
      nuevosErrores.var_contrasena =
        "La contraseña debe tener al menos 8 carácteres y mínimo un número, una minúscula y una mayúscula";
    } else if (formData.var_contrasena && !/[a-z]/.test(formData.var_contrasena)) {
      nuevosErrores.var_contrasena = "La contraseña debe contener al menos una letra minúscula";
    } else if (formData.var_contrasena && !/[A-Z]/.test(formData.var_contrasena)) {
      nuevosErrores.var_contrasena = "La contraseña debe contener al menos una letra mayúscula";
    } else if (formData.var_contrasena && !/\d/.test(formData.var_contrasena)) {
      nuevosErrores.var_contrasena = "La contraseña debe contener al menos un número";
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



    // Actualizar los errores
    setErrors(nuevosErrores);
  }, [formData, touchedFields]); // Ejecutar el useEffect cada vez que se cambia formData o touchedFields

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Cuando cambiamos el campo de fecha de nacimiento
    if (name === "date_fechaNacimiento") {
      const selectedDate = DateTime.fromISO(value); // Convierte el valor a formato Luxon

      // Si la fecha no es válida, mostramos un error
      if (!selectedDate.isValid) {
        setErrors({
          ...errors,
          date_fechaNacimiento: "La fecha seleccionada no es válida.",
        });
        return; // Detenemos la ejecución si la fecha no es válida
      }

      // Validamos que la fecha sea mayor a 18 años
      const minDate = DateTime.now().minus({ years: 18 });
      if (selectedDate > minDate) {
        setErrors({
          ...errors,
          date_fechaNacimiento:
            "La fecha de nacimiento debe ser al menos 18 años antes de hoy.",
        });
      } else {
        setErrors({
          ...errors,
          date_fechaNacimiento: "", // Limpiamos el error si la fecha es válida
        });
      }

      // Actualizamos el valor de la fecha en el estado
      setFormData({
        ...formData,
        date_fechaNacimiento: value, // Actualizamos el valor de la fecha
      });
    }

    // Si no es la fecha, manejamos el cambio de otros campos
    if (name === "var_nombreCompleto" || name === "var_numeroDocumento") {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(), // Convertimos el valor a mayúsculas
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Actualizamos otros campos normalmente
      });
    }

    if (name === "var_contactoEmergencia" || name === "var_contactoEmergencia") {
      setFormData({
        ...formData,
        [name]: value.toUpperCase(), // Convertimos el valor a mayúsculas
      });
    } else {
      setFormData({
        ...formData,
        [name]: value, // Actualizamos otros campos normalmente
      });
    }




  };

  const handleKeyPress = (event, fieldName) => {
    let regex;

    // Validación para campos como teléfono y número de documento (solo números)
    if (
      fieldName === "var_telefonoEmergencia" ||
      fieldName === "var_celular" ||
      fieldName === "var_numeroDocumento"
    ) {
      // Solo permitimos números
      regex = /^[0-9]*$/;
    } else if (fieldName === "var_nombreCompleto" || fieldName === "var_contactoEmergencia") {
      // Solo permitimos letras (incluyendo acentos y ñ) y espacios
      regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    }

    // Verificamos si se ha definido una expresión regular para el campo
    if (regex && !regex.test(event.key)) {
      event.preventDefault(); // Evita la entrada de caracteres no válidos
      return; // Salimos de la función si el carácter no es válido
    }

    // Validación para el número de documento
    if (fieldName === "var_numeroDocumento") {
      const tipoDocumento = tiposDocumento.find(
        (option) => option.id_tipoDocumentoPK === formData.int_tipoDocumentoFK
      )?.var_nombreDocumento;

      // Bloquear entrada si no se ha seleccionado un tipo de documento
      if (!tipoDocumento) {
        event.preventDefault(); // Bloquea cualquier entrada si no se ha seleccionado un tipo
        return;
      }

      // Reglas de validación según el tipo de documento
      const validationRules = {
        "Cédula de Ciudadanía (CC)": /^[0-9]*$/, // Solo números
        "Tarjeta de Identidad (TI)": /^[0-9]*$/, // Solo números
        "Cédula de Extranjería (CE)": /^[A-Za-z0-9]*$/, // Letras y números
        "Registro Civil de Nacimiento (RCN)": /^[A-Za-z0-9]*$/, // Letras y números
        Pasaporte: /^[A-Za-z0-9]*$/, // Letras y números
        "Permiso Especial de Permanencia (PEP)": /^[A-Za-z0-9]*$/, // Letras y números
        "Permiso por Protección Temporal (PPT)": /^[A-Za-z0-9]*$/, // Letras y números
        "Documento Nacional de Identificación de otro país (DNI)":
          /^[A-Za-z0-9]*$/, // Letras y números
        "Licencia de Conducción": /^[A-Za-z0-9]*$/, // Letras y números
        "Carné Diplomatico": /^[A-Za-z0-9]*$/, // Letras y números
        "Permiso Especial de Trabajo (PET)": /^[A-Za-z0-9]*$/, // Letras y números
        "Carné de Migración o Carné de Extranjería Temporal": /^[A-Za-z0-9]*$/, // Letras y números
      };

      // Verificamos si la validación para el tipo de documento está definida
      regex = validationRules[tipoDocumento];

      // Validación del número de documento
      if (regex && !regex.test(event.key)) {
        event.preventDefault(); // Bloquea la entrada si no cumple con la expresión regular
      }
    }
  };

  const handleKeyPresss = (event, fieldName) => {
    // Definir expresiones regulares para cada tipo de campo
    const validationRules = {
      // Para campos que solo permiten números
      var_telefonoEmergencia: /^[0-9]*$/,
      var_celular: /^[0-9]*$/,
      var_numeroDocumento: /^[0-9]*$/,
      // Para campos que solo permiten letras (incluyendo acentos y ñ) y espacios
      var_nombreCompleto: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
      var_contactoEmergencia: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
      // Reglas específicas para el tipo de documento
      documento: {
        "Cédula de Ciudadanía (CC)": /^[0-9]*$/,
        "Tarjeta de Identidad (TI)": /^[0-9]*$/,
        "Cédula de Extranjería (CE)": /^[A-Za-z0-9]*$/,
        "Registro Civil de Nacimiento (RCN)": /^[A-Za-z0-9]*$/,
        Pasaporte: /^[A-Za-z0-9]*$/,
        "Permiso Especial de Permanencia (PEP)": /^[A-Za-z0-9]*$/,
        "Permiso por Protección Temporal (PPT)": /^[A-Za-z0-9]*$/,
        "Documento Nacional de Identificación de otro país (DNI)":
          /^[A-Za-z0-9]*$/,
        "Licencia de Conducción": /^[A-Za-z0-9]*$/,
        "Carné Diplomatico": /^[A-Za-z0-9]*$/,
        "Permiso Especial de Trabajo (PET)": /^[A-Za-z0-9]*$/,
        "Carné de Migración o Carné de Extranjería Temporal": /^[A-Za-z0-9]*$/,
      },
    };

    // Validación de campos generales
    if (validationRules[fieldName]) {
      // Si el campo tiene una expresión regular definida, validamos la tecla presionada
      if (typeof validationRules[fieldName] === "object") {
        // Si es un objeto, significa que estamos validando el número de documento, así que buscamos el tipo de documento
        const tipoDocumento = tiposDocumento.find(
          (option) => option.id_tipoDocumentoPK === formData.int_tipoDocumentoFK
        )?.var_nombreDocumento;

        // Si no se ha seleccionado un tipo de documento, bloqueamos la entrada
        if (!tipoDocumento) {
          event.preventDefault();
          return;
        }

        // Obtenemos la expresión regular según el tipo de documento
        const tipoRegex = validationRules.documento[tipoDocumento];
        if (tipoRegex && !tipoRegex.test(event.key)) {
          event.preventDefault(); // Bloqueamos la entrada si no cumple con la expresión regular
        }
      } else if (!validationRules[fieldName].test(event.key)) {
        // Validación normal de otros campos
        event.preventDefault();
      }
    }
  };

  // Marcar un campo como "tocado" cuando pierde el enfoque
  const handleBlur = (event) => {
    const { name, value } = event.target;

    // Marca el campo como "tocado"
    setTouchedFields((prevTouchedFields) => ({
      ...prevTouchedFields,
      [name]: true,
    }));

    // Validación específica para 'var_numeroDocumento'
    if (name === "var_numeroDocumento") {
      // Obtener el tipo de documento seleccionado
      const tipoDocumento = tiposDocumento.find(
        (option) => option.id_tipoDocumentoPK === formData.int_tipoDocumentoFK
      )?.var_nombreDocumento;

      if (!tipoDocumento) {
        // Si no se encuentra el tipo de documento, no hacer nada
        return;
      }

      // Reglas de validación para cada tipo de documento
      const validationRules = {
        "Cédula de Ciudadanía (CC)": /^[0-9]{6,10}$/, // Solo números de 6 a 10 dígitos
        "Tarjeta de Identidad (TI)": /^[0-9]{6,10}$/, // Solo números de 6 a 10 dígitos
        "Cédula de Extranjería (CE)": /^[A-Za-z0-9]{5,15}$/, // Letras y números de 5 a 15 caracteres
        "Registro Civil de Nacimiento (RCN)": /^[A-Za-z0-9]{5,15}$/, // Letras y números de 5 a 15 caracteres
        Pasaporte: /^[A-Za-z0-9]{6,20}$/, // Letras y números de 6 a 20 caracteres
        "Permiso Especial de Permanencia (PEP)": /^[A-Za-z0-9]{5,15}$/, // Letras y números de 5 a 15 caracteres
        "Permiso por Protección Temporal (PPT)": /^[A-Za-z0-9]{5,15}$/, // Letras y números de 5 a 15 caracteres
        "Documento Nacional de Identificación de otro país (DNI)":
          /^[A-Za-z0-9]{5,15}$/, // Letras y números de 5 a 15 caracteres
        "Licencia de Conducción": /^[A-Za-z0-9]{5,15}$/, // Letras y números de 5 a 15 caracteres
        "Carné Diplomatico": /^[A-Za-z0-9]{5,15}$/, // Letras y números de 5 a 15 caracteres
        "Carné de Migración o Carné de Extranjería Temporal":
          /^[A-Za-z0-9]{5,15}$/, // Letras y números de 5 a 15 caracteres
        "Permiso Especial de Trabajo (PET)": /^[A-Za-z0-9]{5,15}$/, // Letras y números de 5 a 15 caracteres
      };

      // Obtener la expresión regular correspondiente al tipo de documento
      const regex = validationRules[tipoDocumento];

      // Validar el valor del número de documento con la expresión regular
      if (regex && !regex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `El formato del ${tipoDocumento} es inválido.`,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "", // Limpiar el error si el valor es válido
        }));
      }
    }
  };

  // Función para obtener los tipos de documentos desde el servidor
  useEffect(() => {
    const fetchTiposDocumento = async () => {
      try {
        const response = await axios.get(
          `${URI_TIPO_DOCUMENTO}`
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

    if (!formData.var_telefonoEmergencia.trim()) {
      nuevosErrores.var_telefonoEmergencia = "El numero del contacto de emergencia es obligatorio";
    }

    if (!formData.var_contrasena.trim()) {
      nuevosErrores.var_contrasena = "La contraseña es obligatoria";
    }

    if (!formData.confirmar_contrasena.trim()) {
      nuevosErrores.confirmar_contrasena = "Debe confirmar la contraseña";
    }

    if (!formData.var_contactoEmergencia) {
      nuevosErrores.var_contactoEmergencia = "El contacto de emergencia es obligatorio";
    }



    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }

    try {
      const response = await axios.post(
        `${URI_CREAR_USUARIO}`,
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
      localStorage.setItem("var_telefonoEmergencia", formData.var_telefonoEmergencia);

      navigate("/DatosProfesionales");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    // Validación para evitar fechas futuras
    if (value > minDate) {
      // Si la fecha seleccionada es posterior a la fecha mínima (18 años atrás), restablece al valor válido
      show_alert("Debes tener minimo 18 años para el registro.", "info");
      return;
    }

    // Si la fecha es válida, actualizamos el estado
    setFormData({
      ...formData,
      date_fechaNacimiento: value, // Actualiza el valor de la fecha
    });
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Actualiza el ancho de la ventana
    };

    window.addEventListener("resize", handleResize);

    // Limpieza del listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const manejarAtras = () => {
    navigate('/proteccionDatos')
  }

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
          style={{
            width: windowWidth < 1000 ? "50%" : "20%",
            height: "auto",
          }}
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
              <strong>Datos personales</strong>
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
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
            >
              Nombre Completo:
            </Typography>
            <TextField
              name="var_nombreCompleto"
              variant="outlined"
              value={formData.var_nombreCompleto}
              onChange={(event) =>
                handleInputChange({
                  target: {
                    name: "var_nombreCompleto",
                    value: event.target.value.toUpperCase()
                  }
                })}
              onKeyPress={(event) =>
                handleKeyPress(event, "var_nombreCompleto")
              }
              fullWidth

              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_nombreCompleto}
              helperText={errors.var_nombreCompleto}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" },
              }}
            />
            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} >  Tipo de Documento:  </Typography>
            <TextField select
              name="int_tipoDocumentoFK"
              label=""
              variant="outlined"
              value={formData.int_tipoDocumentoFK}
              onChange={handleInputChange}
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.int_tipoDocumentoFK}
              helperText={errors.int_tipoDocumentoFK}  FormHelperTextProps={{ sx: { marginLeft: 0 } }} InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" }, }}
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
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
            >
              Número de Documento:
            </Typography>
            <TextField
              name="var_numeroDocumento"
              variant="outlined"
              value={formData.var_numeroDocumento}
              onChange={handleInputChange}
              onKeyPress={(event) =>
                handleKeyPresss(event, "var_numeroDocumento")
              } // Condicional basado en el nombre del campo
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_numeroDocumento}
              helperText={errors.var_numeroDocumento}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" },
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
            >
              Fecha de Nacimiento:
            </Typography>
            <TextField
              name="date_fechaNacimiento"
              type="date"
              variant="outlined"
              value={formData.date_fechaNacimiento}
              fullWidth
              min={minDate} // Se establece el valor mínimo (18 años atrás)
              max={minDate} // No permitir fechas futuras
              onChange={handleDateChange}
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
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            />
            {errors.date_fechaNacimiento && (
              <div style={{ color: "red" }}>{errors.date_fechaNacimiento}</div>
            )}

            <Typography
              variant="h6"
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
            >
              Género:
            </Typography>
            <FormControl className="genero" component="fieldset" sx={{ mb: 2 }} error={!!errors.var_genero} >
              <RadioGroup className="genero" name="var_genero" value={formData.var_genero} onChange={handleInputChange} row onBlur={handleBlur} sx={{ height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px", }} >
                <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
                <FormControlLabel value="Otro" control={<Radio />} label="Otro" />
                <FormControlLabel value="Prefiero no decirlo" control={<Radio />} label="Prefiero no decirlo" />
              </RadioGroup>
              {errors.var_genero && (
                <Typography variant="caption" color="error"> {errors.var_genero} </Typography>)}
            </FormControl>

            <Typography variant="h6" sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }} > Grupo Sanguíneo: </Typography>
            <TextField select name="var_rh" variant="outlined"  value={formData.var_rh} onChange={handleInputChange}  fullWidth  sx={{ mb: 2 }} onBlur={handleBlur} error={!!errors.var_rh} helperText={errors.var_rh} FormHelperTextProps={{sx: {marginLeft: 0, }, }} InputProps={{ sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px",  }, }} >
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
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
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
                  fontFamily: "Roboto Condensed",
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
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
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
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            />

            <Typography
              variant="h6"
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
            >
              Celular:
            </Typography>
            <TextField
              name="var_celular"
              variant="outlined"
              value={formData.var_celular}
              onChange={handleInputChange}
              onKeyPress={(event) => handleKeyPress(event, "var_celular")}
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_celular}
              helperText={errors.var_celular}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" }, inputProps: { maxLength: 12, }
              }}
            />

            <Typography
              variant="h6"
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
            >
              Nombre del contacto de emergencia
            </Typography>
            <TextField
              name="var_contactoEmergencia"
              type="text"
              variant="outlined"
              value={formData.var_contactoEmergencia}
              onChange={handleInputChange}
              onKeyPress={(event) =>
                handleKeyPress(event, "var_contactoEmergencia")
              }
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_contactoEmergencia}
              helperText={errors.var_contactoEmergencia}
              FormHelperTextProps={{
                sx: {
                  marginLeft: 0, // Ajusta el margen izquierdo para alinear el texto
                },
              }}
              InputProps={{
                sx: {
                  height: "40px",
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            />




            <Typography
              variant="h6"
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
            >
              Teléfono fijo o celular del contacto de emergencia:
            </Typography>
            <TextField
              name="var_telefonoEmergencia"
              variant="outlined"
              value={formData.var_telefonoEmergencia}
              onChange={handleInputChange}
              onKeyPress={(event) => handleKeyPress(event, "var_telefonoEmergencia")} // Condicional basado en el nombre del campo
              fullWidth
              sx={{ mb: 2 }}
              onBlur={handleBlur}
              error={!!errors.var_telefonoEmergencia}
              helperText={errors.var_telefonoEmergencia}
              FormHelperTextProps={{ sx: { marginLeft: 0 } }}
              InputProps={{
                sx: { height: "40px", fontFamily: "Roboto Condensed", fontSize: "16px" }, inputProps: { maxLength: 10, }
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
            >Crear contraseña (Esta contraseña te servirá para actualizar la información aquí suministrada en una próxima versión):
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
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            />

            <Typography
              variant="h6"
              sx={{ fontFamily: 'Roboto Condensed', color: '#202B52', fontSize: '16px' }}
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
                  fontFamily: "Roboto Condensed",
                  fontSize: "16px",
                },
              }}
            />

            <div
              style={{
                fontFamily: 'Poppins',
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
                  fontFamily: 'Poppins',
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
                    fontFamily: 'Poppins',
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
              <button
                style={{
                  fontFamily: 'poppins',
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#202B52',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '8px'

                }}
                onClick={manejarAtras}
              >
                Atras
              </button>
              <Button
                sx={{ backgroundColor: "#202B52", fontFamily: 'poppins' }}
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
