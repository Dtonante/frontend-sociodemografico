
import { Button, Typography, Box, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";



const VistaAgradecimientos = () => {
    const navigate = useNavigate();


    useEffect(() => {

        const guardarDatos = async () => {

            const URI_PROFESIONAL = 'http://localhost:3001/profesional/'
            const URI_PROFESIONAL_FACTORES_RIESGO = 'http://localhost:3001/profesionalFactoresRiesgo/'
            const URI_PROFESIONAL_SERVICIOS_SALUD_ADICIONAL = 'http://localhost:3001/profesionalServicioSaludAdicional/'
            const URI_PROFESIONAL_ANTECEDENTES_MEDICOS = 'http://localhost:3001/profesionalAntecedenteMedico/'
            const URI_PROFESIONAL_TIEMPO_LIBRE = 'http://localhost:3001/profesionalTiempoLibre/'
            const URI_PROFESIONAL_SERVICIO_QUE_NO_CUENTAN = 'http://localhost:3001/profesionalServiciosQueNoCuentan/'

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
            const var_numeroPersonasConLasQueVive = localStorage.getItem('var_numeroPersonasConLasQueVive')
            const set_personasConLasQueVive = JSON.stringify(JSON.parse(localStorage.getItem('set_personasConLasQueVive')));
            const boolean_viveConMascotas = localStorage.getItem('boolean_viveConMascotas') === 'true';
            const set_tipoMascotas = localStorage.getItem('set_tipoMascotas')
            const var_personasDependeciaEconimica = localStorage.getItem('var_personasDependeciaEconimica');
            const var_totalIngresosPropiosYGrupoFamiliar = localStorage.getItem('var_totalIngresosPropiosYGrupoFamiliar');
            const var_grupoEtnico = localStorage.getItem('var_grupoEtnico');
            const var_rh = localStorage.getItem('var_rh');
            const id_epsFK = parseInt(localStorage.getItem('selectedEps'), 10);
            const id_fondoPensionFK = parseInt(localStorage.getItem('selectedFondoPension'), 10);
            const boolean_cambioEpsOArl = localStorage.getItem('cambioEpsOArl') === 'true';
            const id_cuentaBancariaFK = parseInt(localStorage.getItem('selectedBanco'), 10);
            const var_tipoCuenta = localStorage.getItem('tipoCuenta');
            const var_numeroCuenta = localStorage.getItem('numeroCuenta');
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
            const var_urlDatosAdjuntos = localStorage.getItem('certificadoUrl');
            const var_correoElectronicoInstitucional = localStorage.getItem('var_correoElectronicoInstitucional');
            const boolean_usaLentes = localStorage.getItem('boolean_usaLentes')=== 'true';
            const boolean_bebidasEnergizantes = localStorage.getItem('boolean_bebidasEnergizantes')=== 'true';
            const var_zonaVivienda = localStorage.getItem('var_zonaVivienda')
            try {
                const response = await axios.post(URI_PROFESIONAL, { id_usuarioFK: id_usuarioFK, boolean_aceptaTratamientoDatos: boolean_aceptaTratamientoDatos, date_fechaNacimiento: date_fechaNacimiento, var_departamentoResidencia: var_departamentoResidencia, var_ciudadResidencia: var_ciudadResidencia, var_direccionResidencia: var_direccionResidencia, var_estratoVivienda: var_estratoVivienda, var_tipoVivienda: var_tipoVivienda, var_estadoCivil: var_estadoCivil, boolean_viveSolo: boolean_viveSolo, set_personasConLasQueVive: set_personasConLasQueVive, boolean_viveConMascotas: boolean_viveConMascotas, var_personasDependeciaEconimica: var_personasDependeciaEconimica, var_totalIngresosPropiosYGrupoFamiliar: var_totalIngresosPropiosYGrupoFamiliar, var_grupoEtnico: var_grupoEtnico, var_rh: var_rh, id_epsFK: id_epsFK, id_fondoPensionFK: id_fondoPensionFK, boolean_cambioEpsOArl: boolean_cambioEpsOArl, id_cuentaBancariaFK: id_cuentaBancariaFK, var_tipoCuenta: var_tipoCuenta, var_numeroCuenta: var_numeroCuenta, var_tipoVinculacion: var_tipoVinculacion, var_tipoContrato: var_tipoContrato, var_salario: var_salario, date_fechaIngresoInstitucion: date_fechaIngresoInstitucion, var_antiguedadInstitucion: var_antiguedadInstitucion, id_areaFK: id_areaFK, var_cargo: var_cargo, var_jefeInmediato: var_jefeInmediato, var_sede: var_sede, var_celular: var_celular, var_telefonoFijo: var_telefonoFijo, var_turnoTrabajo: var_turnoTrabajo, var_nivelEscolaridad: var_nivelEscolaridad, var_nombreCarrera: var_nombreCarrera, boolean_actualmenteEstudia: boolean_actualmenteEstudia, boolean_actividadFisica: boolean_actividadFisica, var_frecuenciaActividadFisica: var_frecuenciaActividadFisica, boolean_fuma: boolean_fuma, var_frecuenciaFuma: var_frecuenciaFuma, boolean_toma: boolean_toma, var_frecuenciaToma: var_frecuenciaToma, boolean_sustanciasPsicoactivas: boolean_sustanciasPsicoactivas, var_frecuenciaSustanciasPsicoactivas: var_frecuenciaSustanciasPsicoactivas, set_mediosTransportePublico: set_mediosTransportePublico, set_pasoMayorTiempoLibre: set_pasoMayorTiempoLibre, var_peso: var_peso, var_altura: var_altura, var_urlDatosAdjuntos: var_urlDatosAdjuntos });


                //se traen los factores de riesgo para crear en la tabla relacional
                const selectedFactoresRiesgo = JSON.parse(localStorage.getItem('selectedFactoresRiesgo'));
                //se traen los servicios de salud adicional para crear en la tabla relacional
                const selectedServiciosSaludAdicional = JSON.parse(localStorage.getItem('selectedServiciosSaludAdicional'));
                //se traen los antecedentes medicos
                const selectedAntecedentesMedicos = JSON.parse(localStorage.getItem('selectedAntecedentes'));
                //se traen las actividadesd de tiempo libre
                const selectedActividadesTiempoLibre = JSON.parse(localStorage.getItem('actividadTiempoLibre'));
                //se traen las actividadesd de tiempo libre
                const selectedServiciosQueNoCuentan = JSON.parse(localStorage.getItem('selectedServiciosQueNoCuentan'));

                // se atrapa el id del profesional que se crea para las tablas relacionales
                const { id_profesionalPK } = response.data;

                // Crear relación para cada factor de riesgo
                for (const id_factoresRiesgoFK of selectedFactoresRiesgo) {
                    await axios.post(URI_PROFESIONAL_FACTORES_RIESGO, {
                        id_profesionalFK: id_profesionalPK,
                        id_factoresRiesgoFK: id_factoresRiesgoFK,
                    });
                    console.log(`Relación creada: Profesional ID ${id_profesionalPK}, Factor de Riesgo ID ${id_factoresRiesgoFK}`);
                }

                // Crear relación para cada servicio de salud adicional
                for (const id_ServicioDeSaludAdicionalFK of selectedServiciosSaludAdicional) {
                    await axios.post(URI_PROFESIONAL_SERVICIOS_SALUD_ADICIONAL, {
                        id_profesionalFK: id_profesionalPK,
                        id_ServicioDeSaludAdicionalFK: id_ServicioDeSaludAdicionalFK,
                    });
                    console.log(`Relación creada: Profesional ID ${id_profesionalPK}, Servicio salud adicional ID ${id_ServicioDeSaludAdicionalFK}`);
                }

                // Crear relación para cada antecedente medico
                for (const id_antecedenteMedicoFK of selectedAntecedentesMedicos) {
                    await axios.post(URI_PROFESIONAL_ANTECEDENTES_MEDICOS, {
                        id_profesionalFK: id_profesionalPK,
                        id_antecedenteMedicoFK: id_antecedenteMedicoFK,
                    });
                    console.log(`Relación creada: Profesional ID ${id_profesionalPK}, Antecedente Medico ID ${id_antecedenteMedicoFK}`);
                }
                // Crear relación para cada tiempo libre
                for (const id_tiempoLibreFK of selectedActividadesTiempoLibre) {
                    await axios.post(URI_PROFESIONAL_TIEMPO_LIBRE, {
                        id_profesionalFK: id_profesionalPK,
                        id_tiempoLibreFK: id_tiempoLibreFK,
                    });
                    console.log(`Relación creada: Profesional ID ${id_profesionalPK}, Actividad Tiempo Libre ID ${id_tiempoLibreFK}`);
                }
                // Crear relación para cada servicio que no cuentan
                for (const id_servicioQueNoCuentaFK of selectedServiciosQueNoCuentan) {
                    await axios.post(URI_PROFESIONAL_SERVICIO_QUE_NO_CUENTAN, {
                        id_profesionalFK: id_profesionalPK,
                        id_servicioQueNoCuentaFK: id_servicioQueNoCuentaFK,
                    });
                    console.log(`Relación creada: Profesional ID ${id_profesionalPK}, Servicio Que No Cuentan ID ${id_servicioQueNoCuentaFK}`);
                }


            } catch (error) {
                if (error.response && error.response.status === 400) {

                    const selectedAntecedentesMedicos = JSON.parse(localStorage.getItem('selectedAntecedentes'));

                    console.log('Factores de riesgo seleccionados vista agradecimientos:', selectedAntecedentesMedicos);
                    // Si el error es por duplicado, muestra un mensaje amigable
                    console.log('Ya se ha creado un profesional con este usuario. No es necesario volver a crear.');
                } else {
                    // En otros casos, muestra un error genérico
                    console.error('Error al guardar los datos:', error.message);
                }
            }
        };

        guardarDatos();



    }, []);



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
                    <Button variant="contained" color="primary">
                        Regresar a la página principal
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default VistaAgradecimientos;