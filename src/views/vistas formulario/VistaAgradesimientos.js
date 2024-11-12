// import { Button, Typography, Box, Card, CardContent } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from 'react';


// const VistaAgradecimientos = () => {

//     useEffect(() => {

//         const id_usuarioFK = localStorage.getItem('usuarioId');
//         const boolean_aceptaTratamientoDatos = localStorage.getItem('aceptaDatos');
//         const date_fechaNacimiento = localStorage.getItem('date_fechaNacimiento');
//         const var_departamentoResidencia = localStorage.getItem('departamentoResidencia');
//         const var_ciudadResidencia = localStorage.getItem('ciudadResidencia');
//         const var_direccionResidencia = localStorage.getItem('direccionCompleta');
//         const var_estratoVivienda = localStorage.getItem('var_estratoVivienda');
//         const var_tipoVivienda = localStorage.getItem('var_tipoVivienda');
//         const var_estadoCivil = localStorage.getItem('var_estadoCivil');
//         const boolean_viveSolo = localStorage.getItem('boolean_viveSolo');
//         const set_personasConLasQueVive = localStorage.getItem('set_personasConLasQueVive');
//         const boolean_viveConMascotas = localStorage.getItem('boolean_viveConMascotas');
//         const var_personasDependeciaEconimica = localStorage.getItem('var_personasDependeciaEconimica');
//         const var_totalIngresosPropiosYGrupoFamiliar = localStorage.getItem('var_totalIngresosPropiosYGrupoFamiliar');
//         const var_grupoEtnico = localStorage.getItem('var_grupoEtnico');
//         const var_rh = localStorage.getItem('var_rh');
//         const id_epsFK = localStorage.getItem('selectedEps');
//         const id_fondoPensionFK = localStorage.getItem('selectedFondoPension');
//         const boolean_afiliadoCajaCompensacion = localStorage.getItem('afiliadoCajaCompensacion');
//         const boolean_cambioEpsOArl = localStorage.getItem('cambioEpsOArl');
//         const id_cuentaBancariaFK = localStorage.getItem('selectedBanco');
//         const var_tipoCuenta = localStorage.getItem('tipoCuenta');
//         const var_numeroCuenta = localStorage.getItem('numeroCuenta');
//         const var_tipoVinculacion = localStorage.getItem('var_tipoVinculacion');
//         const var_tipoContrato = localStorage.getItem('var_tipoContrato');
//         const var_salario = localStorage.getItem('var_salario');
//         const date_fechaIngresoInstitucion = localStorage.getItem('date_fechaIngresoInstitucion');
//         const var_antiguedadInstitucion = localStorage.getItem('var_antiguedadInstitucion');
//         const id_areaFK = localStorage.getItem('area');
//         const var_cargo = localStorage.getItem('var_cargo');
//         const var_jefeInmediato = localStorage.getItem('var_jefeInmediato');
//         const var_sede = localStorage.getItem('var_sede');
//         const var_celular = localStorage.getItem('var_celular');
//         const var_telefonoFijo = localStorage.getItem('var_telefonoFijo');
//         const var_turnoTrabajo = localStorage.getItem('var_turnoTrabajo');
//         const var_nivelEscolaridad = localStorage.getItem('nivelEscolaridad');
//         const var_nombreCarrera = localStorage.getItem('nombreCarrera');
//         const boolean_actualmenteEstudia = localStorage.getItem('actualmenteEstudia');
//         const boolean_actividadFisica = localStorage.getItem('boolean_actividadFisica');
//         const var_frecuenciaActividadFisica = localStorage.getItem('var_frecuenciaActividadFisica');
//         const boolean_fuma = localStorage.getItem('boolean_fuma');
//         const var_frecuenciaFuma = localStorage.getItem('var_frecuenciaFuma');
//         const boolean_toma = localStorage.getItem('boolean_toma');
//         const var_frecuenciaToma = localStorage.getItem('var_frecuenciaToma');
//         const boolean_sustanciasPsicoactivas = localStorage.getItem('boolean_sustanciasPsicoactivas');
//         const var_frecuenciaSustanciasPsicoactivas = localStorage.getItem('var_frecuenciaSustanciasPsicoactivas');
//         const set_mediosTransportePublico = localStorage.getItem('set_mediosTransportePublico'); // Faltaaaaaaa
//         const set_pasoMayorTiempoLibre = localStorage.getItem('set_pasoMayorTiempoLibre');
//         const var_peso = localStorage.getItem('var_peso');
//         const var_altura = localStorage.getItem('var_altura');
//         const var_urlDatosAdjuntos = localStorage.getItem('selectedEps'); // Faltaaaaaaa








