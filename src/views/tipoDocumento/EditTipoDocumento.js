import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_TIPO_DOCUMENTO = 'http://localhost:3001/tipodocumentos/'

const CompEditarEps = () => {
    const [var_nombreDocumento, setVar_nombreDocumento] = useState('')
    const navigate = useNavigate()
    const {id_tipoDocumentoPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_TIPO_DOCUMENTO+id_tipoDocumentoPK, {
            var_nombreDocumento: var_nombreDocumento
        })
        navigate('/')
    }

    useEffect( ()=>{
        getEpsPorId()
    }, [])

    const getEpsPorId = async ()=> {
        const res = await axios.get(URI_TIPO_DOCUMENTO+id_tipoDocumentoPK)
        setVar_nombreDocumento(res.data.var_nombreDocumento)
    }
    return (
        <div>
            <h3>editar eps</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre e la eps</laber>
                    <input value={var_nombreDocumento} onChange={ (e)=> setVar_nombreDocumento(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarEps