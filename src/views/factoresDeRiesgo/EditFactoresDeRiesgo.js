import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_FACTORES_RIESGO = 'http://localhost:3001/factoresRiesgo/'

const CompEditarFactorRiesgo = () => {
    const [var_nombreRiesgo, setvVar_nombreRiesgo] = useState('')
    const navigate = useNavigate()
    const {id_factoresRiesgoPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_FACTORES_RIESGO+id_factoresRiesgoPK, {
            var_nombreRiesgo: var_nombreRiesgo
        })
        navigate('/')
    }

    useEffect( ()=>{
        getFactorRiesgoPorId()
    }, [])

    const getFactorRiesgoPorId = async ()=> {
        const res = await axios.get(URI_FACTORES_RIESGO+id_factoresRiesgoPK)
        setvVar_nombreRiesgo(res.data.var_nombreRiesgo)
    }
    return (
        <div>
            <h3>editar factore de riesgo</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre factor de riesgo</laber>
                    <input value={var_nombreRiesgo} onChange={ (e)=> setvVar_nombreRiesgo(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarFactorRiesgo