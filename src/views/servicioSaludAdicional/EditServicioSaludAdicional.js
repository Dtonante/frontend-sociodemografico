import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_SERVICIO_SALUD_ADICIONAL = 'http://localhost:3001/servicioSaludAdicional/'

const CompEditarServiciosDeSaludAdicional = () => {
    const [var_nombreServicioDeSaludAdicional, setVar_nombreServicioDeSaludAdicional] = useState('')
    const navigate = useNavigate()
    const {id_servicioDeSaludAdicionalPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_SERVICIO_SALUD_ADICIONAL+id_servicioDeSaludAdicionalPK, {
            var_nombreServicioDeSaludAdicional: var_nombreServicioDeSaludAdicional
        })
        navigate('/')
    }

    useEffect( ()=>{
        getServiciosDeSaludAdicional()
    }, [])

    const getServiciosDeSaludAdicional = async ()=> {
        const res = await axios.get(URI_SERVICIO_SALUD_ADICIONAL+id_servicioDeSaludAdicionalPK)
        setVar_nombreServicioDeSaludAdicional(res.data.var_nombreServicioDeSaludAdicional)
    }
    return (
        <div>
            <h3>editar transporte</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del transporte</laber>
                    <input value={var_nombreServicioDeSaludAdicional} onChange={ (e)=> setVar_nombreServicioDeSaludAdicional(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarServiciosDeSaludAdicional