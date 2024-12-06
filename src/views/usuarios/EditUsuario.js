import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URI_USUARIOS = 'http://localhost:3001/usuarios/'


const CompEditarUsuario = () => {
    const [id_rolFK, setId_rolFK] = useState('')
    const [boolean_estado, setBoolean_estado] = useState('')
    const [var_nombreCompleto, setVar_nombreCompleto] = useState('')
    const [int_tipoDocumentoFK, setInt_tipoDocumentoFK] = useState('')
    const [var_numeroDocumento, setVar_numeroDocumento] = useState('')
    const [var_genero, setVar_genero] = useState('')
    const [var_correoElectronicoPersonal, setVar_correoElectronicoPersonal] = useState('')
    const [var_contactoEmergencia, setVar_contactoEmergencia] = useState('')
    const [var_contrasena, setVar_contrasena] = useState('')
    const navigate = useNavigate()
    const { id_usuarioPK } = useParams()

    //procedimiento para actualizar
    const actualizar = async (e) => {
        e.preventDefault()
        await axios.put(URI_USUARIOS + id_usuarioPK, {
            id_rolFK: id_rolFK,
            boolean_estado: boolean_estado,
            var_nombreCompleto: var_nombreCompleto,
            int_tipoDocumentoFK: int_tipoDocumentoFK,
            var_numeroDocumento: var_numeroDocumento,
            var_genero: var_genero,
            var_correoElectronicoPersonal: var_correoElectronicoPersonal,
            var_contrasena: var_contrasena,
            var_contactoEmergencia: var_contactoEmergencia,
        })
        navigate('/')
    }

    useEffect(() => {
        getUsuarios()
    }, [])

    const getUsuarios = async () => {
        const res = await axios.get(URI_USUARIOS + id_usuarioPK)
        setId_rolFK(res.data.id_rolFK)
        setBoolean_estado(res.data.boolean_estado)
        setVar_nombreCompleto(res.data.var_nombreCompleto)
        setInt_tipoDocumentoFK(res.data.int_tipoDocumentoFK)
        setVar_numeroDocumento(res.data.var_numeroDocumento)
        setVar_genero(res.data.var_genero)
        setVar_correoElectronicoPersonal(res.data.var_correoElectronicoPersonal)
        setVar_contrasena(res.data.var_contrasena)
        setVar_contactoEmergencia(res.data.var_contactoEmergencia)


    }
    return (
        <div>
            <h3>editar usuario</h3>
            <form onSubmit={actualizar}>
                <div className="mb-3">
                    <laber className="form-label" >rol</laber>
                    <input value={id_rolFK} onChange={(e) => setId_rolFK(e.target.value)} className="form-control" />

                </div>
                <div className="mb-3">
                    <laber className="form-label" >estado</laber>
                    <input value={boolean_estado} onChange={(e) => setBoolean_estado(e.target.value)} className="form-control" />

                </div>
                <div className="mb-3">
                    <laber className="form-label" >nombre usuario</laber>
                    <input value={var_nombreCompleto} onChange={(e) => setVar_nombreCompleto(e.target.value)} className="form-control" />

                </div>
                <div className="mb-3">
                    <laber className="form-label" >tipo documento</laber>
                    <input value={int_tipoDocumentoFK} onChange={(e) => setInt_tipoDocumentoFK(e.target.value)} className="form-control" />

                </div>
                <div className="mb-3">
                    <laber className="form-label" >numero documento</laber>
                    <input value={var_numeroDocumento} onChange={(e) => setVar_numeroDocumento(e.target.value)} className="form-control" />

                </div>
                <div className="mb-3">
                    <laber className="form-label" >genero</laber>
                    <input value={var_genero} onChange={(e) => setVar_genero(e.target.value)} className="form-control" />

                </div>
                <div className="mb-3">
                    <laber className="form-label" >Correo electronico personal</laber>
                    <input value={var_correoElectronicoPersonal} onChange={(e) => setVar_correoElectronicoPersonal(e.target.value)} className="form-control" />

                </div>
                <div className="mb-3">
                    <laber className="form-label" >contacto de emergencia</laber>
                    <input value={var_contactoEmergencia} onChange={(e) => setVar_contactoEmergencia(e.target.value)} className="form-control" />

                </div>
                <div className="mb-3">
                    <laber className="form-label" >contraseña</laber>
                    <input value={var_contrasena} onChange={(e) => setVar_contrasena(e.target.value)} className="form-control" />

                </div>
                <button type="submit" className="btn btn-primary" >guardar</button>
            </form>
        </div>
    )

}

export default CompEditarUsuario