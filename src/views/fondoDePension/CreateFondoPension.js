import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const URI_FONDO_PENSION = 'http://localhost:3001/fondoPension/'

const CompCrearFondoPension = () => {
    const [var_nombreFondoPension, setVar_nombreFondoPension] = useState('')

    const navigate = useNavigate()

    //procedimiento para guardar
    const guardar = async (e) => {
        e.preventDefault()
        await axios.post(URI_FONDO_PENSION, {var_nombreFondoPension: var_nombreFondoPension})
        navigate('/')
    }
    

    return (
        <div>
            <h3>crear fondo de pension</h3>
            <form onSubmit={guardar}>
                <div className="mb-3">
                    <laber className="form-label" >nombre del fondo de pension</laber>
                    <input value={var_nombreFondoPension} onChange={ (e)=> setVar_nombreFondoPension(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )
}

export default CompCrearFondoPension