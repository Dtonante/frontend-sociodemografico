import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_SERVICIO_SALUD_ADICIONAL = 'http://localhost:3001/servicioSaludAdicional/'




const CompCrearServicioDeSaludAdicional = () => {
    const [var_nombreServicioDeSaludAdicional, setVar_nombreServicioDeSaludAdicional] = useState('')

    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_SERVICIO_SALUD_ADICIONAL, {var_nombreServicioDeSaludAdicional: var_nombreServicioDeSaludAdicional})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear tipo documento</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del tipo documento</laber>
                    <input value={var_nombreServicioDeSaludAdicional} onChange={ (e)=> setVar_nombreServicioDeSaludAdicional(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearServicioDeSaludAdicional