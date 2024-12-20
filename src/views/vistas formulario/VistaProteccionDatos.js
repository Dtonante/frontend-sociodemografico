import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import show_alert from '../../components/showAlert/alertFuntion';
import '../../css/VistaHomeNuevoUsuario.css'


const VistaProteccionDatos = () => {
  const [aceptaDatos, setAceptaDatos] = useState(null);
  const navigate = useNavigate();
  const porcentajeProgreso = 10;

  const manejarCambioCheckbox = (e) => {
    setAceptaDatos(e.target.value === "si");
  };

  const manejarClickSiguiente = () => {
    if (aceptaDatos) {
      localStorage.setItem('aceptaDatos', JSON.stringify(aceptaDatos));
      navigate('/InfoUsuario');
    } else {
      show_alert('Debes aceptar la manipulación de tus datos para continuar.', 'info');
    }
  };
  const manejarAtras = () => {
    navigate('/')
  }

  return (

    <div
      style={{
        backgroundColor: '#F2F2F2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '150vh',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Imagen de fondo */}
      <div style={{ width: '100%', height: '27%', position: 'relative', textAlign: 'center' }}>
        <img
          src="public/Fondo_formulario-07.jpg"
          alt="Fondo"
          className='img-fondo-proteccion'
        />
      </div>

      {/* Contenedor compacto */}
      <div
        style={{
          backgroundColor: '#F2F2F2',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '60%',
          margin: '0 auto',
          marginTop: '-4%',
        }}
      >
        {/* Título */}
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#202B52', textAlign: 'center', fontFamily: 'Roboto Condensed', marginTop:'3%' }}>
          Ley de Protección y Tratamiento de Datos
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
          <p style={{ margin: 0, color: '#202B52', fontSize: '18px', fontFamily: 'Roboto Condensed' }}>
            <strong style={{ fontFamily: 'Roboto Condensed', textAlign: 'center',  display: 'block', fontSize: '19px'}}>Autorización tratamiento de datos:</strong>  
             <br/>
            El perfil sociodemográfico nos permitirá reconocer cuáles son las
            características de la población trabajadora que se tienen en La Institución
            Universitaria ESUMER.
            <br/><br/>
            Los datos suministrados en la encuesta tendrán el tratamiento necesario, seguro y confidencial con la finalidad de crear, gestionar y ejecutar mejores planes de bienestar y de seguridad y salud en el trabajo. 
            <br/><br/>
            Con el diligenciamiento de esta encuesta <strong>estás aceptando el tratamiento que
            te ha sido informado.</strong> En caso contrario por favor no continúes respondiendo. Ley 1581 de 2012.
            <br/><br/>
            
            <strong style={{ fontFamily: 'Roboto Condensed', textAlign: 'center',  display: 'block', fontSize: '19px'}}>Autorización tratamiento de datos general:</strong>  
            <br/>
            Indícanos, si en calidad de trabajador de la Institución Universitaria ESUMER, autorizas el uso de la información con fines estadísticos, demográficos, con el objetivo de conocerte mejor, de igual forma se solicita autorización para comunicarnos contigo a través de los canales de contacto que informe en la encuesta.
          </p>
        </div>

        {/* Opciones de aceptación */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'flex-start' }}>
          <label style={{ fontFamily: 'Poppins', color: '#202B52' }}>
            <input
              style={{ fontFamily: 'Poppins', backgroundColor: '#202B52' }}
              type="radio"
              name="aceptaDatos"
              value="si"
              checked={aceptaDatos === true}
              onChange={manejarCambioCheckbox}
            />
            Sí autorizo
          </label>
          <label style={{ fontFamily: 'Poppins', color: '#202B52' }}>
            <input
              type="radio"
              name="aceptaDatos"
              value="no"
              checked={aceptaDatos === false}
              onChange={manejarCambioCheckbox}
            />
            No autorizo
          </label>
        </div>

        {/* Barra de progreso */}
        <div
          style={{
            fontFamily: 'Poppins',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#F2F2F2',
            padding: '10px 15px',
            borderRadius: '20px',
            width: '100%',
          }}
        >
          <div
            style={{
              fontFamily: 'Poppins',
              height: '10px',
              width: '90%',
              backgroundColor: '#F2F2F2',
              borderRadius: '7px',
              overflow: 'hidden',
              border: '2px solid #202B52',
              marginRight: '10px',
            }}
          >
            <div
              style={{
                fontFamily: 'Poppins',
                width: `${porcentajeProgreso}%`,
                height: '100%',
                backgroundColor: '#202B52',
                borderRadius: '5px 0 0 5px',
              }}
            ></div>
          </div>
          <span style={{ color: '#202B52', fontWeight: 'bold' }}>{porcentajeProgreso}%</span>
        </div>

        {/* Botón de acción */}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            style={{
              fontFamily: 'poppins',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#202B52',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',

            }}
            onClick={manejarAtras}
          >
            Atras
          </button>
          <button
            style={{
              fontFamily: 'poppins',
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#202B52',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={manejarClickSiguiente}
          > Siguiente </button>
        </div>


      </div>


      {/* Espaciador final (para ajustar la altura) */}
      <div style={{ flex: 1 }} />
    </div>




  );
};

export default VistaProteccionDatos;
