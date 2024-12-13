import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_TRANSPORTE_PROPIO = 'http://localhost:3001/transportePropio/'

const CompEditarTransportePropio = () => {
    const [var_nombreTransporte, setVar_nombreTransporte] = useState('')
    const navigate = useNavigate()
    const {id_transportePropioPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_TRANSPORTE_PROPIO+id_transportePropioPK, {
            var_nombreTransporte: var_nombreTransporte
        })
        navigate('/app/transportePropio')
    }

    useEffect( ()=>{
        getTransportePropio()
    }, [])

    const getTransportePropio = async ()=> {
        const res = await axios.get(URI_TRANSPORTE_PROPIO+id_transportePropioPK)
        setVar_nombreTransporte(res.data.var_nombreTransporte)
    }
    return (
        <div>
            <h3>editar transporte</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del transporte</laber>
                    <input value={var_nombreTransporte} onChange={ (e)=> setVar_nombreTransporte(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarTransportePropio