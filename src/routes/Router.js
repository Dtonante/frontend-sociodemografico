import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "../middleware/ProtectedRoute.js";
import AutoLogout from "../middleware/AutoLogout.js";
import RolProtectedRoute from '../middleware/rolProtectedRoute.js';

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/


//-------------------------------- vistas del formulario ---------------------------------------!

//vista proteccion datos
const VistaProteccionDatos = lazy(() => import("../views/vistas formulario/VistaProteccionDatos.js"));
// fin vista proteccion de datos
//inicio vista datos usuario
const VistaDatosUsuario = lazy(() => import("../views/vistas formulario/VistaDatosUsuario.js"))
//fin vista usuarios
//inicio vista profesional
const VistaDatosProfesional = lazy(() => import("../views/vistas formulario/VistaDatosProfesional.js"))
//fin vista profesional
//inicio vista profesional2
const VistaDatosProfesional2 = lazy(() => import("../views/vistas formulario/VistaDatosProfesional2.js"))
//fin vista profesional2
//inicio vista profesional3
const VistaDatosProfesional3 = lazy(() => import("../views/vistas formulario/VistaDatosProfesional3.js"))
//fin vista profesional3
//inicio vista profesional4
const VistaDatosProfesional4 = lazy(() => import("../views/vistas formulario/VistaDatosProfesional4.js"))
//fin vista profesional4
//inicio vista profesional5
const VistaDatosProfesional5 = lazy(() => import("../views/vistas formulario/VistaDatosProfesional5.js"))
//fin vista profesional5
//inicio vista profesional6
const VistaDatosProfesional6 = lazy(() => import("../views/vistas formulario/VistaDatosProfesional6.js"))
//fin vista profesional6
//inicio vista profesional7
const VistaDatosProfesional7 = lazy(() => import("../views/vistas formulario/VistaDatosProfesional7.js"))
//fin vista profesional7
//inicio vista profesional8
const VistaDatosProfesional8 = lazy(() => import("../views/vistas formulario/VistaDatosProfesional8.js"))
//fin vista profesional8
//inicio vista agradecimientos
const VistaAgradecimientos = lazy(() => import("../views/vistas formulario/VistaAgradesimientos.js"))
//fin vista agradecimientos
//inicio vista home
const VistaHomeUsuarioNuevo = lazy(() => import("../views/vistas formulario/VistaHomeNuevoUsuario.js"))
//fin vista home

//--------------------------------------------- fin vistas formulario-----------------------!
//--------------------------------------------- inicio vistas login y recuperar contraseña------------!

//inicio vista login
const Login = lazy(() => import("../views/vistas login/login.js"))
//fin ruta login
//inicio ruta recuperar contraseña
const RecuperarContrasena = lazy(() => import("../views/vistas login/recuperarContrasena.js"));
//fin ruta recuperar contraseña
//inicio ruta cambiar contraseña
const CambiarContrasena = lazy(() => import("../views/vistas login/cambiarContrasena.js"));
//fin ruta cambiar contraseña

//--------------------------------------------- fin vistas login y recuperar contraseña-----------------------!
//--------------------------------------------- inicio vitas del para el administrador (todas las tablas con su crud) --------------------------!


//ruta eps
const CompShowEps = lazy(() => import("../views/eps/ShowEps.js"));
const CompEditarEps = lazy(() => import("../views/eps/EditEps.js"));
//fin ruta eps
//inicio ruta estructura organizacional
const CompShowEstructuraOrganizacional = lazy(() => import("../views/estructuraOrganizacional/ShowEstructuraOrganizacional.js"));
const CompEditarEstructuraOrganizacional = lazy(() => import("../views/estructuraOrganizacional/EditEstructuraOrganizacional.js"));
//fin ruta estructura organizacional
//inicio ruta factores de riesgo
const CompShowFactoresDeRiesgo = lazy(() => import("../views/factoresDeRiesgo/ShowFactoresDeRiesgo.js"));
const CompEditarFactorRiesgo = lazy(() => import("../views/factoresDeRiesgo/EditFactoresDeRiesgo.js"));
//fin ruta factores de riesgo
//inicio ruta antecedentes medicos
const CompShowAntecedentesMedicos = lazy(() => import("../views/antecedentesMedicos/ShowAntecedentesMedicos.js"));
const CompEditarAntecedentesMedicos = lazy(() => import("../views/antecedentesMedicos/EditAntecedentesMedicos.js"));
//fin ruta antecedentes medicos
//inicio ruta cuentas bancarias
const CompShowCuentasBancarias = lazy(() => import("../views/cuentasBancarias/ShowCuentasBancarias.js"));
const CompEditarCuentaBancaria = lazy(() => import("../views/cuentasBancarias/EditCuentasBancarias.js"));
//fin ruta cuentas bancarias
//inicio ruta fondo de pension
const CompShowFondoDePension = lazy(() => import("../views/fondoDePension/ShowFondoDePension.js"));
const CompEditarFondoPension = lazy(() => import("../views/fondoDePension/EditFondoPension.js"));
//fin ruta fondo de pension
//inicio ruta tipo documento
const CompShowTipoDocumento = lazy(() => import("../views/tipoDocumento/ShowTipoDocumento.js"));
const CompEditarTipoDocumento = lazy(() => import("../views/tipoDocumento/EditTipoDocumento.js"));
//fin ruta tipo documento
//inicio ruta transporte propio
const CompShowTransportePropio = lazy(() => import("../views/transportePropio/ShowTransportePropio.js"));
const CompEditarTransportePropio = lazy(() => import("../views/transportePropio/EditTransportePropio.js"));
//fin ruta transporte propio
//inicio ruta servicios que no cuentan
const CompShowServiciosQueNoCuentan = lazy(() => import("../views/serviciosQueNoCuentan/ShowServiciosQueNoCuentan.js"));
const CompEditarServiciosQueNoCuentan = lazy(() => import("../views/serviciosQueNoCuentan/EditServiciosQueNoCuentan.js"));
//fin ruta servicios que no cuentan
//inicio ruta servicios de salud adicional
const CompShowServicioDeSaludAdicional = lazy(() => import("../views/servicioSaludAdicional/ShowServicioSaludAdicional.js"));
const CompEditarServiciosDeSaludAdicional = lazy(() => import("../views/servicioSaludAdicional/EditServicioSaludAdicional.js"));
//fin ruta servicios de salud adicional
//inicio ruta usuarios
const CompShowUsuarios = lazy(() => import("../views/usuarios/ShowUsuarios.js"));
//fin ruta usuarios
//inicio ruta roles
const CompShowrol = lazy(() => import("../views/roles/ShowRoles.js"));
const CompEditarRol = lazy(() => import("../views/roles/EditRol.js"));
//fin ruta roles

