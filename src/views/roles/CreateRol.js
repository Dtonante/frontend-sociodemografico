import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_ROL = 'http://localhost:3001/roles/'

const CompCrearRol = () => {
    const [var_nombreRol, setVar_nombreRol] = useState('')

    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_ROL, {var_nombreRol: var_nombreRol})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear rol</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre rol</laber>
                    <input value={var_nombreRol} onChange={ (e)=> setVar_nombreRol(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearRol