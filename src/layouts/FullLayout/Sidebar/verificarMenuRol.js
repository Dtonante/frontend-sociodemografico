import Menuitems from './data.js';  // Importamos el array de elementos de menú

const verificarMenuRol = (rol) => {
  // Filtramos los elementos del menú según el rol
  return Menuitems.filter(item => item.rolesAllowed.includes(rol));
};

export default verificarMenuRol;
