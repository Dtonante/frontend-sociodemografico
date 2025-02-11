import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import ElderlyIcon from '@mui/icons-material/Elderly';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import Person4Icon from '@mui/icons-material/Person4';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import {
  AccountCircle as AccountCircleIcon,
  Work as WorkIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
  AccountBalance as AccountBalanceIcon,
  BusinessCenter as BusinessCenterIcon,
  School as SchoolIcon,
  FitnessCenter as FitnessCenterIcon,
  DirectionsCar as DirectionsCarIcon,
} from '@mui/icons-material';



const Menuitems = [
  {
    title: "Administrativos",
    icon: RecentActorsIcon,
    href: "profesional",
    rolesAllowed: ["Contabilidad", "Gestion Humana", "SuperAdmin"], 
  },
  {
    title: "datos de usuario",
    icon: AccountCircleIcon,
    href: "editarUsuario",
    rolesAllowed: ["Administrativo", "Contabilidad", "Gestion Humana"], 
  },
  {
    title: "datos profesional",
    icon: WorkIcon,
    href: "editarDatosProfesional",
    rolesAllowed: ["Administrativo", "Contabilidad", "Gestion Humana"], 
  },
  {
    title: "datos adicionales",
    icon: InfoIcon,
    href: "editarDatosProfesional2",
    rolesAllowed: ["Administrativo", "Contabilidad", "Gestion Humana"], 
  },
  {
    title: "seguridad social",
    icon: SecurityIcon,
    href: "editarDatosProfesional3",
    rolesAllowed: ["Administrativo", "Contabilidad", "Gestion Humana"], 
  },
  {
    title: "Información bancaria",
    icon: AccountBalanceIcon,
    href: "editarDatosProfesional4",
    rolesAllowed: ["Administrativo", "Contabilidad", "Gestion Humana"], 
  },
  {
    title: "Información laboral",
    icon: BusinessCenterIcon,
    href: "editarDatosProfesional5",
    rolesAllowed: ["Administrativo", "Contabilidad", "Gestion Humana"], 
  },
  {
    title: "Formación académica",
    icon: SchoolIcon,
    href: "editarDatosProfesional6",
    rolesAllowed: ["Administrativo", "Contabilidad", "Gestion Humana"], 
  },
  {
    title: "Salud Fisica",
    icon: FitnessCenterIcon,
    href: "editarDatosProfesional7",
    rolesAllowed: ["Administrativo", "Contabilidad", "Gestion Humana"], 
  },
  {
    title: "Medios de transporte utilizado",
    icon: DirectionsCarIcon,
    href: "editarDatosProfesional8",
    rolesAllowed: ["Administrativo", "Contabilidad", "Gestion Humana"], 
  },
  {
    title: "roles",
    icon: SupervisedUserCircleIcon,
    href: "roles",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Usuarios",
    icon: Person4Icon,
    href: "usuarios",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Servicios de salud adicional",
    icon: Diversity1Icon,
    href: "serviciosSaludAdicional",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Servicios que no cuentan",
    icon: PlaylistRemoveIcon,
    href: "serviciosQueNoCuentan",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Transporte Propio",
    icon: NoCrashIcon,
    href: "transportePropio",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Tipo documento",
    icon: FindInPageIcon,
    href: "tipoDocumento",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Fondos de pension",
    icon: ElderlyIcon,
    href: "fondoPension",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Bancos",
    icon: AssuredWorkloadIcon,
    href: "cuentasBancarias",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Antecedentes medicos",
    icon: MedicalInformationIcon,
    href: "antecedentesMedicos",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Factores de riesgo",
    icon: WarningAmberIcon,
    href: "factoresRiesgo",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Estructura organizacional",
    icon: CorporateFareIcon,
    href: "estructuraOrganizacional",
    rolesAllowed: ["SuperAdmin"], 
  },
  {
    title: "Eps",
    icon: HealthAndSafetyIcon,
    href: "eps",
    rolesAllowed: ["SuperAdmin"], 
  },
];

export default Menuitems;
