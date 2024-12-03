import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_ESTRUCTURA_ORGANIZACIONAL = 'http://localhost:3001/estructuraOrganizacional/'

const CompEditarEstructuraOrganizacional = () => {
    const [var_nombreArea, setVar_nombreArea] = useState('')
    const navigate = useNavigate()
    const {id_areaPk} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_ESTRUCTURA_ORGANIZACIONAL+id_areaPk, {
            var_nombreArea: var_nombreArea
        })
        navigate('/')
    }

    useEffect( ()=>{
        getEpsPorId()
    }, [])

    const getEpsPorId = async ()=> {
        const res = await axios.get(URI_ESTRUCTURA_ORGANIZACIONAL+id_areaPk)
        setVar_nombreArea(res.data.var_nombreArea)
    }
    return (
        <div>
            <h3>editar estructura organizacional</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre estructura organizacional</laber>
                    <input value={var_nombreArea} onChange={ (e)=> setVar_nombreArea(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarEstructuraOrganizacional