import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_TIPO_DOCUMENTO= 'http://localhost:3001/tipodocumentos/'

const CompCrearTipoDocumento = () => {
    const [var_nombreDocumento, setVar_nombreDocumento] = useState('')

    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_TIPO_DOCUMENTO, {var_nombreDocumento: var_nombreDocumento})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear tipo documento</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del tipo documento</laber>
                    <input value={var_nombreDocumento} onChange={ (e)=> setVar_nombreDocumento(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearTipoDocumento