import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_ROL = 'http://localhost:3001/roles/'

const CompEditarRol = () => {
    const [var_nombreRol, setVar_nombreRol] = useState('')
    const navigate = useNavigate()
    const {id_rolPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_ROL+id_rolPK, {
            var_nombreRol: var_nombreRol
        })
        navigate('/')
    }

    useEffect( ()=>{
        getRol()
    }, [])

    const getRol = async ()=> {
        const res = await axios.get(URI_ROL+id_rolPK)
        setVar_nombreRol(res.data.var_nombreRol)
    }
    return (
        <div>
            <h3>editar transporte</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del transporte</laber>
                    <input value={var_nombreRol} onChange={ (e)=> setVar_nombreRol(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarRol