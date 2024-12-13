import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_SERVICIO_QUE_NO_CUENTAN = 'http://localhost:3001/serviciosQueNoCuentan/'


const CompEditarServiciosQueNoCuentan = () => {
    const [var_nombreServicioQueNoCuenta, setVar_nombreServicioQueNoCuenta] = useState('')
    const navigate = useNavigate()
    const {id_servicioQueNoCuentaPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_SERVICIO_QUE_NO_CUENTAN+id_servicioQueNoCuentaPK, {
            var_nombreServicioQueNoCuenta: var_nombreServicioQueNoCuenta
        })
        navigate('/app/serviciosQueNoCuentan')
    }

    useEffect( ()=>{
        getServiciosQueNoCuentan()
    }, [])

    const getServiciosQueNoCuentan = async ()=> {
        const res = await axios.get(URI_SERVICIO_QUE_NO_CUENTAN+id_servicioQueNoCuentaPK)
        setVar_nombreServicioQueNoCuenta(res.data.var_nombreServicioQueNoCuenta)
    }
    return (
        <div>
            <h3>editar transporte</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del transporte</laber>
                    <input value={var_nombreServicioQueNoCuenta} onChange={ (e)=> setVar_nombreServicioQueNoCuenta(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarServiciosQueNoCuentan