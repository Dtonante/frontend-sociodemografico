import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_ANTECEDENTE_MEDICO = 'http://localhost:3001/antecedentesMedicos/'

const CompEditarAntecedentesMedicos = () => {
    const [var_nombreAntecedenteMedico, setVar_nombreAntecedenteMedico] = useState('')
    const navigate = useNavigate()
    const {id_antecedenteMedicoPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_ANTECEDENTE_MEDICO+id_antecedenteMedicoPK, {
            var_nombreAntecedenteMedico: var_nombreAntecedenteMedico
        })
        navigate('/')
    }

    useEffect( ()=>{
        getAntecedenteMedicoPorId()
    }, [])

    const getAntecedenteMedicoPorId = async ()=> {
        const res = await axios.get(URI_ANTECEDENTE_MEDICO+id_antecedenteMedicoPK)
        setVar_nombreAntecedenteMedico(res.data.var_nombreAntecedenteMedico)
    }
    return (
        <div>
            <h3>editar antecedente medico</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del antecedente medico</laber>
                    <input value={var_nombreAntecedenteMedico} onChange={ (e)=> setVar_nombreAntecedenteMedico(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarAntecedentesMedicos