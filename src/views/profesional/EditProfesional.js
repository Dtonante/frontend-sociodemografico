


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_PROFESIONAL = 'https://evaluacion.esumer.edu.co/api/profesional/'

const CompEditarProfesional = () => {
    const [id_usuarioFK, setId_usuarioFK] = useState('')
    const [boolean_aceptaTratamientoDatos, setBoolean_aceptaTratamientoDatos] = useState('')
    const [date_fechaNacimiento, setDate_fechaNacimiento] = useState('')
    const [var_departamentoResidencia, setVar_departamentoResidencia] = useState('')
    const [var_ciudadResidencia, setVar_ciudadResidencia] = useState('')
    const [var_direccionResidencia, setVar_direccionResidencia] = useState('')
    const [var_estratoVivienda, setVar_estratoVivienda] = useState('')
    const [var_tipoVivienda, setVar_tipoVivienda] = useState('')
    const [var_estadoCivil, setVar_estadoCivil] = useState('')
    const [boolean_viveSolo, setBoolean_viveSolo] = useState('')
    const [var_numeroPersonasConLasQueVive, setVar_numeroPersonasConLasQueVive] = useState('')
    const [set_personasConLasQueVive, setSet_personasConLasQueVive] = useState('')
    const [boolean_viveConMascotas, setBoolean_viveConMascotas] = useState('')
    const [set_tipoMascotas, setSet_tipoMascotas] = useState('')
    const [var_personasDependeciaEconimica, setVar_personasDependeciaEconimica] = useState('')
    const [var_totalIngresosPropiosYGrupoFamiliar, setVar_totalIngresosPropiosYGrupoFamiliar] = useState('')
    const [var_grupoEtnico, setVar_grupoEtnico] = useState('')
    const [var_rh, setVar_rh] = useState('')
    const [id_epsFK, setId_epsFK] = useState('')
    const [id_fondoPensionFK, setId_fondoPensionFK] = useState('')
    const [boolean_cambioEpsOArl, setBoolean_cambioEpsOArl] = useState('')
    const [id_cuentaBancariaFK, setId_cuentaBancariaFK] = useState('')
    const [var_tipoCuenta, setVar_tipoCuenta] = useState('')
    const [var_numeroCuenta, setVar_numeroCuenta] = useState('')
    const [var_tipoContrato, setVar_tipoContrato] = useState('')
    const [var_salario, setVar_salario] = useState('')
    const [date_fechaIngresoInstitucion, setDate_fechaIngresoInstitucion] = useState('')
    const [var_antiguedadInstitucion, setVar_antiguedadInstitucion] = useState('')
    const [id_areaFK, setId_areaFK] = useState('')
    const [var_cargo, setVar_cargo] = useState('')
    const [var_jefeInmediato, setVar_jefeInmediato] = useState('')
    const [var_sede, setVar_sede] = useState('')
    const [var_celular, setVar_celular] = useState('')
    const [var_telefonoEmergencia, setVar_telefonoEmergencia] = useState('')
    const [var_turnoTrabajo, setVar_turnoTrabajo] = useState('')
    const [var_nivelEscolaridad, setVar_nivelEscolaridad] = useState('')
    const [var_nombreCarrera, setVar_nombreCarrera] = useState('')
    const [boolean_actualmenteEstudia, setBoolean_actualmenteEstudia] = useState('')
    const [boolean_actividadFisica, setBoolean_actividadFisica] = useState('')
    const [var_frecuenciaActividadFisica, setVar_frecuenciaActividadFisica] = useState('')
    const [boolean_fuma, setBoolean_fuma] = useState('')
    const [var_frecuenciaFuma, setVar_frecuenciaFuma] = useState('')
    const [boolean_toma, setBoolean_toma] = useState('')
    const [var_frecuenciaToma, setVar_frecuenciaToma] = useState('')
    const [boolean_sustanciasPsicoactivas, setBoolean_sustanciasPsicoactivas] = useState('')
    const [var_frecuenciaSustanciasPsicoactivas, setVar_frecuenciaSustanciasPsicoactivas] = useState('')
    const [set_mediosTransportePublico, setSet_mediosTransportePublico] = useState('')
    const [set_pasoMayorTiempoLibre, setSet_pasoMayorTiempoLibre] = useState('')
    const [var_peso, setVar_peso] = useState('')
    const [var_altura, setVar_altura] = useState('')
    const [var_urlDatosAdjuntos, setVar_urlDatosAdjuntos] = useState('')
    const [var_correoElectronicoInstitucional, setVar_correoElectronicoInstitucional] = useState('')
    const [boolean_usaLentes, setBoolean_usaLentes] = useState('')
    const [boolean_bebidasEnergizantes, setBoolean_bebidasEnergizantes] = useState('')
    const [var_zonaVivienda, setVar_zonaVivienda] = useState('')
    const [var_frecuenciaBebidasEnergeticas, setVar_frecuenciaBebidasEnergeticas] = useState('')
    const navigate = useNavigate()
    const {id_profesionalPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_PROFESIONAL+id_profesionalPK, {
            id_usuarioFK: id_usuarioFK,
            boolean_aceptaTratamientoDatos:boolean_aceptaTratamientoDatos, 
            date_fechaNacimiento: date_fechaNacimiento, 
            var_departamentoResidencia: var_departamentoResidencia, 
            var_ciudadResidencia: var_ciudadResidencia,   
            var_direccionResidencia: var_direccionResidencia, 
            var_estratoVivienda: var_estratoVivienda, 
            var_tipoVivienda: var_tipoVivienda, 
            var_estadoCivil: var_estadoCivil, 
            boolean_viveSolo: boolean_viveSolo, 
            var_numeroPersonasConLasQueVive: var_numeroPersonasConLasQueVive, 
            set_personasConLasQueVive: set_personasConLasQueVive, 
            boolean_viveConMascotas: boolean_viveConMascotas, 
            set_tipoMascotas: set_tipoMascotas, 
            var_personasDependeciaEconimica: var_personasDependeciaEconimica, 
            var_totalIngresosPropiosYGrupoFamiliar: 
            var_totalIngresosPropiosYGrupoFamiliar, 
            var_grupoEtnico: var_grupoEtnico, 
            var_rh: var_rh, 
            id_epsFK: id_epsFK, 
            id_fondoPensionFK: id_fondoPensionFK, 
            boolean_cambioEpsOArl: boolean_cambioEpsOArl, 
            id_cuentaBancariaFK: id_cuentaBancariaFK, 
            var_tipoCuenta:var_tipoCuenta, 
            var_numeroCuenta: var_numeroCuenta, 
            var_tipoContrato: var_tipoContrato,
            var_salario: var_salario,
            date_fechaIngresoInstitucion: date_fechaIngresoInstitucion,
            var_antiguedadInstitucion: var_antiguedadInstitucion,
            id_areaFK: id_areaFK,
            var_cargo: var_cargo,
            var_jefeInmediato: var_jefeInmediato,
            var_sede: var_sede,
            var_celular: var_celular,
            var_telefonoEmergencia: var_telefonoEmergencia,
            var_turnoTrabajo: var_turnoTrabajo,
            var_nivelEscolaridad: var_nivelEscolaridad,
            var_nombreCarrera: var_nombreCarrera,
            boolean_actualmenteEstudia: boolean_actualmenteEstudia,
            boolean_actividadFisica: boolean_actividadFisica,
            var_frecuenciaActividadFisica: var_frecuenciaActividadFisica,
            boolean_fuma: boolean_fuma,
            var_frecuenciaFuma: var_frecuenciaFuma,
            boolean_toma: boolean_toma,
            var_frecuenciaToma: var_frecuenciaToma,
            boolean_sustanciasPsicoactivas: boolean_sustanciasPsicoactivas,
            var_frecuenciaSustanciasPsicoactivas: var_frecuenciaSustanciasPsicoactivas,
            set_mediosTransportePublico: set_mediosTransportePublico,
            set_pasoMayorTiempoLibre: set_pasoMayorTiempoLibre,
            var_peso:var_peso,
            var_altura: var_altura,
            var_urlDatosAdjuntos: var_urlDatosAdjuntos,
            var_correoElectronicoInstitucional: var_correoElectronicoInstitucional,
            boolean_usaLentes: boolean_usaLentes,
            boolean_bebidasEnergizantes: boolean_bebidasEnergizantes,
            var_zonaVivienda: var_zonaVivienda,
            var_frecuenciaBebidasEnergeticas: var_frecuenciaBebidasEnergeticas,

        })
        navigate('/')
    }

    useEffect( ()=>{
        getProfesional()
    }, [])

    const getProfesional = async ()=> {
        const res = await axios.get(URI_PROFESIONAL+id_profesionalPK)
        setId_usuarioFK(res.data.id_usuarioFK)
        setBoolean_aceptaTratamientoDatos(res.data.boolean_aceptaTratamientoDatos)
        setDate_fechaNacimiento(res.data.date_fechaNacimiento)
        setVar_departamentoResidencia(res.data.var_departamentoResidencia)
        setVar_ciudadResidencia(res.data.var_ciudadResidencia)
        setVar_direccionResidencia(res.data.var_direccionResidencia)
        setVar_estratoVivienda(res.data.var_estratoVivienda)
        setVar_tipoVivienda(res.data.var_tipoVivienda)
        setVar_estadoCivil(res.data.var_estadoCivil)
        setBoolean_viveSolo(res.data.boolean_viveSolo)
        setVar_numeroPersonasConLasQueVive(res.data.var_numeroPersonasConLasQueVive)
        setSet_personasConLasQueVive(res.data.set_personasConLasQueVive)
        setBoolean_viveConMascotas(res.data.boolean_viveConMascotas)
        setSet_tipoMascotas(res.data.set_tipoMascotas)
        setVar_personasDependeciaEconimica(res.data.var_personasDependeciaEconimica)
        setVar_totalIngresosPropiosYGrupoFamiliar(res.data.var_totalIngresosPropiosYGrupoFamiliar)
        setVar_grupoEtnico(res.data.var_grupoEtnico)
        setVar_rh(res.data.var_rh)
        setId_epsFK(res.data.id_epsFK)
        setId_fondoPensionFK(res.data.id_fondoPensionFK)
        setBoolean_cambioEpsOArl(res.data.boolean_cambioEpsOArl)
        setId_cuentaBancariaFK(res.data.id_cuentaBancariaFK)
        setVar_tipoCuenta(res.data.var_tipoCuenta)
        setVar_numeroCuenta(res.data.var_numeroCuenta)
        setVar_tipoContrato(res.data.var_tipoContrato)
        setVar_salario(res.data.var_salario)
        setDate_fechaIngresoInstitucion(res.data.date_fechaIngresoInstitucion)
        setVar_antiguedadInstitucion(res.data.var_antiguedadInstitucion)
        setId_areaFK(res.data.id_areaFK)
        setVar_cargo(res.data.var_cargo)
        setVar_jefeInmediato(res.data.var_jefeInmediato)
        setVar_sede(res.data.var_sede)
        setVar_celular(res.data.var_celular)
        setVar_telefonoEmergencia(res.data.var_telefonoEmergencia)
        setVar_turnoTrabajo(res.data.var_turnoTrabajo)
        setVar_nivelEscolaridad(res.data.var_nivelEscolaridad)
        setVar_nombreCarrera(res.data.var_nombreCarrera)
        setBoolean_actualmenteEstudia(res.data.boolean_actualmenteEstudia)
        setBoolean_actividadFisica(res.data.boolean_actividadFisica)
        setVar_frecuenciaActividadFisica(res.data.var_frecuenciaActividadFisica)
        setBoolean_fuma(res.data.boolean_fuma)
        setVar_frecuenciaFuma(res.data.var_frecuenciaFuma)
        setBoolean_toma(res.data.boolean_toma)
        setVar_frecuenciaToma(res.data.var_frecuenciaToma)
        setBoolean_sustanciasPsicoactivas(res.data.boolean_sustanciasPsicoactivas)
        setVar_frecuenciaSustanciasPsicoactivas(res.data.var_frecuenciaSustanciasPsicoactivas)
        setSet_mediosTransportePublico(res.data.set_mediosTransportePublico)
        setSet_pasoMayorTiempoLibre(res.data.set_pasoMayorTiempoLibre)
        setVar_peso(res.data.var_peso)
        setVar_altura(res.data.var_altura)
        setVar_urlDatosAdjuntos(res.data.var_urlDatosAdjuntos)
        setVar_correoElectronicoInstitucional(res.data.var_correoElectronicoInstitucional)
        setBoolean_usaLentes(res.data.boolean_usaLentes)
        setBoolean_bebidasEnergizantes(res.data.boolean_bebidasEnergizantes)
        setVar_zonaVivienda(res.data.var_zonaVivienda)
        setVar_frecuenciaBebidasEnergeticas(res.data.var_frecuenciaBebidasEnergeticas)
    }
    return (
        <div className="container">
            <form onSubmit={actualizar}>
                {/* ID Usuario */}
                <div className="form-group">
                    <label>ID Usuario:</label>
                    <input
                        type="text"
                        value={id_usuarioFK}
                        onChange={(e) => setId_usuarioFK(e.target.value)}
                    />
                </div>
    
                {/* Acepta Tratamiento de Datos */}
                <div className="form-group">
                    <label>Acepta Tratamiento de Datos:</label>
                    <input
                        type="checkbox"
                        checked={boolean_aceptaTratamientoDatos === 'true'}
                        onChange={() => setBoolean_aceptaTratamientoDatos(boolean_aceptaTratamientoDatos === 'true' ? 'false' : 'true')}
                    />
                </div>
    
                {/* Fecha de Nacimiento */}
                <div className="form-group">
                    <label>Fecha de Nacimiento:</label>
                    <input
                        type="date"
                        value={date_fechaNacimiento}
                        onChange={(e) => setDate_fechaNacimiento(e.target.value)}
                    />
                </div>
    
                {/* Departamento de Residencia */}
                <div className="form-group">
                    <label>Departamento de Residencia:</label>
                    <input
                        type="text"
                        value={var_departamentoResidencia}
                        onChange={(e) => setVar_departamentoResidencia(e.target.value)}
                    />
                </div>
    
                {/* Ciudad de Residencia */}
                <div className="form-group">
                    <label>Ciudad de Residencia:</label>
                    <input
                        type="text"
                        value={var_ciudadResidencia}
                        onChange={(e) => setVar_ciudadResidencia(e.target.value)}
                    />
                </div>
    
                {/* Dirección de Residencia */}
                <div className="form-group">
                    <label>Dirección de Residencia:</label>
                    <input
                        type="text"
                        value={var_direccionResidencia}
                        onChange={(e) => setVar_direccionResidencia(e.target.value)}
                    />
                </div>
    
                {/* Estrato Vivienda */}
                <div className="form-group">
                    <label>Estrato Vivienda:</label>
                    <input
                        type="text"
                        value={var_estratoVivienda}
                        onChange={(e) => setVar_estratoVivienda(e.target.value)}
                    />
                </div>
    
                {/* Tipo de Vivienda */}
                <div className="form-group">
                    <label>Tipo de Vivienda:</label>
                    <input
                        type="text"
                        value={var_tipoVivienda}
                        onChange={(e) => setVar_tipoVivienda(e.target.value)}
                    />
                </div>
    
                {/* Estado Civil */}
                <div className="form-group">
                    <label>Estado Civil:</label>
                    <input
                        type="text"
                        value={var_estadoCivil}
                        onChange={(e) => setVar_estadoCivil(e.target.value)}
                    />
                </div>
    
                {/* Vive Solo */}
                <div className="form-group">
                    <label>¿Vive Solo?</label>
                    <input
                        type="checkbox"
                        checked={boolean_viveSolo === 'true'}
                        onChange={() => setBoolean_viveSolo(boolean_viveSolo === 'true' ? 'false' : 'true')}
                    />
                </div>

                {/* Personas con las que Vive */}
                <div className="form-group">
                    <label>Personas con las que Vive:</label>
                    <input
                        type="text"
                        value={var_numeroPersonasConLasQueVive}
                        onChange={(e) => setVar_numeroPersonasConLasQueVive(e.target.value)}
                    />
                </div>
                {/* Personas con las que Vive */}
                <div className="form-group">
                    <label>Personas con las que Vive:</label>
                    <input
                        type="text"
                        value={set_personasConLasQueVive}
                        onChange={(e) => setSet_personasConLasQueVive(e.target.value)}
                    />
                </div>
    
                {/* Vive con Mascotas */}
                <div className="form-group">
                    <label>¿Vive con Mascotas?</label>
                    <input
                        type="checkbox"
                        checked={boolean_viveConMascotas === 'true'}
                        onChange={() => setBoolean_viveConMascotas(boolean_viveConMascotas === 'true' ? 'false' : 'true')}
                    />
                </div>

                {/* Personas tipo mascotas  */}
                <div className="form-group">
                    <label>Personas Dependencia Económica:</label>
                    <input
                        type="text"
                        value={set_tipoMascotas}
                        onChange={(e) => setSet_tipoMascotas(e.target.value)}
                    />
                </div>
    
                {/* Personas Dependencia Económica */}
                <div className="form-group">
                    <label>Personas Dependencia Económica:</label>
                    <input
                        type="text"
                        value={var_personasDependeciaEconimica}
                        onChange={(e) => setVar_personasDependeciaEconimica(e.target.value)}
                    />
                </div>
    
                {/* Total Ingresos Propios y Grupo Familiar */}
                <div className="form-group">
                    <label>Total Ingresos Propios y Grupo Familiar:</label>
                    <input
                        type="text"
                        value={var_totalIngresosPropiosYGrupoFamiliar}
                        onChange={(e) => setVar_totalIngresosPropiosYGrupoFamiliar(e.target.value)}
                    />
                </div>
    
                {/* Grupo Étnico */}
                <div className="form-group">
                    <label>Grupo Étnico:</label>
                    <input
                        type="text"
                        value={var_grupoEtnico}
                        onChange={(e) => setVar_grupoEtnico(e.target.value)}
                    />
                </div>
    
                {/* RH */}
                <div className="form-group">
                    <label>RH:</label>
                    <input
                        type="text"
                        value={var_rh}
                        onChange={(e) => setVar_rh(e.target.value)}
                    />
                </div>
    
                {/* EPS */}
                <div className="form-group">
                    <label>id EPS:</label>
                    <input
                        type="number"
                        value={id_epsFK}
                        onChange={(e) => setId_epsFK(e.target.value)}
                    />
                </div>
                {/* Fondo de Pensión */}
                <div className="form-group">
                    <label>id Fondo de Pensión:</label>
                    <input
                        type="number"
                        value={id_fondoPensionFK}
                        onChange={(e) => setId_fondoPensionFK(e.target.value)}
                    />
                </div>
    
                {/* Cambio EPS o ARL */}
                <div className="form-group">
                    <label>¿Cambio de EPS o ARL?</label>
                    <input
                        type="checkbox"
                        checked={boolean_cambioEpsOArl === 'true'}
                        onChange={() => setBoolean_cambioEpsOArl(boolean_cambioEpsOArl === 'true' ? 'false' : 'true')}
                    />
                </div>
    
                {/* Cuenta Bancaria */}
                <div className="form-group">
                    <label>id Cuenta Bancaria:</label>
                    <input
                        type="number"
                        value={id_cuentaBancariaFK}
                        onChange={(e) => setId_cuentaBancariaFK(e.target.value)}
                    />
                </div>
    
                {/* Tipo de Cuenta */}
                <div className="form-group">
                    <label>Tipo de Cuenta:</label>
                    <input
                        type="text"
                        value={var_tipoCuenta}
                        onChange={(e) => setVar_tipoCuenta(e.target.value)}
                    />
                </div>
    
                {/* Número de Cuenta */}
                <div className="form-group">
                    <label>Número de Cuenta:</label>
                    <input
                        type="text"
                        value={var_numeroCuenta}
                        onChange={(e) => setVar_numeroCuenta(e.target.value)}
                    />
                </div>
    
                
    
                {/* Tipo de Contrato */}
                <div className="form-group">
                    <label>Tipo de Contrato:</label>
                    <input
                        type="text"
                        value={var_tipoContrato}
                        onChange={(e) => setVar_tipoContrato(e.target.value)}
                    />
                </div>
                {/* Salario */}
                <div className="form-group">
                    <label>Salario:</label>
                    <input
                        type="text"
                        value={var_salario}
                        onChange={(e) => setVar_salario(e.target.value)}
                    />
                </div>
    
                {/* Fecha de Ingreso a la Institución */}
                <div className="form-group">
                    <label>Fecha de Ingreso a la Institución:</label>
                    <input
                        type="date"
                        value={date_fechaIngresoInstitucion}
                        onChange={(e) => setDate_fechaIngresoInstitucion(e.target.value)}
                    />
                </div>
    
                {/* Antigüedad en la Institución */}
                <div className="form-group">
                    <label>Antigüedad en la Institución:</label>
                    <input
                        type="text"
                        value={var_antiguedadInstitucion}
                        onChange={(e) => setVar_antiguedadInstitucion(e.target.value)}
                    />
                </div>
    
                {/* Área */}
                <div className="form-group">
                    <label>id Área:</label>
                    <input
                        type="number"
                        value={id_areaFK}
                        onChange={(e) => setId_areaFK(e.target.value)}
                    />
                </div>
    
                {/* Cargo */}
                <div className="form-group">
                    <label>Cargo:</label>
                    <input
                        type="text"
                        value={var_cargo}
                        onChange={(e) => setVar_cargo(e.target.value)}
                    />
                </div>
    
                {/* Jefe Inmediato */}
                <div className="form-group">
                    <label>Jefe Inmediato:</label>
                    <input
                        type="text"
                        value={var_jefeInmediato}
                        onChange={(e) => setVar_jefeInmediato(e.target.value)}
                    />
                </div>
    
                {/* Sede */}
                <div className="form-group">
                    <label>Sede:</label>
                    <input
                        type="text"
                        value={var_sede}
                        onChange={(e) => setVar_sede(e.target.value)}
                    />
                </div>
    
                {/* Celular */}
                <div className="form-group">
                    <label>Celular:</label>
                    <input
                        type="text"
                        value={var_celular}
                        onChange={(e) => setVar_celular(e.target.value)}
                    />
                </div>
    
                {/* Teléfono Fijo */}
                <div className="form-group">
                    <label>Teléfono de emergencia:</label>
                    <input
                        type="text"
                        value={var_telefonoEmergencia}
                        onChange={(e) => setVar_telefonoEmergencia(e.target.value)}
                    />
                </div>
    
                {/* Turno de Trabajo */}
                <div className="form-group">
                    <label>Turno de Trabajo:</label>
                    <input
                        type="text"
                        value={var_turnoTrabajo}
                        onChange={(e) => setVar_turnoTrabajo(e.target.value)}
                    />
                </div>
    
                {/* Nivel de Escolaridad */}
                <div className="form-group">
                    <label>Nivel de Escolaridad:</label>
                    <input
                        type="text"
                        value={var_nivelEscolaridad}
                        onChange={(e) => setVar_nivelEscolaridad(e.target.value)}
                    />
                </div>
    
                {/* Nombre de la Carrera */}
                <div className="form-group">
                    <label>Nombre de la Carrera:</label>
                    <input
                        type="text"
                        value={var_nombreCarrera}
                        onChange={(e) => setVar_nombreCarrera(e.target.value)}
                    />
                </div>
    
                {/* ¿Actualmente Estudia? */}
                <div className="form-group">
                    <label>¿Actualmente Estudia?</label>
                    <input
                        type="checkbox"
                        checked={boolean_actualmenteEstudia === 'true'}
                        onChange={(e) => setBoolean_actualmenteEstudia(e.target.checked ? 'true' : 'false')}
                    />
                </div>
    
                {/* ¿Realiza Actividad Física? */}
                <div className="form-group">
                    <label>¿Realiza Actividad Física?</label>
                    <input
                        type="checkbox"
                        checked={boolean_actividadFisica === 'true'}
                        onChange={(e) => setBoolean_actividadFisica(e.target.checked ? 'true' : 'false')}
                    />
                </div>
    
                {/* Frecuencia de Actividad Física */}
                {boolean_actividadFisica === 'true' && (
                    <div className="form-group">
                        <label>Frecuencia de Actividad Física:</label>
                        <input
                            type="text"
                            value={var_frecuenciaActividadFisica}
                            onChange={(e) => setVar_frecuenciaActividadFisica(e.target.value)}
                        />
                    </div>
                )}
    
    
                {/* ¿Fuma? */}
                <div className="form-group">
                    <label>¿Fuma?</label>
                    <input
                        type="checkbox"
                        checked={boolean_fuma === 'true'}
                        onChange={(e) => setBoolean_fuma(e.target.checked ? 'true' : 'false')}
                    />
                </div>
    
                {/* Frecuencia de Fumar */}
                {boolean_fuma === 'true' && (
                    <div className="form-group">
                        <label>Frecuencia de Fumar:</label>
                        <input
                            type="text"
                            value={var_frecuenciaFuma}
                            onChange={(e) => setVar_frecuenciaFuma(e.target.value)}
                        />
                    </div>
                )}
    
                {/* ¿Toma? */}
                <div className="form-group">
                    <label>¿Toma?</label>
                    <input
                        type="checkbox"
                        checked={boolean_toma === 'true'}
                        onChange={(e) => setBoolean_toma(e.target.checked ? 'true' : 'false')}
                    />
                </div>
    
                {/* Frecuencia de Toma */}
                {boolean_toma === 'true' && (
                    <div className="form-group">
                        <label>Frecuencia de Toma:</label>
                        <input
                            type="text"
                            value={var_frecuenciaToma}
                            onChange={(e) => setVar_frecuenciaToma(e.target.value)}
                        />
                    </div>
                )}
    
                {/* ¿Usa Sustancias Psicoactivas? */}
                <div className="form-group">
                    <label>¿Usa Sustancias Psicoactivas?</label>
                    <input
                        type="checkbox"
                        checked={boolean_sustanciasPsicoactivas === 'true'}
                        onChange={(e) => setBoolean_sustanciasPsicoactivas(e.target.checked ? 'true' : 'false')}
                    />
                </div>
    
                {/* Frecuencia de Uso de Sustancias Psicoactivas */}
                {boolean_sustanciasPsicoactivas === 'true' && (
                    <div className="form-group">
                        <label>Frecuencia de Uso de Sustancias Psicoactivas:</label>
                        <input
                            type="text"
                            value={var_frecuenciaSustanciasPsicoactivas}
                            onChange={(e) => setVar_frecuenciaSustanciasPsicoactivas(e.target.value)}
                        />
                    </div>
                )}
    
                {/* Medios de Transporte Público */}
                <div className="form-group">
                    <label>Medios de Transporte Público:</label>
                    <input
                        type="text"
                        value={set_mediosTransportePublico}
                        onChange={(e) => setSet_mediosTransportePublico(e.target.value)}
                    />
                </div>
    
                {/* ¿Qué hace en su mayor tiempo libre? */}
                <div className="form-group">
                    <label>¿Qué hace en su mayor tiempo libre?</label>
                    <input
                        type="text"
                        value={set_pasoMayorTiempoLibre}
                        onChange={(e) => setSet_pasoMayorTiempoLibre(e.target.value)}
                    />
                </div>
    
                {/* Peso */}
                <div className="form-group">
                    <label>Peso:</label>
                    <input
                        type="text"
                        value={var_peso}
                        onChange={(e) => setVar_peso(e.target.value)}
                    />
                </div>
    
                {/* Altura */}
                <div className="form-group">
                    <label>Altura:</label>
                    <input
                        type="text"
                        value={var_altura}
                        onChange={(e) => setVar_altura(e.target.value)}
                    />
                </div>
    
                {/* URL de Datos Adjuntos */}
                <div className="form-group">
                    <label>URL de Datos Adjuntos:</label>
                    <input
                        type="text"
                        value={var_urlDatosAdjuntos}
                        onChange={(e) => setVar_urlDatosAdjuntos(e.target.value)}
                    />
                </div>
    
                {/* URL de correo institucional */}
                <div className="form-group">
                    <label>Correo institucional:</label>
                    <input
                        type="text"
                        value={var_correoElectronicoInstitucional}
                        onChange={(e) => setVar_correoElectronicoInstitucional(e.target.value)}
                    />
                </div>
    
                {/* URL de boolean usa lentes */}
                <div className="form-group">
                    <label>usa lentes:</label>
                    <input
                        type="text"
                        value={boolean_usaLentes}
                        onChange={(e) => setBoolean_usaLentes(e.target.value)}
                    />
                </div>
    
                {/* URL de bebidas energizantes */}
                <div className="form-group">
                    <label>bolean bebida energizante:</label>
                    <input
                        type="text"
                        value={boolean_bebidasEnergizantes}
                        onChange={(e) => setBoolean_bebidasEnergizantes(e.target.value)}
                    />
                </div>
    
                {/* URL de zonaVivienda */}
                <div className="form-group">
                    <label>Zona vivienda:</label>
                    <input
                        type="text"
                        value={var_zonaVivienda}
                        onChange={(e) => setVar_zonaVivienda(e.target.value)}
                    />
                </div>
                {/* URL de  frecuentia bebida energizante*/}
                <div className="form-group">
                    <label>Frecuencia bebida energizante:</label>
                    <input
                        type="text"
                        value={var_frecuenciaBebidasEnergeticas}
                        onChange={(e) => setVar_frecuenciaBebidasEnergeticas(e.target.value)}
                    />
                </div>
                
    
                <button type="submit" className="btn btn-primary" >guardar</button>
    
            </form>
    
        </div>
    );

}

export default CompEditarProfesional