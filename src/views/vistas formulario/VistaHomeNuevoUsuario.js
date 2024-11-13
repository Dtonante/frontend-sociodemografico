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
        <div style={{ position: 'relative', height: '100vh' }}>
            {/* Imagen de fondo */}
            <img
                src="https://esumer.edu.co/wp-content/uploads/2020/10/LogosimboloEsumer2.png" // URL de la imagen
                alt="Fondo"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)', // Centra la imagen
                    width: '80%', // Ajusta el tamaño según lo que necesites
                    height: 'auto', // Mantiene las proporciones de la imagen
                    zIndex: -1,
                }}
            />

            <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
                {/* Botones en la parte superior */}
                <button
                    onClick={manejarLogin}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '15px'
                    }}>
                    Login
                </button>
                <button
                    onClick={manejarDatosUsuario}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                    Danos tus datos
                </button>
            </div>

            {/* Texto y botones centrados en el centro de la pantalla */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 60px)',
                textAlign: 'center',
                color: 'black',
            }}>
                
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '-250px'  }}>Bienvenido</h1>
            </div>
        </div>
    );
};

export default VistaHomeUsuarioNuevo;
