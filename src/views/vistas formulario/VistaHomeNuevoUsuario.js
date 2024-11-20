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
        <div
            style={{
                backgroundColor: '#F2F2F2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100vh',
                margin: 0,
                padding: 0,
            }}
        >
            {/* Imagen de fondo */}
            <div style={{ width: '100%', height: '35%', position: 'relative',textAlign: 'center', }}>
                <img
                    src="public/fondo_home.jpg" // Reemplaza con la ruta correcta de la imagen
                    alt="Fondo"
                    style={{
                        width: '60%',
                        height: '85%',
                        objectFit: 'cover',
                    }}
                />
            </div>

            {/* Contenedor compacto */}
            <div
                style={{
                    backgroundColor: '#F2F2F2',
                    padding: '20px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '15px',
                    maxWidth: '60%',
                    marginTop: '-3%'

                }}

            >
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1b263b', fontFamily: 'Roboto Condensed' }}>
                    Perfil Sociodemográfico
                </h2>
                {/* Caja informativa */}
                <div
                    style={{
                        backgroundColor: '#F2F2F2',
                        border: '2px solid #202B52',
                        borderRadius: '10px',
                        padding: '15px',
                        textAlign: 'justify',
                    }}
                >
                    <p style={{ margin: 0, color: '#1b263b', fontSize: '14px', fontFamily: 'Poppins' }}>
                        <strong style={{fontFamily: 'Roboto Condensed'}}>Importante: </strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim lacus vitae lacus consectetur interdum. Quisque tellus arcu, dapibus sit amet quam elementum, semper molestie nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim lacus vitae lacus consectetur interdum. Quisque tellus arcu, dapibus sit amet quam elementum, semper molestie nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dignissim lacus vitae lacus consectetur interdum. Quisque tellus arcu, dapibus sit amet quam elementum, semper molestie nulla.
                    </p>
                </div>

                {/* Caja para iconos y botón */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: '7%',
                    }}
                >
                    {/* Iconos sociales */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            style={{
                                backgroundColor: '#00A5CE',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                            }}
                        >
                            E
                        </button>
                        <button
                            style={{
                                backgroundColor: '#00A5CE',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                            }}
                        >
                            I
                        </button>
                        <button
                            style={{
                                backgroundColor: '#00A5CE',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                cursor: 'pointer',
                            }}
                        >
                            F
                        </button>
                    </div>

                    {/* Botones de acción juntos */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#1b263b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                
                            }}
                            onClick={manejarLogin}
                        >
                            log in
                        </button>
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#1b263b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={manejarDatosUsuario}
                        > Formulario </button>
                    </div>
                </div>

            </div>

            {/* Espaciador final (para ajustar la altura) */}
            <div style={{ flex: 1 }} />
        </div>
    );





};

export default VistaHomeUsuarioNuevo;
