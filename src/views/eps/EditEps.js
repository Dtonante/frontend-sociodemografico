import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_EPS = 'http://localhost:3001/eps/'

const CompEditarEps = () => {
    const [var_nombreEps, setVar_nombreEps] = useState('')
    const navigate = useNavigate()
    const {id_epsPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_EPS+id_epsPK, {
            var_nombreEps: var_nombreEps
        })
        navigate('/')
    }

    useEffect( ()=>{
        getEpsPorId()
    }, [])

    const getEpsPorId = async ()=> {
        const res = await axios.get(URI_EPS+id_epsPK)
        setVar_nombreEps(res.data.var_nombreEps)
    }
    return (
        <div>
            <h3>editar eps</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre e la eps</laber>
                    <input value={var_nombreEps} onChange={ (e)=> setVar_nombreEps(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarEps