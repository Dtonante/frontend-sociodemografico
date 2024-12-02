import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/VistaHomeNuevoUsuario.css'

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
                height: '130vh',
                margin: 0,
                padding: 0,
            }}
        >
            {/* Imagen de fondo */}
            <div style={{ width: '100%', height: '31.2%', position: 'relative', textAlign: 'center', }}>

                <img
                    className="imagen-fondo"
                    src="public/Fondo_formulario-07.jpg"
                    alt="Fondo"

                />
            </div>

            {/* Contenedor compacto */}
            <div
                className='contenedor-items-buttoms'


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
                    <p style={{ margin: 0, color: '#1b263b', fontSize: '18px', fontFamily: 'Roboto Condensed' }}>
                        <strong style={{ fontFamily: 'Roboto Condensed', fontSize: "19px" }}>Importante: </strong>El perfil sociodemográfico es un instrumento creado para reconocer cuáles son
                        las características de la población trabajadora que se tienen en La Institución
                        Universitaria ESUMER.<br /> <br />

                        Si has finalizado alguno de los siguientes niveles académicos: bachillerato, técnico, tecnológico, pregrado, posgrado, maestría o doctorado, asegúrate de contar con la certificación correspondiente en formato PDF para ser <strong>adjuntado en el formulario.</strong>
                    </p>
                </div>

                {/* Caja para iconos y botón */}
                <div className="contenedor">
                    {/* Iconos sociales */}

                    <div className="iconos-sociales">
                        {[
                            { nombre: 'Web', url: 'https://esumer.edu.co/' },
                            { nombre: 'Instagram', url: 'https://www.instagram.com/esumermedellin/?hl=es' },
                            { nombre: 'Facebook', url: 'https://m.facebook.com/institucionuniversitariaesumer/' },
                            { nombre: 'Twitter', url: 'https://x.com/esumermedellin?lang=es' },
                            { nombre: 'Youtube', url: 'https://www.youtube.com/channel/UC_R-zFnqGM9Ng7KNcyjj8EA' },
                            { nombre: 'Spotify', url: 'https://open.spotify.com/show/6yPk98znQttoPA6Jr8RiWo' },
                            { nombre: 'Linkedin', url: 'https://co.linkedin.com/company/instituci-n-universitaria-esumer' },
                            { nombre: 'Emisora', url: 'https://welove.radio/radio/esumerlive/' },
                        ].map(({ nombre, url }) => (
                            <button
                                key={nombre}
                                style={{
                                    backgroundColor: '#00A5CE',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    cursor: 'pointer',
                                    padding: 0,
                                }}
                                onClick={() => window.open(url, '_blank', 'noopener')}
                            >
                                <img
                                    src={`/public/${nombre}.png`}
                                    alt={nombre}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                    }}
                                />
                            </button>
                        ))}
                    </div>


                    {/* Botones de acción */}
                    <div className="botones-accion">
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
                                fontFamily: "Poppins",
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#1b263b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={manejarDatosUsuario}
                        >
                            Formulario
                        </button>
                    </div>
                </div>


            </div>

            {/* Espaciador final (para ajustar la altura) */}
            <div style={{ flex: 1 }} />
        </div>
    );





};

export default VistaHomeUsuarioNuevo;