// // Mostrar todos los datos individualmente en la consola para depuración
// console.log("id_usuario:", id_usuarioFK)
// console.log("boolean_aceptaTratamientoDatos:", boolean_aceptaTratamientoDatos)
// console.log("date_fechaNacimiento:", date_fechaNacimiento)
// console.log("var_departamentoResidencia:", var_departamentoResidencia)
// console.log("var_ciudadResidencia:", var_ciudadResidencia)
// console.log("var_direccionResidencia:", var_direccionResidencia)
// console.log("var_estratoVivienda:", var_estratoVivienda)
// console.log("var_tipoVivienda:", var_tipoVivienda)
// console.log("var_estadoCivil:", var_estadoCivil)
// console.log("boolean_viveSolo:", boolean_viveSolo)
// console.log("set_personasConLasQueVive:", set_personasConLasQueVive)
// console.log("boolean_viveConMascotas:", boolean_viveConMascotas)
// console.log("var_personasDependeciaEconimica:", var_personasDependeciaEconimica)
// console.log("var_totalIngresosPropiosYGrupoFamiliar:", var_totalIngresosPropiosYGrupoFamiliar)
// console.log("var_grupoEtnico:", var_grupoEtnico)
// console.log("var_rh:", var_rh)
// console.log("id_epsFK:", id_epsFK)
// console.log("id_fondoPensionFK:", id_fondoPensionFK)
// console.log("boolean_afiliadoCajaCompensacion:", boolean_afiliadoCajaCompensacion)
// console.log("boolean_cambioEpsOArl:", boolean_cambioEpsOArl)
// console.log("id_cuentaBancariaFK:", id_cuentaBancariaFK)
// console.log("var_tipoCuenta:", var_tipoCuenta)
// console.log("var_numeroCuenta:", var_numeroCuenta)
// console.log("var_tipoVinculacion:", var_tipoVinculacion)
// console.log("var_tipoContrato:", var_tipoContrato)
// console.log("var_salario:", var_salario)
// console.log("date_fechaIngresoInstitucion:", date_fechaIngresoInstitucion)
// console.log("var_antiguedadInstitucion:", var_antiguedadInstitucion)
// console.log("id_areaFK:", id_areaFK)
// console.log("var_cargo:", var_cargo)
// console.log("var_jefeInmediato:", var_jefeInmediato)
// console.log("var_sede:", var_sede)
// console.log("var_celular:", var_celular)
// console.log("var_telefonoFijo:", var_telefonoFijo)
// console.log("var_turnoTrabajo:", var_turnoTrabajo)
// console.log("var_nivelEscolaridad:", var_nivelEscolaridad)
// console.log("var_nombreCarrera:", var_nombreCarrera)
// console.log("boolean_actualmenteEstudia:", boolean_actualmenteEstudia)
// console.log("boolean_actividadFisica:", boolean_actividadFisica)
// console.log("var_frecuenciaActividadFisica:", var_frecuenciaActividadFisica)
// console.log("boolean_fuma:", boolean_fuma)
// console.log("var_frecuenciaFuma:", var_frecuenciaFuma)
// console.log("boolean_toma:", boolean_toma)
// console.log("var_frecuenciaToma:", var_frecuenciaToma)
// console.log("boolean_sustanciasPsicoactivas:", boolean_sustanciasPsicoactivas)
// console.log("var_frecuenciaSustanciasPsicoactivas:", var_frecuenciaSustanciasPsicoactivas)
// console.log("set_mediosTransportePublico:", set_mediosTransportePublico)
// console.log("set_pasoMayorTiempoLibre:", set_pasoMayorTiempoLibre)
// console.log("var_peso:", var_peso)
// console.log("var_altura:", var_altura)
// console.log("var_urlDatosAdjuntos:", var_urlDatosAdjuntos)


//     }, []);