//----------------------------- vista de la tabla profesionales
//inicio ruta roles
const CompShowProfesional = lazy(() => import("../views/profesional/ShowProfesional.js"));
//fin ruta roles

//-----------------------------------------vistas editar un profesional (vistas de rol administrativo)
//inicio ruta provisional
const VistaProvisional = lazy(() => import("../views/vistaProvisional/vistaProvisional.js"));
//fin ruta provisional

//inicio ruta editar usuario
const CompEditarUsuario = lazy(() => import("../views/vistasEditarProfesional/EditarVistaDatosUsurio.js"));
//fin ruta editar usuario
//inicio ruta editar profecional
const EditarDatosProfesional = lazy(() => import("../views/vistasEditarProfesional/EditarVistaDatosProfesional.js"));
//fin ruta editar profecional
//inicio ruta editar profesional2
const EditarDatosProfesional2 = lazy(() => import("../views/vistasEditarProfesional/EditarVistaDatosProfesional2.js"));
//fin ruta editar profesional2
//inicio ruta editar profesional3
const EditarDatosProfesional3 = lazy(() => import("../views/vistasEditarProfesional/EditarVistaDatosProfesional3.js"));
//fin ruta editar profesional3
//inicio ruta editar profesional4
const EditarDatosProfesional4 = lazy(() => import("../views/vistasEditarProfesional/EditarVistaDatosProfesional4.js"));
//fin ruta editar profesional4
//inicio ruta editar profesional5
const EditarDatosProfesional5 = lazy(() => import("../views/vistasEditarProfesional/EditarVistaDatosProfesional5.js"));
//fin ruta editar profesional5
//inicio ruta editar profesional6
const EditarDatosProfesional6 = lazy(() => import("../views/vistasEditarProfesional/EditarVistaDatosProfesional6.js"));
//fin ruta editar profesional6
//inicio ruta editar profesional7
const EditarDatosProfesional7 = lazy(() => import("../views/vistasEditarProfesional/EditarVistaDatosProfesional7.js"));
//fin ruta editar profesional7
//inicio ruta editar profesional8
const EditarDatosProfesional8 = lazy(() => import("../views/vistasEditarProfesional/EditarVistaDatosProfesional8.js"));
//fin ruta editar profesional8

//---------------------------------graficas gestion humana-------------------------!
//tablero gestion humana
const TableroGestionHumana = lazy(() => import("../views/tablerosPerfinSociodemogafico/tableroGestionHumana.js"));




const ThemeRoutes = [
  { path: "/", element: <VistaHomeUsuarioNuevo />, },
  { path: "/login", element: <Login />, },
  { path: "/proteccionDatos", element: <VistaProteccionDatos />, },
  { path: "/InfoUsuario", element: <VistaDatosUsuario /> },
  { path: "/DatosProfesionales", element: <VistaDatosProfesional /> },
  { path: "/DatosAdicionales", element: <VistaDatosProfesional2 /> },
  { path: "/SeguridadSocial", element: <VistaDatosProfesional3 /> },
  { path: "/InformacionBancaria", element: <VistaDatosProfesional4 /> },
  { path: "/InformacionLaboral", element: <VistaDatosProfesional5 /> },
  { path: "/FormacionAcademica", element: <VistaDatosProfesional6 /> },
  { path: "/SaludFisica", element: <VistaDatosProfesional7 /> },
  { path: "/Transporte", element: <VistaDatosProfesional8 /> },
  { path: "/Agradecimiento", element: <VistaAgradecimientos /> },
  { path: "/RecuperarContrasena", element: <RecuperarContrasena /> },
  { path: "/CambiarContrasena", element: <CambiarContrasena /> },

  {
    path: "/app",
    element: (
      <>
        <AutoLogout />
        <ProtectedRoute>
          <FullLayout />
        </ProtectedRoute>
      </>
    ),
    children: [
      //CRUD eps
      { path: "eps", exact: true, element: <CompShowEps /> },
      { path: "editarEps/:id_epsPK", exact: true, element: <CompEditarEps /> },
      //CRUD estructura organizacional
      { path: "estructuraOrganizacional", exact: true, element: <CompShowEstructuraOrganizacional /> },
      { path: "editarEstructuraOrganizacional/:id_areaPk", exact: true, element: <CompEditarEstructuraOrganizacional /> },
      //CRUD factores de riesgo
      { path: "factoresRiesgo", exact: true, element: <CompShowFactoresDeRiesgo /> },
      { path: "editarFactorRiesgo/:id_factoresRiesgoPK", exact: true, element: <CompEditarFactorRiesgo /> },
      //CRUD antecedentes medicos
      { path: "antecedentesMedicos", exact: true, element: <CompShowAntecedentesMedicos /> },
      { path: "editarAntecedentesMedicos/:id_antecedenteMedicoPK", exact: true, element: <CompEditarAntecedentesMedicos /> },
      //CRUD cuentas bancarias
      { path: "cuentasBancarias", exact: true, element: <CompShowCuentasBancarias /> },
      { path: "editarCuentaBancaria/:id_cuentaBancariaPK", exact: true, element: <CompEditarCuentaBancaria /> },
      //CRUD fondo de pension
      { path: "fondoPension", exact: true, element: <CompShowFondoDePension /> },
      { path: "editarFondoPension/:id_fondoPensionPK", exact: true, element: <CompEditarFondoPension /> },
      //CRUD tipo documento
      { path: "tipoDocumento", exact: true, element: <CompShowTipoDocumento /> },
      { path: "editarTipoDocumento/:id_tipoDocumentoPK", exact: true, element: <CompEditarTipoDocumento /> },
      //CRUD transporte propio
      { path: "transportePropio", exact: true, element: <CompShowTransportePropio /> },
      { path: "editarTransportePropio/:id_transportePropioPK", exact: true, element: <CompEditarTransportePropio /> },
      //CRUD servicios que no cuentan
      { path: "serviciosQueNoCuentan", exact: true, element: <CompShowServiciosQueNoCuentan /> },
      { path: "editarServiciosQueNoCuentan/:id_servicioQueNoCuentaPK", exact: true, element: <CompEditarServiciosQueNoCuentan /> },
      //CRUD servicios salud adicional
      { path: "serviciosSaludAdicional", exact: true, element: <CompShowServicioDeSaludAdicional /> },
      { path: "editarServiciosSaludAdicional/:id_servicioDeSaludAdicionalPK", exact: true, element: <CompEditarServiciosDeSaludAdicional /> },
      //CRUD roles
      { path: "roles", exact: true, element: <CompShowrol /> },
      { path: "editarRol/:id_rolPK", exact: true, element: <CompEditarRol /> },
      //ruta de la tabla profesionales
      { path: "profesional", exact: true, element: <CompShowProfesional /> },
      //ruta de la tabla usuarios
      { path: "usuarios", exact: true, element: <CompShowUsuarios /> },

      //Vistas de los formularios para editar la informacion de un administrativo
      { path: "editarUsuario", exact: true, element: <CompEditarUsuario /> },
      { path: "editarDatosProfesional", exact: true, element: <EditarDatosProfesional /> },
      { path: "editarDatosProfesional2", exact: true, element: <EditarDatosProfesional2 /> },
      { path: "editarDatosProfesional3", exact: true, element: <EditarDatosProfesional3 /> },
      { path: "editarDatosProfesional4", exact: true, element: <EditarDatosProfesional4 /> },
      { path: "editarDatosProfesional5", exact: true, element: <EditarDatosProfesional5 /> },
      { path: "editarDatosProfesional6", exact: true, element: <EditarDatosProfesional6 /> },
      { path: "editarDatosProfesional7", exact: true, element: <EditarDatosProfesional7 /> },
      { path: "editarDatosProfesional8", exact: true, element: <EditarDatosProfesional8 /> },
      {
        path: "/app",
        element: (
          <RolProtectedRoute>
            {({ rol }) => {
              // Según el rol, renderiza la vista correspondiente
              if (rol === "Administrativo") {
                return <VistaProvisional />;
              } else if (rol === "Gestion Humana") {
                return <TableroGestionHumana />;
              } else {
                // Redirigir si el rol no es uno de los esperados
                return <Navigate to="/app" />;
              }
            }}
          </RolProtectedRoute>
        ),
      },
    ],
  }

];




export default ThemeRoutes;


