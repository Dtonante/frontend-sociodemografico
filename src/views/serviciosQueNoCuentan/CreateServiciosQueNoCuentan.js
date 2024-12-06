import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_SERVICIO_QUE_NO_CUENTAN = 'http://localhost:3001/serviciosQueNoCuentan'



const CompCrearServiciosQueNoCuentan = () => {
    const [var_nombreServicioQueNoCuenta, setVar_nombreServicioQueNoCuenta] = useState('')

    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_SERVICIO_QUE_NO_CUENTAN, {var_nombreServicioQueNoCuenta: var_nombreServicioQueNoCuenta})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear tipo documento</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del tipo documento</laber>
                    <input value={var_nombreServicioQueNoCuenta} onChange={ (e)=> setVar_nombreServicioQueNoCuenta(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearServiciosQueNoCuentan