import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VistaProteccionDatos = () => {
  const [aceptaDatos, setAceptaDatos] = useState(null);
  const navigate = useNavigate();
  const porcentajeProgreso = 6;

  const manejarCambioCheckbox = (e) => {
    setAceptaDatos(e.target.value === "si");
  };

  const manejarClickSiguiente = () => {
    if (aceptaDatos) {
      localStorage.setItem('aceptaDatos', JSON.stringify(aceptaDatos));
      navigate('/datosUsuario');
    } else {
      alert("Debes aceptar la manipulación de tus datos para continuar.");
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
        height: '100vh',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Imagen de fondo */}
      <div style={{ width: '100%', height: '35%', position: 'relative', textAlign: 'center' }}>
        <img
          src="public/fondo_home.jpg" 
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
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '60%',
          margin: '0 auto',
          marginTop: '-3%',
        }}
      >
        {/* Título */}
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#202B52', textAlign: 'center',  fontFamily: 'Roboto Condensed' }}>
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
          <p style={{ margin: 0, color: '#202B52', fontSize: '14px', fontFamily: 'Poppins'  }}>
            <strong style={{ fontFamily: 'Roboto Condensed'}}>Importante:</strong> En cumplimiento con la normativa vigente sobre protección y tratamiento de datos, queremos informarle sobre la política de manejo de sus datos personales. Al aceptar, usted consiente el uso de sus datos bajo las condiciones expuestas.
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
            Sí, acepto el tratamiento de mis datos
          </label>
          <label style={{ fontFamily: 'Poppins', color: '#202B52' }}>
            <input
              type="radio"
              name="aceptaDatos"
              value="no"
              checked={aceptaDatos === false}
              onChange={manejarCambioCheckbox}
            />
            No acepto el tratamiento de mis datos
          </label>
        </div>

        {/* Barra de progreso */}
        <div
          style={{
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


{/* <div style={{ display: 'block', margin: '20px 0' }}>
<label>
  <input
    type="radio"
    name="aceptaDatos"
    value="si"
    checked={aceptaDatos === true}
    onChange={manejarCambioCheckbox}
  />
  Sí, acepto la tratamiento de mis datos
</label>
<label style={{ marginLeft: '15px' }}>
  <input
    type="radio"
    name="aceptaDatos"
    value="no"
    checked={aceptaDatos === false}
    onChange={manejarCambioCheckbox}
  />
  No acepto la tratamiento de mis datos
</label>
</div> */}

// {/* Contenedor con fondo para la barra de progreso y el porcentaje */}
// <div style={{
// display: 'flex',
// alignItems: 'center',
// backgroundColor: '#f0f0f0',
// padding: '10px 15px',
// borderRadius: '20px',
// marginBottom: '20px',
// width: '100%',
// }}>
// {/* Barra de Progreso con borde */}
// <div style={{ height: '10px', width: '90%', backgroundColor: 'white', borderRadius: '7px', overflow: 'hidden', border: '2px solid blue',  marginRight: '10px' }}>
//   <div style={{ width: `${porcentajeProgreso}%`,  height: '100%', backgroundColor: 'blue', borderRadius: '5px 0 0 5px' }}></div>
// </div>
// {/* Porcentaje al lado derecho */}
// <span style={{ color: 'blue', fontWeight: 'bold' }}>{porcentajeProgreso}%</span>
// </div>


// <button onClick={manejarClickSiguiente} disabled={!aceptaDatos} style={{ padding: '10px 20px', cursor: aceptaDatos ? 'pointer' : 'not-allowed' }} > Siguiente </button>
// </div>




