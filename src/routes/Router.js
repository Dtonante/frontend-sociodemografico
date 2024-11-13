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


//ruta de eps
const CompShowEps = lazy(() => import("../views/eps/ShowEps.js"));
//fin ruta eps


/*****Pages******/
const Dashboard1 = lazy(() => import("../views/dashboards/Dashboard1.js"));

/*****Tables******/
const BasicTable = lazy(() => import("../views/tables/BasicTable.js"));

// form elements
const ExAutoComplete = lazy(() =>
  import("../views/FormElements/ExAutoComplete.js")
);
const ExButton = lazy(() => import("../views/FormElements/ExButton.js"));
const ExCheckbox = lazy(() => import("../views/FormElements/ExCheckbox.js"));
const ExRadio = lazy(() => import("../views/FormElements/ExRadio.js"));
const ExSlider = lazy(() => import("../views/FormElements/ExSlider.js"));
const ExSwitch = lazy(() => import("../views/FormElements/ExSwitch.js"));

// form layouts
const FormLayouts = lazy(() => import("../views/FormLayouts/FormLayouts.js"));

/*****Routes******/

// const ThemeRoutes = [
  
//   {
//     path: "/",
//     element:<FullLayout/>,
//     children: [
//       // { path: "/", element: <Navigate to="dashboards/dashboard1" /> },
//       { path: "eps", exact: true, element: <CompShowEps /> },

//       { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
//       { path: "tables/basic-table", element: <BasicTable /> },
//       { path: "/form-layouts/form-layouts", element: <FormLayouts /> },
//       { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
//       { path: "/form-elements/button", element: <ExButton /> },
//       { path: "/form-elements/checkbox", element: <ExCheckbox /> },
//       { path: "/form-elements/radio", element: <ExRadio /> },
//       { path: "/form-elements/slider", element: <ExSlider /> },
//       { path: "/", element: <ExSwitch /> },
//     ],
//   },
//   { path: "/", exact: true, element: <VistaProteccionDatos /> },
//   { path: "/datosUsuario", exact: true, element: <VistaDatosUsuario /> },
// ];

const ThemeRoutes = [
  { path: "/", element: <VistaHomeUsuarioNuevo />,},
  { path: "/proteccionDatos", element: <VistaProteccionDatos />,},
  { path: "/datosUsuario",  element: <VistaDatosUsuario /> },
  { path: "/datosProfesional",  element: <VistaDatosProfesional /> },
  { path: "/datosProfesional2",  element: <VistaDatosProfesional2 /> },
  { path: "/datosProfesional3",  element: <VistaDatosProfesional3 /> },
  { path: "/datosProfesional4",  element: <VistaDatosProfesional4 /> },
  { path: "/datosProfesional5",  element: <VistaDatosProfesional5 /> },
  { path: "/datosProfesional6",  element: <VistaDatosProfesional6 /> },
  { path: "/datosProfesional7",  element: <VistaDatosProfesional7 /> },
  { path: "/datosProfesional8",  element: <VistaDatosProfesional8 /> },
  { path: "/agradecimientos",  element: <VistaAgradecimientos /> },
  {
    path: "/app",
    element: <FullLayout />,
    children: [
      { path: "eps", exact: true, element: <CompShowEps /> },
      { path: "dashboards/dashboard1", exact: true, element: <Dashboard1 /> },
      { path: "tables/basic-table", element: <BasicTable /> },
      { path: "form-layouts/form-layouts", element: <FormLayouts /> },
      { path: "form-elements/autocomplete", element: <ExAutoComplete /> },
      { path: "form-elements/button", element: <ExButton /> },
      { path: "form-elements/checkbox", element: <ExCheckbox /> },
      { path: "form-elements/radio", element: <ExRadio /> },
      { path: "form-elements/slider", element: <ExSlider /> },
      { path: "form-elements/switch", element: <ExSwitch /> },
    ],
  },
];


export default ThemeRoutes;
