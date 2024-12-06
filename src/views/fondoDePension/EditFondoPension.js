import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_FONDO_PENSION = 'http://localhost:3001/fondoPension/'

const CompEditarFondoPension = () => {
    const [var_nombreFondoPension, setVar_nombreFondoPension] = useState('')
    const navigate = useNavigate()
    const {id_fondoPensionPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_FONDO_PENSION+id_fondoPensionPK, {
            var_nombreFondoPension: var_nombreFondoPension
        })
        navigate('/')
    }

    useEffect( ()=>{
        getFondoPensionPorId()
    }, [])

    const getFondoPensionPorId = async ()=> {
        const res = await axios.get(URI_FONDO_PENSION+id_fondoPensionPK)
        setVar_nombreFondoPension(res.data.var_nombreFondoPension)
    }
    return (
        <div>
            <h3>editar fondo de pension</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre fondo de pension</laber>
                    <input value={var_nombreFondoPension} onChange={ (e)=> setVar_nombreFondoPension(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarFondoPension