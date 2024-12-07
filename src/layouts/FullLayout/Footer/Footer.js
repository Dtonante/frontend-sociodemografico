import React from 'react'
import {
    Box,
    Link,
    Typography,
    
  } from "@mui/material";
const Footer = () => {
    return ( 
        <Box sx={{p:3, textAlign:'center'}}>
            <Typography>© 2024 <Link style={{color: '#00A5CE', textDecoration: 'none'}} href="https://esumer.edu.co/">Esumer</Link> </Typography>
        </Box>
     );
}
 
export default Footer;