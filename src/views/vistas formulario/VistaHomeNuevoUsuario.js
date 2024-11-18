import React from 'react';
import { useNavigate } from 'react-router-dom';

const VistaHomeUsuarioNuevo = () => {
    const navigate = useNavigate();

    // Función para navegar a la vista de login
    const manejarLogin = () => {
        navigate('/login');
    };

    // Función para navegar a la vista de datos de usuario
    const manejarDatosUsuario = () => {
        navigate('/proteccionDatos');
    };

    return (
        <div style={{ position: 'relative', height: '100vh', margin: 0, padding: 0}}>
            {/* Imagen de fondo en la parte superior (encabezado) */}
            <img
                src="public/fondo_home.jpg" // Reemplaza con la ruta correcta de la imagen
                alt="Fondo"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)', // Centra la imagen horizontalmente
                    width: '100%', // Asegura que la imagen ocupe todo el ancho
                    height: '35%',
                    objectFit: 'cover', // Mantiene las proporciones de la imagen
                    zIndex: -1,
                    margin: 0,
                    padding: 0
                }}
            />

            {/* Texto centrado (puedes moverlo o ajustarlo según lo que desees) */}
            {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)', textAlign: 'center', color: 'black' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Bienvenido</h1>
            </div> */}

            {/* Botones en la parte inferior */}
            <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
                <button onClick={manejarLogin} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', marginRight: '15px' }}>Login</button>
                <button onClick={manejarDatosUsuario} style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>Danos tus datos</button>
            </div>
        </div>

    );
};

export default VistaHomeUsuarioNuevo;