//     const navigate = useNavigate();

//     // Función para manejar la redirección a la página principal o cualquier otra vista
//     const manejarRedireccion = () => {
//         navigate("/"); // Aquí puedes redirigir a la vista principal o la vista que desees
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <Card variant="outlined" sx={{ width: "100%", maxWidth: 800, margin: "50px auto" }}>
//                 <CardContent sx={{ textAlign: "center", padding: "30px" }}>
//                     <Typography variant="h4" sx={{ fontWeight: "600", mb: 2 }}>
//                         ¡Gracias por diligenciar el formulario!
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 3 }}>
//                         Tu información ha sido registrada con éxito. Agradecemos tu tiempo y esfuerzo.
//                     </Typography>
//                     <Typography variant="body2" sx={{ mb: 4 }}>
//                         Si tienes alguna otra información que agregar, no dudes en regresar a cualquier sección.
//                     </Typography>

//                     {/* Botón para regresar a la página principal o continuar */}
//                     <Button variant="contained" color="primary" onClick={manejarRedireccion}>
//                         Regresar a la página principal
//                     </Button>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default VistaAgradecimientos;



import { Button, Typography, Box, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";


const VistaAgradecimientos = () => {

    useEffect(() => {
        // Obtener todos los datos del localStorage
        const id_usuarioFK = parseInt(localStorage.getItem('usuarioId'), 10);
        const boolean_aceptaTratamientoDatos = localStorage.getItem('aceptaDatos') === 'true';
        const date_fechaNacimiento = localStorage.getItem('date_fechaNacimiento');
        const var_departamentoResidencia = localStorage.getItem('departamentoResidencia');
        const var_ciudadResidencia = localStorage.getItem('ciudadResidencia');
        const var_direccionResidencia = localStorage.getItem('direccionCompleta');
        const var_estratoVivienda = localStorage.getItem('var_estratoVivienda');
        const var_tipoVivienda = localStorage.getItem('var_tipoVivienda');
        const var_estadoCivil = localStorage.getItem('var_estadoCivil');
        const boolean_viveSolo = localStorage.getItem('boolean_viveSolo') === 'true';
        const set_personasConLasQueVive = JSON.stringify(JSON.parse(localStorage.getItem('set_personasConLasQueVive')));
        const boolean_viveConMascotas = localStorage.getItem('boolean_viveConMascotas') === 'true';
        const var_personasDependeciaEconimica = localStorage.getItem('var_personasDependeciaEconimica');
        const var_totalIngresosPropiosYGrupoFamiliar = localStorage.getItem('var_totalIngresosPropiosYGrupoFamiliar');
        const var_grupoEtnico = localStorage.getItem('var_grupoEtnico');
        const var_rh = localStorage.getItem('var_rh');
        const id_epsFK = parseInt(localStorage.getItem('selectedEps'), 10);
        const id_fondoPensionFK = parseInt(localStorage.getItem('selectedFondoPension'), 10);
        const boolean_afiliadoCajaCompensacion = localStorage.getItem('afiliadoCajaCompensacion') === 'true';
        const boolean_cambioEpsOArl = localStorage.getItem('cambioEpsOArl') === 'true';
        const id_cuentaBancariaFK = parseInt(localStorage.getItem('selectedBanco'), 10);
        const var_tipoCuenta = localStorage.getItem('tipoCuenta');
        const var_numeroCuenta = localStorage.getItem('numeroCuenta');
        const var_tipoVinculacion = localStorage.getItem('var_tipoVinculacion');
        const var_tipoContrato = localStorage.getItem('var_tipoContrato');
        const var_salario = localStorage.getItem('var_salario');
        const date_fechaIngresoInstitucion = localStorage.getItem('date_fechaIngresoInstitucion');
        const var_antiguedadInstitucion = localStorage.getItem('var_antiguedadInstitucion');
        const id_areaFK = parseInt(localStorage.getItem('area'), 10);
        const var_cargo = localStorage.getItem('var_cargo');
        const var_jefeInmediato = localStorage.getItem('var_jefeInmediato');
        const var_sede = localStorage.getItem('var_sede');
        const var_celular = localStorage.getItem('var_celular');
        const var_telefonoFijo = localStorage.getItem('var_telefonoFijo');
        const var_turnoTrabajo = localStorage.getItem('var_turnoTrabajo');
        const var_nivelEscolaridad = localStorage.getItem('nivelEscolaridad');
        const var_nombreCarrera = localStorage.getItem('nombreCarrera');
        const boolean_actualmenteEstudia = localStorage.getItem('actualmenteEstudia') === 'true';
        const boolean_actividadFisica = localStorage.getItem('boolean_actividadFisica') === 'true';
        const var_frecuenciaActividadFisica = localStorage.getItem('var_frecuenciaActividadFisica');
        const boolean_fuma = localStorage.getItem('boolean_fuma') === 'true';
        const var_frecuenciaFuma = localStorage.getItem('var_frecuenciaFuma');
        const boolean_toma = localStorage.getItem('boolean_toma') === 'true';
        const var_frecuenciaToma = localStorage.getItem('var_frecuenciaToma');
        const boolean_sustanciasPsicoactivas = localStorage.getItem('boolean_sustanciasPsicoactivas') === 'true';
        const var_frecuenciaSustanciasPsicoactivas = localStorage.getItem('var_frecuenciaSustanciasPsicoactivas');
        const set_mediosTransportePublico = localStorage.getItem('set_mediosTransportePublico');
        const set_pasoMayorTiempoLibre = JSON.stringify(JSON.parse(localStorage.getItem('set_pasoMayorTiempoLibre')));
        const var_peso = localStorage.getItem('var_peso');
        const var_altura = localStorage.getItem('var_altura');
        const var_urlDatosAdjuntos = localStorage.getItem('selectedEps');
        



        // Mostrar todos los datos individualmente en la consola para depuración
        console.log("id_usuario:", id_usuarioFK)
        console.log("boolean_aceptaTratamientoDatos:", boolean_aceptaTratamientoDatos)
        console.log("date_fechaNacimiento:", date_fechaNacimiento)
        console.log("var_departamentoResidencia:", var_departamentoResidencia)
        console.log("var_ciudadResidencia:", var_ciudadResidencia)
        console.log("var_direccionResidencia:", var_direccionResidencia)
        console.log("var_estratoVivienda:", var_estratoVivienda)
        console.log("var_tipoVivienda:", var_tipoVivienda)
        console.log("var_estadoCivil:", var_estadoCivil)
        console.log("boolean_viveSolo:", boolean_viveSolo)
        console.log("set_personasConLasQueVive:", set_personasConLasQueVive)
        console.log("boolean_viveConMascotas:", boolean_viveConMascotas)
        console.log("var_personasDependeciaEconimica:", var_personasDependeciaEconimica)
        console.log("var_totalIngresosPropiosYGrupoFamiliar:", var_totalIngresosPropiosYGrupoFamiliar)
        console.log("var_grupoEtnico:", var_grupoEtnico)
        console.log("var_rh:", var_rh)
        console.log("id_epsFK:", id_epsFK)
        console.log("id_fondoPensionFK:", id_fondoPensionFK)
        console.log("boolean_afiliadoCajaCompensacion:", boolean_afiliadoCajaCompensacion)
        console.log("boolean_cambioEpsOArl:", boolean_cambioEpsOArl)
        console.log("id_cuentaBancariaFK:", id_cuentaBancariaFK)
        console.log("var_tipoCuenta:", var_tipoCuenta)
        console.log("var_numeroCuenta:", var_numeroCuenta)
        console.log("var_tipoVinculacion:", var_tipoVinculacion)
        console.log("var_tipoContrato:", var_tipoContrato)
        console.log("var_salario:", var_salario)
        console.log("date_fechaIngresoInstitucion:", date_fechaIngresoInstitucion)
        console.log("var_antiguedadInstitucion:", var_antiguedadInstitucion)
        console.log("id_areaFK:", id_areaFK)
        console.log("var_cargo:", var_cargo)
        console.log("var_jefeInmediato:", var_jefeInmediato)
        console.log("var_sede:", var_sede)
        console.log("var_celular:", var_celular)
        console.log("var_telefonoFijo:", var_telefonoFijo)
        console.log("var_turnoTrabajo:", var_turnoTrabajo)
        console.log("var_nivelEscolaridad:", var_nivelEscolaridad)
        console.log("var_nombreCarrera:", var_nombreCarrera)
        console.log("boolean_actualmenteEstudia:", boolean_actualmenteEstudia)
        console.log("boolean_actividadFisica:", boolean_actividadFisica)
        console.log("var_frecuenciaActividadFisica:", var_frecuenciaActividadFisica)
        console.log("boolean_fuma:", boolean_fuma)
        console.log("var_frecuenciaFuma:", var_frecuenciaFuma)
        console.log("boolean_toma:", boolean_toma)
        console.log("var_frecuenciaToma:", var_frecuenciaToma)
        console.log("boolean_sustanciasPsicoactivas:", boolean_sustanciasPsicoactivas)
        console.log("var_frecuenciaSustanciasPsicoactivas:", var_frecuenciaSustanciasPsicoactivas)
        console.log("set_mediosTransportePublico:", set_mediosTransportePublico)
        console.log("set_pasoMayorTiempoLibre:", set_pasoMayorTiempoLibre)
        console.log("var_peso:", var_peso)
        console.log("var_altura:", var_altura)
        console.log("var_urlDatosAdjuntos:", var_urlDatosAdjuntos)

        // Crear un objeto con los datos que se enviarán
        const profesionalData = {
            id_usuarioFK,
            boolean_aceptaTratamientoDatos,
            date_fechaNacimiento,
            var_departamentoResidencia,
            var_ciudadResidencia,
            var_direccionResidencia,
            var_estratoVivienda,
            var_tipoVivienda,
            var_estadoCivil,
            boolean_viveSolo,
            set_personasConLasQueVive,
            boolean_viveConMascotas,
            var_personasDependeciaEconimica,
            var_totalIngresosPropiosYGrupoFamiliar,
            var_grupoEtnico,
            var_rh,
            id_epsFK,
            id_fondoPensionFK,
            boolean_afiliadoCajaCompensacion,
            boolean_cambioEpsOArl,
            id_cuentaBancariaFK,
            var_tipoCuenta,
            var_numeroCuenta,
            var_tipoVinculacion,
            var_tipoContrato,
            var_salario,
            date_fechaIngresoInstitucion,
            var_antiguedadInstitucion,
            id_areaFK,
            var_cargo,
            var_jefeInmediato,
            var_sede,
            var_celular,
            var_telefonoFijo,
            var_turnoTrabajo,
            var_nivelEscolaridad,
            var_nombreCarrera,
            boolean_actualmenteEstudia,
            boolean_actividadFisica,
            var_frecuenciaActividadFisica,
            boolean_fuma,
            var_frecuenciaFuma,
            boolean_toma,
            var_frecuenciaToma,
            boolean_sustanciasPsicoactivas,
            var_frecuenciaSustanciasPsicoactivas,
            set_mediosTransportePublico,
            set_pasoMayorTiempoLibre,
            var_peso,
            var_altura,
            var_urlDatosAdjuntos
        };

        // Enviar los datos al backend
        axios.post('http://localhost:3001/profesional/', profesionalData)
            .then((response) => {
                console.log('Profesional creado con éxito:', response.data);
            })
            .catch((error) => {
                console.error('Error al crear el profesional:', error);
            });
    }, []);


    const navigate = useNavigate();

    // Función para manejar la redirección a la página principal o cualquier otra vista
    const manejarRedireccion = () => {
        navigate("/"); // Aquí puedes redirigir a la vista principal o la vista que desees
    };

    return (
        <div style={{ padding: "20px" }}>
            <Card variant="outlined" sx={{ width: "100%", maxWidth: 800, margin: "50px auto" }}>
                <CardContent sx={{ textAlign: "center", padding: "30px" }}>
                    <Typography variant="h4" sx={{ fontWeight: "600", mb: 2 }}>
                        ¡Gracias por diligenciar el formulario!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        Tu información ha sido registrada con éxito. Agradecemos tu tiempo y esfuerzo.
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 4 }}>
                        Si tienes alguna otra información que agregar, no dudes en regresar a cualquier sección.
                    </Typography>

                    {/* Botón para regresar a la página principal o continuar */}
                    <Button variant="contained" color="primary" onClick={manejarRedireccion}>
                        Regresar a la página principal
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaAgradecimientos;
