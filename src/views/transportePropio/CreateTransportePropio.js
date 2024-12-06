import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_TRANSPORTE_PROPIO = 'http://localhost:3001/transportePropio'


const CompCrearTransportePropio = () => {
    const [var_nombreTransporte, setvar_nombreTransporte] = useState('')

    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_TRANSPORTE_PROPIO, {var_nombreTransporte: var_nombreTransporte})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear tipo documento</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del tipo documento</laber>
                    <input value={var_nombreTransporte} onChange={ (e)=> setvar_nombreTransporte(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearTransportePropio