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
  },
  {
    title: "roles",
    icon: SupervisedUserCircleIcon,
    href: "roles",
  },
  {
    title: "Usuarios",
    icon: Person4Icon,
    href: "usuarios",
  },
  {
    title: "Servicios de salud adicional",
    icon: Diversity1Icon,
    href: "serviciosSaludAdicional",
  },
  {
    title: "Servicios que no cuentan",
    icon: PlaylistRemoveIcon,
    href: "serviciosQueNoCuentan",
  },
  {
    title: "Transporte Propio",
    icon: NoCrashIcon,
    href: "transportePropio",
  },
  {
    title: "Tipo documento",
    icon: FindInPageIcon,
    href: "tipoDocumento",
  },
  {
    title: "Fondos de pension",
    icon: ElderlyIcon,
    href: "fondoPension",
  },
  {
    title: "Bancos",
    icon: AssuredWorkloadIcon,
    href: "cuentasBancarias",
  },
  {
    title: "Antecedentes medicos",
    icon: MedicalInformationIcon,
    href: "antecedentesMedicos",
  },
  {
    title: "Factores de riesgo",
    icon: WarningAmberIcon,
    href: "factoresRiesgo",
  },
  {
    title: "Estructura organizacional",
    icon: CorporateFareIcon,
    href: "estructuraOrganizacional",
  },
  {
    title: "Eps",
    icon: HealthAndSafetyIcon,
    href: "eps",
  },
];

export default Menuitems;
