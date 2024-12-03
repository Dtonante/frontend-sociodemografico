import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_ANTECEDENTE_MEDICO = 'http://localhost:3001/antecedentesMedicos'

const CompCrearAntecedentesMedicos = () => {
    const [var_nombreAntecedenteMedico, setVar_nombreAntecedenteMedico] = useState('')
    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_ANTECEDENTE_MEDICO, {var_nombreAntecedenteMedico: var_nombreAntecedenteMedico})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear eps</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del antecedente medico</laber>
                    <input value={var_nombreAntecedenteMedico} onChange={ (e)=> setVar_nombreAntecedenteMedico(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearAntecedentesMedicos