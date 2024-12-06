import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, MenuItem, FormControl, FormHelperText, InputLabel,  Select, Card, Box, Typography, Button,  Divider,  CardContent, FormControlLabel, RadioGroup, Radio, } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VistaDatosProfesional4 = () => {
  const [bancos, setBancos] = useState([]);
  const [selectedBanco, setSelectedBanco] = useState("");
  const [tipoCuenta, setTipoCuenta] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const porcentajeProgreso = 45;

  // Validaciones basadas en los campos tocados
  useEffect(() => {
    const nuevosErrores = {};

    if (touchedFields.numeroCuenta && !numeroCuenta) {
      nuevosErrores.numeroCuenta = "El departamento es obligatorio";
    }
    if (touchedFields.tipoCuenta && !tipoCuenta) {
      nuevosErrores.tipoCuenta = "El departamento es obligatorio";
    }
    if (touchedFields.banco && !selectedBanco) {
      nuevosErrores.selectedBanco = "El departamento es obligatorio";
    }
    setErrors(nuevosErrores);
  }, [selectedBanco, numeroCuenta, tipoCuenta, touchedFields]);

  // Marcar un campo como "tocado" cuando pierde el enfoque
  const handleBlur = (event) => {
    const { name } = event.target;
    setTouchedFields({
      ...touchedFields,
      [name]: true,
    });
  };

    // useEffect para obtener los bancos desde el servidor
    useEffect(() => {
        const fetchBancos = async () => {
            try {
                const response = await axios.get("https://evaluacion.esumer.edu.co/cuentasBancarias");
                setBancos(response.data);
            } catch (error) {
                console.error("Error al obtener los bancos:", error);
            }
        };

    fetchBancos();
  }, []);

  const manejarCambio = (event) => {
    const { name, value } = event.target;
    if (name === "banco") {
      setSelectedBanco(value);
    } else if (name === "tipoCuenta") {
      setTipoCuenta(value);
    } else if (name === "numeroCuenta") {
      setNumeroCuenta(value);
    }
  };

  // Función para guardar los datos en localStorage y navegar
  const manejarSiguiente = () => {
    localStorage.setItem("selectedBanco", selectedBanco);
    localStorage.setItem("tipoCuenta", tipoCuenta);
    localStorage.setItem("numeroCuenta", numeroCuenta);

    const nuevosErrores = {};

    if (!numeroCuenta) {
      nuevosErrores.numeroCuenta = "El número de cuenta es obligatorio.";
    }

    if (!tipoCuenta) {
      nuevosErrores.tipoCuenta = "El tipo de cuenta es obligatorio.";
    }

    if (!selectedBanco) {
      nuevosErrores.selectedBanco = "Seleccionar un banco es obligatorio.";
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }
    navigate("/datosProfesional5");
  };

  const handleKeyPress = (event, fieldName) => {
    let regex;

    // Condicional según el name del campo
    if (
      fieldName === "numeroCuenta"
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

  return (
    <div style={{  backgroundColor: "#F2F2F2", paddingTop: "3%", paddingBottom: "3%",  height: "100vh", overflow: "auto", }}  >
      <div style={{ textAlign: "center", marginBottom: "1%", marginTop: "-1%" }} >
        <img
          src="public/logo_form.png"
          alt="Descripción de la imagen"
          style={{
            width: "20%",
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
            {" "}
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                textAlign: "center",
                color: "#202B52",
                fontFamily: "Roboto Condensed",
              }}
            >
              Información bancaria
            </Typography>{" "}
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
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
              error={!!errors.selectedBanco}
            >
              <Typography
                variant="h6"
                sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
              >
                Seleccione Banco:
              </Typography>

              <Select
                name="banco"
                value={selectedBanco}
                onChange={manejarCambio}
                sx={{
                  height: "40px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                }}
              >
                {bancos.map((banco) => (
                  <MenuItem
                    key={banco.id_cuentaBancariaPK}
                    value={banco.id_cuentaBancariaPK}
                  >
                    {" "}
                    {banco.var_nombreCuentaBancaria}{" "}
                  </MenuItem>
                ))}
              </Select>
              {errors.selectedBanco && (
                <FormHelperText
                  sx={{
                    marginLeft: 0,
                  }}
                >
                  {errors.selectedBanco}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              component="fieldset"
              sx={{ mb: 2 }}
              error={!!errors.tipoCuenta}
            >
              <Typography
                variant="h6"
                sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }}
              >
                Tipo de Cuenta
              </Typography>
              <RadioGroup
                name="tipoCuenta"
                value={tipoCuenta}
                onChange={manejarCambio}
                row
                onBlur={handleBlur}
                sx={{
                  height: "40px",
                  fontFamily: "Poppins",
                  fontSize: "16px",
                }}
              >
                <FormControlLabel
                  value="ahorro"
                  control={<Radio />}
                  label="Ahorro"
                />
                <FormControlLabel
                  value="corriente"
                  control={<Radio />}
                  label="Corriente"
                />
              </RadioGroup>
              {errors.tipoCuenta && (
                <Typography variant="caption" color="error">
                  {errors.tipoCuenta}
                </Typography>
              )}
            </FormControl>

            <Typography variant="h6" sx={{ fontFamily: "Roboto Condensed", color: "#202B52" }} > Número de Cuenta: </Typography>
            <TextField variant="outlined" fullWidth sx={{ mb: 2 }} name="numeroCuenta"  onKeyPress={(event) => handleKeyPress(event, "numeroCuenta") }  value={numeroCuenta} onChange={manejarCambio} onBlur={handleBlur}  error={!!errors.numeroCuenta} helperText={errors.numeroCuenta} FormHelperTextProps={{ sx: { marginLeft: 0, }, }} InputProps={{ sx: { height: "40px", fontFamily: "Poppins", fontSize: "16px", }, inputProps: { maxLength: 18, }, }}    />

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
                onClick={manejarSiguiente}
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

export default VistaDatosProfesional4;
