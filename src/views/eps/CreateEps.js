import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_EPS = 'http://localhost:3001/eps'

const CompCrearEps = () => {
    const [var_nombreEps, setVar_nombreEps] = useState('')
    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_EPS, {var_nombreEps: var_nombreEps})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear eps</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre e la eps</laber>
                    <input value={var_nombreEps} onChange={ (e)=> setVar_nombreEps(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearEps