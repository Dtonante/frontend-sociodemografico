// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const URI_EPS = 'http://localhost:3001/eps/'

// const CompShowEps = () => {
//     const [eps, setEps] = useState([])
//     useEffect(() => {
//         getEps()
//     }, [])

//     //Procedimiento para mostrar todas las eps
//     const getEps = async () => {
//         const res = await axios.get(URI_EPS)
//         setEps(res.data)

//     }

//     //Procedimiento para eliminar una eps
//     const deleteEps = async (id_epsPK) => {
//         await axios.delete(`${URI_EPS}${id_epsPK}`)
//         getEps()

//     }

//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col">
//                     <Link to="/crear" className="btn btn-primary mt-2 mb-2"><i class="fa-solid fa-plus"></i></Link>
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th scope="col">id_epsPK</th>
//                                 <th scope="col">Nombre</th>
//                                 <th scope="col">Acciones</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {eps.map((eps) => (
//                                 <tr key= { eps.id_epsPK }>
//                                     <td> { eps.id_epsPK } </td>
//                                     <td> { eps.var_nombreEps } </td>
//                                     <td>
//                                         <Link to={`/editar/${eps.id_epsPK}`} className="btn btn-info"><i class="fa-regular fa-pen-to-square"></i></Link>
//                                         <button onClick={()=>deleteEps(eps.id_epsPK)} className="btn btn-danger"><i class="fa-regular fa-trash-can"></i> </button>
//                                     </td>
//                                 </tr>

//                             ))}


//                         </tbody>
//                     </table>

//                 </div>
//             </div>

//         </div>
//     )

// }

// export default CompShowEps;



import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const URI_EPS = "http://localhost:3001/eps/";

const CompShowEps = () => {
  const [eps, setEps] = useState([]);

  useEffect(() => {
    getEps();
  }, []);

  //Procedimiento para mostrar todas las eps
  const getEps = async () => {
    const res = await axios.get(URI_EPS);
    setEps(res.data);
  };

  //Procedimiento para eliminar una eps
  const deleteEps = async (id_epsPK) => {
    await axios.delete(`${URI_EPS}${id_epsPK}`);
    getEps();
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Card variant="outlined">
        <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px 24px">
          <Typography variant="h6" fontWeight="500">
            EPS List
          </Typography>
          <Link to="/crear">
            <Button variant="contained" startIcon={<AddIcon />} color="primary">
              Add EPS
            </Button>
          </Link>
        </Box>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eps.map((epsItem) => (
                  <TableRow key={epsItem.id_epsPK}>
                    <TableCell>{epsItem.id_epsPK}</TableCell>
                    <TableCell>{epsItem.var_nombreEps}</TableCell>
                    <TableCell>
                      <Link to={`/editar/${epsItem.id_epsPK}`}>
                        <IconButton color="info">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton color="error" onClick={() => deleteEps(epsItem.id_epsPK)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CompShowEps;
