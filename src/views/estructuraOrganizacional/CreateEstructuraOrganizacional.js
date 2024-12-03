import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_ESTRUCTURA_ORGANIZACIONAL = 'http://localhost:3001/estructuraOrganizacional/'

const CompCrearEstructuraOrganizacional = () => {
    const [var_nombreArea, setVar_nombreVar_nombreArea] = useState('')

    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_ESTRUCTURA_ORGANIZACIONAL, {var_nombreArea: var_nombreArea})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear espacio del hogar</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del espacio del hogar</laber>
                    <input value={var_nombreArea} onChange={ (e)=> setVar_nombreVar_nombreArea(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearEstructuraOrganizacional