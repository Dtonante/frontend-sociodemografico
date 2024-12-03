import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_CUENTAS_BANCARIAS = 'http://localhost:3001/cuentasBancarias/'

const CompCrearCuentaBancaria = () => {
    const [var_nombreCuentaBancaria, setVar_nombreCuentaBancaria] = useState('')
    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_CUENTAS_BANCARIAS, {var_nombreCuentaBancaria: var_nombreCuentaBancaria})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear cuenta bancaria</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre de la cuenta bancaria</laber>
                    <input value={var_nombreCuentaBancaria} onChange={ (e)=> setVar_nombreCuentaBancaria(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearCuentaBancaria