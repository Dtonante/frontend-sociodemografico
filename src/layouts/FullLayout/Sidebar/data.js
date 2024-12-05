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

const Menuitems = [
  {
    title: "Profesionales",
    icon: RecentActorsIcon,
    href: "profesional",
    rolesAllowed: ["Contabilidad", "Gestion Humana", "SuperAdmin"], 
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
