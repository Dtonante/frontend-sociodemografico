import React from "react";
//import { Link } from 'react-router-dom';

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from "react-router-dom";


import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";

import userimg from "../../../assets/images/users/usuario.png";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();


  

  // 4
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  // 5
  const [anchorEl5, setAnchorEl5] = React.useState(null);

  const handleClick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };

  const handleClose5 = () => {
    setAnchorEl5(null);
  };

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem("token");
  
    navigate("/");
    
    // Cierra el menú
    handleClose4();
  };
  

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>
        <IconButton
          aria-label="menu"
          color="inherit"
          aria-controls="dd-menu"
          aria-haspopup="true"
          onClick={handleClick5}
        >
          
        </IconButton>
       
        <Box flexGrow={1} />

        
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            width: "1px",
            backgroundColor: "rgba(0,0,0,0.1)",
            height: "25px",
            ml: 1,
          }}
        ></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleClick4}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={userimg}
              alt={userimg}
              sx={{
                width: "30px",
                height: "30px",
              }}
            />
          </Box>
        </Button>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
              backgroundColor: "#F2F2F2"
            },
          }}
        >
          
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Salir
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;





// import React from "react";
// //import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router-dom";
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// import { AppBar, Box, IconButton, Toolbar, Menu, MenuItem, Button, Avatar, Divider, ListItemIcon, } from "@mui/material";
// const Header = (props) => {

//   const [anchorEl4, setAnchorEl4] = React.useState(null);
//   const navigate = useNavigate();

//   const handleClick4 = (event) => {
//     setAnchorEl4(event.currentTarget);
//   };

//   const handleClose4 = () => {
//     setAnchorEl4(null);
//   };

//   const handleLogout = () => {
//     // Eliminar el token de localStorage
//     localStorage.removeItem('token');

//     // // Limpiar estado de autenticación en el contexto (si estás usando contexto de autenticación)
//     // dispatch({ type: 'LOGOUT' });

//     // Redirigir al usuario a otra página (por ejemplo, la página de inicio)
//     navigate("/");  // Cambia la ruta según necesites
//   };

//   return (
//     <AppBar sx={props.sx} elevation={0} className={props.customClass}>
//       <Toolbar>
//         <Box flexGrow={1} />
//         <Box sx={{ width: "1px", backgroundColor: "rgba(0,0,0,0.1)", height: "25px", ml: 1, }} ></Box>
//         <Button aria-label="menu" color="inherit" aria-controls="profile-menu" aria-haspopup="true" onClick={handleClick4} >
//           <Box sx={{ display: "flex", alignItems: "center", }} > <Avatar sx={{ width: "30px", height: "30px", }} />  </Box>
//         </Button>
//         <Menu id="profile-menu" anchorEl={anchorEl4} keepMounted open={Boolean(anchorEl4)} onClose={handleClose4} anchorOrigin={{ horizontal: "right", vertical: "bottom" }} transformOrigin={{ horizontal: "right", vertical: "top" }} sx={{ "& .MuiMenu-paper": { width: "250px", right: 0, top: "70px !important", }, }} >
//           <MenuItem onClick={handleLogout}> <ListItemIcon> <LogoutOutlinedIcon fontSize="small" /> </ListItemIcon> Salir </MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
