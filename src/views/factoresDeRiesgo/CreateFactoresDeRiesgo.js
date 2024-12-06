import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_FACTORES_RIESGO = 'http://localhost:3001/factoresRiesgo/'

const CompCrearFactoresRiesgo = () => {
    const [var_nombreRiesgo, setVar_nombreRiesgo] = useState('')

    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_FACTORES_RIESGO, {var_nombreRiesgo: var_nombreRiesgo})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear espacio del hogar</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del espacio del hogar</laber>
                    <input value={var_nombreRiesgo} onChange={ (e)=> setVar_nombreRiesgo(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearFactoresRiesgo