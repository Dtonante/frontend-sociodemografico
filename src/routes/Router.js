import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

//vista proteccion datos
const VistaProteccionDatos  = lazy(() => import("../views/vistas formulario/VistaProteccionDatos.js"));
// fin vista proteccion de datos
//inicio vista datos usuario
const VistaDatosUsuario = lazy(()=> import("../views/vistas formulario/VistaDatosUsuario.js"))
//fin vista usuarios
//inicio vista profesional
const VistaDatosProfesional = lazy(()=> import("../views/vistas formulario/VistaDatosProfesional.js"))
//fin vista profesional
//inicio vista profesional2
const VistaDatosProfesional2 = lazy(()=> import("../views/vistas formulario/VistaDatosProfesional2.js"))
//fin vista profesional2
//inicio vista profesional3
const VistaDatosProfesional3 = lazy(()=> import("../views/vistas formulario/VistaDatosProfesional3.js"))
//fin vista profesional3
//inicio vista profesional4
const VistaDatosProfesional4 = lazy(()=> import("../views/vistas formulario/VistaDatosProfesional4.js"))
//fin vista profesional4
//inicio vista profesional5
const VistaDatosProfesional5 = lazy(()=> import("../views/vistas formulario/VistaDatosProfesional5.js"))
//fin vista profesional5
//inicio vista profesional6
const VistaDatosProfesional6 = lazy(()=> import("../views/vistas formulario/VistaDatosProfesional6.js"))
//fin vista profesional6
//inicio vista profesional7
const VistaDatosProfesional7 = lazy(()=> import("../views/vistas formulario/VistaDatosProfesional7.js"))
//fin vista profesional7
//inicio vista profesional8
const VistaDatosProfesional8 = lazy(()=> import("../views/vistas formulario/VistaDatosProfesional8.js"))
//fin vista profesional8
//inicio vista agradecimientos
const VistaAgradecimientos = lazy(()=> import("../views/vistas formulario/VistaAgradesimientos.js"))
//fin vista agradecimientos
//inicio vista home
const VistaHomeUsuarioNuevo = lazy(()=> import("../views/vistas formulario/VistaHomeNuevoUsuario.js"))
//fin vista home
//inicio vista login
const Login = lazy(()=> import("../views/vistas login/login.js"))



//ruta eps
const CompShowEps = lazy(() => import("../views/eps/ShowEps.js"));
//fin ruta eps
//inicio ruta estructura organizacional
const CompShowEstructuraOrganizacional = lazy(() => import("../views/estructuraOrganizacional/ShowEstructuraOrganizacional.js"));
//fin ruta estructura organizacional
//inicio ruta factores de riesgo
const CompShowFactoresDeRiesgo = lazy(() => import("../views/factoresDeRiesgo/ShowFactoresDeRiesgo.js"));
//fin ruta factores de riesgo
//inicio ruta antecedentes medicos
const CompShowAntecedentesMedicos = lazy(() => import("../views/antecedentesMedicos/ShowAntecedentesMedicos.js"));
//fin ruta antecedentes medicos
//inicio ruta cuentas bancarias
const CompShowCuentasBancarias = lazy(() => import("../views/cuentasBancarias/ShowCuentasBancarias.js"));
//fin ruta cuentas bancarias
//inicio ruta fondo de pension
const CompShowFondoDePension = lazy(() => import("../views/fondoDePension/ShowFondoDePension.js"));
//fin ruta fondo de pension
//inicio ruta tipo documento
const CompShowTipoDocumento = lazy(() => import("../views/tipoDocumento/ShowTipoDocumento.js"));
//fin ruta tipo documento
//inicio ruta transporte propio
const CompShowTransportePropio = lazy(() => import("../views/transportePropio/ShowTransportePropio.js"));
//fin ruta transporte propio
//inicio ruta servicios que no cuentan
const CompShowServiciosQueNoCuentan = lazy(() => import("../views/serviciosQueNoCuentan/ShowServiciosQueNoCuentan.js"));
//fin ruta servicios que no cuentan
//inicio ruta servicios de salud adicional
const CompShowServicioDeSaludAdicional = lazy(() => import("../views/servicioSaludAdicional/ShowServicioSaludAdicional.js"));
//fin ruta servicios de salud adicional
//inicio ruta usuarios
const CompShowUsuarios = lazy(() => import("../views/usuarios/ShowUsuarios.js"));
//fin ruta usuarios
//inicio ruta roles
const CompShowrol = lazy(() => import("../views/roles/ShowRoles.js"));
//fin ruta roles
//inicio ruta roles
const CompShowProfesional = lazy(() => import("../views/profesional/ShowProfesional.js"));
//fin ruta roles



const ThemeRoutes = [
  { path: "/", element: <VistaHomeUsuarioNuevo/>,},
  { path: "/login", element: <Login/>,},
  { path: "/proteccionDatos", element: <VistaProteccionDatos />,},
  { path: "/InfoUsuario",  element: <VistaDatosUsuario /> },
  { path: "/DatosProfesionales",  element: <VistaDatosProfesional /> },
  { path: "/DatosAdicionales",  element: <VistaDatosProfesional2 /> },
  { path: "/SeguridadSocial",  element: <VistaDatosProfesional3 /> },
  { path: "/InformacionBancaria",  element: <VistaDatosProfesional4 /> },
  { path: "/InformacionLaboral",  element: <VistaDatosProfesional5 /> },
  { path: "/FormacionAcademica",  element: <VistaDatosProfesional6 /> },
  { path: "/SaludFisica",  element: <VistaDatosProfesional7 /> },
  { path: "/Transporte",  element: <VistaDatosProfesional8 /> },
  { path: "/Agradecimiento",  element: <VistaAgradecimientos /> },

  {
    path: "/app",
    element: <FullLayout />,
    children: [
      { path: "eps", exact: true, element: <CompShowEps /> },
      { path: "estructuraOrganizacional", exact: true, element: <CompShowEstructuraOrganizacional /> },
      { path: "factoresRiesgo", exact: true, element: <CompShowFactoresDeRiesgo /> },
      { path: "antecedentesMedicos", exact: true, element: <CompShowAntecedentesMedicos /> },
      { path: "cuentasBancarias", exact: true, element: <CompShowCuentasBancarias /> },
      { path: "fondoPension", exact: true, element: <CompShowFondoDePension /> },
      { path: "tipoDocumento", exact: true, element: <CompShowTipoDocumento /> },
      { path: "transportePropio", exact: true, element: <CompShowTransportePropio /> },
      { path: "serviciosQueNoCuentan", exact: true, element: <CompShowServiciosQueNoCuentan /> },
      { path: "serviciosSaludAdicional", exact: true, element: <CompShowServicioDeSaludAdicional /> },
      { path: "usuarios", exact: true, element: <CompShowUsuarios /> },
      { path: "roles", exact: true, element: <CompShowrol /> },
      { path: "profesional", exact: true, element: <CompShowProfesional /> },
      // { path: "/app/dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      // { path: "tables/basic-table", element: <BasicTable /> },
      // { path: "form-layouts/form-layouts", element: <FormLayouts /> },
      // { path: "form-elements/autocomplete", element: <ExAutoComplete /> },
      // { path: "form-elements/button", element: <ExButton /> },
      // { path: "form-elements/checkbox", element: <ExCheckbox /> },
      // { path: "form-elements/radio", element: <ExRadio /> },
      // { path: "form-elements/slider", element: <ExSlider /> },
      // { path: "form-elements/switch", element: <ExSwitch /> },
    ],
  },
];


export default ThemeRoutes;
