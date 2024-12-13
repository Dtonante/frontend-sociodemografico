import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_CUENTAS_BANCARIAS = 'http://localhost:3001/cuentasBancarias/'

const CompEditarCuentaBancaria = () => {
    const [var_nombreCuentaBancaria, setVar_nombreCuentaBancaria] = useState('')
    const navigate = useNavigate()
    const {id_cuentaBancariaPK} = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_CUENTAS_BANCARIAS+id_cuentaBancariaPK, {
            var_nombreCuentaBancaria: var_nombreCuentaBancaria
        })
        navigate('/app/cuentasBancarias')
    }

    useEffect( ()=>{
        getVar_nombreCuentaBancariaPorId()
    }, [])

    const getVar_nombreCuentaBancariaPorId = async ()=> {
        const res = await axios.get(URI_CUENTAS_BANCARIAS+id_cuentaBancariaPK)
        setVar_nombreCuentaBancaria(res.data.var_nombreCuentaBancaria)
    }
    return (
        <div>
            <h3>editar cuenta bancaria</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre de la cuenta bancaria</laber>
                    <input value={var_nombreCuentaBancaria} onChange={ (e)=> setVar_nombreCuentaBancaria(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarCuentaBancaria