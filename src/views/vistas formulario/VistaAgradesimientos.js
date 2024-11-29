
import { Button, Typography, Box, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import '../../css/VistaHomeNuevoUsuario.css'



const VistaAgradecimientos = () => {
    const navigate = useNavigate();


    // Función para navegar a la vista de login
    const manejarLogin = () => {
        navigate('/login');
    };

    // Función para navegar a la vista de datos de usuario
    const manejarDatosUsuario = () => {
        navigate('/');
    };


    useEffect(() => {

        const guardarDatos = async () => {

            const URI_PROFESIONAL = 'https://evaluacion.esumer.edu.co/api/profesional/'
            const URI_PROFESIONAL_FACTORES_RIESGO = 'https://evaluacion.esumer.edu.co/api/profesionalFactoresRiesgo/'
            const URI_PROFESIONAL_SERVICIOS_SALUD_ADICIONAL = 'https://evaluacion.esumer.edu.co/api/profesionalServicioSaludAdicional/'
            const URI_PROFESIONAL_ANTECEDENTES_MEDICOS = 'https://evaluacion.esumer.edu.co/api/profesionalAntecedenteMedico/'
            const URI_PROFESIONAL_TIEMPO_LIBRE = 'https://evaluacion.esumer.edu.co/api/profesionalTiempoLibre/'
            const URI_PROFESIONAL_SERVICIO_QUE_NO_CUENTAN = 'https://evaluacion.esumer.edu.co/api/profesionalServiciosQueNoCuentan/'
            const URI_PROFESIONAL_TRANSPORTE_PROPIO = 'https://evaluacion.esumer.edu.co/api/profesionalTransportePropio/'

            // Obtener todos los datos del localStorage
            const id_usuarioFK = parseInt(localStorage.getItem('usuarioId'), 10);
            const boolean_aceptaTratamientoDatos = localStorage.getItem('aceptaDatos') === 'true';
            const date_fechaNacimiento = localStorage.getItem('date_fechaNacimiento');
            const var_departamentoResidencia = localStorage.getItem('departamentoResidencia');
            const var_ciudadResidencia = localStorage.getItem('ciudadResidencia');
            const detalleDireccion = localStorage.getItem('detalleDireccion')
            let direccionSinDetalle = localStorage.getItem('direccionCompleta');
            const var_direccionResidencia = `${direccionSinDetalle} ${detalleDireccion}`.trim();
            const var_estratoVivienda = localStorage.getItem('estratoVivienda');
            const var_tipoVivienda = localStorage.getItem('tipoVivienda');
            const var_estadoCivil = localStorage.getItem('var_estadoCivil');
            const boolean_viveSolo = localStorage.getItem('boolean_viveSolo') === 'true';
            const var_numeroPersonasConLasQueVive = localStorage.getItem('var_numeroPersonasConLasQueVive')
            const set_personasConLasQueVive = localStorage.getItem('set_personasConLasQueVive') || "";
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
            let var_frecuenciaActividadFisica = localStorage.getItem('var_frecuenciaActividadFisica');
            if (boolean_actividadFisica == false) {
                var_frecuenciaActividadFisica = 'N/A';
            }
            const boolean_fuma = localStorage.getItem('boolean_fuma') === 'true';
            // const var_frecuenciaFuma = localStorage.getItem('var_frecuenciaFuma');
            let var_frecuenciaFuma = localStorage.getItem('var_frecuenciaFuma');

            if (boolean_fuma == false) {
                var_frecuenciaFuma = 'N/A';
            }
            const boolean_toma = localStorage.getItem('boolean_toma') === 'true';
            let var_frecuenciaToma = localStorage.getItem('var_frecuenciaToma');
            if (boolean_toma == false) {
                var_frecuenciaToma = 'N/A';
            }
            const boolean_sustanciasPsicoactivas = localStorage.getItem('boolean_sustanciasPsicoactivas') === 'true';
            let var_frecuenciaSustanciasPsicoactivas = localStorage.getItem('var_frecuenciaSustanciasPsicoactivas');
            if (boolean_sustanciasPsicoactivas == false) {
                var_frecuenciaSustanciasPsicoactivas = 'N/A';
            }
            const set_mediosTransportePublico = localStorage.getItem('set_mediosTransportePublico');
            const set_pasoMayorTiempoLibre = JSON.stringify(JSON.parse(localStorage.getItem('set_pasoMayorTiempoLibre')));
            const var_peso = localStorage.getItem('var_peso');
            const var_altura = localStorage.getItem('var_altura');
            const var_urlDatosAdjuntos = localStorage.getItem('certificadoUrl');
            const var_correoElectronicoInstitucional = localStorage.getItem('var_correoElectronicoInstitucional');
            const boolean_usaLentes = localStorage.getItem('boolean_usaLentes') === 'true';
            const boolean_bebidasEnergizantes = localStorage.getItem('boolean_bebidasEnergizantes') === 'true';
            const var_zonaVivienda = localStorage.getItem('var_zonaVivienda')

            try {
                const response = await axios.post(URI_PROFESIONAL, { id_usuarioFK: id_usuarioFK, boolean_aceptaTratamientoDatos: boolean_aceptaTratamientoDatos, date_fechaNacimiento: date_fechaNacimiento, var_departamentoResidencia: var_departamentoResidencia, var_ciudadResidencia: var_ciudadResidencia, var_direccionResidencia: var_direccionResidencia, var_estratoVivienda: var_estratoVivienda, var_tipoVivienda: var_tipoVivienda, var_estadoCivil: var_estadoCivil, boolean_viveSolo: boolean_viveSolo, var_numeroPersonasConLasQueVive: var_numeroPersonasConLasQueVive, set_personasConLasQueVive: set_personasConLasQueVive, boolean_viveConMascotas: boolean_viveConMascotas, set_tipoMascotas: set_tipoMascotas, var_personasDependeciaEconimica: var_personasDependeciaEconimica, var_totalIngresosPropiosYGrupoFamiliar: var_totalIngresosPropiosYGrupoFamiliar, var_grupoEtnico: var_grupoEtnico, var_rh: var_rh, id_epsFK: id_epsFK, id_fondoPensionFK: id_fondoPensionFK, boolean_cambioEpsOArl: boolean_cambioEpsOArl, id_cuentaBancariaFK: id_cuentaBancariaFK, var_tipoCuenta: var_tipoCuenta, var_numeroCuenta: var_numeroCuenta, var_tipoContrato: var_tipoContrato, var_salario: var_salario, date_fechaIngresoInstitucion: date_fechaIngresoInstitucion, var_antiguedadInstitucion: var_antiguedadInstitucion, id_areaFK: id_areaFK, var_cargo: var_cargo, var_jefeInmediato: var_jefeInmediato, var_sede: var_sede, var_celular: var_celular, var_telefonoFijo: var_telefonoFijo, var_nivelEscolaridad: var_nivelEscolaridad, var_nombreCarrera: var_nombreCarrera, boolean_actualmenteEstudia: boolean_actualmenteEstudia, boolean_actividadFisica: boolean_actividadFisica, var_frecuenciaActividadFisica: var_frecuenciaActividadFisica, boolean_fuma: boolean_fuma, var_frecuenciaFuma: var_frecuenciaFuma, boolean_toma: boolean_toma, var_frecuenciaToma: var_frecuenciaToma, boolean_sustanciasPsicoactivas: boolean_sustanciasPsicoactivas, var_frecuenciaSustanciasPsicoactivas: var_frecuenciaSustanciasPsicoactivas, set_mediosTransportePublico: set_mediosTransportePublico, set_pasoMayorTiempoLibre: set_pasoMayorTiempoLibre, var_peso: var_peso, var_altura: var_altura, var_urlDatosAdjuntos: var_urlDatosAdjuntos, var_correoElectronicoInstitucional: var_correoElectronicoInstitucional, boolean_usaLentes: boolean_usaLentes, boolean_bebidasEnergizantes: boolean_bebidasEnergizantes, var_zonaVivienda: var_zonaVivienda });


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
                //se traen los transportes

                const selectedTransporte = JSON.parse(localStorage.getItem("selectedTransporte")) || [];
                let placa;
                // Verificar si el array contiene alguno de los valores 5, 6 o 7
                if ([5, 6, 7].some((num) => selectedTransporte.includes(num))) {
                    placa = "N/A";
                } else {
                    placa = localStorage.getItem('placa');
                }

                console.log(placa);






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

                // Comprobar si selectedTransporte es un array antes de iterar
                if (Array.isArray(selectedTransporte)) {
                    // Si es un array, proceder con el ciclo
                    for (const id_transportePropioFK of selectedTransporte) {
                        await axios.post(URI_PROFESIONAL_TRANSPORTE_PROPIO, {
                            id_profesionalFK: id_profesionalPK,
                            id_transportePropioFK: id_transportePropioFK,
                            var_numeroPlaca: placa,
                        });
                        console.log(`Relación creada: Profesional ID ${id_profesionalPK}, TRANSPORTE PROPIO ID ${id_transportePropioFK} y placa de ${placa}`);
                    }
                } else {
                    console.error("selectedTransporte no es un array válido o está vacío");
                }


            } catch (error) {
                if (error.response && error.response.status === 400) {

                    const selectedAntecedentesMedicos = JSON.parse(localStorage.getItem('selectedAntecedentes'));
                    // const selectedTransporte = JSON.parse(localStorage.getItem('selectedTransporte'));
                    // const placa = localStorage.getItem('placa')
                    // console.log('jeje', placa)


                    // console.log('Factores de riesgo seleccionados vista agradecimientos:', selectedAntecedentesMedicos);
                    // console.log('puto', selectedTransporte)

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


        <div
            style={{
                backgroundColor: '#F2F2F2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh',
                margin: 0,
                padding: 0,
            }}
        >
            {/* Imagen de fondo */}
            <div style={{ width: '100%', height: '35%', position: 'relative', textAlign: 'center', }}>
                <img
                    className="imagen-fondo"
                    src="public/fondo_home.jpg" // Reemplaza con la ruta correcta de la imagen
                    alt="Fondo"

                />
            </div>

            {/* Contenedor compacto */}
            <div
                className="contenedor-items-buttoms"

            >
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1b263b', fontFamily: 'Roboto Condensed' }}>
                    Gracias por brindardos tu informacion
                </h2>
                {/* Caja informativa */}
                <div
                    style={{
                        backgroundColor: '#F2F2F2',
                        border: '2px solid #202B52',
                        borderRadius: '10px',
                        padding: '15px',
                        textAlign: 'justify',
                    }}
                >
                    <p style={{ margin: 0, color: '#1b263b', fontSize: '14px', fontFamily: 'Poppins' }}>
                        <strong style={{ fontFamily: 'Roboto Condensed' }}>Importante: </strong>Tu información ha sido registrada con éxito. Agradecemos tu tiempo y esfuerzo.
                    </p>
                </div>


                {/* Caja para iconos y botón */}
                <div className="contenedor">
                    {/* Iconos sociales */}
                    <div className="iconos-sociales">
                        {[
                            { nombre: 'Web', url: 'https://esumer.edu.co/' },
                            { nombre: 'Instagram', url: 'https://www.instagram.com/esumermedellin/?hl=es' },
                            { nombre: 'Facebook', url: 'https://m.facebook.com/institucionuniversitariaesumer/' },
                            { nombre: 'Twitter', url: 'https://x.com/esumermedellin?lang=es' },
                            { nombre: 'Youtube', url: 'https://www.youtube.com/channel/UC_R-zFnqGM9Ng7KNcyjj8EA' },
                            { nombre: 'Spotify', url: 'https://open.spotify.com/show/6yPk98znQttoPA6Jr8RiWo' },
                            { nombre: 'Linkedin', url: 'https://co.linkedin.com/company/instituci-n-universitaria-esumer' },
                            { nombre: 'Emisora', url: 'https://welove.radio/radio/esumerlive/' },
                        ].map(({ nombre, url }) => (
                            <button
                                key={nombre}
                                style={{
                                    backgroundColor: '#00A5CE',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                                onClick={() => window.open(url, '_blank', 'noopener')}
                            >
                                <img
                                    src={`/public/${nombre}.png`}
                                    alt={nombre}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                    }}
                                />
                            </button>
                        ))}
                    </div>

                    {/* Botones de acción */}
                    <div className="botones-accion">
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#1b263b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={manejarLogin}
                        >
                            log in
                        </button>
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#1b263b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={manejarDatosUsuario}
                        >
                            Formulario
                        </button>
                    </div>
                </div>

            </div>

            {/* Espaciador final (para ajustar la altura) */}
            <div style={{ flex: 1 }} />
        </div>







    );
};

export default VistaAgradecimientos;